import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Batch, Measurement, Defect } from "@/types";
import { ArrowLeft, FileText, Printer, FileLineChart, CheckSquare, AlertTriangle } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { generateISOReport, getCorrectiveAction } from "@/utils/validation";
import { useLanguage } from "@/context/LanguageContext";

interface BatchDetailProps {
  batch: Batch;
  measurements: Measurement[];
  defects: Defect[];
}

const BatchDetail: React.FC<BatchDetailProps> = ({ batch, measurements, defects }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const isoReport = generateISOReport(measurements);
  const failedMeasurements = measurements.filter(m => m.status === "fail");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/batches")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{batch.name}</h1>
            <p className="text-sm text-muted-foreground">{t('batchId')}: {batch.id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/batches/measurement/${batch.id}`)}>
            <CheckSquare className="mr-2 h-4 w-4" /> {t('addMeasurement')}
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate(`/batches/defect/${batch.id}`)}>
            <AlertTriangle className="mr-2 h-4 w-4" /> {t('reportDefect')}
          </Button>
          <Button size="sm" className="bg-industrial-blue" onClick={() => navigate(`/batches/report/${batch.id}`)}>
            <FileText className="mr-2 h-4 w-4" /> {t('generateReport')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('status')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-${batch.status.color === 'green' ? 'status-pass/15 text-status-pass' : batch.status.color === 'red' ? 'status-fail/15 text-status-fail' : batch.status.color === 'blue' ? 'industrial-lightBlue/15 text-industrial-blue' : 'status-neutral/15 text-status-neutral'}`}>
                {batch.status.status.charAt(0).toUpperCase() + batch.status.status.slice(1)}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('isoCompliance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {isoReport.isCompliant ? (
                <div className="status-pass">{t('compliant')}</div>
              ) : (
                <div className="status-fail">{t('nonCompliant')}</div>
              )}
              <span className="ml-2 text-sm text-muted-foreground">
                {isoReport.passCount} {t('pass')}, {isoReport.warningCount} {t('warnings')}, {isoReport.nonCompliantCount} {t('failures')}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('passingRate')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {batch.passingRate !== undefined ? `${batch.passingRate}%` : "-"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
          <TabsTrigger value="measurements">{t('measurements')}</TabsTrigger>
          <TabsTrigger value="defects">{t('defects')}</TabsTrigger>
          <TabsTrigger value="actions">{t('correctiveActions')}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('batchInformation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">{t('productionDate')}</p>
                  <p className="text-sm text-muted-foreground">{batch.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t('kiln')}</p>
                  <p className="text-sm text-muted-foreground">{batch.kiln}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t('materialLot')}</p>
                  <p className="text-sm text-muted-foreground">{batch.materialLot}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t('createdBy')}</p>
                  <p className="text-sm text-muted-foreground">Fatima Benkirane</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('latestMeasurements')}</CardTitle>
                <CardDescription>{t('recentQualityControlMeasurements')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('parameter')}</TableHead>
                      <TableHead>{t('value')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {measurements.slice(0, 3).map((measurement) => (
                      <TableRow key={measurement.id}>
                        <TableCell>{measurement.parameter}</TableCell>
                        <TableCell>
                          {measurement.value} {measurement.unit}
                        </TableCell>
                        <TableCell>
                          <div className={`status-${measurement.status}`}>
                            {measurement.status.charAt(0).toUpperCase() + measurement.status.slice(1)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('reportedDefects')}</CardTitle>
                <CardDescription>{t('visualAndPhysicalDefects')}</CardDescription>
              </CardHeader>
              <CardContent>
                {defects.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('type')}</TableHead>
                        <TableHead>{t('severity')}</TableHead>
                        <TableHead>{t('date')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {defects.map((defect) => (
                        <TableRow key={defect.id}>
                          <TableCell className="capitalize">{defect.type.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                          <TableCell className="capitalize">{defect.severity}</TableCell>
                          <TableCell>{defect.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-4 text-center text-muted-foreground">
                    {t('noDefectsReported')}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="measurements">
          <Card>
            <CardHeader>
              <CardTitle>{t('qualityControlMeasurements')}</CardTitle>
              <CardDescription>
                {t('measurementsAgainstISOStandards')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('parameter')}</TableHead>
                    <TableHead>{t('value')}</TableHead>
                    <TableHead>{t('min')}</TableHead>
                    <TableHead>{t('max')}</TableHead>
                    <TableHead>{t('status')}</TableHead>
                    <TableHead>{t('measuredBy')}</TableHead>
                    <TableHead>{t('date')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {measurements.map((measurement) => (
                    <TableRow key={measurement.id}>
                      <TableCell>{measurement.parameter}</TableCell>
                      <TableCell>
                        {measurement.value} {measurement.unit}
                      </TableCell>
                      <TableCell>
                        {measurement.min} {measurement.unit}
                      </TableCell>
                      <TableCell>
                        {measurement.max} {measurement.unit}
                      </TableCell>
                      <TableCell>
                        <div className={`status-${measurement.status}`}>
                          {measurement.status.charAt(0).toUpperCase() + measurement.status.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>Youssef El Mansouri</TableCell>
                      <TableCell>{measurement.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="defects">
          <Card>
            <CardHeader>
              <CardTitle>{t('visualDefects')}</CardTitle>
              <CardDescription>
                {t('catalogedDefectsWithImages')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {defects.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {defects.map((defect) => (
                    <Card key={defect.id} className="overflow-hidden card-hover">
                      <div className="aspect-video w-full bg-muted">
                        <img
                          src={defect.imageUrl || "/placeholder.svg"}
                          alt={defect.type}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium capitalize">
                            {defect.type.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <div className={`status-badge ${
                            defect.severity === "high" 
                              ? "bg-status-fail/15 text-status-fail" 
                              : defect.severity === "medium"
                              ? "bg-status-warning/15 text-status-warning"
                              : "bg-status-neutral/15 text-status-neutral"
                          }`}>
                            {defect.severity.charAt(0).toUpperCase() + defect.severity.slice(1)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {defect.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t('reportedOn')} {defect.date}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  {t('noDefectsReportedForBatch')}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="actions">
          <Card>
            <CardHeader>
              <CardTitle>{t('correctiveActions')}</CardTitle>
              <CardDescription>
                {t('recommendedActionsForNonCompliant')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {failedMeasurements.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('parameter')}</TableHead>
                      <TableHead>{t('currentValue')}</TableHead>
                      <TableHead>{t('requiredRange')}</TableHead>
                      <TableHead>{t('recommendedAction')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {failedMeasurements.map((measurement) => (
                      <TableRow key={measurement.id}>
                        <TableCell>{measurement.parameter}</TableCell>
                        <TableCell>
                          {measurement.value} {measurement.unit}
                        </TableCell>
                        <TableCell>
                          {measurement.min} - {measurement.max} {measurement.unit}
                        </TableCell>
                        <TableCell>
                          {getCorrectiveAction(
                            measurement.parameter,
                            measurement.value,
                            measurement.min,
                            measurement.max
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  {t('noCorrectiveActionsNeeded')}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BatchDetail;
