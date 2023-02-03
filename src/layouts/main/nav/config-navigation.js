// routes
// import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../../routes/paths';
// // config
// import { PATH_AFTER_LOGIN } from '../../../config-global';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'About Us',
    icon: <Iconify icon="ic:round-grain" />,
    path: "/about-us",
  },
  {
    title: 'Contact Us',
    path: "/contact-us",
    icon: <Iconify icon="eva:file-fill" />,
    
  },
  
];

export default navConfig;
