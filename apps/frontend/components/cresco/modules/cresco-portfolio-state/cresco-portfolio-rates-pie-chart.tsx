import dynamic from "next/dynamic";

import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const CrescoPortfolioRatesPieChart = ({
  data: dataW,
}: {
  data: { name; value }[];
}) => {
  const dataTake = dataW.filter((d) => d.value > dataW[0].value / 10);
  const dataEtc = dataW.filter((d) => d.value <= dataW[0].value / 10);
  const total = dataEtc.reduce((p, c) => p + c.value, 0);
  const data = [...dataTake, ...[{ value: total, name: "other" }]].map((d) => ({
    ...d,
    name: `${d.name} (${(d.value * 100).toFixed(1)}%) `,
  }));

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {data[index].name}
      </text>
    );
  };

  return (
      <div className={""}>
    <div className={"block md:hidden w-full h-64 lg:h-96 scale-50 -ml-[25vw] -mt-32"}>
      <ResponsiveContainer width="200%" height="200%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={360}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#B1C191"
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`rgba(124,153,69,${0.3+(data.length-index-1)/(data.length-1)*0.7})`} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
        <div className={"hidden md:block w-full h-64 lg:h-96 "}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                  dataKey="value"
                  startAngle={360}
                  endAngle={0}
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#B1C191"
                  label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`rgba(124,153,69,${0.3+(data.length-index-1)/(data.length-1)*0.7})`} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
};

export default CrescoPortfolioRatesPieChart;
