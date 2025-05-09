
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const NotificationSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSaveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('notificationsSaved'),
        description: t('notificationsSavedSuccess'),
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('notificationPreferences')}</CardTitle>
          <CardDescription>{t('notificationPreferencesDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">{t('batchFailureAlerts')}</Label>
                  <p className="text-sm text-muted-foreground">{t('batchFailureAlertsDescription')}</p>
                </div>
                <Switch defaultChecked id="batch-failure" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">{t('qualityThresholdAlerts')}</Label>
                  <p className="text-sm text-muted-foreground">{t('qualityThresholdAlertsDescription')}</p>
                </div>
                <Switch defaultChecked id="quality-threshold" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">{t('newReportNotifications')}</Label>
                  <p className="text-sm text-muted-foreground">{t('newReportNotificationsDescription')}</p>
                </div>
                <Switch defaultChecked id="new-report" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">{t('systemUpdates')}</Label>
                  <p className="text-sm text-muted-foreground">{t('systemUpdatesDescription')}</p>
                </div>
                <Switch id="system-updates" />
              </div>
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

export default NotificationSettings;
