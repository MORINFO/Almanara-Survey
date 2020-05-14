async function cadastrarSetor() {
  event.preventDefault()
  await axios.post('/setor',
    {
      "Descricao": document.getElementById('Descricao').value
    })
    .then(function (response) {
      Swal.fire({
        allowOutsideClick: false,
        position: 'center',
        icon: 'success',
        title: 'Setor cadastrado com sucesso !',
        showConfirmButton: false,
        timer: 1800
  
      }).then((result) => {
  
        if (result.dismiss === Swal.DismissReason.timer) {
          location.reload()          
        }
      })
      
    })
    .catch(function (erro) {
      console.log(err)     
      Swal.fire({
        allowOutsideClick: false,
        position: 'center',
        icon: 'error',
        title: 'Problema no cadastro !',
        showConfirmButton: false,
        timer: 1800
  
      }).then((result) => {
  
        if (result.dismiss === Swal.DismissReason.timer) {
          location.reload()          
        }
      })
    })
}

async function carregarSetor() {
  var dados
  await axios.get('/setor')
    .then(function (response) {
      dados = response.data
    })
    .catch(function (erro) {
      console.log(erro)
    })
  for (var i = 0; i < dados.length; i++) {
    var SelectEmpresa = document.getElementById("SelectSetor")
    var option = document.createElement("option")
    option.text = dados[i].Descricao
    option.value = dados[i].id
    SelectEmpresa.add(option)
  }
}
carregarSetor()

function igualaSetor() {

  var x = document.getElementById("SelectSetor").selectedIndex;
  var y = document.getElementById("SelectSetor").options;
  document.getElementById('DescricaoAltera').value = y[x].text

  document.getElementById('campos').disabled = false

  sessionStorage.setItem('idSetor', y[x].value)

  if (document.getElementById("SelectSetor").selectedIndex == 0) {
    document.getElementById('DescricaoAltera').value = ''
    document.getElementById('campos').disabled = true
  }
}

async function alterarSetor() {
  event.preventDefault()

  await axios.put('/setor/' + sessionStorage.getItem('idSetor'),
    {
      "Descricao": document.getElementById('DescricaoAltera').value
    })
    .then(function (response) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Setor alterado com sucesso !',
        showConfirmButton: false,
        timer: 1800
  
      }).then((result) => {
  
        if (result.dismiss === Swal.DismissReason.timer) {
          location.reload()
        }
      })    
    })
    .catch(function (erro) {
      console.log(erro)
      Swal.fire({
        allowOutsideClick: false,
        position: 'center',
        icon: 'error',
        title: 'Problema para alterar o Setor !',
        showConfirmButton: false,
        timer: 1800
  
      }).then((result) => {
  
        if (result.dismiss === Swal.DismissReason.timer) {
          location.reload()
        }
      })
      document.getElementById('formAltera').reset()
    })
}

async function excluirSetor(){
  var x = document.getElementById("SelectSetor").selectedIndex;
  var y = document.getElementById("SelectSetor").options;

  await axios.delete('/setor/' + y[x].value)
  .then(function(response){
    Swal.fire({
      allowOutsideClick: false,
      position: 'center',
      icon: 'success',
      title: 'Setor excluido com sucesso !',
      showConfirmButton: false,
      timer: 1800

    }).then((result) => {

      if (result.dismiss === Swal.DismissReason.timer) {
        location.reload()
      }
    })
  })
  .catch(function(erro){
    console.log(erro)
    Swal.fire({
      allowOutsideClick: false,
      position: 'center',
      icon: 'error',
      title: 'Problema na exclusão, verificar o log !',
      showConfirmButton: false,
      timer: 1800

    }).then((result) => {

      if (result.dismiss === Swal.DismissReason.timer) {
       // location.reload()
      }
    })
  })
}