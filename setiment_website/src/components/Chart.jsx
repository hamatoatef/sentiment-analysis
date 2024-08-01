import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;

const data = [
  { name: "Very Bad", value: 50, color: "#d9534f" }, // Dark Red
  { name: "Bad", value: 50, color: "#f4b942" }, // Red
  { name: "Very Good", value: 50, color: "#337ab7" }, // Blue
];

const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;

const calculateNeedlePosition = (value, data, cx, cy, iR, oR) => {
  let total = data.reduce((acc, v) => acc + v.value, 0);
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle
      key="needle-circle"
      cx={x0}
      cy={y0}
      r={r}
      fill="#d0d000"
      stroke="none"
    />,
    <path
      key="needle-path"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill="#d0d000"
    />,
  ];
};

function Chart({ score, parts }) {
  const [needleValue, setNeedleValue] = useState(0);

  useEffect(() => {
    let degree;
    if (parts === "0") {
      degree = 50;
    } else if (parts === "1") {
      degree = 100;
    } else if (parts === "2") {
      degree = 150;
    } else {
      degree = 0;
    }
    // Calculate the target value
    const targetValue = Math.round(score * degree, 2);

    // Smooth transition of the needle value
    const animationFrame = () => {
      setNeedleValue((prev) => {
        if (Math.abs(prev - targetValue) < 0.1) {
          return targetValue; // Close enough to target, stop animation
        }
        const step = (targetValue - prev) * 0.1; // Adjust step for smoothness
        return prev + step;
      });
    };

    const interval = setInterval(animationFrame, 16); // ~60fps

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [score, parts]);

  return (
    <PieChart width={400} height={500}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {calculateNeedlePosition(needleValue, data, cx, cy, iR, oR)}
    </PieChart>
  );
}

export default Chart;
