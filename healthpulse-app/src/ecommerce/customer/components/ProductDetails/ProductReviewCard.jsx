import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white "
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              M
            </Avatar>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Mosatofa</p>
              <p className="opacity-70 ">July 30 , 2024</p>
            </div>
          </div>

          <Rating value={4.5} name="half-rating" readOnly precision={.1} />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
