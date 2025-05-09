
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/context/LanguageContext";

// Mock data for quality trends
const generateQualityTrends = (timeRange: string) => {
  const data = [];
  let days = 7;
  
  if (timeRange === "month") days = 30;
  else if (timeRange === "quarter") days = 90;
  else if (timeRange === "year") days = 12; // For year, we'll show months
  
  for (let i = 0; i < days; i++) {
    const passRate = 85 + Math.random() * 15;
    const defectRate = 100 - passRate;
    
    let name = "";
    if (timeRange === "year") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      name = months[i];
    } else {
      name = (i + 1).toString();
    }
    
    data.push({
      name,
      passRate: parseFloat(passRate.toFixed(1)),
      defectRate: parseFloat(defectRate.toFixed(1)),
      isoCompliance: Math.random() > 0.1 ? 100 : parseFloat((80 + Math.random() * 15).toFixed(1)),
    });
  }
  
  return data;
};

interface QualityTrendsChartProps {
  timeRange: "week" | "month" | "quarter" | "year";
  fullSize?: boolean;
}

const QualityTrendsChart = ({ timeRange, fullSize = false }: QualityTrendsChartProps) => {
  const { t } = useLanguage();
  const data = generateQualityTrends(timeRange);
  
  return (
    <div className={fullSize ? "h-full w-full" : "h-64 w-full"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            label={
              timeRange === "year" ? 
                {} : 
                { value: timeRange === "week" ? t('day') : t('day'), position: "insideBottomRight", offset: -5 }
            } 
          />
          <YAxis label={{ value: "%", position: "insideLeft", angle: -90 }} domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="passRate" stroke="#22c55e" name={t('passRate')} />
          <Line type="monotone" dataKey="defectRate" stroke="#ef4444" name={t('defectRate')} />
          <Line type="monotone" dataKey="isoCompliance" stroke="#3b82f6" name={t('isoCompliance')} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QualityTrendsChart;
