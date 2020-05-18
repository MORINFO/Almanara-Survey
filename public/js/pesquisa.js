async function carregarFuncionario() {
  event.preventDefault()


  await axios.get('/funcionario/' + document.getElementById('matricula').value)
    .then(function (response) {
      sessionStorage.setItem('CodFilial', response.data.CodFilial)
      document.getElementById('nomeFuncionario').value = response.data.NomeFuncionario
      document.getElementById('filial').value = response.data.NomeFilial
      document.getElementById('responsavel').disabled = false
      document.getElementById('temperatura').disabled = false
      document.getElementById('gerente').disabled = false
    })
    .catch(function (err) {
      console.log(err)
      window.setTimeout(function () {
        document.getElementById('matricula').focus();
      }, 2000);
      Swal.fire({
        allowOutsideClick: false,
        position: 'center',
        icon: 'error',
        title: 'Funcionário não localizado !',
        showConfirmButton: false,
        timer: 1500

      }).then((result) => {

        if (result.dismiss === Swal.DismissReason.timer) {
          document.getElementById('FormPesquisa').reset()
          limparCampos()
        }
      })

    })

  if (sessionStorage.getItem('CodFilial')) {
    await axios.get('/gerente/' + sessionStorage.getItem('CodFilial'))
      .then(function (response) {
        document.getElementById('gerente').value = response.data.Nome
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}

async function enviaPesquisa() {
  event.preventDefault()
  let enviaEmail = 'N'

  let sintoma = 'Sim'
  let febreGripe = 'Sim'
  let contatoParente = 'Sim'
  let historicoCovid = 'Sim'

  if (document.getElementById('sintoma1').checked == false) {
    sintoma = 'Não'
  }
  if (document.getElementById('febreGripe1').checked == false) {
    sintoma = 'Não'
  }
  if (document.getElementById('contatoParente1').checked == false) {
    sintoma = 'Não'
  }
  if (document.getElementById('historicoCovid1').checked == false) {
    sintoma = 'Não'
  }


  if (document.getElementById('sintoma1').checked == false) {
    enviaEmail = 'S'
  }
  if (document.getElementById('febreGripe1').checked == false) {
    enviaEmail = 'S'
  }
  if (document.getElementById('contatoParente1').checked == false) {
    enviaEmail = 'S'
  }
  if (document.getElementById('historicoCovid1').checked == false) {
    enviaEmail = 'S'
  }


  // document.getElementById('').checked == false ||
  // document.getElementById('').checked == false ||
  // document.getElementById('').checked == false) {
  // enviaEmail == 'S'


  await axios.post('/gravaPesquisa',
    {
      "CodFilial": sessionStorage.getItem('CodFilial'),
      "Filial": document.getElementById('filial').value,
      "NomeFuncionario": document.getElementById('nomeFuncionario').value,
      "Matricula": document.getElementById('matricula').value,
      "Responsavel": document.getElementById('responsavel').value,
      "Gerente": document.getElementById('gerente').value,
      "Temperatura": document.getElementById('temperatura').value,
      "Sintomas": sintoma,
      "FebreGripe": febreGripe,
      "ContatoParente": contatoParente,
      "HistoricoCovid": historicoCovid,
      'enviaEmail': enviaEmail
    })
    .then(function (response) {
      Swal.fire({
        allowOutsideClick: false,
        position: 'center',
        icon: 'success',
        title: 'Pesquisa enviada com sucesso !',
        showConfirmButton: false,
        timer: 2500

      }).then((result) => {

        if (result.dismiss === Swal.DismissReason.timer) {
          limparCampos()
          location.replace('/')
        }
      })

    })
    .catch(function (erro) {

    })




}
function limparCampos() {

  document.getElementById('FormPesquisa').reset()
  sessionStorage.clear()

}
