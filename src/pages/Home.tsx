import React, { useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Awards per year',
    },
  },
};

const axiosOptions : any = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/actors/get-awards',
  params: { nconst: 'nm0001667' },
  headers: {
    'x-rapidapi-host': 'imdb8.p.rapidapi.com',
    'x-rapidapi-key': '67d1a46933mshcfc9e57e8d571b7p16ba02jsn0e6a357b761e',
  },
};
function count(arr: any[]) {
  return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
}
const Home = () => {
  const [awardData, setAwardData] = React.useState<any>();
  const [chartData, setChartData] = React.useState<any>();
  const [labelData, setLabelData] = React.useState<any>();
  useEffect(() => {
    axios.request(axiosOptions).then((response) => {
      const { awards } = response.data.resource;
      const awardYears = awards.map((award: any) => award.year);
      setAwardData(awardYears);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    if (awardData) {
      const awardPerYear = count(awardData);
      const sortedYears = Object.keys(awardPerYear).sort((a, b) => ((b as any) - (a as any)));
      const sortedData = sortedYears.map((year: any) => ({
        year,
        count: awardPerYear[year],
      }));
      setChartData(sortedData);
    }
  }, [awardData]);

  useEffect(() => {
    if (chartData) {
      const labels = chartData.map((d: any) => d.year);
      const data = {
        labels,
        datasets: [
          {
            label: 'Awards',
            data: chartData.map((d: any) => d.count),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      setLabelData(data);
    }
  }, [chartData]);
  useEffect(() => {
    if (labelData) {
      console.log(labelData);
      console.log(options);
    }
  }, [labelData]);

  return (
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="bar">
        {labelData && <Bar data={labelData} options={options} />}
      </div>
    </div>
  );
};

export default Home;
