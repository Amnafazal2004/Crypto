import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historicalData}) => {
  //two arrays because in API the data is array in array
  //it is an array in array containing 2 elements
  const [data,setData] =useState([["Date","Prices"]])
useEffect(()=>{
    //just a temporary array to hold data
   let datacopy= [["Date","Prices"]]
  //if prices are available then
   if(historicalData.prices){

    historicalData.prices.map((item)=>{
        //add these two elements in datacopy
        datacopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
    })
    setData(datacopy);
   }
},[historicalData])
  return (
   <Chart
   chartType='LineChart'
   data={data}
   height="100%"
   legendToggle
   />
  )
}

export default LineChart

//Example:
//if the data was like this
//item = [1672444800000, 50000];
//then this line
// datacopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
//changed it into this
//["1/1", 50000]

//basically in charts we display things like this
//  let datacopy= [["Date","Prices"]]
// [
//     ["Date", "Prices"],  // Header row
//     ["8/24", 50000],     // First data point
//     ["8/25", 51000],     // Second data point
//     // More data points can be added here
//   ]
//so whenever we push something in data copy it goes like this

