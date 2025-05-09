
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Batch, QualityParameter } from "@/types";
import { validateMeasurement } from "@/utils/validation";
import { useLanguage } from "@/context/LanguageContext";

interface QualityControlFormProps {
  batches: Batch[];
  parameters: QualityParameter[];
}

const QualityControlForm: React.FC<QualityControlFormProps> = ({
  batches,
  parameters,
}) => {
  const [formData, setFormData] = useState({
    batchId: "",
    parameterId: "",
    value: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState<QualityParameter | null>(null);
  const [validationResult, setValidationResult] = useState<"pass" | "fail" | "warning" | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate measurement if we have a parameter selected and a value
    if (name === "value" && selectedParameter && value) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const result = validateMeasurement(
          numValue,
          selectedParameter.minValue,
          selectedParameter.maxValue
        );
        setValidationResult(result);
      } else {
        setValidationResult(null);
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "parameterId") {
      const param = parameters.find((p) => p.id === value);
      setSelectedParameter(param || null);
      setValidationResult(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Measurement Recorded",
        description: `${selectedParameter?.name} measurement has been recorded.`,
      });
      
      // Show a specific message based on the validation result
      if (validationResult === "fail") {
        toast({
          title: "Quality Alert",
          description: `Measurement does not meet ISO standards! Corrective action required.`,
          variant: "destructive",
        });
      } else if (validationResult === "warning") {
        toast({
          title: "Quality Warning",
          description: `Measurement is close to tolerance limits. Please review.`,
          variant: "default",
        });
      }
      
      // Reset form
      setFormData({
        batchId: "",
        parameterId: "",
        value: "",
      });
      setSelectedParameter(null);
      setValidationResult(null);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('recordQualityMeasurement')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="batchId">{t('batch')}</Label>
            <Select
              onValueChange={(value) => handleSelectChange("batchId", value)}
              value={formData.batchId}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectBatch')} />
              </SelectTrigger>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem key={batch.id} value={batch.id}>
                    {batch.name} ({batch.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="parameterId">{t('parameter')}</Label>
            <Select
              onValueChange={(value) => handleSelectChange("parameterId", value)}
              value={formData.parameterId}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectParameter')} />
              </SelectTrigger>
              <SelectContent>
                {parameters.map((param) => (
                  <SelectItem key={param.id} value={param.id}>
                    {param.name} ({param.isoCode})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedParameter && (
            <div className="grid gap-2">
              <Label htmlFor="value">
                {t('measurementValue')} ({selectedParameter.unit})
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="value"
                  name="value"
                  type="number"
                  step="any"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder={`e.g. ${
                    (selectedParameter.minValue + selectedParameter.maxValue) / 2
                  }`}
                  required
                />
                {validationResult && (
                  <div className={`status-${validationResult}`}>
                    {validationResult.charAt(0).toUpperCase() + validationResult.slice(1)}
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {t('isoStandard')}: {selectedParameter.minValue} - {selectedParameter.maxValue} {selectedParameter.unit}
              </p>
            </div>
          )}

          {selectedParameter && (
            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <p className="font-medium mb-1">{selectedParameter.name}</p>
              <p className="text-muted-foreground text-xs">{selectedParameter.description}</p>
              <p className="text-muted-foreground text-xs mt-1">
                ISO Reference: {selectedParameter.isoCode}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setFormData({
                  batchId: "",
                  parameterId: "",
                  value: "",
                });
                setSelectedParameter(null);
                setValidationResult(null);
              }}
            >
              {t('reset')}
            </Button>
            <Button 
              type="submit" 
              className="bg-industrial-blue"
              disabled={isLoading || !formData.batchId || !formData.parameterId || !formData.value}
            >
              {isLoading ? t('recording') : t('recordMeasurement')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QualityControlForm;
