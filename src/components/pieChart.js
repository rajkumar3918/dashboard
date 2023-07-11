import "../styles/pieChart.scss";
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Legend, Title, Tooltip} from "chart.js";
import { useSelector } from "react-redux";
ChartJS.register(ArcElement, Legend, Title, Tooltip );


const Piechart = ()=>{
    const PD = useSelector(state => state.DashBoard.data.pie[0])
    const data = {
        labels: ["Basic Tees", "Custom Short Pants", "Super Hoodies"],
        datasets:[
            {
                data:[PD.tees,PD.pants,PD.shorts],
                backgroundColor:[
                    "rgba(152, 216, 158, 1)",
                    "rgba(238, 132, 132, 1)",
                    "rgba(246, 220, 125, 1)"
                ]
            }
        ]
    };
    const options = {
        maintainAspectRatio:false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "right"
          },
        },
      };
    return(
        <div className="pieChart">
            <p>Top Products</p>
            <div>
            <Pie className="pie" data={data} options={options}/>
            </div>
        </div>
    )
}

export default Piechart;