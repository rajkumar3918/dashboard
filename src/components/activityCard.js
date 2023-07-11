import {Line} from "react-chartjs-2";
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement} from "chart.js";
import "../styles/activityChart.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredData } from "../redux/slice/statisticsSlice";

ChartJS.register(LineElement, CategoryScale, PointElement, LinearScale);

const ActivityChart = ()=>{
    const dispatch = useDispatch();
    const [month, setMonth] = useState();
    const statistics = useSelector(state => state.DashBoard.values);
    const UD = useSelector(state => state.DashBoard.data.user[0]);
    const GD = useSelector(state => state.DashBoard.data.guest[0]);

    useEffect(()=>{
        statistics.map(e=>{
            if(e.month === month){
                dispatch(filteredData(e));
                console.log(e)
                return;
            }
        })
    },[month])


    const data = {
        labels: ["","week 1", "week 2", "week 3", "week 4",""],
        datasets: [
            {
                label:"user",
                data: [100,UD.week1, UD.week2, UD.week3, UD.week4,300],
                borderColor: "rgba(155, 221, 124, 1)",
                backgroundColor : "transparent",
                pointBorderWidth: 3,
                pointBorderColor: "transparent",
                tension:0.5
            },
            {
                label:"guest",
                data: [200,GD.week1, GD.week2, GD.week3, GD.week4,400],
                borderColor: "rgba(233, 160, 160, 1)",
                backgroundColor : "transparent",
                pointBorderWidth: 3,
                pointBorderColor: "transparent",
                tension:0.5
            },


        ],
    };
    const options = {
        maintainAspectRatio:false,
        Plugins:{
            legend:{
                display: true,
                position: "right"
            }
        },
        scales:{
            x:{
                
                grid:{
                    display:false,
                    
                }
            },
            y:{
                min:0,
                max:500,
                ticks: {
                    stepSize: 100
                }
            }
        }
    }

    return(
        <div className="activ-chart">
            <div className="header">
                <p>Activities</p>
                <input onChange={(e)=>setMonth(e.target.value)} type="month"/>
            </div>
            <div>
            <Line data={data}  options={options} className="line"></Line>
            </div>
        </div>
    )
};

export default ActivityChart;