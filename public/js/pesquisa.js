async function carregarFilial() {
  var dados
  await axios.get('/filial')
    .then(function (response) {
      dados = response.data
      console.log(dados)
    })
    .catch(function (erro) {
      console.log(erro)
    })
  for (var i = 0; i < dados.length; i++) {
    var selectSetor = document.getElementById("selectFilial")
    var option = document.createElement("option")
    option.text = dados[i].Nome
    option.value = dados[i].Codigo
    selectSetor.add(option)
  }
  for (var i = 0; i < dados.length; i++) {
    var selectSetor = document.getElementById("selectSetorAltera")
    var option = document.createElement("option")
    option.text = dados[i].Descricao
    option.value = dados[i].id
    selectSetor.add(option)
  }
}
carregarFilial()
