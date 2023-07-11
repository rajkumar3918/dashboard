import React, { useRef, useState } from "react";
import {BsSearch} from "react-icons/bs";
import {IoIosNotificationsOutline} from "react-icons/io";
import {AiOutlineTransaction} from "react-icons/ai";
import {GrTransaction} from "react-icons/gr";
import {AiOutlineLike} from "react-icons/ai";
import {FiUsers} from "react-icons/fi";
import {TbDashboard} from "react-icons/tb";
import {AiOutlineSchedule} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import {SlSettings} from "react-icons/sl";
import "../styles/home.scss";
import ActivityChart from "../components/activityCard";
import Piechart from "../components/pieChart";
import Schedules from "../components/schedules";
import { useSelector } from "react-redux";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {auth, db} from "../firebase";

const Home = ()=>{
    const stats = useSelector(state => state.DashBoard.data.stats[0]);
    const [modal, setModal] = useState(false);
    const scheduleRef = useRef();
    const scheduleDB = collection(db, "schedules");


    //schedules sending
    const sendSchedule = async(e)=>{
        e.preventDefault();
        if(scheduleRef.current.title.value === "") return;
        await addDoc(scheduleDB,{
            title: scheduleRef.current.title.value,
            place: scheduleRef.current.place.value,
            time: scheduleRef.current.time.value,
            createdAt: serverTimestamp()
        })
        scheduleRef.current.title.value = "";
        scheduleRef.current.place.value = "";
        scheduleRef.current.time.value = "";
        setModal(false);

        
    } 

    const cards = [
        {
            name : "Total Revenues",
            num : "$"+stats.revenue,
            icon : <AiOutlineTransaction/>,
            color : "rgba(221, 239, 224, 1)"
        },
        {
            name : "Total Transactions",
            num : stats.transctions,
            icon : <GrTransaction/>,
            color : "rgba(244, 236, 221, 1)"
        },
        {
            name : "Total Likes",
            num : "8,978",
            icon : <AiOutlineLike/>,
            color : "rgba(239, 218, 218, 1)"
        },
        {
            name : "Total users",
            num : "992",
            icon : <FiUsers/>,
            color : "rgba(222, 224, 239, 1)"
        }
    ];


    return(
        <div className="dashboard-cont">
            <div className="sidebar-cont">
                <h1>Board.</h1>
                <ul>
                    <li><TbDashboard className="s-icon"/>Dashbord</li>
                    <li><AiOutlineTransaction className="s-icon"/>Transactions</li>
                    <li><AiOutlineSchedule className="s-icon"/>Schedules</li>
                    <li><BiUserCircle className="s-icon"/>Users</li>
                    <li><SlSettings className="s-icon"/>Settings</li>
                </ul>
            </div>
            <div className="dashboard">
                <div className="navbar">
                    <p className="title">Dashboard</p>
                    <div className="sec-2">
                    <div className="search">
                    <input placeholder="search.."/>
                    <BsSearch className="src-btn"/>
                    </div>
                    <IoIosNotificationsOutline className="notifi"/>
                    <img className="profile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt08ADSBsRRxQ2xzvxjADA0SCVuwEwY6gASg&usqp=CAU"/>
                    </div>
                </div>

                <div className="card-cont">
                    {cards.map((e)=>{
                        return (
                            <div style={{background:e.color}} className="card">
                                <p className="icon">{e.icon}</p>
                                <p className="name">{e.name}</p>
                                <p className="num">{e.num}</p>
                            </div>
                        )
                    })}
                </div>

                <ActivityChart/>
                <div className="pie-sch">
                <Piechart/>
                <Schedules pass={modal} setPass={setModal}/>

                <div className="schedule-modal" style={modal?{display:"flex"}:{display:"none"}}>
                    <h2>Add a schedule</h2>
                    <form ref={scheduleRef} onSubmit={sendSchedule}>
                            <label htmlFor="title">Purpose</label>
                            <input type="text" name="title" placeholder="ex: Meeting with customer" required/>

                            <label htmlFor="title">Place</label>
                            <input type="text" name="place" placeholder="ex: At vip towers" required/>

                            <label htmlFor="title">Time</label>
                            <input type="text" name="time" placeholder="ex: 16:40" required/>
                            <div className="buttons">
                                <button className="cancle" onClick={()=>setModal(false)}>Cancle</button>
                                <button type="submit" className="submit" >Submit</button>
                            </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Home;