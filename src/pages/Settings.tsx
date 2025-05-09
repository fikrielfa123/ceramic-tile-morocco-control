
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "@/components/settings/GeneralSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import { useLanguage } from "@/context/LanguageContext";

const Settings = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('settings')}</h1>
          <p className="text-muted-foreground">{t('settingsDescription')}</p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">{t('generalSettings')}</TabsTrigger>
            <TabsTrigger value="notifications">{t('notificationSettings')}</TabsTrigger>
            <TabsTrigger value="security">{t('securitySettings')}</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
