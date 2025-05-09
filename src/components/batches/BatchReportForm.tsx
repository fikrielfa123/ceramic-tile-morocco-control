
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Batch } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface BatchReportFormProps {
  batch: Batch;
  onComplete: () => void;
}

const BatchReportForm: React.FC<BatchReportFormProps> = ({ batch, onComplete }) => {
  const [reportType, setReportType] = useState("");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [includeOptions, setIncludeOptions] = useState({
    qualityMeasurements: true,
    defects: true,
    compliance: true,
    recommendations: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleToggleOption = (option: keyof typeof includeOptions) => {
    setIncludeOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleGenerateReport = () => {
    if (!reportType) return;

    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      
      toast({
        title: t('reportGenerated'),
        description: t('reportGeneratedSuccess'),
      });
    }, 2000);
  };

  const handleDownloadReport = () => {
    toast({
      title: t('reportDownloaded'),
      description: t('reportDownloadedSuccess'),
    });
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onComplete}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{t('generateReport')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('generateReportForBatch', { batchName: batch.name, batchId: batch.id })}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('reportConfiguration')}</CardTitle>
          <CardDescription>{t('customizeReportDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="reportType">{t('reportType')}</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectReportType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">{t('fullQualityReport')}</SelectItem>
                    <SelectItem value="iso">{t('isoComplianceReport')}</SelectItem>
                    <SelectItem value="defects">{t('visualDefectsReport')}</SelectItem>
                    <SelectItem value="summary">{t('executiveSummary')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="reportFormat">{t('reportFormat')}</Label>
                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectReportFormat')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>{t('includeInReport')}</Label>
              <div className="grid gap-2 mt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quality-measurements"
                    checked={includeOptions.qualityMeasurements}
                    onCheckedChange={() => handleToggleOption('qualityMeasurements')}
                  />
                  <label 
                    htmlFor="quality-measurements" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('qualityMeasurements')}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="defects"
                    checked={includeOptions.defects}
                    onCheckedChange={() => handleToggleOption('defects')}
                  />
                  <label 
                    htmlFor="defects" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('defects')}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="compliance"
                    checked={includeOptions.compliance}
                    onCheckedChange={() => handleToggleOption('compliance')}
                  />
                  <label 
                    htmlFor="compliance" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('isoComplianceStatus')}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="recommendations"
                    checked={includeOptions.recommendations}
                    onCheckedChange={() => handleToggleOption('recommendations')}
                  />
                  <label 
                    htmlFor="recommendations" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('correctiveRecommendations')}
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              {!isGenerated ? (
                <>
                  <Button variant="outline" type="button" onClick={onComplete}>
                    {t('cancel')}
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-industrial-blue"
                    onClick={handleGenerateReport}
                    disabled={isGenerating || !reportType}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {isGenerating ? t('generating') : t('generateReport')}
                  </Button>
                </>
              ) : (
                <Button 
                  type="button" 
                  className="bg-status-pass"
                  onClick={handleDownloadReport}
                >
                  <Check className="mr-2 h-4 w-4" />
                  {t('downloadReport')}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const Checkbox = ({ id, checked, onCheckedChange }: { id: string, checked: boolean, onCheckedChange: () => void }) => {
  return (
    <div className="h-4 w-4 border rounded flex items-center justify-center bg-white" onClick={onCheckedChange}>
      {checked && <Check className="h-3 w-3 text-industrial-blue" />}
      <input type="checkbox" id={id} className="opacity-0 absolute" checked={checked} onChange={onCheckedChange} />
    </div>
  );
};

export default BatchReportForm;
