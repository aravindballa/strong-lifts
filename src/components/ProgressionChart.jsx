import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProgressionChart = ({ data, title, yAxisLabel }) => {
  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString("en-US", { month: "short" });
  };

  return (
    <div className="w-full h-[300px] bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e0e0e0"
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            stroke="#9ca3af"
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            stroke="#9ca3af"
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#9ca3af" },
            }}
          />
          <Tooltip
            contentStyle={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
            }}
            labelStyle={{ color: "#374151", fontWeight: "bold" }}
            itemStyle={{ color: "#7c3aed" }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#7c3aed"
            strokeWidth={2}
            dot={{ r: 4, fill: "#7c3aed", stroke: "white", strokeWidth: 2 }}
            activeDot={{
              r: 6,
              fill: "#7c3aed",
              stroke: "white",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressionChart;
