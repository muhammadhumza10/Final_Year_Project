import PropTypes from 'prop-types';
// @mui
import { Box, Card, CardHeader, Typography } from '@mui/material';
// utils
import { fNumber } from '../../utils/formatNumber';
// components
import Chart, { useChart } from '../../components/chart';
import BaseCard from '../baseCard/BaseCard';

// ----------------------------------------------------------------------

SalesByCity.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function SalesByCity({ title, subheader, chart, ...other }) {
  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '28%',
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i) => i.label),
    },
    ...options,
  });

  return (
    <BaseCard title={title}>
      {chartSeries.length == 0 ? (
        <div
          className="flex justify-center items-center"
          style={{ height: "380px" }}
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
        
      <Box sx={{ mx: 3 }} dir="ltr">
        <Chart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={380} />
      </Box>
      )}

    </BaseCard>
  );
}
