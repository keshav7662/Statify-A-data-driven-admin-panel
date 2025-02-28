import React, { useState } from 'react'
import Chart from "react-apexcharts";

const PieChart = ({ pieChartData }) => {
    const [chartStat, setChartStat] = useState({
        optionsPie: {
            chart: {
                id: "pie-chart",
            },
            plotOptions: {
                pie: {
                    customScale: 0.8,
                },
            },
            legend: {
                show: false,
            },
            labels: pieChartData.map((item) => item.label),
        },
        seriesPie: pieChartData.map((item) => item.percentage),
    });
    
    return (
        <div className="p-2 shadow ">
            <h2 className="text-xl font-bold mb-4 text-center">Product Categories Breakdown</h2>
            <Chart options={chartStat.optionsPie} series={chartStat.seriesPie} type="pie" height={"250px"}  />
        </div>
    )
}

export default PieChart