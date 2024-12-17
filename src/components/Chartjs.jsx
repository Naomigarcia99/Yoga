import { Bar } from "react-chartjs-2";
import { useSaleContext } from "../context/SalesContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chartjs() {
  const { sales } = useSaleContext();

  const getMonthName = (monthIndex) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  };

  const data = sales.reduce((acc, sale) => {
    const date = new Date(sale.date);
    const month = date.getMonth();

    if (!acc[month]) {
      acc[month] = { camisetas: 0, pantalones: 0 };
    }

    if (sale.name === "Camiseta") acc[month].camisetas += sale.quantity;
    if (sale.name === "Pantalón") acc[month].pantalones += sale.quantity;
    return acc;
  }, {});

  const labels = Object.keys(data).map((month) => getMonthName(Number(month)));
  const camisetaData = Object.values(data).map((data) => data.camisetas);
  const pantalonData = Object.values(data).map((data) => data.pantalones);

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Camisetas",
        data: camisetaData,
        backgroundColor: "#2563eb",
        borderWidth: 1,
      },
      {
        label: "Pantalones",
        data: pantalonData,
        backgroundColor: "#d97706",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "2024 Sales" },
    },
    scales: {
      x: { title: { display: true, text: "Months" } },
      y: {
        title: { display: true, text: "Quantity sold" },
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <Bar data={barChartData} options={options} />
      </div>
    </div>
  );
}
