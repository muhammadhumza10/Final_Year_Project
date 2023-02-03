import PropTypes from 'prop-types';
import dynamic from 'next/dynamic'
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
// components
import Label from '../label';
import Image from '../image';
import Scrollbar from '../Scrollbar';
import { useEffect, useState } from 'react';
//
const InvoiceToolbar =dynamic(()=>import('./InvoiceToolbar'),{
  ssr:false
}) ;

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderBottom:'none'
  },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoiceDetails({ invoice,seller,order,user }) {
  
  const [refreshToken, setRefreshToken] = useState(Math.random())
  const [invoicestatus, setInvoicestatus] = useState(order.invoicestatus)

  const handlePay = async () => {

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateinvoicestatus`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({orderid:order._id}),
    });
    let response = await res.json();
    if(response.success){
      setRefreshToken(Math.random())
      setInvoicestatus("Paid")
    }
  };
  useEffect(() => {
  
   
  }, [refreshToken,invoicestatus])
  

  return (
    <>
      <InvoiceToolbar seller={seller} order={order} user={user} handlePay={handlePay} invoicestatus={invoicestatus}/>

      <div style={{padding:'2.5rem'}}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image disabledEffect alt="logo" src="/assets/logos/2.png" sx={{ maxWidth: 120 }} />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant="soft"
                color={
                  (invoicestatus === 'Paid' && 'success') ||
                  (invoicestatus === 'Unpaid' && 'error') ||
                  'default'
                }
                sx={{  mb: 2,p:2 }}
              >
                <Typography variant='h3'>{invoicestatus}</Typography>
              </Label>

              <Typography variant="h5">INV-{order._id}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice from
            </Typography>

            <Typography variant="body2">{seller.fullname}</Typography>

            <Typography variant="body2">{seller.businessaddress}</Typography>

            <Typography variant="body2">Phone: {seller.contact}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice to
            </Typography>

            <Typography variant="body2">{order.firstname} {order.lastname}</Typography>

            <Typography variant="body2">{order.businessaddress}</Typography>

            <Typography variant="body2">Phone: {order.contact}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Bank Details
            </Typography>

            <Typography variant="body2">Title: Fabrico</Typography>

            <Typography variant="body2">Account Number: 3264586256</Typography>

            <Typography variant="body2">IBAN: PK763497593447597349</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              date create
            </Typography>

            <Typography variant="body2">{fDate(order.createdAt)}</Typography>
          </Grid>

          {/* <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Due date
            </Typography>

            <Typography variant="body2">123</Typography>
          </Grid> */}
        </Grid>

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>

                  <TableCell align="left">Description</TableCell>

                  <TableCell align="left">Qty</TableCell>

                  <TableCell align="right">Price</TableCell>

                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                
                  <TableRow
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>1</TableCell>

                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{order.product.productname}</Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {order.product.fabrictype}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="left">{order.quantity}</TableCell>

                    <TableCell align="right">{order.product.price} Rs</TableCell>

                    <TableCell align="right">{order.subTotal} Rs</TableCell>
                  </TableRow>
                

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />
                    Subtotal
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />
                    {order.subTotal} Rs
                  </TableCell>
                </StyledRowResult>

                {/* <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    Discount
                  </TableCell>

                  <TableCell
                    align="right"
                    width={120}
                    sx={{ color: 'error.main', typography: 'body1' }}
                  >
                    12
                  </TableCell>
                </StyledRowResult> */}

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    Shipping
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    {order.shipping} Rs
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'h3' }}>
                    Total
                  </TableCell>

                  <TableCell align="right" width={140} sx={{ typography: 'h3' }}>
                    {order.total} Rs
                  </TableCell>
                </StyledRowResult>
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">NOTES</Typography>

            <Typography variant="body2">
              We appreciate your business. Feel free to contact us for ay help!
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">Have a Question?</Typography>

            <Typography variant="body2">support@fabrico.com</Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
