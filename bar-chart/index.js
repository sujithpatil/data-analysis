
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import './index.css';

const BarChart = (props) => {

    const [data,setData] = useState({});
    const [options, setOptions] = useState({});

    const getPolishedData = () => {
        const map = {};
        for(let row of props.rows) {
            const { Product_SUBCategory, OrderQty } = row;
            const orderQtyNumber = parseInt(OrderQty);
            if(map[Product_SUBCategory]) {
                map[Product_SUBCategory] = map[Product_SUBCategory] + orderQtyNumber;
            } else {
                map[Product_SUBCategory] = orderQtyNumber;
            }
        }
        return map;
    }

    const setGraphData = (polishedData) => {

        const values = Object.values(polishedData).filter(value => !isNaN(value));
        const labels = Object.keys(polishedData).filter(label => label !== 'undefined');

        const data = {
            labels,
            datasets: [
              {
                label: 'Product Types Sold Comparison',
                data: values,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 9, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(155, 59, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 9, 132, 0.2)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(155, 59, 64, 0.2)',
                ],
                borderWidth: 1,
              },
            ],
        }

        const options = {
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                  },
                },
              ],
            },
        };

        setOptions(options)

        setData(data);
    }

    useEffect(()=>{
        const polishedData = getPolishedData();
        setGraphData(polishedData);
    }, [])

    return <div className='component d3graph' >
        <div className='graph-container'>
            {data.labels && <Bar width={400} height={500} data={data} options={options} /> }
        </div>
    </div>
}

export default BarChart;