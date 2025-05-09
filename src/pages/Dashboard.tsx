
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import QualityMetrics from "@/components/dashboard/QualityMetrics";
import { mockQualityMetrics, mockBatches, mockDefects } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const recentBatches = mockBatches.slice(0, 3);
  
  const defectCountByType = mockDefects.reduce((acc, defect) => {
    const type = defect.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const defectChartData = Object.entries(defectCountByType).map(([type, count]) => ({
    name: type.replace(/([A-Z])/g, ' $1').trim(),
    count,
  }));
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of quality control metrics and recent activity</p>
        </div>
        
        <QualityMetrics metrics={mockQualityMetrics} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Defect Types Distribution</CardTitle>
              <CardDescription>Visual defects by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={defectChartData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                    />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="count" name="Count" fill="#4285F4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Batches</CardTitle>
                <CardDescription>Latest production batches</CardDescription>
              </div>
              <Link 
                to="/batches"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentBatches.map((batch) => (
                  <div key={batch.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{batch.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {batch.id} - {batch.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-${batch.status.color === 'green' ? 'status-pass/15 text-status-pass' : batch.status.color === 'red' ? 'status-fail/15 text-status-fail' : batch.status.color === 'blue' ? 'industrial-lightBlue/15 text-industrial-blue' : 'status-neutral/15 text-status-neutral'}`}>
                        {batch.status.status.charAt(0).toUpperCase() + batch.status.status.slice(1)}
                      </div>
                      {batch.passingRate !== undefined && (
                        <span className="text-sm font-medium">
                          {batch.passingRate}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                
                {recentBatches.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    No recent batches found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Non-Compliance Issues</CardTitle>
              <CardDescription>Top quality issues this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Water Absorption</p>
                    <p className="text-xs text-muted-foreground">5 failures this month</p>
                  </div>
                  <span className="text-status-fail">27%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Warping</p>
                    <p className="text-xs text-muted-foreground">4 failures this month</p>
                  </div>
                  <span className="text-status-fail">22%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Glaze Defects</p>
                    <p className="text-xs text-muted-foreground">3 failures this month</p>
                  </div>
                  <span className="text-status-fail">18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Thickness Variation</p>
                    <p className="text-xs text-muted-foreground">2 failures this month</p>
                  </div>
                  <span className="text-status-fail">14%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest quality control actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 7h.01" /><path d="M11 7h6" /><path d="M7 11h.01" /><path d="M11 11h.01" /><path d="M15 11h.01" /><path d="M7 15h.01" /><path d="M11 15h.01" /><path d="M15 15h.01" /></svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Water Absorption Test Completed</p>
                    <p className="text-xs text-muted-foreground">B-2024-05-005 - 2.8% - Passed</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-destructive/10 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Defect Reported</p>
                    <p className="text-xs text-muted-foreground">B-2024-05-005 - Glaze Run - High Severity</p>
                    <p className="text-xs text-muted-foreground">25 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" /><path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" /><path d="M12 12v9" /><path d="M8 21h8" /><path d="M4 5v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5" /></svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">New Batch Created</p>
                    <p className="text-xs text-muted-foreground">B-2024-05-005 - Marrakech Red 30x30</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-green-500/10 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Quality Report Generated</p>
                    <p className="text-xs text-muted-foreground">B-2024-05-001 - ISO Compliant</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>ISO Compliance Status</CardTitle>
              <CardDescription>Status of key quality parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Dimensional (ISO 10545-2)</p>
                    <span className="text-sm text-status-pass">98.2%</span>
                  </div>
                  <div className="rounded-full h-2 bg-muted overflow-hidden">
                    <div className="bg-status-pass h-full" style={{ width: "98.2%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Water Absorption (ISO 10545-3)</p>
                    <span className="text-sm text-status-warning">92.4%</span>
                  </div>
                  <div className="rounded-full h-2 bg-muted overflow-hidden">
                    <div className="bg-status-warning h-full" style={{ width: "92.4%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Breaking Strength (ISO 10545-4)</p>
                    <span className="text-sm text-status-pass">99.1%</span>
                  </div>
                  <div className="rounded-full h-2 bg-muted overflow-hidden">
                    <div className="bg-status-pass h-full" style={{ width: "99.1%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Abrasion Resistance (ISO 10545-7)</p>
                    <span className="text-sm text-status-pass">97.8%</span>
                  </div>
                  <div className="rounded-full h-2 bg-muted overflow-hidden">
                    <div className="bg-status-pass h-full" style={{ width: "97.8%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Overall ISO Compliance</p>
                    <span className="text-sm text-status-pass">96.8%</span>
                  </div>
                  <div className="rounded-full h-2 bg-muted overflow-hidden">
                    <div className="bg-status-pass h-full" style={{ width: "96.8%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
