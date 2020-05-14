async function carregarFilial() {
  var dados
  await axios.get('/filial')
    .then(function (response) {
      dados = response.data
    })
    .catch(function (erro) {
      console.log(erro)
    })
  for (var i = 0; i < dados.length; i++) {
    var selectSetor = document.getElementById("selectFilial")
    var option = document.createElement("option")
    option.text = dados[i].Codigo + ' - ' + dados[i].Nome
    option.value = dados[i].Codigo
    selectSetor.add(option)
  }

}
carregarFilial()

async function carregarGerente() {
  var dados
  await axios.get('/gerente')
    .then(function (response) {
      dados = response.data
    })
    .catch(function (erro) {
      console.log(erro)
    })
  for (var i = 0; i < dados.length; i++) {
    var selectSetor = document.getElementById("selectGerente")
    var option = document.createElement("option")
    option.text = dados[i].Nome
    option.value = dados[i].Codigo
    selectSetor.add(option)
  }

}
carregarGerente()

async function carregarFuncionario() {
  var dados
  await axios.get('/funcionario')
    .then(function (response) {
      dados = response.data
    })
    .catch(function (erro) {
      console.log(erro)
    })
  for (var i = 0; i < dados.length; i++) {
    var selectSetor = document.getElementById("selectFuncionario")
    var option = document.createElement("option")
    option.text = dados[i].Nome
    option.value = dados[i].Codigo
    selectSetor.add(option)
  }

}
carregarFuncionario()

async function enviaPesquisa(){
  
  Swal.fire({
    allowOutsideClick: false,
    position: 'center',
    icon: 'success',
    title: 'Pesquisa enviada com sucesso !',
    showConfirmButton: false,
    timer: 2500

  }).then((result) => {

    if (result.dismiss === Swal.DismissReason.timer) {
      location.reload()
    }
  })
}
