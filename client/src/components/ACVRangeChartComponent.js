import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from "react";
import "../styles/style.css";
import useFetchData from "../utils/useFetchData";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import LineChart from "./LineChart";


const ACVRangeChartComponent = () => {

    const url = "http://localhost:3000/api/v1/acvRangeData"
    const data2 = useFetchData(url);
    console.log(data2);

    const updateData = () => {
        let obj = {}, newArr = [];
        const data1 = data2.map((data)=> {
            if(Object.hasOwnProperty(obj, data.closed_fiscal_quarter)) {
                obj[data.closed_fiscal_quarter] = obj[data.closed_fiscal_quarter] + Math.floor(data.acv);
            }
            else {
                obj[data.closed_fiscal_quarter] = Math.floor(data.acv);
            }
            // newArr.push(obj);
    })
    return obj;
    }



    const obj = updateData();


    const valObj = Object.values(obj);
    console.log(valObj)
    const sumVals = valObj.reduce((acc,crr)=> {
        acc = acc+crr;
        return acc;
    }, 0)
    console.log(sumVals)
    const arrayOfObjects = Object.entries(obj).map(([key, value]) => {
        let updatePercentageVal = Math.floor(+value/ sumVals * 100);
        return { key, value:updatePercentageVal };
    });
    const arrayOfObjects2 = Object.entries(obj).map(([key, value]) => {
        return { key, value };
    });
    console.log(arrayOfObjects)
    const data = arrayOfObjects;

    const countACV = data2.map((data) =>  {
        // let obj = {count :data.count}
        return {key:data.count, value:data.acv}
    })

    countACV.sort((a,b)=>a.key - b.key);



  return (
<>
    <Grid container spacing={3} justifyContent="center"
  alignItems="center" >
    <Grid item xs={12} md={12} lg={12} className='flex-card'>
    <Typography variant="h3" padding={4}>
        ACV Range Charts
      </Typography>
    </Grid>
        <Grid item xs={12} md={12} lg={6} >
            <Card sx={{ maxWidth: 900, marginLeft: 3 }} variant="outlined" className='flex-card acv-card'>
                <DonutChart data={data} totalAcv = {sumVals}  />
                <CardContent>
                    <Typography gutterBottom component="div" variant='h5' >
                        Percentage ACV / Closed Fiscal Quarter
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={6} paddingRight={3}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} marginBottom={3}>
                <Card sx={{ maxWidth: 900 }} variant="outlined" className='flex-card acv-card'>
                    <BarChart data={arrayOfObjects2} />
                    <CardContent>
                        <Typography gutterBottom component="div" variant='h5' >
                            Total ACV / Closed Fiscal Quarter
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Card sx={{ maxWidth: 900, marginBottom: 5 }} variant="outlined" className='flex-card acv-card'>
                        <LineChart data={countACV}  />
                        <CardContent>
                            <Typography gutterBottom component="div" variant='h5' >
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