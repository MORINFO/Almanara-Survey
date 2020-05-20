async function carregarFuncionario() {
  event.preventDefault()

  if (document.getElementById('matricula').value == '') {
    document.getElementById('responsavel').disabled = true
    document.getElementById('temperatura').disabled = true
    document.getElementById('gerente').disabled = true
    limparCampos()
  }

  if (document.getElementById('matricula').value > 0) {
    await axios.get('/funcionario/' + document.getElementById('matricula').value)
      .then(function (response) {
        sessionStorage.setItem('CodFilial', response.data.CodFilial)
        document.getElementById('nomeFuncionario').value = response.data.NomeFuncionario
        document.getElementById('filial').value = response.data.NomeFilial
        document.getElementById('responsavel').disabled = false
        document.getElementById('temperatura').disabled = false
        //document.getElementById('gerente').disabled = false
      })
      .catch(function (err) {
        console.log(err)
        document.getElementById('FormPesquisa').reset()

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
            var elemento = document.getElementById("checkbox");
            while (elemento.firstChild) {
              elemento.removeChild(elemento.firstChild);
            }
            limparCampos()
          }
        })

      })

    if (sessionStorage.getItem('CodFilial')) {
      var elemento = document.getElementById("checkbox");
      while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
      }
      await axios.get('/gerente/' + sessionStorage.getItem('CodFilial'))
        .then(function (response) {

          for (var i = 0; i < response.data.length; i++) {

            var node = document.createElement('div')

            node.innerHTML = '<div class="form-check  "><label class="form-check-label"><input id="check' + [i] + '" class="form-check-input checkboxAltera" type="checkbox" value="' +
              response.data[i].Email + '" > ' +
              response.data[i].Nome + '<span class="form-check-sign"><span class="check"></span></span></label></div>'
            document.getElementById('checkbox').appendChild(node);

            if (response.data[i].CodFilial == sessionStorage.getItem('CodFilial')) {

              document.getElementById('check' + [i] + '').checked = true
            }

            if (response.data[i].CodFilial == 4 && response.data[i].Turnante == 'S') {

              document.getElementById('check' + [i] + '').checked = false
            }

            mudaCheckbox()

          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }

  }

}

async function enviaPesquisa() {
  event.preventDefault()

  var local = sessionStorage.getItem('emails')



  var dados = JSON.parse(local)
  var gerentes = [...dados]

  let campos = document.getElementById('campos')
  campos.disabled = true

  let enviaEmail = 'N'

  let sintoma = 'Sim'
  let febreGripe = 'Sim'
  let contatoParente = 'Sim'
  let historicoCovid = 'Sim'

  if (document.getElementById('sintoma1').checked == true) {
    sintoma = 'Não'
  }
  if (document.getElementById('febreGripe1').checked == true) {
    febreGripe = 'Não'
  }
  if (document.getElementById('contatoParente1').checked == true) {
    contatoParente = 'Não'
  }
  if (document.getElementById('historicoCovid1').checked == true) {
    historicoCovid = 'Não'
  }


  if (document.getElementById('temperatura').value >= 37.8) {
    enviaEmail = 'S'
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

  await axios.post('/gravaPesquisa',
    {
      "CodFilial": sessionStorage.getItem('CodFilial'),
      "Filial": document.getElementById('filial').value,
      "NomeFuncionario": document.getElementById('nomeFuncionario').value,
      "Matricula": document.getElementById('matricula').value,
      "Responsavel": document.getElementById('responsavel').value,
      "Gerentes": gerentes,
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
      campos.disabled = false
    })

}
function limparCampos() {

  document.getElementById('FormPesquisa').reset()
  sessionStorage.clear()
  localStorage.clear()
  campos.disabled = false

}
function mudaCheckbox() {
  var emails = Array.from(document.querySelectorAll(".checkboxAltera:checked"))
    .map(function (checkbox) {
      return checkbox.value
    })

  sessionStorage.setItem('emails', JSON.stringify(emails))

}