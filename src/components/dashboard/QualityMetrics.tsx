
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QualityMetric } from "@/types";
import { ArrowDown, ArrowUp } from "lucide-react";

interface QualityMetricsProps {
  metrics: QualityMetric[];
}

const QualityMetrics: React.FC<QualityMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.name} className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {metric.value}
                {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
              </div>
              {metric.change !== undefined && (
                <div
                  className={`flex items-center space-x-1 ${
                    metric.status === "positive"
                      ? "text-status-pass"
                      : metric.status === "negative"
                      ? "text-status-fail"
                      : "text-status-neutral"
                  }`}
                >
                  {metric.status === "positive" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : metric.status === "negative" ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : null}
                  <span>
                    {metric.change > 0 && "+"}
                    {metric.change}
                    {metric.unit && metric.unit}
                  </span>
                </div>
              )}
            </div>
            {metric.previousValue && (
              <p className="text-xs text-muted-foreground mt-2">
                Previous: {metric.previousValue}
                {metric.unit && metric.unit}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QualityMetrics;
