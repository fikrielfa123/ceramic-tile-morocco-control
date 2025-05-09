
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Batch, Measurement, Defect } from "@/types";
import { ArrowLeft, FileText, Printer } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { generateISOReport, getCorrectiveAction } from "@/utils/validation";

interface BatchDetailProps {
  batch: Batch;
  measurements: Measurement[];
  defects: Defect[];
}

const BatchDetail: React.FC<BatchDetailProps> = ({ batch, measurements, defects }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

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
            <p className="text-sm text-muted-foreground">Batch ID: {batch.id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button size="sm" className="bg-industrial-blue">
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
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
            <CardTitle className="text-sm font-medium">ISO Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {isoReport.isCompliant ? (
                <div className="status-pass">Compliant</div>
              ) : (
                <div className="status-fail">Non-Compliant</div>
              )}
              <span className="ml-2 text-sm text-muted-foreground">
                {isoReport.passCount} pass, {isoReport.warningCount} warnings, {isoReport.nonCompliantCount} failures
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
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
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="defects">Defects</TabsTrigger>
          <TabsTrigger value="actions">Corrective Actions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Batch Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Production Date</p>
                  <p className="text-sm text-muted-foreground">{batch.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Kiln</p>
                  <p className="text-sm text-muted-foreground">{batch.kiln}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Material Lot</p>
                  <p className="text-sm text-muted-foreground">{batch.materialLot}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Created By</p>
                  <p className="text-sm text-muted-foreground">Fatima Benkirane</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Latest Measurements</CardTitle>
                <CardDescription>Recent quality control measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
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
                <CardTitle>Reported Defects</CardTitle>
                <CardDescription>Visual and physical defects</CardDescription>
              </CardHeader>
              <CardContent>
                {defects.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Date</TableHead>
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
                    No defects reported for this batch
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="measurements">
          <Card>
            <CardHeader>
              <CardTitle>Quality Control Measurements</CardTitle>
              <CardDescription>
                All measurements for this batch against ISO 13006 standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Min</TableHead>
                    <TableHead>Max</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Measured By</TableHead>
                    <TableHead>Date</TableHead>
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
              <CardTitle>Visual Defects</CardTitle>
              <CardDescription>
                Cataloged defects with images and descriptions
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
                          Reported on {defect.date}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No defects have been reported for this batch
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="actions">
          <Card>
            <CardHeader>
              <CardTitle>Corrective Actions</CardTitle>
              <CardDescription>
                Recommended actions for non-compliant parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              {failedMeasurements.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>Required Range</TableHead>
                      <TableHead>Recommended Action</TableHead>
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
                  No corrective actions needed for this batch
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
