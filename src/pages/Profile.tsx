
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('profileUpdated'),
        description: t('profileUpdateSuccess'),
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('profile')}</h1>
          <p className="text-muted-foreground">{t('profileDescription')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>{t('profileImage')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="Profile" />
                <AvatarFallback>FB</AvatarFallback>
              </Avatar>
              <Button variant="outline">{t('changeImage')}</Button>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>{t('personalInfo')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('firstName')}</Label>
                    <Input id="firstName" defaultValue="Fatima" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('lastName')}</Label>
                    <Input id="lastName" defaultValue="Benkirane" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input id="email" type="email" defaultValue="f.benkirane@ceramica-dersa.ma" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">{t('jobTitle')}</Label>
                  <Input id="jobTitle" defaultValue="Quality Control Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">{t('department')}</Label>
                  <Input id="department" defaultValue="Quality Department" />
                </div>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveProfile} 
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
      </div>
    </DashboardLayout>
  );
};

export default Profile;
