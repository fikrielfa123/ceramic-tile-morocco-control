
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { Defect } from "@/types";

interface DefectTypeChartProps {
  data: Defect[];
  fullSize?: boolean;
}

const DefectTypeChart = ({ data, fullSize = false }: DefectTypeChartProps) => {
  const { t } = useLanguage();

  // Aggregate defects by type
  const defectCounts = data.reduce((acc, defect) => {
    acc[defect.type] = (acc[defect.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(defectCounts).map(([type, count]) => ({
    name: t(`defect${type.charAt(0).toUpperCase() + type.slice(1)}`),
    value: count,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className={fullSize ? "h-full w-full" : "h-64 w-full"}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={fullSize ? 150 : 80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DefectTypeChart;
