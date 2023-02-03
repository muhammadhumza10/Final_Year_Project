import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/about/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    bottom: 80,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <TextAnimate
            text="Who"
            sx={{
              color: 'primary.main',
              fontSize:{lg:"4rem",md:"3.625rem",sm:"3.25rem",xs:"2.5rem"}
            }}
            variants={varFade().inRight}
          />

          <br />

          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white', }}>
            <TextAnimate text="we" sx={{fontSize:{lg:"4rem",md:"3.625rem",sm:"3.25rem",xs:"2.5rem"}}} />
            <TextAnimate text="are?" sx={{fontSize:{lg:"4rem",md:"3.625rem",sm:"3.25rem",xs:"2.5rem"}}} />
          </Stack>

          <m.div variants={varFade().inRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.white',
                fontWeight: 'fontWeightMedium',
                fontSize:{lg:"1.5rem",md:"1.5rem",sm:"1.25rem",xs:"1.25rem"}
              }}
            >
              Let&apos;s work together and
              <br /> make awesome business easily
            </Typography>
          </m.div>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
