
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QualityControlForm from "@/components/quality/QualityControlForm";
import DefectsGallery from "@/components/quality/DefectsGallery";
import { mockBatches, mockQualityParameters, mockDefects } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";

const QualityControl = () => {
  const [activeTab, setActiveTab] = useState("measurements");
  const { t } = useLanguage();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('qualityControlTitle')}</h1>
          <p className="text-muted-foreground">
            {t('qualityControlDesc')}
          </p>
        </div>
        
        <Tabs 
          defaultValue="measurements" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="measurements">{t('physicalMeasurements')}</TabsTrigger>
            <TabsTrigger value="defects">{t('visualDefects')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="measurements" className="space-y-4">
            <QualityControlForm 
              batches={mockBatches.filter(batch => 
                batch.status.status === 'inProgress' || 
                batch.status.status === 'pending'
              )}
              parameters={mockQualityParameters}
            />
          </TabsContent>
          
          <TabsContent value="defects" className="space-y-4">
            <DefectsGallery 
              batches={mockBatches}
              defects={mockDefects}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default QualityControl;
