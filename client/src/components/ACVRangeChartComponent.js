import React from "react";
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

    // const updatedData = data.reduce((acc,crr) => {
    //     // console.log(crr)
    //     if(!acc[crr["closed_fiscal_quarter"]]) {
    //         // acc[crr.closed_fiscal_quarter] = crr.acv;
    //     }
    //     else {
    //         // acc[crr.closed_fiscal_quarter] = acc[crr.closed_fiscal_quarter] + crr.acv;
    //     }
    //     console.log(acc, acc[crr["closed_fiscal_quarter"]])
    // }, {})

    // console.log(updatedData)



  return (
    // <div className="container">
    //   <div className="graph" ref={ref} />
    // </div>
    <>
    <DonutChart data={data} totalAcv = {sumVals}  />
    <BarChart data={arrayOfObjects2} />
    <LineChart data={countACV}  />
    </>

  );
};

export default React.memo(ACVRangeChartComponent);