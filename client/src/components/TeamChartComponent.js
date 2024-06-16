import React from 'react'
import useFetchData from '../utils/useFetchData'

const TeamChartComponent = () => {
    const url = "http://localhost:3000/api/v1/teamData"
    const data2 = useFetchData(url)
    // console.log("Team data", data2)

    const updatedata = () => {
        let obj = {};
        data2.map((data) => {
            if(Object.hasOwnProperty(obj, data.Team)) {
                obj[data.Team] = obj[data.team] + Math.floor(data.acv)
            } else {
                obj[data.Team] = Math.floor(data.acv)
            }
        })
        return obj;
    }

    let obj = updatedata();
    // console.log(obj)

  return (
    <div>TeamChartComponent</div>
  )
}

export default TeamChartComponent