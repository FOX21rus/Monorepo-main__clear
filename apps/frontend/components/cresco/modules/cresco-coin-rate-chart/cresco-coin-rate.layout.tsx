import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CrescoTokenRate,
  CrescoTokenRatesPeriod,
} from "../../../../data/graphql/sdk/graphql";
import moment from "moment";

const CrescoCoinRateLayout = ({
  rates,
  period,
}: {
  rates: CrescoTokenRate[];
  period: CrescoTokenRatesPeriod;
}) => {
  const dateFmt =
    period === CrescoTokenRatesPeriod.Day
      ? "HH:00"
      : period === CrescoTokenRatesPeriod.Week
      ? "DD MMM"
      : "DD MMM YYYY";
  const data =
    rates
      ?.map((r) => ({
        rate: r.rateUSDT,
        name: moment(r.ts).format(dateFmt),
        ts: r.ts,
      }))
      .sort((r1, r2) =>
        new Date(r1.ts).valueOf() < new Date(r2.ts).valueOf() ? -1 : 1
      ) ?? [];

  return (
    <div>
      <p className={"mt-3 mb-7  text-xl font-bold"}>Cresco Token Rate (USDT)</p>
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "500px",
          overflowX: "auto",
        }}
        // className={"-ml-14"}
      >
        <ResponsiveContainer width="100%" height={500} minWidth={800}>
          <AreaChart
            width={500}
            height={500}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="25%" stopColor="#7C9945" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={6} dx={40} />
            <YAxis domain={["auto", "auto"]} width={100} />
            <Tooltip
              labelFormatter={(value) => {
                console.log("value in labelFormatter", value);

                return moment(value, dateFmt).format("DD MMM YYYY HH:mm");
              }}
              formatter={(value) => {
                return [`${parseFloat(value as any).toFixed(2)} USDT`];
              }}
            />
            <Area
              type="linear"
              dataKey="rate"
              stroke="#7C9945"
              strokeWidth={3}
              fill="url(#areaGradient)"
              // fill="#7C9945"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CrescoCoinRateLayout;
