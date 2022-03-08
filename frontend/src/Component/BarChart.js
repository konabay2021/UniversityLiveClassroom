
import React from 'react';
import { Bar } from 'react-chartjs-2';



let BarChart = (props) => {
    const data = {
        labels: props.label,
        datasets: [
            {
                label: 'Score',
                backgroundColor: '#FFCE56',
                borderColor: '#FFCE56',
                borderWidth: 1,
                hoverBackgroundColor: '#FFCE56',
                hoverBorderColor: '#FFCE56',
                data: props.data
            }
        ]
    };

    const options = {
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false
                    },
                    labels: props.label,
                    scaleLabel: {
                        display: true,
                        labelString: 'Quiz Number'
                    }

                }
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Score'
                    }
                }
            ]
        }
    };

    return (
        <div>
            <h2>{props.title}</h2>
            <Bar
                data={data}
                options={options}
            />
        </div>
    )
}
export default BarChart