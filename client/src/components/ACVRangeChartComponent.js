import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useFetchData from "../utils/useFetchData";
import BarChart from "./charts/BarChart";
import DonutChart from "./charts/DonutChart";
import LineChart from "./charts/LineChart";
import "../styles/style.css";

const ACVRangeChartComponent = () => {
  // Declaring the URL
  const url = "http://localhost:3000/api/v1/acvRangeData";
  // Using the custom hook to fetch the data from the url
  const data2 = useFetchData(url);
  //console.log("previous Data" , data2)

  // created a function to update the data received according to the requirements
  const updateData = () => {
    let obj = {};
    data2.map((data) => {
      // Here requirement is to map the data according to the closed fiscal year of created the object accordingly
      if (Object.hasOwnProperty(obj, data.closed_fiscal_quarter)) {
        obj[data.closed_fiscal_quarter] =
          obj[data.closed_fiscal_quarter] + Math.floor(data.acv);
      } else {
        obj[data.closed_fiscal_quarter] = Math.floor(data.acv);
      }
    });
    return obj;
  };

  // Invoking the updateData() function to get the data
  const obj = updateData();
  // console.log("Object", obj)
  // Getting the values from the Object created
  const valObj = Object.values(obj);
  //console.log(valObj)
  // Reducing the values array into a single value that is the total of ACV
  // So Using reduce method to get a single value
  const sumVals = valObj.reduce((acc, crr) => {
    acc = acc + crr;
    return acc;
  }, 0);
  // console.log(sumVals)

  // Creating array of objects to work with graphs/ charts
  // Here created the array of objects with key and value directly only
  const arrayOfObjects1 = Object.entries(obj).map(([key, value]) => {
    return { key, value };
  });
  // console.log(arrayOfObjects1)

  // Creating another array of objects which deals with the percentage values of ACV with respect to total
  const arrayOfObjects2 = Object.entries(obj).map(([key, value]) => {
    let updatePercentageVal = Math.floor((+value / sumVals) * 100);
    return { key, value: updatePercentageVal };
  });
  // console.log(arrayOfObjects2)

  // Here created another object where we are using the count as key and acv values as value
  const countACV = data2.map((data) => {
    return { key: data.count, value: data.acv };
  });
  countACV.sort((a, b) => a.key - b.key);
  // console.log(countACV)

  // Using the material ui components to render the components
  return (
    <>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={12} lg={12} className="flex-card">
          <Typography variant="h3" padding={4}>
            ACV Range Charts
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Card
            sx={{ maxWidth: 900, marginLeft: 3 }}
            variant="outlined"
            className="flex-card acv-card"
          >
            <DonutChart data={arrayOfObjects2} totalAcv={sumVals} />
            <CardContent>
              <Typography gutterBottom component="div" variant="h5">
                Percentage ACV / Closed Fiscal Quarter
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={6} paddingRight={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} marginBottom={3}>
              <Card
                sx={{ maxWidth: 900 }}
                variant="outlined"
                className="flex-card acv-card"
              >
                <BarChart data={arrayOfObjects1} />
                <CardContent>
                  <Typography gutterBottom component="div" variant="h5">
                    Total ACV / Closed Fiscal Quarter
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Card
                sx={{ maxWidth: 900, marginBottom: 5 }}
                variant="outlined"
                className="flex-card acv-card"
              >
                <LineChart data={countACV} />
                <CardContent>
                  <Typography gutterBottom component="div" variant="h5">
                    Count / ACV Values
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(ACVRangeChartComponent);
