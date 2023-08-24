import React, { useRef } from 'react';
import Image from 'next/image'

export default function Modal(props){

    const main = props.main;
    const wind = props.wind;
    const visibility = props.visibility;
    const rain = props.rain;
    const show = props.show;

    const handleShow = (event) => {
        event.preventDefault();
        show(false);
    }

    return (
        <>
            <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-2xl max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                More Information
                            </h3>
                            <button  onClick={(event)=>{handleShow(event)}} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-6 space-y-6">
                            <Image
                                src="/img/weather-app.png" // Replace with the actual image path
                                alt="weather icon"
                                width={100} // Set the desired width
                                height={100} // Set the desired height
                                className="m-auto"
                            />
                            <ul className="flex justify-between">
                                <li>
                                    <h3>Main</h3>
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    <span className="font-bold">Temp Min:</span>&nbsp;{main.temp_min}<br/>
                                    <span className="font-bold">Temp Max:</span>&nbsp;{main.temp_max}<br/>
                                    <span className="font-bold">Humidity:</span>&nbsp;{main.humidity}<br/>
                                    <span className="font-bold">Pressure:</span>&nbsp;{main.pressure}<br/>
                                    </p>
                                </li>
                                <li>
                                    <h3>Wind</h3>
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        <span className="font-bold">Speed:</span>&nbsp;{wind.speed}<br/>
                                    <span className="font-bold">Degree:</span>&nbsp;{wind.deg}<br/>
                                    <span className="font-bold">Gust:</span>&nbsp;{wind.gust}<br/>    
                                    </p>
                                </li>
                                <li>
                                    <h3>Visibility</h3>
                                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        {visibility}   
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={(event)=>{handleShow(event)}} data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}