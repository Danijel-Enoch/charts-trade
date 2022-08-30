import React, { useCallback, useMemo, useRef,useEffect,useState } from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
// import { areaData } from './areaData';
import Chart from 'react-apexcharts'
import { orderbookdata } from './orderbookData';
import './styles.css';

export default function Orderbook() {
  function TimeCalculator(date) {
    // console.log(typeof date)
     return new Date(date).toISOString().slice(0, 10)     }
  let mydata=[
  ]
  const[chartData,setchartData]=useState(mydata)
  const socketUrl = "wss://stream.binance.com:9443/stream";
 

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(socketUrl);

  const messageHistory = useRef([]);
  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastJsonMessage ?? []),
    [lastJsonMessage]
  );

  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "SUBSCRIBE",
        params: ["btcusdt@depth@100ms"],
        id: 1,
      }),
    [sendJsonMessage]
  );

  const handleClickUnSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "UNSUBSCRIBE",
        params: ["btcusdt@depth@100ms"],
        id: 1,
      }),
    [sendJsonMessage]
  );
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  useEffect(() => {
    setTimeout(() => {
      setchartData(mydata);
     // console.log(chartData)
    }, 30);
  });
    messageHistory.current.map((message, idx) =>{
          console.log(message.data)    
    }
    );
    const {b,a}=orderbookdata
    const ask=a.map(asks=>asks[0])
    const bid=b.map(bids=>bids[0])
    console.log(ask)
    const dan= {
          
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
          ],
        }
      }
    }
  

    


    
  return (
    <>
    <div>
    <h1>OrderBooks </h1>
      <h2>This is the OrderBooks</h2>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Subscribe
      </button>
      <button
        onClick={handleClickUnSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Unsubscribe
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastJsonMessage ? (
        <span>
          Last message: {JSON.stringify(lastJsonMessage.data, null, 4)}
        </span>
      ) : null}</div>
      <div style={{display: 'flex', flex: 1}}>
      <Chart options={dan.options} series={dan.series} type="bar" height={440} />
      
      </div>
    </>
  );
}
