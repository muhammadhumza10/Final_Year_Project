import {
  Button,
  CircularProgress,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import { RadioGroup } from "@headlessui/react";

export default function ProductsView({ page, limitPerPage,setCount }) {
  const router = useRouter();
  const { fabric_type, qual, sort_by } = router.query;

  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openFilterBar, setOpenFilterBar] = useState(false);
  const [fabrictype, setFabrictype] = useState(
    router.query.fabrictype ? router.query.fabrictype : ""
  );
  const [quality, setQuality] = useState(
    router.query.quality ? router.query.quality : ""
  );
  const [sortby, setSortby] = useState("");

  const getProducts = async (page) => {
    let a = await fetch(`/api/getallproducts`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page, limitPerPage, fabric_type, qual, sort_by }),
    });
    let res = await a.json();
    setProducts(res.products);
    setCount(res.productscount)
    setIsLoading(true);
  };
  useEffect(() => {
    if (!localStorage.getItem("buyertoken")) {
      router.push("/login");
    }
    getProducts(page);
  }, [page, router.query]);

  const handleToggleFilterBar = () => {
    setOpenFilterBar(!openFilterBar);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const clearfilters = () => {
    setFabrictype("");
    setQuality("");
    setSortby("");
    router.push(`/buyer/products`);
  };

  const handleChange = (e) => {
    if (e.target.name == "fabrictype") {
      setFabrictype(e.target.value);
    }
    if (e.target.name == "quality") {
      setQuality(e.target.value);
    }
  };

  const applysearch = () => {
    if (fabrictype) {
      if (quality) {
        if (sortby) {
          router.push(
            `/buyer/products?fabric_type=${fabrictype}&qual=${quality}&sort_by=${sortby}`
          );
        } else {
          router.push(
            `/buyer/products?fabric_type=${fabrictype}&qual=${quality}`
          );
        }
      } else if (sortby) {
        router.push(
          `/buyer/products?fabric_type=${fabrictype}&sort_by=${sortby}`
        );
      } else {
        router.push(`/buyer/products?fabric_type=${fabrictype}`);
      }
    } else if (quality) {
      if (sortby) {
        router.push(`/buyer/products?qual=${quality}&sort_by=${sortby}`);
      } else {
        router.push(`/buyer/products?qual=${quality}`);
      }
    } else if (sortby) {
      router.push(`/buyer/products?sort_by=${sortby}`);
    }
  };

  return (
    <>
      {isLoading == true ? (
        <>
          <div className="flex justify-end mb-5 -mt-10">
            <Tooltip title="Show Filters">
            <Button size="large" color="inherit" onClick={handleToggleFilterBar} endIcon={<FilterListIcon />}>
            Filters
          </Button>
            </Tooltip>
          </div>
          <Drawer
            anchor="right"
            open={openFilterBar}
            variant="temporary"
            onClose={() => setOpenFilterBar(false)}
            PaperProps={{
              sx: {
                width: "280px",
                border: "0 !important",
                boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
              },
            }}
          >
            <div className=" px-4 h-20 flex items-center justify-between">
              <div className="">
                <Typography
                  variant="h2"
                  color="textSecondary"
                  sx={{ fontWeight: 600,}}
                >
                  Filters
                </Typography>
              </div>
              <div className="">
                <IconButton  onClick={handleToggleFilterBar}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
            <div className="px-4 mt-10">
              <div className="mt-4 flex flex-col">
                <Grid container rowSpacing={5}>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="selectingfabrictype" size="small">
                        Fabric Type
                      </InputLabel>
                      <Select
                        required
                        label="Fabric Type"
                        defaultValue=""
                        id="type"
                        name="fabrictype"
                        labelId="selectingfabrictype"
                        size="small"
                        value={fabrictype}
                        onChange={handleChange}
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
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="selectingfabrictype" size="small">
                        Quality
                      </InputLabel>
                      <Select
                        required
                        label="Quality"
                        defaultValue=""
                        id="quality"
                        name="quality"
                        labelId="quality"
                        size="small"
                        value={quality}
                        onChange={handleChange}
                      >
                        {/* <MenuItem value="Ap">A+</MenuItem> */}
                        <MenuItem value="A">A</MenuItem>
                        {/* <MenuItem value="A-">A-</MenuItem> */}
                        {/* <MenuItem value="Bp">B+</MenuItem> */}
                        <MenuItem value="B">B</MenuItem>
                        {/* <MenuItem value="B-">B-</MenuItem> */}
                        {/* <MenuItem value="Cp">C+</MenuItem> */}
                        <MenuItem value="C">C</MenuItem>
                        {/* <MenuItem value="C-">C-</MenuItem> */}
                        {/* <MenuItem value="Dp">D+</MenuItem> */}
                        <MenuItem value="D">D</MenuItem>
                        {/* <MenuItem value="D-">D-</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <div className="flex-col h-full flex">
                      <div className="text-start mb-5">
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                          Sort By :
                        </Typography>
                      </div>

                      <div className="">
                        <RadioGroup
                          value={sortby}
                          onChange={setSortby}
                          className=""
                        >
                          <div className="flex flex-col gap-4">
                            <RadioGroup.Option
                              value="hightolow"
                              className={({ active, checked }) =>
                                classNames(
                                  true
                                    ? "cursor-pointer focus:outline-none"
                                    : "opacity-25 cursor-not-allowed",
                                  active
                                    ? "ring-2 ring-offset-2 ring-indigo-500"
                                    : "",
                                  checked
                                    ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                  "border rounded-md px-2  flex items-center justify-center h-10 font-medium uppercase "
                                )
                              }
                            >
                              <RadioGroup.Label
                                as="p"
                                style={{ fontSize: "0.7rem" }}
                              >
                                Price : High To Low
                              </RadioGroup.Label>
                            </RadioGroup.Option>

                            <RadioGroup.Option
                              value="lowtohigh"
                              className={({ active, checked }) =>
                                classNames(
                                  true
                                    ? "cursor-pointer focus:outline-none"
                                    : "opacity-25 cursor-not-allowed",
                                  active
                                    ? "ring-2 ring-offset-2 ring-indigo-500"
                                    : "",
                                  checked
                                    ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                  "border rounded-md px-2  flex items-center justify-center  h-10 font-medium uppercase "
                                )
                              }
                            >
                              <RadioGroup.Label
                                as="p"
                                style={{ fontSize: "0.7rem" }}
                              >
                                Price : Low To High
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                {fabrictype || quality || sortby ? (
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={applysearch}
                  >
                    Apply Filters
                  </Button>
                ) : (
                  <Button sx={{ mt: 2 }} disabled variant="contained">
                    Apply Filters
                  </Button>
                )}

                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  color="secondary"
                  onClick={clearfilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </Drawer>
          <Grid container spacing={4}>
            {products.length > 0 ? (
              <>
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </>
            ) : (
              <Grid item xs={12}>
                <div className="w-full flex items-center justify-center">
                  <Typography variant="h2" color="textSecondary">
                    No Results
                  </Typography>
                </div>
              </Grid>
            )}
          </Grid>
        </>
      ) : (
        <Grid container spacing={4}>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </Grid>
      )}
    </>
  );
}

function ProductCard({ product }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
      <Link key={product._id} href={`/buyer/product/${product._id}`}>
        <a className="group" style={{ textDecoration: "none", width: "100%" }}>
          <div className="w-full aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              src={product.imageUrl[0]}
              alt="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              className="w-full object-center object-cover group-hover:opacity-75"
              style={{height:"18rem"}}
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.productname}</h3>
          <h3 className="mt-1 text-sm text-gray-500">{product.color}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {product.price} Rs
          </p>
        </a>
      </Link>
    </Grid>
  );
}

function ProductSkeleton({}) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        sx={{ height: "18rem", borderRadius: "0.5rem" }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="75%"
        sx={{ fontSize: "0.875rem", lineHeight: "1.25rem", marginTop: "1rem" }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="40%"
        sx={{
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          marginTop: "0.25rem",
        }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="30%"
        sx={{
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
          marginTop: "0.25rem",
        }}
      />
    </Grid>
  );
}
