
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Batch } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface BatchDefectFormProps {
  batch: Batch;
  onComplete: () => void;
}

const BatchDefectForm: React.FC<BatchDefectFormProps> = ({ batch, onComplete }) => {
  const [formData, setFormData] = useState({
    type: "",
    severity: "",
    description: "",
    imageFile: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.severity) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('defectReported'),
        description: t('defectReportedToBatch', { batchId: batch.id }),
      });
      onComplete();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onComplete}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{t('reportDefect')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('reportDefectForBatch', { batchName: batch.name, batchId: batch.id })}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('defectDetails')}</CardTitle>
          <CardDescription>{t('reportVisualOrPhysicalDefect')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="type">{t('defectType')}</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectDefectType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crack">{t('defectCrack')}</SelectItem>
                    <SelectItem value="chip">{t('defectChip')}</SelectItem>
                    <SelectItem value="colorDeviation">{t('defectColorDeviation')}</SelectItem>
                    <SelectItem value="glazeDefect">{t('defectGlazeDefect')}</SelectItem>
                    <SelectItem value="other">{t('defectOther')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="severity">{t('defectSeverity')}</Label>
                <Select 
                  value={formData.severity} 
                  onValueChange={(value) => handleSelectChange("severity", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectDefectSeverity')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t('severityLow')}</SelectItem>
                    <SelectItem value="medium">{t('severityMedium')}</SelectItem>
                    <SelectItem value="high">{t('severityHigh')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">{t('defectDescription')}</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={t('defectDescriptionPlaceholder')}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">{t('defectImage')}</Label>
              <div className="flex items-center gap-4">
                <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground p-4 text-muted-foreground hover:bg-muted">
                  <Upload className="h-8 w-8 mb-2" />
                  <span className="text-xs text-center">{t('uploadImage')}</span>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </label>
                {imagePreview && (
                  <div className="relative h-32 w-32 overflow-hidden rounded-md">
                    <img 
                      src={imagePreview} 
                      alt="Defect preview" 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" type="button" onClick={onComplete}>
                {t('cancel')}
              </Button>
              <Button 
                type="submit" 
                className="bg-industrial-blue"
                disabled={isLoading || !formData.type || !formData.severity}
              >
                {isLoading ? t('reporting') : t('reportDefect')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchDefectForm;
