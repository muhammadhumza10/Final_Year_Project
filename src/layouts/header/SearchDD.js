// import React, { useState } from "react";
// import FeatherIcon from "feather-icons-react";
// import { IconButton, Input, Box, Drawer } from "@mui/material";

// const SearchDD = () => {
//   // drawer top
//   const [showDrawer2, setShowDrawer2] = useState(false);

//   const handleDrawerClose2 = () => {
//     setShowDrawer2(false);
//   };
//   return (
//     <>
//       <IconButton
//         aria-label="show 4 new mails"
//         color="inherit"
//         aria-controls="search-menu"
//         aria-haspopup="true"
//         onClick={() => setShowDrawer2(true)}
//         size="large"
//       >
//         <FeatherIcon icon="search" width="20" height="20" />
//       </IconButton>
//       <Drawer
//         anchor="top"
//         open={showDrawer2}
//         onClose={() => setShowDrawer2(false)}
//         sx={{
//           "& .MuiDrawer-paper": {
//             padding: "15px 30px",
//           },
//         }}
//       >
//         <Box display="flex" alignItems="center">
//           <Input placeholder="Search here" aria-label="description" fullWidth />
//           <Box
//             sx={{
//               ml: "auto",
//             }}
//           >
//             <IconButton
//               color="inherit"
//               sx={{
//                 color: (theme) => theme.palette.grey.A200,
//               }}
//               onClick={handleDrawerClose2}
//             >
//               <FeatherIcon icon="x-circle" />
//             </IconButton>
//           </Box>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default SearchDD;
import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import {
  IconButton,
  Input,
  Box,
  Drawer,
  TextField,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/router";


const SearchDD = () => {
  const router=useRouter()
  const {searchquery}=router.query
  const [search, setSearch] = useState(searchquery||"")
  const handleChange=(e)=>{
    if (e.target.name == "search") {
      setSearch(e.target.value);
    }
  }
  const handleClear=()=>{
    setSearch("")
  }

  const handleSearch=(e)=>{
    e.preventDefault();
    router.push(`/buyer/results?searchquery=${search}`)
  }

  return (
    <form className="w-full" onSubmit={handleSearch}>
    <div className="flex items-center w-full">

      <TextField
        size="small"
        className="bg-white"
        fullWidth
        name="search"
        value={search}
        placeholder="Search Products"
        onChange={handleChange}
        
      />
      {search.length>0 && (<IconButton sx={{ml:-5}} onClick={handleClear} >
        <ClearIcon fontSize="small" />
      </IconButton>)}
      <IconButton  type="submit">
        <SearchIcon fontSize="medium" />
      </IconButton>
    </div>
    </form>
  );
};

export default SearchDD;
