
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { mockReports, mockBatches } from "@/data/mockData";
import { Search, FileText, Download, Printer } from "lucide-react";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredReports = mockReports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.batchId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Quality Reports</h1>
          <p className="text-muted-foreground">
            Generate and view compliance reports for production batches
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Select Batch</label>
                <div className="flex gap-2">
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="" disabled selected>Choose a batch...</option>
                    {mockBatches
                      .filter(batch => !mockReports.some(report => report.batchId === batch.id))
                      .map(batch => (
                        <option key={batch.id} value={batch.id}>
                          {batch.name} ({batch.id})
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Report Type</label>
                <div className="flex gap-2">
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="full">Full Quality Report</option>
                    <option value="iso">ISO Compliance Report</option>
                    <option value="defects">Visual Defects Report</option>
                    <option value="summary">Executive Summary</option>
                  </select>
                </div>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-industrial-blue">
                  <FileText className="mr-2 h-4 w-4" /> Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Title</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>ISO Compliance</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => {
                  const batch = mockBatches.find(b => b.id === report.batchId);
                  return (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{batch?.name || report.batchId}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${report.isCompliant ? 'bg-status-pass/15 text-status-pass' : 'bg-status-fail/15 text-status-fail'}`}>
                          {report.isCompliant ? 'Compliant' : 'Non-Compliant'}
                        </div>
                      </TableCell>
                      <TableCell>Fatima Benkirane</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="icon">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="icon" className="bg-industrial-blue">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {filteredReports.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No reports found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Reports;
