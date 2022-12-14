import React, { useCallback, useMemo, useRef,useEffect,useState } from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
// import { areaData } from './areaData';
import Chart from 'react-apexcharts'
import { orderbookdata } from './orderbookData';
import './styles.css';

export default function Orderbook() {
  const [BidchartData,setBidchartData]=useState()
  const [askchartData,setAskchartData]=useState()
//  let chartData
//  const setchartData =(data)=>chartData=data;
  let ask;
  let ask_amount
  let bid;
  let bid_amount;
  let myBiddata;
  let myAskdata;
 
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
      setAskchartData(myAskdata);
      setBidchartData(myBiddata);
      //console.log(mydata);
    //console.log(BidchartData)
    }, 300);
  });
  const setMyData = (order_amount,order,color) => {
    return {
          
      series: [{
        data: order_amount
      }],
      options: {
        
        chart: {
          type: 'bar',
          height: 200
        },
        colors: color,
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
          show:false,
          categories:order,
        }
      }
    }
  }
    messageHistory.current.map((message, idx) =>{
        //  console.log(message.data)   
          let {b,a}=message.data || {}
          //  console.log(a) 
          // console.log(b)
          if(typeof b!=="undefined"){
        ask=a.map(asks=>asks[0])
      ask_amount=a.map(asks_amount=>asks_amount[1])
     bid=b.map(bids=>bids[0])
     bid_amount=b.map(bids_amount=>bids_amount[1])
      ask_amount=ask_amount.sort()
      bid_amount=bid_amount.sort()
      bid=bid.sort()
      ask=ask.sort()
    // console.log(bid_amount,ask_amount)
    // console.log(bid,ask)

        myAskdata=setMyData(ask_amount,ask,"#26a69a")
        myBiddata=setMyData(bid_amount,bid,"#ef5350")

    }

  }
    );

    const {b,a}=orderbookdata
    

    // const dan= {
          
    //   series: [{
    //     data: ask_amount
    //   }],
    //   options: {
    //     chart: {
    //       type: 'bar',
    //       height: 350
    //     },
    //     plotOptions: {
    //       bar: {
    //         borderRadius: 4,
    //         horizontal: true,
    //       }
    //     },
    //     dataLabels: {
    //       enabled: false
    //     },
    //     xaxis: {
    //       categories:ask,
    //     }
    //   }
    // }
  

    


    
  return (
    <>
    <div className='container'>
      <div className='wrapper'>
    <h1 className='order'>Order Books </h1>
      <h2 className='books'>This is the OrderBooks</h2>
      <button className='sub-button'
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Subscribe
      </button>
      <button className='unsub-button'
        onClick={handleClickUnSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Unsubscribe
      </button>
      <span className='websocket'>The WebSocket is currently {connectionStatus}</span>
      {/* {lastJsonMessage ? (
        <span>
          Last message: {JSON.stringify(lastJsonMessage.data, null, 4)}
        </span>
      ) : null}</div> */}
      <div>
        {BidchartData?(
          <Chart options={BidchartData.options} series={BidchartData.series} type="bar" height={300} />
        ):null}
        {askchartData?(
          <Chart options={askchartData.options} series={askchartData.series} type="bar" height={300} />
        ):null}
      
      
      </div>
      </div>
      </div>
    </>
  );
}
