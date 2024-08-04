import { Grid } from "@mui/material";
import React from "react";
import image1 from "../../../data/images/medicine/HerbalTeaTablet.webp";
import AdjustIcon from "@mui/icons-material/Adjust";

const OrderCard = () => {
  return (
    <div className="p-5 shadow-md hover:shadow-2xl border bg-white ">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img
              src={image1}
              alt=""
              className="w-[5rem] h-[5rem] object-cover object-top"
            />
            <div className="ml-5 space-y-2">
              <p className="">Lorem ipsum dolor sit</p>
              <p className="opacity-50  text-xs font-semibold  ">
                Poder: 500 mg
              </p>
              <p className="opacity-50  text-xs font-semibold  ">
                Color: Black
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>$199</p>
        </Grid>
        <Grid item xs={4}>
          {true && (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600"
                />
                <span> Diliverd on July 12, 2024</span>
              </p>
              <p className="text-xs opacity-70">
                Your product has been delivered
              </p>
            </div>
          )}
          {false && (
            <p>
              <span>Expected Delivery: July 12, 2024</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
