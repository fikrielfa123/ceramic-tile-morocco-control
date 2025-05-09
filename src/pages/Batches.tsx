
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BatchList from "@/components/batches/BatchList";
import BatchDetail from "@/components/batches/BatchDetail";
import BatchForm from "@/components/batches/BatchForm";
import { mockBatches, mockMeasurements, mockDefects } from "@/data/mockData";

const Batches = () => {
  const { batchId, action } = useParams<{ batchId: string; action: string }>();
  
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
  
  // If creating a new batch
  if (action === "new") {
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
          <h1 className="text-3xl font-bold">Production Batches</h1>
          <p className="text-muted-foreground">Manage and monitor production batches</p>
        </div>
        <BatchList batches={mockBatches} />
      </div>
    </DashboardLayout>
  );
};

export default Batches;
