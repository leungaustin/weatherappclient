"use client";

import Head from 'next/head'
import React, { useState, useRef } from 'react';
import Weatherlist from '../components/Weatherlist'

export default function Home() {
  let cityRef = useRef("Auckland");
  let weatherRef = useRef([]);
  const [isWeather,setIsweather] = useState(false);
  const [overLay, setOverlay] = useState(false);

  const updateCityValue = (event) => {
    console.log(event.target.value)
    cityRef.current = event.target.value;
    console.log(cityRef.current);
  }

  const handleCitySubmit = async(event) => {
    console.log("city",cityRef.current);
    event.preventDefault();
    console.log("city",cityRef.current);
    setOverlay(true);
    
    const  res = await fetch("/api/getWeather",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        city:cityRef.current
      })
    })
    let result = await res.json();
    weatherRef.current = result;
    console.log("city",weatherRef.current);
    setOverlay(false);
    setIsweather(true);
  }

  const handleReset = (event) => {
    event.preventDefault();
    setIsweather(false);
  }

  return (
    <>
      <Head>
        <title>Weather Application</title>
        <meta name="description" content="Generated by Austin Leung" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      <div className="overlay" style={{display:overLay ? 'block' : 'none'}}></div>
      <div className='dark' style={{backgroundColor:"rgba(59,57,94,0.9)"}}>
        <div className="container m-auto min-h-screen flex items-center justify-center flex-col">
          {isWeather ? <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{weatherRef.current.weatherResponse.fivedayweather.city.name}</h1> : null}
          <div className="flex items-center justify-center">
            {
              isWeather
              ?
              (
                <>
                 {
                  weatherRef.current.weatherResponse.fivedayweather.list.map((element,index) => {
                    
                      return (
                        (index + 1) % 8 === 0 && <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                          <Weatherlist key={index} list={element}/>
                        </a>
                      )
                    })
                  }
                  </>
              )
              :
              (
                <form>   
                  <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Search For Your City</h1>
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                      </div>
                      <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required defaultValue={cityRef.current} onChange={(e) => {updateCityValue(e)}}/>
                      <button type="button" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => {handleCitySubmit(e)}}>Search</button>
                  </div>
              </form>
              )
            }
          </div>
          {isWeather ? <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={(event)=>{handleReset(event)}}>Reset</button> : null}
        </div>
      </div>
    </>
  )
}
