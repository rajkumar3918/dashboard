import React, { useEffect, useState } from "react";
import "../styles/schedules.scss";
import { collection, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";


const Schedules = (props)=>{
    const scheduleRef = collection(db, "schedules");
    const [schedule, setSchedule] = useState([])
    useEffect(()=>{
        const getSchedules = async ()=>{
            try {
                let temp = [];
                const docSnap = await getDocs(scheduleRef);
                docSnap.forEach((doc)=>{
                    temp.push({...doc.data(), id: doc.id})
                });
                setSchedule(temp);
            } catch (error) {
                console.log(error);
            }
        }
        getSchedules()
    },[schedule])

    console.log(schedule)

    return(
        <div className="schedule-cont">
            <div className="headline" >
                <p>Today's Schedule</p>
            <button className="add" onClick={()=>{props.pass? props.setPass(false) : props.setPass(true)}}>+ Add Schedule</button>
            </div>
            <div className="list">

            {schedule.map((e)=>{
                return(
                    <div className="schedules">
                    <div className="dash"/>
                    <div className="content">
                        <p className="title">{e.title}</p>
                        <p className="sub">{e.time}</p>
                        <p className="sub">{e.place}</p>
                    </div>

                </div>
                )
            })}
            </div>
        </div>
    )
}

export default Schedules;