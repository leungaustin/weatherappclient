import React, { useRef, useState } from 'react';
import Modal from '../components/Modal'

const ListItem = ({itemKey, main}) => {
    return <div className="list-item"><span className="font-bold capitalize">{itemKey}</span>:&nbsp;{main}</div>;
}

const ListDate = ({main}) => {
    return <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{main.day}<br/>{main.time}</h5>;
}

const ListTable = ({main}) => {
    return <div className="list-table">
        {
            Object.keys(main).map((key)=>{return <ListItem itemKey={key} main={main[key]}/>})
        }
        </div>;
}

const getDay = (timeStamp) => {
    console.log("timeStamp",timeStamp);
    const date = new Date(timeStamp); // Multiply by 1000 to convert to milliseconds
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const time = date.toLocaleTimeString();
    return {'day':dayOfWeek,'time':time};
}

export default function Weatherlist(props){
    console.log("props",props.list)
    const list = props.list;
    const [show, setShow] = useState(false);
    const wind = list.wind;
    const weather = list.weather;
    const visibility = list.visibility;
    const rain = list.rain;
    let date = useRef(getDay(list.dt_txt));
    return (
        <div className="flex flex-col items-center">
            <ul>
                <li>
                    <ListDate main={date.current} /> 
                </li>
                <li>
                    <ListItem itemKey="Temp" main={list.main.temp} />
                </li>
                <li>
                    <ListTable main={list.weather[0]} />
                </li>
            </ul>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={()=>{setShow(true)}}>More</button>
            <div className={show ? 'block modal' : 'hidden modal'}>
                <Modal wind={wind} visibility={visibility} rain={rain} main={list.main} show={setShow}/>
            </div>
        </div>
    )
}