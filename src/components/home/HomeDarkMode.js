import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Container, Typography, Stack, IconButton } from '@mui/material';
// components
import SvgColor from '../../components/svg-color';
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundImage: `url('/assets/background/overlay_4.jpg')`,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(20, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeDarkMode() {

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <m.div variants={varFade().inUp}>
          <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
            Manufacturers
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Stack spacing={2} direction="row" alignItems="center" display="inline-flex">
            <Typography variant="h2" sx={{ my: 3, color: 'common.white',fontSize:{lg:"3rem",md:"2.75rem",sm:"2.5rem",xs:"2rem"} }}>
              For Fabric Manufacturers
            </Typography>

            
          </Stack>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography sx={{ color: 'grey.500', }}>
            Fabrico enables the manufacturers to sell their products to a large number of different fabric selling shops in different cities of Pakistan. This way manufacturers can increase their business and can sell more quantity in short span of time.
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Image
            alt="darkmode"
            src="/assets/images/home/forseller.png"
            sx={{
              borderRadius: 12,
              my: { xs: 5, md: 10 },
              boxShadow: (theme) => `-40px 40px 80px ${alpha(theme.palette.common.black, 0.24)}`,
            }}
          />
        </m.div>
      </Container>
    </StyledRoot>
  );
}
