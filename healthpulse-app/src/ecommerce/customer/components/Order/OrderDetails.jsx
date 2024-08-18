import React from "react";

import AddressCard from "../AddressCard/AddressCard";
import OrderTraker from "./OrderTraker";
import { Box, Grid } from "@mui/material";

import image1 from "../../../data/images/medicine/HerbalTeaTablet.webp";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20 ">
      <div className=" bg-white px-3 py-3">
        <h1 className="font-bold text-xl py-7">Dilivery Address</h1>
        <AddressCard />
      </div>
      <div className="py-20">
        <OrderTraker activeStep={3} />
      </div>

      <Grid className="space-y-5" container>
        {[1, 1, 1, 1, 1, 1].map((item, index) => (
          <Grid
            item
            container
            key={index}
            className="shadow-xl rounded-md p-5 border  bg-white "
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center space-x-4 ">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={image1}
                  alt=""
                />
                <div className="space-y-2 ml-5">
                  <p className="font-semibold">This is title</p>
                  <p className="space-x-5 opacity-50 font-semibold text-xs">
                    <span>This is</span> <span>about power</span>
                  </p>
                  <p>This is about seller</p>
                  <p>$199</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <Box sx={{ color: deepPurple[500] }}>
                <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2" />
                <span> Rate and review product </span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
