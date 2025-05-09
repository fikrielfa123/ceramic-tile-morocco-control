
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BatchList from "@/components/batches/BatchList";
import BatchDetail from "@/components/batches/BatchDetail";
import BatchForm from "@/components/batches/BatchForm";
import BatchMeasurementForm from "@/components/batches/BatchMeasurementForm";
import BatchDefectForm from "@/components/batches/BatchDefectForm";
import BatchReportForm from "@/components/batches/BatchReportForm";
import { mockBatches, mockMeasurements, mockDefects } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";

const Batches = () => {
  const { batchId, action } = useParams<{ batchId: string; action: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // For measurement, defect and report forms
  if (location.pathname.includes('/batches/measurement/')) {
    const batch = mockBatches.find(b => b.id === batchId);
    if (batch) {
      return (
        <DashboardLayout>
          <BatchMeasurementForm batch={batch} onComplete={() => navigate(`/batches/${batchId}`)} />
        </DashboardLayout>
      );
    }
  }

  if (location.pathname.includes('/batches/defect/')) {
    const batch = mockBatches.find(b => b.id === batchId);
    if (batch) {
      return (
        <DashboardLayout>
          <BatchDefectForm batch={batch} onComplete={() => navigate(`/batches/${batchId}`)} />
        </DashboardLayout>
      );
    }
  }

  if (location.pathname.includes('/batches/report/')) {
    const batch = mockBatches.find(b => b.id === batchId);
    if (batch) {
      return (
        <DashboardLayout>
          <BatchReportForm batch={batch} onComplete={() => navigate(`/batches/${batchId}`)} />
        </DashboardLayout>
      );
    }
  }
  
  // If viewing a specific batch
  if (batchId) {
    const batch = mockBatches.find(b => b.id === batchId);
    const batchMeasurements = mockMeasurements.filter(m => m.batchId === batchId);
    const batchDefects = mockDefects.filter(d => d.batchId === batchId);
    
    if (batch) {
      return (
        <DashboardLayout>
          <BatchDetail 
            batch={batch} 
            measurements={batchMeasurements}
            defects={batchDefects}
          />
        </DashboardLayout>
      );
    }
    
    // If batch not found, we fall through to the list view
  }
  
  // If creating a new batch (via direct URL or action param)
  if (action === "new" || location.pathname === "/batches/new") {
    return (
      <DashboardLayout>
        <BatchForm />
      </DashboardLayout>
    );
  }
  
  // Default view - list all batches
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('productionBatches')}</h1>
          <p className="text-muted-foreground">{t('batchesDescription')}</p>
        </div>
        <BatchList batches={mockBatches} />
      </div>
    </DashboardLayout>
  );
};

export default Batches;
