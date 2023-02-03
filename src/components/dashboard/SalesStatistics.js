// import PropTypes from 'prop-types';
// import { useState } from 'react';
// // @mui
// import { Card, CardHeader, Box, Typography } from '@mui/material';
// // components
// import { CustomSmallSelect } from '../custom-input';
// import Chart, { useChart } from '../../components/chart';
// import BaseCard from '../baseCard/BaseCard';

// // ----------------------------------------------------------------------

// SalesStatistics.propTypes = {
//   chart: PropTypes.object,
//   title: PropTypes.string,
//   subheader: PropTypes.string,
// };

// export default function SalesStatistics({ title, subheader, chart, ...other }) {
//   const { categories, colors, series, options } = chart;

//   const [seriesData, setSeriesData] = useState('Year');

//   const chartOptions = useChart({
//     colors,
//     stroke: {
//       show: true,
//       width: 2,
//       colors: ['transparent'],
//     },
//     legend: {
//       show: false,
//     },
//     xaxis: {
//       categories,
//     },
//     tooltip: {
//       y: {
//         formatter: (value) => `${value} Rs`,
//       },
//     },
//     ...options,
//   });

//   return (
//     <BaseCard title={title}>
//       {/* <CardHeader
//         title={title}
//         subheader={subheader}
//         // action={
//         //   <CustomSmallSelect
//         //     value={seriesData}
//         //     onChange={(event) => setSeriesData(event.target.value)}
//         //   >
//         //     {series.map((option) => (
//         //       <option key={option.type} value={option.type}>
//         //         {option.type}
//         //       </option>
//         //     ))}
//         //   </CustomSmallSelect>
//         // }
//       /> */}

//       {series[0].data[0].data.length==0?
//       <div className='flex justify-center items-center' style={{height:'430px'}}>

//         <Typography variant='h1' color='textSecondary' sx={{fontWeight:600,fontSize:'2.5rem',textAlign:'center' }}>No Data Available</Typography>
//       </div>
//        :
//         <>
        
//         {series.map((item) => (
//           <Box key={item.type} sx={{ mt: 3, mx: 3 }} dir="ltr">
//             {item.type === seriesData && (
//               <Chart type="bar" series={item.data} options={chartOptions} height={400} />
//             )}
//           </Box>
//         ))}
//         </>
//         }

//     </BaseCard>
//   );
// }


import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box, Typography } from '@mui/material';
// components
import { CustomSmallSelect } from '../custom-input';
import Chart, { useChart } from '../../components/chart';
import BaseCard from '../baseCard/BaseCard';
import { fShortenNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

SalesStatistics.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function SalesStatistics({ title, subheader, chart, ...other }) {
  const { categories, colors, series, options } = chart;

  const [seriesData, setSeriesData] = useState('Year');

  const chartOptions = useChart({
    colors,
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    xaxis: {
      categories,
    },
        tooltip: {
      y: {
        formatter: (value) => `${fShortenNumber(value)}`,
      },
    },
    ...options,
  });

  return (
    <BaseCard title={title} subtitle="Current Year">
            {series[0].data[0].data.length==0?
       <div className='flex justify-center items-center' style={{height:'430px'}}>

         <Typography variant='h1' color='textSecondary' sx={{fontWeight:600,fontSize:'2.5rem',textAlign:'center' }}>No Data Available</Typography>
       </div>
        :
         <>
         
         {series.map((item) => (
           <Box key={item.type} sx={{ mt: 3, mx: 3 }} dir="ltr">
             {item.type === seriesData && (
               <Chart type="area" series={item.data} options={chartOptions} height={400} />
             )}
           </Box>
         ))}
         </>
         
         }
      

    </BaseCard>
  );
}

