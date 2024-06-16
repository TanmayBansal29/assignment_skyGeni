import React from "react";
import * as d3 from "d3";
import useFetchData from "../utils/useFetchData";
import DonutChart from "./charts/DonutChart";
import BarChart from "./charts/BarChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StackedBarChart from "./charts/StackedChart";
import "../styles/style.css";

const TeamChartComponent = () => {
  const url = "http://localhost:3000/api/v1/teamData";
  const data2 = useFetchData(url);
  console.log("Team data", data2);

  const updatedata = () => {
    let obj = {};
    data2.map((data) => {
      if (Object.hasOwnProperty(obj, data.Team)) {
        obj[data.Team] = obj[data.team] + Math.floor(data.acv);
      } else {
        obj[data.Team] = Math.floor(data.acv);
      }
    });
    return obj;
  };

  const updateDataStacked = d3
    .groups(data2, (d) => d.closed_fiscal_quarter)
    .map((group) => {
      const [quarter, values] = group;
      const AsiaPac = values.find((d) => d.Team === "Asia Pac") || { acv: 0 };
      const Enterprise = values.find((d) => d.Team === "Enterprise") || {
        acv: 0,
      };
      const Europe = values.find((d) => d.Team === "Europe") || { acv: 0 };
      const NorthAmerica = values.find((d) => d.Team === "North America") || {
        acv: 0,
      };
      const LatinAmerica = values.find((d) => d.Team === "Latin America") || {
        acv: 0,
      };
      return {
        closed_fiscal_quarter: quarter,
        AsiaPac: AsiaPac.acv,
        Enterprise: Enterprise.acv,
        Europe: Europe.acv,
        NorthAmerica: NorthAmerica.acv,
        LatinAmerica: LatinAmerica.acv,
      };
    });

  const keys = [
    "AsiaPac",
    "Enterprise",
    "Europe",
    "NorthAmerica",
    "LatinAmerica",
  ];
  const colors = ["#1a5276", "#287233", "#992e2e", "#6e2c70", "#1e6666"];

  let obj = updatedata();
  // console.log(obj)
  let valObj = Object.values(obj);
  console.log(valObj);

  const sumVals = valObj.reduce((acc, curr) => {
    acc = acc + curr;
    return acc;
  }, 0);
  console.log(sumVals);

  const arrayOfObjects1 = Object.entries(obj).map(([key, value]) => {
    return { key, value };
  });

  const arrayOfObjects2 = Object.entries(obj).map(([key, value]) => {
    let percentageValues = Math.round((value / sumVals) * 100);
    return { key, value: percentageValues };
  });

  return (
    <>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={12} lg={12} className="flex-card">
          <Typography variant="h3" padding={4}>
            Team / ACV Charts
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
                Percentage ACV / Team
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
                    Total ACV / Team
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
                <StackedBarChart data={updateDataStacked} keys={keys} colors={colors} />
                <CardContent>
                  <Typography gutterBottom component="div" variant="h5">
                    Stacked Chart Fiscal Quarter: Team / ACV Value
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

export default TeamChartComponent;
