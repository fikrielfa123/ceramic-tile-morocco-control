
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Batch, Defect } from "@/types";
import { X, Upload } from "lucide-react";

interface DefectsGalleryProps {
  batches: Batch[];
  defects: Defect[];
}

const DefectsGallery: React.FC<DefectsGalleryProps> = ({ batches, defects }) => {
  const [filterBatchId, setFilterBatchId] = useState<string>("");
  const [filterDefectType, setFilterDefectType] = useState<string>("");
  const [isAddingDefect, setIsAddingDefect] = useState(false);
  const [newDefect, setNewDefect] = useState({
    batchId: "",
    type: "",
    description: "",
    severity: "",
    imageUrl: "/placeholder.svg", // Use a placeholder for demo
  });
  
  const { toast } = useToast();

  const filteredDefects = defects.filter((defect) => {
    if (filterBatchId && defect.batchId !== filterBatchId) return false;
    if (filterDefectType && defect.type !== filterDefectType) return false;
    return true;
  });

  const handleAddNewDefect = () => {
    toast({
      title: "Defect Reported",
      description: "Visual defect has been successfully recorded.",
    });
    setIsAddingDefect(false);
    setNewDefect({
      batchId: "",
      type: "",
      description: "",
      severity: "",
      imageUrl: "/placeholder.svg",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="w-full sm:w-64">
            <Select
              value={filterBatchId}
              onValueChange={setFilterBatchId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-batches">All Batches</SelectItem>
                {batches.map((batch) => (
                  <SelectItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-64">
            <Select
              value={filterDefectType}
              onValueChange={setFilterDefectType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by defect type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="crack">Crack</SelectItem>
                <SelectItem value="chip">Chip</SelectItem>
                <SelectItem value="colorDeviation">Color Deviation</SelectItem>
                <SelectItem value="glazeDefect">Glaze Defect</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button 
          className="bg-industrial-blue"
          onClick={() => setIsAddingDefect(true)}
        >
          Report New Defect
        </Button>
      </div>

      {isAddingDefect && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">Report New Defect</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsAddingDefect(false)}
              >
                <X size={18} />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="batch">Batch</Label>
                <Select
                  value={newDefect.batchId}
                  onValueChange={(value) => setNewDefect({ ...newDefect, batchId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.name} ({batch.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Defect Type</Label>
                  <Select
                    value={newDefect.type}
                    onValueChange={(value) => setNewDefect({ ...newDefect, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crack">Crack</SelectItem>
                      <SelectItem value="chip">Chip</SelectItem>
                      <SelectItem value="colorDeviation">Color Deviation</SelectItem>
                      <SelectItem value="glazeDefect">Glaze Defect</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Select
                    value={newDefect.severity}
                    onValueChange={(value) => setNewDefect({ ...newDefect, severity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the defect in detail..."
                  value={newDefect.description}
                  onChange={(e) => setNewDefect({ ...newDefect, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label>Upload Image</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Drag and drop an image or click to browse
                  </p>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <Button variant="outline" size="sm">
                    Select Image
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  className="bg-industrial-blue"
                  onClick={handleAddNewDefect}
                  disabled={!newDefect.batchId || !newDefect.type || !newDefect.severity || !newDefect.description}
                >
                  Submit Defect Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDefects.map((defect) => {
          const batch = batches.find((b) => b.id === defect.batchId);
          return (
            <Card key={defect.id} className="overflow-hidden card-hover">
              <div className="aspect-video w-full bg-muted">
                <img
                  src={defect.imageUrl || "/placeholder.svg"}
                  alt={defect.type}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium capitalize">
                      {defect.type.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {batch?.name} ({defect.batchId})
                    </p>
                  </div>
                  <div className={`status-badge ${
                    defect.severity === "high" 
                      ? "bg-status-fail/15 text-status-fail" 
                      : defect.severity === "medium"
                      ? "bg-status-warning/15 text-status-warning"
                      : "bg-status-neutral/15 text-status-neutral"
                  }`}>
                    {defect.severity.charAt(0).toUpperCase() + defect.severity.slice(1)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {defect.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  Reported on {defect.date}
                </p>
              </CardContent>
            </Card>
          );
        })}

        {filteredDefects.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No defects found matching your filters
          </div>
        )}
      </div>
    </div>
  );
};

export default DefectsGallery;
