import React, { useCallback, useMemo, useRef,useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { createChart, CrosshairMode } from 'lightweight-charts';
import { priceData } from './priceData';
// import { areaData } from './areaData';
import Orderbook from './OrderBook';
import { volumeData } from './volumeData';

import './styles.css';

function App() {
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
        params: ["btcusdt@kline_1m"],
        id: 1,
      }),
    [sendJsonMessage]
  );

  const handleClickUnSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "UNSUBSCRIBE",
        params: ["btcusdt@kline_1m"],
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
    }, 3000);
  });
    messageHistory.current.map((message, idx) =>{
          let {k}=message.data ||{}
          let {t,o,h,l,c}=k || {}
      //     { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
      
      if(typeof t!=="undefined"){
         const newTime=TimeCalculator(t)
        let bar={ time:newTime.toString(),open:parseFloat(o),high:parseFloat(h),low:parseFloat(l),close:parseFloat(c)}
        
        //console.log(newTime.toString())
         mydata.push(bar)
        // console.log(bar)
      }      
    }
    );

  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#253248',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });

    candleSeries.setData(chartData);

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);

    const volumeSeries = chart.current.addHistogramSeries({
      color: '#182233',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // volumeSeries.setData(volumeData);
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <>
    <div>
    <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
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
    <div className="App">
      <div ref={chartContainerRef} className="chart-container" />
    </div>
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
