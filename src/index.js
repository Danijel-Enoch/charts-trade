import React, { useCallback, useMemo, useRef,useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { createChart, CrosshairMode, ColorType } from 'lightweight-charts';
import { priceData } from './priceData';
// import { areaData } from './areaData';
import Orderbook from './OrderBook';
import LoginModal from './components/login-modal/LoginModal';
import Navbar from './components/Navbar';
import "./index.css"
import LSratio from './LSratio';
import './styles.css';

function App() {
  function TimeCalculator(date) {
    // console.log(typeof date)
     return new Date(date).toISOString().slice(0, 10)     }
  let mydata=[
  ]
  let myVolumedata=[
  ]
  const[chartData,setchartData]=useState(mydata)
  const[volumeData,setVolumeData]=useState(myVolumedata)
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
      setVolumeData(myVolumedata)
     // console.log(chartData)
    }, 30);
  });
    messageHistory.current.map((message, idx) =>{
          let {k}=message.data ||{}
          let {t,o,h,l,c}=k || {}
      //     { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
      
      if(typeof t!=="undefined"){
         const newTime=TimeCalculator(t)
        let bar={ time:t/1000,open:parseFloat(o),high:parseFloat(h),low:parseFloat(l),close:parseFloat(c)}
        let volume={time:t/1000,value:h}
        //console.log(newTime.toString())
        myVolumedata.push(volume)
         mydata.push(bar)
        // console.log(bar)
      }      
    }
    );
    const chartContainerRef = useRef();
    const backgroundColor = 'white'
			const lineColor = '#2962FF'
			const textColor = 'black'
			const areaTopColor = '#2962FF'
			const areaBottomColor = 'rgba(41, 98, 255, 0.28)'

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
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
			chart.timeScale().fitContent();

			const newSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350' });
			newSeries.setData(chartData);
      if(chartData.length <=0){
      console.log("no chart data available")
      }
      if(chartData.length >0){
        console.log("Data Set");
        console.log(chartData[chartData.length-1]);
        newSeries.update(chartData[chartData.length-1]);
      }

    const volumeSeries = chart.addHistogramSeries({
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
    volumeSeries.setData(volumeData);
      
            

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[chartData, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

  return (
    <>
    <Navbar>
    <LoginModal />
    </Navbar>
    <div className='subscribe'>
      <button className='subscribe-button'
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Subscribe
      </button>
      <button className='unsubscribe-button'
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
    <Orderbook/>
    <LSratio/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);