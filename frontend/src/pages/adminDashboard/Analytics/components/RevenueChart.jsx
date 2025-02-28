import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";

const RevenueChart = ({ revenueData, chartColor }) => {
  const [chartStat, setChartStat] = useState({
    optionsBar: {
      chart: {
        id: "comparison-chart",
        toolbar: { show: true },
      },
      xaxis: {
        categories: [],
      },
      colors: [chartColor], // Initialize with the passed chartColor
    },
    seriesBar: [
      {
        name: "Revenue",
        data: [],
      },
    ],
  });

  // Update chart data and color when revenueData or chartColor changes
  useEffect(() => {
    setChartStat((prev) => ({
      ...prev,
      optionsBar: {
        ...prev.optionsBar,
        xaxis: {
          categories: revenueData.map((data) => data.month || data.quarter || data.year),
        },
        colors: [chartColor],
      },
      seriesBar: [
        {
          name: "Revenue",
          data: revenueData.map((data) => data.revenue),
        },
      ],
    }));
  }, [revenueData, chartColor]);

  return (
    <Chart
      options={chartStat.optionsBar}
      series={chartStat.seriesBar}
      type={"bar"}
    />
  );
};

export default RevenueChart;
