import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts";
import Card from "./Card";
import { categoryToChartData, monthlyToChartData, PALETTE, formatCurrency } from "../utils/helpers";

/* ── Custom label inside pie slices ── */
function PieSliceLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x} y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: 11, fontWeight: 700 }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

const tooltipStyle = {
  background: "#0F172A",
  border: "1px solid rgba(110,231,183,0.2)",
  borderRadius: 10,
  fontSize: 13,
};

/* ── Category Breakdown Pie Chart ── */
export function CategoryBreakdown({ data }) {
  const pieData = categoryToChartData(data);

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 22 }}>📊</span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#E2E8F0",
        }}>
          Category Breakdown
        </span>
      </div>

      {pieData.length === 0 ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={290}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={105}
              labelLine={false}
              label={<PieSliceLabel />}
              dataKey="value"
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => formatCurrency(v)}
              contentStyle={tooltipStyle}
              labelStyle={{ color: "#6EE7B7" }}
            />
            <Legend
              formatter={(v) => (
                <span style={{ color: "#94A3B8", fontSize: 12 }}>{v}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

/* ── Monthly Trend Area Chart ── */
export function MonthlyTrend({ data }) {
  const chartData = monthlyToChartData(data);

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 22 }}>📈</span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#E2E8F0",
        }}>
          Monthly Trend
        </span>
      </div>

      {chartData.length === 0 ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={270}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6EE7B7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6EE7B7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              tick={{ fill: "#64748B", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip
              formatter={(v) => [formatCurrency(v), "Spending"]}
              contentStyle={tooltipStyle}
              labelStyle={{ color: "#6EE7B7" }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#6EE7B7"
              strokeWidth={2.5}
              fill="url(#areaGradient)"
              dot={{ fill: "#6EE7B7", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#34D399", strokeWidth: 2, stroke: "#0F172A" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

function EmptyState() {
  return (
    <div style={{ textAlign: "center", color: "#475569", padding: "36px 0", fontSize: 14 }}>
      No data yet — upload a CSV to populate this chart.
    </div>
  );
}
