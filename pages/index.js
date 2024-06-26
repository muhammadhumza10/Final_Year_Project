import { m, useScroll, useSpring } from 'framer-motion';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// layouts
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeForDesigner,
  // HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
} from '../src/components/home';
import { COMPANY_NAME } from '../src/config-global';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  return (
    <>
      <Head>
        <title>{COMPANY_NAME}</title>
      </Head>
      {progress}



      <HomeHero />
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',

        }}
      >
        
        <HomeMinimal />

        <HomeHugePackElements />

        <HomeForDesigner />

        <HomeDarkMode />

        {/* <HomeColorPresets /> */}

        <HomeCleanInterfaces />

        {/* <HomePricingPlans /> */}

        {/* <HomeLookingFor /> */}

        <HomeAdvertisement />
      </Box>
    </>
  );
}
