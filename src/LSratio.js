import React, { useCallback, useMemo, useRef,useEffect,useState } from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
// import { areaData } from './areaData';
import Chart from 'react-apexcharts'
import { orderbookdata } from './orderbookData';
import './styles.css';
export default function LSratio() {

    const data = {
          
        series: [{
          name: 'Top 20  Buyers',
          data: [44, 55, 41, 37, 22, 43, 21],
          colors: ['#546E7A']
        }, {
          name: 'Top 20 Sellers',
          data: [53, 32, 33, 52, 13, 43, 32],
          colors: ['#546E7A']
        }],
        options: {
            grid:{
                show:false
            },
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          stroke: {
           show:false
          },
          title: {
            text: 'Long Sale Ratio'
          },
          xaxis: {
           
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
            labels: {
                show:false,
              formatter: function (val) {
                return val + "K"
              }
            }
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "K"
              }
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
        },
      
      
      };
    






  return (
    <div id="chart">
    <Chart options={data.options} series={data.series} type="bar" height={350} />
  </div>
  
  )
}
