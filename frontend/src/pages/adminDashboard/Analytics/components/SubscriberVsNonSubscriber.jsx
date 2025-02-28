import React, { useState } from 'react'
import Chart from "react-apexcharts";

const SubscriberVsNonSubscriber = ({ userTypes }) => {
    ("usersTypes:", userTypes)
    const [chartStat, setChartStat] = useState({
        optionsPie: {
            chart: {
                id: "pie-chart",
            },
            plotOptions: {
                pie: {
                    customScale: 1,
                },
            },
            legend: {
                show: false,
            },
            labels: userTypes.map((item) => item.label),
        },
        seriesPie: userTypes.map((item) => item.percentage),
    });
    return (
        <div className="p-4 shadow rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-center">Subscriber vs Non-Subscriber Distribution</h2>
            <Chart options={chartStat.optionsPie} series={chartStat.seriesPie} type="pie" height="250px" />
        </div>
    )
}

export default SubscriberVsNonSubscriber