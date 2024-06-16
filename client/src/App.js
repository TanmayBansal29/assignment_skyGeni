import { Card, Grid } from "@mui/material";
import ACVRangeChartComponent from "./components/ACVRangeChartComponent";

function App() {
  return (
    <Grid>
      <Grid>
      <Card sx={{margin: 6}}>
        <ACVRangeChartComponent />
      </Card>
      </Grid>
    </Grid>
  );
}

export default App;
