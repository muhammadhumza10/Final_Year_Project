import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography, Grid } from '@mui/material';
//
import { TextAnimate, MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Karachi',
    address: 'Block A, North Nazimabad.',
    phoneNumber: '0315-2222222',
  },
  {
    country: 'Lahore',
    address: 'Block A, North Nazimabad.',
    phoneNumber: '0315-2222222',
  },
  
];

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/contact/hero.jpg)',
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

export default function ContactHero() {
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <TextAnimate text="Where" sx={{ color: 'primary.main',fontSize:{lg:"4rem",md:"3.625rem",sm:"3.25rem",xs:"2.5rem"} }} variants={varFade().inRight} />
          <br />

          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate text="to" sx={{fontSize:{lg:"4rem",md:"3.625rem",sm:"3.25rem",xs:"2.5rem"}}}/>
            <TextAnimate text="find" sx={{fontSize:{lg:"4rem",md:"3.625rem",sm:"3.25rem",xs:"2.5rem"}}}/>
            <TextAnimate text="us?" sx={{fontSize:{lg:"4rem",md:"3.625rem",sm:"3.25rem",xs:"2.5rem"}}}/>
          </Stack>

          <Grid container spacing={5} sx={{ mt: 5, color: 'common.white' }}>
            {CONTACTS.map((contact) => (
              <Grid
                key={contact.country}
                item
                xs={12}
                sm={6}
                md={5}
                lg={5}
                sx={{
                  pr: {
                    md: 5,
                  },
                }}
              >
                <m.div variants={varFade().in}>
                  <Typography variant="h6" paragraph sx={{fontSize:"1.125rem",fontWeight:700}}>
                    {contact.country}
                  </Typography>
                </m.div>

                <m.div variants={varFade().inRight}>
                  <Typography variant="body2">
                    {contact.address}
                    <br /> {contact.phoneNumber}
                  </Typography>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
