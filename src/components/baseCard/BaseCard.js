import React from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";

const BaseCard = (props) => {
  return (
    <Card>
      <Box p={2} display="flex" alignItems="start" sx={{flexDirection:"column"}}>
        <Typography variant="h2" sx={{ fontWeight: 600 }}>
          {props.title} <span style={{ fontWeight: "600" }}>{props.name}</span>
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{fontWeight:500}}>{props.subtitle}</Typography>

      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
