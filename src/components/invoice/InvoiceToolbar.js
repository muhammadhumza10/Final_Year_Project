import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
// next
import { useRouter } from "next/router";
// @mui
import {
  Box,
  Stack,
  Button,
  Dialog,
  Tooltip,
  IconButton,
  DialogActions,
  CircularProgress,
} from "@mui/material";
// routes
// components
import Iconify from "../Iconify";
//
import InvoicePDF from "./InvoicePDF";

// ----------------------------------------------------------------------

InvoiceToolbar.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoiceToolbar({ order, seller, user,handlePay,invoicestatus }) {
  const { push } = useRouter();

  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ sm: "center" }}
        sx={{ mb: 5, px: "2.5rem" }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="View">
            <IconButton onClick={handleOpen}>
              <Iconify icon="eva:eye-fill" />
            </IconButton>
          </Tooltip>
          <PDFDownloadLink
            document={<InvoicePDF seller={seller} order={order} />}
            fileName={`INV-${order._id}`}
            style={{ textDecoration: "none" }}
          >
            {({ loading }) => (
              <Tooltip title="Download">
                <IconButton>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Iconify icon="eva:download-fill" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>
        </Stack>

        {user.type == "seller" && (
          <Button
            disabled={invoicestatus == "Unpaid" ? false : true}
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="eva:checkmark-fill" />}
            sx={{ alignSelf: "flex-end" }}
            onClick={handlePay}
          >
            Mark as Paid
          </Button>
        )}
      </Stack>
      <Dialog fullScreen open={open}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: "12px !important",
              boxShadow: (theme) => theme.shadows,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={handleClose}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: "100%", overflow: "hidden" }}>
            <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
              <InvoicePDF seller={seller} order={order} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
