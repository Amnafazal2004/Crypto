import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Coincontext } from '../../context/Coincontext';
import { Link } from 'react-router-dom';

const Home = () => {
  const {allCoin,currency}= useContext(Coincontext);
  const [displayCoin,setDisplayCoin] =useState([]);
  const [input,setInput]=useState('');

  //event.target.value is whatever you wrote in search bar
  const inputHandler =(event)=>{
    setInput(event.target.value);
    //so whenever the search bar is empty it will display all coins
    if(event.target.value === ""){
         setDisplayCoin(allCoin);
    }
  }
  //used async await because we used apis
  const searchHandler= async(event)=>{
    //so when clicking the search button the page will not reload
    event.preventDefault();

    const coins = await allCoin.filter((item)=>{
     return item.name.toLowerCase().includes(input.toLowerCase())
     //used to lowercase so even if user enters in uppercase it will still search the item
     //used includes so even if the user enter 'bit' it will list all the items including bit
    })
    //to display all the searched items
     setDisplayCoin(coins);
     
  }

  useEffect(()=>{
    setDisplayCoin(allCoin)
  },[allCoin])
  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br />Crypto Marketplace</h1>
        <p>Welcome to the world's largest Cyrpto Marketplace.
          Sign up to explore more about cryptos </p>
       <form onSubmit={searchHandler}>
        <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search Crypto..' required
        />
        {/* so when you are searching for an item it suggests you something */}
        <datalist id='coinlist'>
          {allCoin.map((item,index)=>(
            <option key={index} value={item.name}/>
          ))}
        </datalist>
        <button type='submit'>Search</button>
       </form>
      </div>
      <div className="cryptotable">
        <div className="tablelayout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='marketcap'>Market Cap</p>

        </div>
        {
          // using slice because from all data we only need 10
          displayCoin.slice(0,10).map((item,index)=>( 
            <Link to={`/coin/${item.id}`} className='tablelayout' key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              {/* toLocaleString is used for comma sepaarated values */}
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0?"green":"red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className='marketcap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
            </Link>

          ))
        }
        </div>
     
      
      </div>
  )
}

export default Home

