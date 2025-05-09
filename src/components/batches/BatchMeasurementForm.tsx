
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Batch } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { mockQualityParameters } from "@/data/mockData";

interface BatchMeasurementFormProps {
  batch: Batch;
  onComplete: () => void;
}

const BatchMeasurementForm: React.FC<BatchMeasurementFormProps> = ({ batch, onComplete }) => {
  const [selectedParameter, setSelectedParameter] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const parameter = mockQualityParameters.find(p => p.id === selectedParameter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParameter || !value) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('measurementAdded'),
        description: t('measurementAddedToBatch', { batchId: batch.id }),
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
          <h1 className="text-2xl font-bold">{t('addMeasurement')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('addMeasurementToBatch', { batchName: batch.name, batchId: batch.id })}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('qualityMeasurement')}</CardTitle>
          <CardDescription>{t('recordQualityMeasurementDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="parameter">{t('parameter')}</Label>
                <Select
                  value={selectedParameter}
                  onValueChange={setSelectedParameter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectParameter')} />
                  </SelectTrigger>
                  <SelectContent>
                    {mockQualityParameters.map(param => (
                      <SelectItem key={param.id} value={param.id}>
                        {param.name} ({param.isoCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="value">{t('value')}</Label>
                <div className="flex">
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="0.00"
                    required
                    className="rounded-r-none"
                  />
                  <div className="flex items-center justify-center rounded-r-md border border-l-0 bg-muted px-3 text-sm text-muted-foreground">
                    {parameter?.unit || 'mm'}
                  </div>
                </div>
              </div>
            </div>

            {parameter && (
              <div className="mt-4 rounded-md bg-muted p-4">
                <h3 className="font-medium mb-2">{t('parameterInfo')}</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium">{t('description')}</p>
                    <p className="text-sm text-muted-foreground">{parameter.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t('isoCode')}</p>
                    <p className="text-sm text-muted-foreground">{parameter.isoCode}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t('acceptableRange')}</p>
                    <p className="text-sm text-muted-foreground">
                      {parameter.minValue} - {parameter.maxValue} {parameter.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t('category')}</p>
                    <p className="text-sm text-muted-foreground capitalize">{parameter.category}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" type="button" onClick={onComplete}>
                {t('cancel')}
              </Button>
              <Button 
                type="submit" 
                className="bg-industrial-blue"
                disabled={isLoading || !selectedParameter || !value}
              >
                {isLoading ? t('saving') : t('saveMeasurement')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchMeasurementForm;
