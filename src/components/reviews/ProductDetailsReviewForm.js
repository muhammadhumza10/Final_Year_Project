import PropTypes from "prop-types";
import * as Yup from "yup";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { styled } from "@mui/material/styles";
import {
  Button,
  Stack,
  Rating,
  Typography,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { FormProvider, RHFTextField } from "../hook-form";
import { Router, useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 4,
  backgroundColor: "#fafbfb",
}));

// ----------------------------------------------------------------------

ProductDetailsReviewForm.propTypes = {
  onClose: PropTypes.func,
  id: PropTypes.string
};

export default function ProductDetailsReviewForm({
  order,
  user,
  onClose,
  id,
  ...other
}) {
  const ReviewSchema = Yup.object().shape({
    rating: Yup.mixed().required("Rating is required"),
    review: Yup.string().required("Review is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const defaultValues = {
    rating: null,
    review: "",
    name: `${user.fullname}`,
    email: `${user.email}`,
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const router=useRouter()

  const onSubmit = async (data, e) => {
    e.preventDefault;
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/postproductrating`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, order }),
    });
    let res = await a.json();
    if(res.success=="success"){
      toast.success("Your Review Has Been Submitted");
      setTimeout(() => {
        router.push(`/buyer/allorders/orderdetails/${router.query._id}`)
        onClose()
      }, 2000);
    } else {
      setLoading(false)
      toast.error(response.error);
    }
      
    
  };

  const onCancel = () => {
    onClose();
    reset();
  };

  return (
    <RootStyle {...other} id={id}>
      
      <Typography className="" variant="subtitle1" gutterBottom>
        Add Review
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <div>
            <Stack
              direction="row"
              flexWrap="wrap"
              alignItems="center"
              spacing={1.5}
            >
              <Typography variant="body2">
                Your review about this product:
              </Typography>

              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating {...field} value={Number(field.value)} />
                )}
              />
            </Stack>
            {!!errors.rating && (
              <FormHelperText error> {errors.rating?.message}</FormHelperText>
            )}
          </div>

          <RHFTextField name="review" label="Review *" multiline rows={3} />

          <RHFTextField name="name" label="Name *" />

          <RHFTextField name="email" label="Email *" disabled />

          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            <Button color="inherit" variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Post review
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}
