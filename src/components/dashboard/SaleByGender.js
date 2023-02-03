import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Card, CardHeader, Typography } from '@mui/material';
// utils
import { fNumber,fShortenNumber } from '../../utils/formatNumber';
// components
import Chart, { useChart } from '../chart';
import BaseCard from '../baseCard/BaseCard';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

const StyledChart = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

SaleByGender.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  subheader: PropTypes.string,
};

export default function SaleByGender({ title, subheader, total, chart, ...other }) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartColors = colors || [
    [theme.palette.primary.light, theme.palette.primary.main],
    [theme.palette.warning.light, theme.palette.warning.main],
  ];

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    labels: series.map((i) => i.label),
    legend: {
      floating: true,
      horizontalAlign: 'center',
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: chartColors.map((colr) => [
          { offset: 0, color: colr[0] },
          { offset: 100, color: colr[1] },
        ]),
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16 },
          total: {
            formatter: () => fShortenNumber(total),
          },
        },
      },
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
    ...options,
  });

  return (
    <BaseCard title={title}>

{chartSeries.length==0?
      <div className='flex justify-center items-center' style={{height:'380px'}}>

        <Typography variant='h1' color='textSecondary' sx={{fontWeight:600,fontSize:'2.5rem',textAlign:'center' }}>No Data Available</Typography>
      </div>
       :
       <StyledChart dir="ltr">
       <Chart type="radialBar" series={chartSeries} options={chartOptions} height={300} />
     </StyledChart>
        }

      
    </BaseCard>
  );
}
