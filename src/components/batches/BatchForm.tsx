
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const BatchForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    kiln: "",
    materialLot: "",
    productionDate: new Date().toISOString().split('T')[0],
    productionLine: "",
    targetQuantity: "",
    notes: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('batchCreated'),
        description: t('batchCreatedSuccess'),
      });
      navigate("/batches");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={() => navigate("/batches")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{t('createNewBatch')}</h1>
          <p className="text-sm text-muted-foreground">{t('createNewBatchDescription')}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('batchDetails')}</CardTitle>
          <CardDescription>{t('enterBatchInformation')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('batchName')}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('batchNamePlaceholder')}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="productionLine">{t('productionLine')}</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("productionLine", value)}
                  value={formData.productionLine}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectProductionLine')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Line-1">{t('line')} 1</SelectItem>
                    <SelectItem value="Line-2">{t('line')} 2</SelectItem>
                    <SelectItem value="Line-3">{t('line')} 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="productionDate">{t('productionDate')}</Label>
                <Input
                  id="productionDate"
                  name="productionDate"
                  type="date"
                  value={formData.productionDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="kiln">{t('kiln')}</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("kiln", value)}
                  value={formData.kiln}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectKiln')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kiln-A">{t('kiln')} A</SelectItem>
                    <SelectItem value="Kiln-B">{t('kiln')} B</SelectItem>
                    <SelectItem value="Kiln-C">{t('kiln')} C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="materialLot">{t('materialLot')}</Label>
                <Input
                  id="materialLot"
                  name="materialLot"
                  value={formData.materialLot}
                  onChange={handleInputChange}
                  placeholder={t('materialLotPlaceholder')}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="targetQuantity">{t('targetQuantity')}</Label>
                <Input
                  id="targetQuantity"
                  name="targetQuantity"
                  type="number"
                  value={formData.targetQuantity}
                  onChange={handleInputChange}
                  placeholder={t('quantityPlaceholder')}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">{t('notes')}</Label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder={t('notesPlaceholder')}
                className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={() => navigate("/batches")}>
                {t('cancel')}
              </Button>
              <Button 
                type="submit" 
                className="bg-industrial-blue"
                disabled={isLoading}
              >
                {isLoading ? t('creating') : t('createBatch')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchForm;
