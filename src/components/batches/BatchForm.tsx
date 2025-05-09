
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BatchForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    kiln: "",
    materialLot: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Batch Created",
        description: "New production batch has been created successfully.",
      });
      navigate("/batches");
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Production Batch</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Batch Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Marocain Beige 30x60"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="kiln">Kiln</Label>
            <Select
              onValueChange={(value) => handleSelectChange("kiln", value)}
              defaultValue={formData.kiln}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a kiln" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kiln-A">Kiln A</SelectItem>
                <SelectItem value="Kiln-B">Kiln B</SelectItem>
                <SelectItem value="Kiln-C">Kiln C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="materialLot">Material Lot</Label>
            <Input
              id="materialLot"
              name="materialLot"
              value={formData.materialLot}
              onChange={handleInputChange}
              placeholder="e.g. ML-2024-117"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => navigate("/batches")}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-industrial-blue"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Batch"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BatchForm;
