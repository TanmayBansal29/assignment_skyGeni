import useFetchData from '../utils/useFetchData';
import * as d3 from 'd3';
import DonutChart from './charts/DonutChart';
import StackedBarChart from './charts/StackedChart';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const CustomerTypeChartComponent = () => {
  const url = "http://localhost:3000/api/v1/customerTypeData";
  const data2 = useFetchData(url)
  console.log(data2)

  const updateD = () => {
    let obj = {};
    data2.map((data) => {
        if(Object.hasOwnProperty(obj, data.Cust_Type)) {
            obj[data.Cust_Type] = obj[data.Cust_Type] + Math.floor(data.acv)
        } else {
            obj[data.Cust_Type] = Math.floor(data.acv)
        }
    })
    return obj;
  }

  const updateDataStacked = d3.groups(data2, d => d.closed_fiscal_quarter).map((group) => {
    const [quarter, values] = group;
    const existing  = values.find(d => d.Cust_Type === "Existing Customer") || { acv: 0 };
    const newCust = values.find(d => d.Cust_Type === "New Customer") || { acv: 0 };
    return {
      closed_fiscal_quarter: quarter,
      'Existing Customer': existing.acv,
      'New Customer': existing.acv
    }
  })

  const keys = ['Existing Customer', 'New Customer'];
  const colors = ['#1f77b4', '#ff7f0e'];

  let obj = updateD();
  console.log("Second Obj", obj)

  let valObj = Object.values(obj)
  console.log(valObj)

  const sumVals = valObj.reduce((acc, curr) => {
    acc = acc + curr
    return acc;
  }, 0)
  console.log(sumVals)

  const arrayOfObjects2 = Object.entries(obj).map(([key, value]) => {
    let percentageValues = Math.round((+value / sumVals) * 100)
    return {key, value: percentageValues}
  })
  console.log(arrayOfObjects2)


  return(
    <>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={12} lg={12} className="flex-card">
          <Typography variant='h3' padding={4}>
            ACV Range With Customer
          </Typography>
        </Grid>
        <Grid>
          <Grid>
          <Card className='flex-card acv-card' sx={{marginBottom: 5}}>
            <StackedBarChart data={updateDataStacked} keys={keys} colors={colors}/>
            <CardContent>
              <Typography variant='h5'>
                Stacked Chart Fiscal Quarter: Customer Type / ACV Value
              </Typography>
            </CardContent>
          </Card>
          </Grid>
          <Grid></Grid>
          <Card className='flex-card acv-card' sx={{marginBottom: 5}}>
            <DonutChart data={arrayOfObjects2} totalAcv={sumVals}/>
            <CardContent>
              <Typography variant='h5'>
                Percentage ACV / Customer Type
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerTypeChartComponent