
import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { Batch } from "@/types";

interface ProductionPerformanceChartProps {
  data: Batch[];
  fullSize?: boolean;
}

const ProductionPerformanceChart = ({ data, fullSize = false }: ProductionPerformanceChartProps) => {
  const { t } = useLanguage();

  // Process data for the chart
  const chartData = data.slice(0, 6).map(batch => ({
    name: batch.name.substring(0, 10) + (batch.name.length > 10 ? "..." : ""),
    passingRate: batch.passingRate || 0,
    failureRate: 100 - (batch.passingRate || 0),
    batchId: batch.id
  }));

  return (
    <div className={fullSize ? "h-full w-full" : "h-64 w-full"}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              `${value}%`, 
              name === "passingRate" ? t('passingRate') : t('failureRate')
            ]}
            labelFormatter={(index) => {
              // Check if index is valid and the chartData item exists
              if (index === undefined || typeof index !== 'number' || !chartData[index]) {
                return t('batch') + ': ' + t('unknown');
              }
              return `${t('batch')}: ${chartData[index].batchId}`;
            }}
          />
          <Legend />
          <Bar dataKey="passingRate" fill="#22c55e" name={t('passingRate')} />
          <Bar dataKey="failureRate" fill="#ef4444" name={t('failureRate')} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductionPerformanceChart;
