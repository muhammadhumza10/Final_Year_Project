// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
// ** Icons Imports
// import Close from 'mdi-material-ui/Close'




const TabAccount = ({user}) => {

  const router = useRouter();
  // ** State
  
  const userid=user._id;
  const [firstname, setFirstname] = useState(user.firstname)
  const [lastname, setLastname] = useState(user.lastname)
  const [email, setEmail] = useState(user.email)
  const [fullname, setFullname] = useState(user.fullname)
  const [contact, setContact] = useState(user.contact)
  
  const [type, setType] = useState(user.type)
  const [businessname, setBusinessname] = useState(user.businessname)
  const [personaladdress, setPersonaladdress] = useState(user.personaladdress)
  const [businessaddress, setBusinessaddress] = useState(user.businessaddress);
  const [city, setCity] = useState(user.city);
  const [province, setProvince] = useState(user.province);
  const [postalcode, setPostalcode] = useState(user.postalcode);

  const handleChange = (e) => {
    if (e.target.name == "firstname") {
      setFirstname(e.target.value);
    } else if (e.target.name == "lastname") {
      setLastname(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    }else if (e.target.name == "fullname") {
      setFullname(e.target.value);
    } else if (e.target.name == "contact") {
      setContact(e.target.value);
    } else if (e.target.name == "type") {
      setType(e.target.value);
    } else if (e.target.name == "businessname") {
      setBusinessname(e.target.value);
    } else if (e.target.name == "personaladdress") {
      setPersonaladdress(e.target.value);
    } else if (e.target.name == "businessaddress") {
      setBusinessaddress(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "province") {
      setProvince(e.target.value);
    } else if (e.target.name == "postalcode") {
      setPostalcode(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      userid,
      firstname,
      lastname,
      fullname,
      email,
      contact,
      
      type,
      businessname,
      personaladdress,
      businessaddress,
      city,
      province,
      postalcode,
    };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    let response = await res.json();
    
    if (response.success) {
      toast.success("Your account has been updated!");
      setTimeout(() => {
        if(user.type=='buyer'){

          router.push("/buyer/profile");
        }
        else if(user.type=='seller'){
          router.push("/seller/profile");
        }
      }, 2000);
      
    } else {
      toast.error("Something Went Wrong! Please try again");
    }
  };

  return (
    <>
    
    <CardContent sx={{ marginTop: 4.8 }}>
      <form onSubmit={handleSubmit}
            
            method="POST">
        <Grid container spacing={7} >
          {/* <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid> */}

          <Grid item xs={12} sm={6} >
            <TextField fullWidth label='First Name' name="firstname" value={firstname} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Last Name' name="lastname" value={lastname} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Full Name' name="fullname" value={fullname} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            disabled
              fullWidth
              type='email'
              label='Email'
              value={email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Contact No' name="contact" value={contact} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Type</FormLabel>
              <RadioGroup row defaultValue={type} aria-label='gender' name='account-settings-info-radio'  >
                <FormControlLabel disabled value='seller' label='Seller' control={<Radio />} style={{cursor:"not-allowed"}}/>
                <FormControlLabel disabled value='buyer' label='Buyer' control={<Radio />} style={{cursor:"not-allowed"}}/>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField fullWidth label='Personal Address' name="personaladdress" value={personaladdress} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField fullWidth label='Business Name' name="businessname" value={businessname} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField fullWidth label='Business Address' name="businessaddress" value={businessaddress} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField fullWidth label='City' name="city" value={city} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField fullWidth label='Province' name="province" value={province} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField fullWidth label='Postal Code' name="postalcode" value={postalcode} onChange={handleChange}/>
          </Grid>

          

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
    </>
  )
}

export default TabAccount
