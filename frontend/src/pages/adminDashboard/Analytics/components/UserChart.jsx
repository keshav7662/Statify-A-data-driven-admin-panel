import React, { useState, useEffect } from 'react';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Chart from "react-apexcharts";
import { NavLink } from 'react-router-dom';

const UserChart = ({ customerData, chartColor }) => {
    const [chartStat, setChartStat] = useState({
        optionsBar: {
            chart: {
                id: "comparison-chart",
                toolbar: { show: true },
            },
            xaxis: {
                categories: [],
            },
            colors: [chartColor],
        },
        seriesBar: [
            {
                name: "Customer",
                data: [],
            },
        ],
    });

    useEffect(() => {
        setChartStat((prev) => ({
            ...prev,
            optionsBar: {
                ...prev.optionsBar,
                xaxis: {
                    categories: customerData.map((data) => data.month || data.quarter || data.year),
                },
                colors: [chartColor],
            },
            seriesBar: [
                {
                    name: "Customer",
                    data: customerData.map((data) => data.count),
                },
            ],
        }));
    }, [customerData, chartColor]);

    return (
        <Chart
            options={chartStat.optionsBar}
            series={chartStat.seriesBar}
            type={"bar"}
        />
    );
};

export default UserChart;
