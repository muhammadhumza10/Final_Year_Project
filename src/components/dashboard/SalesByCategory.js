import PropTypes from "prop-types";
// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader, Typography } from "@mui/material";
// utils
import { fNumber, fShortenNumber } from "../../utils/formatNumber";
// components
import Chart, { useChart } from "../chart";
import BaseCard from "../baseCard/BaseCard";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

const StyledChart = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": {
    height: CHART_HEIGHT,
  },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

SalesByCategory.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function SalesByCategory({
  title,
  subheader,
  chart,
  ...other
}) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      horizontalAlign: "center",
      itemMargin: { horizontal: 8,vertical:10 },
    },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
    },
    tooltip: {
      fillSeriesColor: true,
      y: {
        formatter: (value) => fShortenNumber(value),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
    ...options,
  });

  return (
    <BaseCard title={title}>
      {chartSeries.length == 0 ? (
        <div
          className="flex justify-center items-center"
          style={{ height: "200px" }}
        >
          <Typography
            variant="h1"
            color="textSecondary"
            sx={{ fontWeight: 600, fontSize: "2.5rem", textAlign: "center" }}
          >
            No Data Available
          </Typography>
        </div>
      ) : (
        <StyledChart dir="ltr">
          <Chart
            type="pie"
            series={chartSeries}
            options={chartOptions}
            height={280}
          />
        </StyledChart>
      )}
    </BaseCard>
  );
}
