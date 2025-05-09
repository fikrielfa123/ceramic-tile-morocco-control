
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const GeneralSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();

  const handleSaveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('settingsSaved'),
        description: t('settingsSavedSuccess'),
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('appSettings')}</CardTitle>
          <CardDescription>{t('appSettingsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">{t('companyName')}</Label>
              <Input id="companyName" defaultValue="Céramica Dersa" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">{t('defaultLanguage')}</Label>
              <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectLanguage')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFormat">{t('dateFormat')}</Label>
              <Select defaultValue="dd/mm/yyyy">
                <SelectTrigger>
                  <SelectValue placeholder={t('selectDateFormat')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode">{t('darkMode')}</Label>
              <Switch id="darkMode" />
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveSettings} 
                disabled={isLoading}
                className="bg-industrial-blue"
              >
                {isLoading ? t('saving') : t('saveChanges')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;
