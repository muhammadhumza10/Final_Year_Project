import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import {
  Grid,
  TextField,
  FormControl,
  Button,
  Card,
  CardHeader,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { useState, useEffect, useCallback } from "react";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import UploadMultiFile from "../../src/components/upload/UploadMultiFile";
import LoadingButton from "@mui/lab/LoadingButton";
import RHFEditor from "../../src/components/hook-form/RHFEditor";
import Editor from "../../src/components/editor/Editor";
import Head from "next/head";
import { COMPANY_NAME } from "../../src/config-global";

const AddProduct = ({ user }) => {
  const router = useRouter();
  const [preview, setPreview] = useState(true);
  const [productname, setProductname] = useState("");
  const [color, setColor] = useState("");
  const [quality, setQuality] = useState("");
  const [deliverytime, setDeliverytime] = useState();
  const [price, setPrice] = useState();
  const [moq, setMoq] = useState();
  const [description, setDescription] = useState();
  const [fabrictype, setFabrictype] = useState("");
  const sellerid = user._id;
  const selleremail = user.email;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("sellertoken")) {
      router.push("/login");
    }
  }, []);
  const handleChange = (e) => {
    if (e.target.name == "productname") {
      setProductname(e.target.value);
    } else if (e.target.name == "color") {
      setColor(e.target.value);
    } else if (e.target.name == "quality") {
      setQuality(e.target.value);
    } else if (e.target.name == "deliverytime") {
      setDeliverytime(e.target.value);
    } else if (e.target.name == "price") {
      setPrice(e.target.value);
    } else if (e.target.name == "fabrictype") {
      setFabrictype(e.target.value);
    } else if (e.target.name == "moq") {
      setMoq(e.target.value);
    } else if (e.target.name == "description") {
      setDescription(e.target.value);
    }
  };
  const handleCancel = () => {
    setProductname("");
    setFabrictype("");
    setColor("");
    setQuality("");
    setDeliverytime("");
    setPrice("");
    setMoq("");
    setDescription("");
    setImages([]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      sellerid,
      selleremail,
      productname:productname.charAt(0).toUpperCase()+productname.slice(1),
      fabrictype,
      color:color.charAt(0).toUpperCase()+color.slice(1),
      quality,
      deliverytime:deliverytime + " Days",
      price,
      moq,
      description,
      images,
    };
    if(!(description == "<p><br></p>" ||
    description == "<h1><br></h1>" ||
    description == "<h2><br></h2>" ||
    description == "<h3><br></h3>" ||
    description == "<h4><br></h4>" ||
    description == "<h5><br></h5>" ||
    description == "<h6><br></h6>" ||
    description == "<h6><br></h6>" ||
    description == "<ol><li><br></li></ol>" ||
    description == "<ul><li><br></li></ul>" ) && description){
      
      if(images.length>0){

        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproduct`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data, { token: localStorage.getItem("token") }),
        });
        let response = await res.json();
        if (response.success == "success") {
          setProductname("");
          setFabrictype("");
          setColor("");
          setQuality("");
          setDeliverytime("");
          setPrice("");
          setMoq("");
          setDescription("");
          setImages([]);
          toast.success("Your Product Has Been Added");
          setTimeout(() => {
            setLoading(false);
            router.push("/seller/addproduct");
          }, 2000);
        } else {
          setLoading(false);
          toast.error(response.error);
        }
      }
      else{
        setLoading(false)
      toast.error("Please add atleast 1 product image")
      }
    }
    else{
      setLoading(false)
      toast.error("Please Write Description")
    }
  };

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prevState) => [...prevState, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    },
    [images]
  );
  const handleRemoveAll = () => {
    setImages([]);
    setProductimages([]);
  };

  const handleRemove = (file) => {
    const filteredItems = images.filter((_file) => _file !== file);
    setImages(filteredItems);
  };


  const headName=`Add Product | ${COMPANY_NAME}`

  return (
    <>
    <Head>
      <title>{headName}</title>
    </Head>
      

      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Add a Product" className="text-lg">
            <form onSubmit={handleSubmit} method="POST">
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="productname"
                      name="productname"
                      value={productname ? productname : ""}
                      onChange={handleChange}
                      fullWidth
                      label="Product Name"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel id="selectingfabrictype">
                        Fabric Type
                      </InputLabel>
                      <Select
                        required
                        label="Fabric Type"
                        defaultValue=""
                        id="type"
                        name="fabrictype"
                        onChange={handleChange}
                        labelId="selectingfabrictype"
                        value={fabrictype}
                      >
                        <MenuItem value="Cotton">Cotton</MenuItem>
                        <MenuItem value="Lawn">Lawn</MenuItem>
                        <MenuItem value="Polyster">Polyster</MenuItem>
                        <MenuItem value="Jersey">Jersey</MenuItem>
                        <MenuItem value="Fleece">Fleece</MenuItem>
                        <MenuItem value="Chiffon">Chiffon</MenuItem>
                        <MenuItem value="Denim">Denim</MenuItem>
                        <MenuItem value="Wash n Wear">Wash n Wear</MenuItem>
                        <MenuItem value="Jacquard">Jacquard</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="color"
                      name="color"
                      value={color ? color : ""}
                      onChange={handleChange}
                      fullWidth
                      label="Color"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel id="selectingquality">Quality</InputLabel>
                      <Select
                        required
                        label="Quality"
                        defaultValue=""
                        id="quality"
                        name="quality"
                        onChange={handleChange}
                        labelId="selectingquality"
                        value={quality}
                      >
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="D">D</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="deliverytime"
                      name="deliverytime"
                      value={deliverytime ? deliverytime : ""}
                      onChange={handleChange}
                      fullWidth
                      label="Delivery Time"
                      placeholder=""
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Days</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="price"
                      name="price"
                      value={price ? price : ""}
                      onChange={handleChange}
                      fullWidth
                      label="Price"
                      placeholder=""
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Rs</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                      <InputLabel id="selectingpaymentterms">
                        Payment Terms
                      </InputLabel>
                      <Select
                        required
                        label="Payment Terms"
                        defaultValue=""
                        id="paymentterms"
                        name="paymentterms"
                        onChange={handleChange}
                        labelId="selectingpaymentterms"
                        value={paymentterms}
                      >
                        <MenuItem value="Cash on Delivery">
                          Cash on Delivery
                        </MenuItem>
                        <MenuItem value="Advance Payment">
                          Advance Payment
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      type="number"
                      id="moq"
                      name="moq"
                      value={moq ? moq : ""}
                      onChange={handleChange}
                      fullWidth
                      label="Minimum Order Quantity"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}></Grid>
                  {/* <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="description"
                      name="description"
                      value={description ? description : ""}
                      onChange={handleChange}
                      fullWidth
                      label="Description"
                      multiline
                      rows={4}
                    />
                  </Grid> */}

                  <Grid item xs={12} sm={12}>
                    <Editor
                    required
                  simple
                  name="description"
                  id="simple-editor"
                  value={description}
                  onChange={(value) => setDescription(value)}
                />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Card sx={{ m: 0, mb: 2 }}>
                      <CardHeader title="Upload Images" />

                      <UploadMultiFile
                        name="images"
                        showPreview={preview}
                        files={images}
                        onDrop={handleDropMultiFile}
                        onRemove={handleRemove}
                        onRemoveAll={handleRemoveAll}
                      />
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider sx={{ margin: 0 }} />
              <CardActions sx={{ mt: 2, ml: 1 }}>
                <LoadingButton
                  type="submit"
                  size="large"
                  loading={loading}
                  loadingPosition="center"
                  variant="contained"
                  sx={{ mr: 2 }}
                >
                  Add Product
                </LoadingButton>
                <Button
                  size="large"
                  color="error"
                  variant="outlined"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </CardActions>
            </form>
          </BaseCard>
        </Grid>
      </Grid>
    </>
  );
};

export default AddProduct;
