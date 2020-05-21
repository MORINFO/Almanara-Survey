var ctx = document.getElementById('myChart').getContext('2d');


async function BuscarDados() {
  var Filial
  await axios.get('/Pesquisa')
    .then(function (response) {

      Filial = response.data

    })
    .catch(function (err) {
      console.log(err)
    })
  console.log(Filial)

  const filiais = Filial.map((filial, index, array) => {
    return filial.Filial;
  })
  const totais = Filial.map((filial, index, array) => {
    return filial.Total;
  })

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: filiais,
      datasets: [{
        label: 'Incidência[s]',
        data: totais,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });



}


BuscarDados()



