import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function AdminReports() {
  const barChartRef = useRef(null); // Ref for bar chart
  const pieChartRef = useRef(null); // Ref for pie chart
  let barChartInstance = useRef(null); // Store the bar chart instance
  let pieChartInstance = useRef(null); // Store the pie chart instance

  useEffect(() => {
    // Destroy charts if they already exist
    if (barChartInstance.current) barChartInstance.current.destroy();
    if (pieChartInstance.current) pieChartInstance.current.destroy();

    // Bar Chart for Placement by Department
    const ctxBar = barChartRef.current.getContext('2d');
    barChartInstance.current = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Management', 'Biotechnology'],
        datasets: [
          {
            label: 'Number of Placements',
            data: [120, 90, 80, 60, 50, 30],
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EC407A', '#26C6DA'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Pie Chart for Job Offers by Top Companies
    const ctxPie = pieChartRef.current.getContext('2d');
    pieChartInstance.current = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys'],
        datasets: [
          {
            label: 'Job Offers',
            data: [50, 40, 30, 25, 20],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      },
    });

    // Cleanup to destroy charts on component unmount
    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
      if (pieChartInstance.current) pieChartInstance.current.destroy();
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      {/* Bar Chart */}
      <div className="chart-container-bar">
        <h3 className="report-title">Placements by Department</h3>
        <canvas ref={barChartRef}></canvas>
      </div>

      {/* Pie Chart */}
      <div className="chart-container-pie">
        <center>
            <h3 className="report-title">Job Offers by Top Companies</h3>
            <canvas ref={pieChartRef}></canvas>
        </center>
      </div>
    </div>
  );
}
