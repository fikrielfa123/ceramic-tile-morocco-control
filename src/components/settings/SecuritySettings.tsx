
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const SecuritySettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSaveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('securitySettingsSaved'),
        description: t('securitySettingsSavedSuccess'),
      });
    }, 1000);
  };

  const handleChangePassword = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('passwordChanged'),
        description: t('passwordChangedSuccess'),
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('passwordSettings')}</CardTitle>
          <CardDescription>{t('passwordSettingsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">{t('currentPassword')}</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">{t('newPassword')}</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t('confirmPassword')}</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleChangePassword} 
                disabled={isLoading}
                className="bg-industrial-blue"
              >
                {isLoading ? t('changing') : t('changePassword')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('loginSecurity')}</CardTitle>
          <CardDescription>{t('loginSecurityDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">{t('sessionTimeout')}</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue placeholder={t('selectTimeout')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 {t('minutes')}</SelectItem>
                  <SelectItem value="30">30 {t('minutes')}</SelectItem>
                  <SelectItem value="60">60 {t('minutes')}</SelectItem>
                  <SelectItem value="120">2 {t('hours')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="two-factor">{t('twoFactorAuth')}</Label>
              <Select defaultValue="disabled">
                <SelectTrigger>
                  <SelectValue placeholder={t('selectTwoFactorMethod')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disabled">{t('disabled')}</SelectItem>
                  <SelectItem value="email">{t('email')}</SelectItem>
                  <SelectItem value="sms">{t('sms')}</SelectItem>
                  <SelectItem value="app">{t('authenticatorApp')}</SelectItem>
                </SelectContent>
              </Select>
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

export default SecuritySettings;
