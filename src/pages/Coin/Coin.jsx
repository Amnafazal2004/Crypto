import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { Coincontext } from '../../context/Coincontext';
import LineChart from '../../Components/LineChart/LineChart';
//using use Params we can find the id from the url which we ddecalred in app in route /:coinId
const Coin = () => {
  const {coinId} = useParams();
  const [coinData,setCoinData] = useState();
  const [historicalData,setHistoricalData]=useState();
  const {currency} = useContext(Coincontext);
  const fetchcoindata = async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-BuFG9Yb8U4EveXEqzcBEGtKs'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }
  const fetchhistoricaldata = async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-BuFG9Yb8U4EveXEqzcBEGtKs'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }
  useEffect(()=>{
    fetchcoindata();
    fetchhistoricaldata();
  },[currency])

  //used if statement so until the coindata is not loaded/not available it will
  //display else statment
  if(coinData && historicalData){
    return (
      <div className='coin'>
        <div className="coinname">
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
  
        </div>
        <div className="coinchart">
         <LineChart historicalData={historicalData}/>
        </div>
        <div className="coininfo">
        <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Crypto Price</li>
            <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Crypto cap</li>
            <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
        
      </div>
    )
  }
  else{
    return(
      <div className="spinner">
        <div className="spin"></div>
      </div>
    )
  }
 
}

export default Coin
