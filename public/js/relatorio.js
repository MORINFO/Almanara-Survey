async function filtrar(){
  event.preventDefault()
  let tabela ='<tr  class="text-center"><th>Filial</th><th>Nome Funcionario</th><th>Matrícula/CPF</th><th>Temperatura</th><th> Você está com algum sintoma de gripe ou resfriado (tosse, coriza, espirros, etc.) ?</th><th>Na última semana você apresentou febre (acima de 37,8°C) ou sintomas de gripe associados com dificuldade para respirar?</th><th>Na última semana, você esteve em contato com algum caso confirmado de COVID-19?</th><th>Você já foi diagnosticado com COVID-19?*</th><th>Data e Hora da Pesquisa</th></tr>'
  document.getElementById('tblData').innerHTML = '<h2 class="text-center">Carregando...<h2>'
  await axios.post('/api/relatorio',
  {
    "Matricula": document.getElementById('matricula').value,
    "Data": document.getElementById('data').value,
    "Filial": document.getElementById('selectFiliais').value
  })
  .then(function(response){
    response.data.map(pesquisa =>
      tabela += `<tr class="text-center"><td>${pesquisa.Filial}</td><td>${pesquisa.NomeFuncionario}</td><td>${pesquisa.Matricula}</td><td>${pesquisa.Temperatura}</td><td>${pesquisa.Sintomas}</td><td>${pesquisa.FebreGripe}</td><td>${pesquisa.ContatoParente}</td><td>${pesquisa.HistoricoCovid} ${pesquisa.DiaDiagnosticado  ? pesquisa.DiaDiagnosticado : '' }</td><td>${pesquisa.Data}  ${pesquisa.Hora}</td></tr>` )
      document.getElementById('tblData').innerHTML = tabela
  })
  .catch(function(erro){
    console.log(erro)
    alert('Problema ao filtrar os dados ! Informar a MOR.')
    document.getElementById('form').reset()
    document.getElementById('tblData').innerHTML = '<tr  class="text-center"><th>Nome Funcionario</th><th>Temperatura</th><th>Data e Hora da Pesquisa</th></tr>'
  })

}

async function carregaFilial(){
  let options = '<option value= "0">...</option>'
  await axios.get('/filiais')
  .then(function(response){
    response.data.map(filial =>
      options += `<option value="${filial.Codigo}">${filial.Nome}</option>` )
      document.getElementById('selectFiliais').innerHTML = options
  })
}
carregaFilial()