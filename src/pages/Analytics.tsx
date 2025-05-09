
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { mockDefects, mockBatches } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";
import QualityTrendsChart from "@/components/analytics/QualityTrendsChart";
import DefectTypeChart from "@/components/analytics/DefectTypeChart";
import ProductionPerformanceChart from "@/components/analytics/ProductionPerformanceChart";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter" | "year">("month");
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('analytics')}</h1>
          <p className="text-muted-foreground">{t('analyticsDescription')}</p>
        </div>

        <div className="flex justify-end">
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)} className="w-[400px]">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="week">{t('week')}</TabsTrigger>
              <TabsTrigger value="month">{t('month')}</TabsTrigger>
              <TabsTrigger value="quarter">{t('quarter')}</TabsTrigger>
              <TabsTrigger value="year">{t('year')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0">
                <CardTitle className="text-base">{t('qualityTrends')}</CardTitle>
                <CardDescription>{t('overTimeAnalysis')}</CardDescription>
              </div>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <QualityTrendsChart timeRange={timeRange} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0">
                <CardTitle className="text-base">{t('defectDistribution')}</CardTitle>
                <CardDescription>{t('byTypeAnalysis')}</CardDescription>
              </div>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <DefectTypeChart data={mockDefects} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-0">
                <CardTitle className="text-base">{t('productionPerformance')}</CardTitle>
                <CardDescription>{t('batchComparisonAnalysis')}</CardDescription>
              </div>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ProductionPerformanceChart data={mockBatches} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('detailedAnalytics')}</CardTitle>
            <CardDescription>{t('detailedAnalyticsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="quality">
              <TabsList className="mb-4">
                <TabsTrigger value="quality">{t('qualityMetrics')}</TabsTrigger>
                <TabsTrigger value="production">{t('productionMetrics')}</TabsTrigger>
                <TabsTrigger value="compliance">{t('complianceMetrics')}</TabsTrigger>
              </TabsList>
              <TabsContent value="quality" className="space-y-4">
                <div className="h-[400px] w-full">
                  <QualityTrendsChart timeRange={timeRange} fullSize />
                </div>
              </TabsContent>
              <TabsContent value="production" className="space-y-4">
                <div className="h-[400px] w-full">
                  <ProductionPerformanceChart data={mockBatches} fullSize />
                </div>
              </TabsContent>
              <TabsContent value="compliance" className="space-y-4">
                <div className="h-[400px] w-full">
                  <DefectTypeChart data={mockDefects} fullSize />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
