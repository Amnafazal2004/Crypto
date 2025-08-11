
import { createContext, useState,useEffect } from "react";


export const Coincontext =  createContext();

const CoincontextProvider =(props)=>{
    const [allCoin,setAllCoin] =useState([]);
    const[currency,setCurrency]=useState({
        name:"usd",
        symbol: "$"
    });
    const fetchallcoin =async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-BuFG9Yb8U4EveXEqzcBEGtKs'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
   
    }
    useEffect(()=>{
        fetchallcoin();
    },[currency])
    
    const contextvalue={
       allCoin,setCurrency,currency
       }
       return(
           <Coincontext.Provider value={contextvalue}>
               {props.children}
           </Coincontext.Provider>
       )
    }
    export default CoincontextProvider


