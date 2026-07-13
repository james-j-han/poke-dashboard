import { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  AreaChart, Area,
  XAxis, YAxis, Tooltip
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#a4de6c', '#d0ed57'];

function StatsChart({ pokemon, uniqueTypes }) {
  const [rightField, setRightField] = useState('weight');

  const typeData = uniqueTypes.map((type) => ({
    name: type,
    value: pokemon.filter((p) => p.types.some((t) => t.type.name === type)).length,
  }));

  function getDistributionData(field, bucketCount = 8) {
    const values = pokemon.map((p) => p[field]);
    if (values.length === 0) return [];

    const min = Math.min(...values);
    const max = Math.max(...values);
    const bucketSize = (max - min) / bucketCount || 1;

    const buckets = Array.from({ length: bucketCount }, (_, i) => {
      const bucketMin = min + i * bucketSize;
      const bucketMax = bucketMin + bucketSize;
      return { bucketMin, bucketMax, count: 0 };
    });

    values.forEach((v) => {
      const index = Math.min(
        Math.floor((v - min) / bucketSize),
        bucketCount - 1
      );
      buckets[index].count += 1;
    });

    return buckets.map((b) => ({
      name: `${Math.round(b.bucketMin)}-${Math.round(b.bucketMax)}`,
      percentage: Math.round((b.count / values.length) * 1000) / 10,
    }));
  }

  const distributionData = getDistributionData(rightField);

  return (
    <div className="charts-container">
      <div className="chart-panel">
        <h3>Type Distribution</h3>
        <div className='chart-area'>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={typeData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {typeData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-panel">
        <div className="chart-toggle">
          <button onClick={() => setRightField('weight')} disabled={rightField === 'weight'}>
            Weight
          </button>
          <button onClick={() => setRightField('height')} disabled={rightField === 'height'}>
            Height
          </button>
        </div>
        
        <div className='chart-area'>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={distributionData}>
              <XAxis dataKey="name" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StatsChart;