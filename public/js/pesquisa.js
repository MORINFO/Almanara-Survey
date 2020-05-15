

async function carregarFuncionario() {
  let CodFilial = ''

  await axios.get('/funcionario/' + document.getElementById('matricula').value)
    .then(function (response) {
      CodFilial = response.data.CodFilial
      document.getElementById('nome').value = response.data.NomeFuncionario
      document.getElementById('filial').value = response.data.NomeFilial
      document.getElementById('responsavel').disabled = false
    })
    .catch(function (err) {
      console.log(err.response.status)
      alert('Funcionário não encontrado "!')
      document.getElementById('nome').value = ''
      document.getElementById('filial').value = ''
      document.getElementById('gerente').value = ''
      CodFilial == undefined
      document.getElementById('matricula').focus()

    })

    if(CodFilial){
      console.log('ok')
      await axios.get('/gerente/' + CodFilial)
      .then(function (response) {
        document.getElementById('gerente').value = response.data.Nome
      })
    }

    
}


async function enviaPesquisa() {

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
