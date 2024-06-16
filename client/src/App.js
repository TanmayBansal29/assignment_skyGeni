import { Card, Grid } from "@mui/material";
import ACVRangeChartComponent from "./components/ACVRangeChartComponent";
import CustomerTypeChartComponent from "./components/CustomerTypeChartComponent";
import TeamChartComponent from "./components/TeamChartComponent";

function App() {
  return (
    <Grid>
      <Grid>
        <Card sx={{margin: 5}} >
          <ACVRangeChartComponent />
        </Card>
        <Card sx={{margin: 5}}>
          <CustomerTypeChartComponent />
        </Card>
        <Card sx={{margin: 5}}>
          <TeamChartComponent />
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;
