
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux';


function Datos() {
  const amount = useSelector(state => state.orderReducer?.orders)
  const amount2 = amount.length > 0 && amount.filter(e => e.state !== "cancelada")

  var datos = []
  if (amount2) {
    datos.push(amount2.map(e => e.price))
    return datos

  }

}

const BarChart = () => {

  var amount3 = Datos()

  return (
    
    <div>
    { amount3 && amount3[0] ? (
      <Bar
        data={{
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Ordenes'],
          datasets: [
            {
              label: 'Total $',
              data: amount3[0],
              backgroundColor: [
                // 'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                // 'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 3,
            },
            // {
            //   label: 'Tiempo',
            //   // data: [2, 3,4, 5, 9, 5],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
      ) : ( null)}
    </div>



  )
}

export default BarChart
