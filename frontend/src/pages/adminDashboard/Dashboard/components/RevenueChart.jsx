import React, { useState, useEffect } from 'react';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Chart from "react-apexcharts";
import { getRevenue } from '../../../../services/revenueService';
import { NavLink } from 'react-router-dom';

const RevenueChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  ("RevenueData::", revenueData)
  const [chartStat, setChartStat] = useState({
    optionsBar: {
      chart: {
        id: "line-chart",
        toolbar: { show: true },
      },
      xaxis: {
        categories: [],
      },
      colors: ['#00FF65'],
    },
    seriesBar: [
      {
        name: "Revenue",
        data: [],
      }
    ],
  });

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await getRevenue('daily');
        setRevenueData(response);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };
    fetchRevenueData();
  }, []);

  useEffect(() => {
    setChartStat((prev) => ({
      ...prev,
      optionsBar: {
        ...prev.optionsBar,
        xaxis: {
          categories: revenueData.map(
            (data) => data.date
          ),
        },
      },
      seriesBar: [
        {
          ...prev.seriesBar[0],
          data: revenueData.map((data) => data.revenue),
        }
      ],
    }));
  }, [revenueData]);

  return (
    <div>
      <div className="p-4 shadow  relative">
        <h2 className="text-xl font-bold mb-4 text-center">Revenue Growth</h2>

        <NavLink to={"/admin/analytics"} end>
          <button className="flex gap-3 items-center absolute top-2 right-2 px-2 py-1 border border-gray-700 text-white rounded hover:bg-gray-600">
            View Report
            <FaArrowUpRightFromSquare />
          </button>
        </NavLink>

        <Chart
          options={chartStat.optionsBar}
          series={chartStat.seriesBar}
          type="area"
          height={"250px"}
        />
      </div>
    </div>
  );
};

export default RevenueChart;
