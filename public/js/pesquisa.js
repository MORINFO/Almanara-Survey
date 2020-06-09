async function carregarFuncionario() {
  var index = document.getElementById("selectFiliais").selectedIndex;
  var options = document.getElementById("selectFiliais").options;
  event.preventDefault()

  if (document.getElementById('matricula').value == '') {
    document.getElementById('responsavel').disabled = true
    document.getElementById('temperatura').disabled = true
    limparCampos()
  }

  if (document.getElementById('matricula').value > 0) {
    await axios.get('/funcionario/' + document.getElementById('matricula').value)
      .then(function (response) {
        sessionStorage.setItem('CodFilial', response.data.CodFilial)
        document.getElementById('nomeFuncionario').value = response.data.NomeFuncionario
        // document.getElementById('filial').value = response.data.NomeFilial
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
    await axios.get('/funcionario')
      .then(function (response) {

        var elemento = document.getElementById("selectFiliais");
        while (elemento.firstChild) {
          elemento.removeChild(elemento.firstChild);
        }
        var filiais = response.data[1]
        // adicionado esta função para eliminar o bug da primeira posição do combo
        // adiciona 1 elemento vazio na posição 0
        filiais.unshift('')

        for (var i = 0; i < filiais.length; i++) {

          var selectFiliais = document.getElementById("selectFiliais")
          var option = document.createElement("option")
          option.text = filiais[i].Nome
          option.value = filiais[i].Codigo
          selectFiliais.add(option)


          if (sessionStorage.getItem('CodFilial') == filiais[i].Codigo) {
            options[0].text = filiais[i].Nome
            options[0].value = filiais[i].Codigo
          }
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }
  mudaGerente()
}
async function mudaGerente() {
  var index = document.getElementById("selectFiliais").selectedIndex;
  var options = document.getElementById("selectFiliais").options;

  if (options[index].value) {
    var elemento = document.getElementById("checkbox");
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }

    await axios.get('/gerente/' + options[index].value)
      .then(function (response) {

        for (var i = 0; i < response.data.length; i++) {

          var node = document.createElement('div')

          node.innerHTML = '<div class="form-check  "><label class="form-check-label"><input id="check' + [i] + '" class="form-check-input checkboxAltera" type="checkbox" value="' +
            response.data[i].Email + '" > ' +
            response.data[i].Nome + '<span class="form-check-sign"><span class="check"></span></span></label></div>'
          document.getElementById('checkbox').appendChild(node);

          if (response.data[i].CodFilial == options[index].value) {

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

async function enviaPesquisa() {
  event.preventDefault()
  var index = document.getElementById("selectFiliais").selectedIndex;
  var options = document.getElementById("selectFiliais").options;

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


  let dataSelecionado = moment(document.getElementById('dataConfirmado').value).format('YYYY/MM/DD');

  var today = moment().format('YYYY/MM/DD');

  date1 = new Date(dataSelecionado);
  date2 = new Date(today);

  var diferenca = (date2 - date1); //diferença em milésimos e positivo
  var dia = 1000 * 60 * 60 * 24; // milésimos de segundo correspondente a um dia
  var totalDias = Math.round(diferenca / dia); //valor total de dias arredondado

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

  if (totalDias < 15) {
    enviaEmail = 'S'
  }

  console.log(enviaEmail)
  await axios.post('/gravaPesquisa',
    {
      "CodFilial": options[index].value,
      "Filial": options[index].text,
      "NomeFuncionario": document.getElementById('nomeFuncionario').value,
      "Matricula": document.getElementById('matricula').value,
      "Responsavel": document.getElementById('responsavel').value,
      "Gerentes": gerentes,
      "Temperatura": document.getElementById('temperatura').value,
      "Sintomas": sintoma,
      "FebreGripe": febreGripe,
      "ContatoParente": contatoParente,
      "HistoricoCovid": historicoCovid,
      "DiaDiagnosticado": document.getElementById('dataConfirmado').value,
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
          location.replace('/principal')
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

document.getElementById("historicoCovid1").addEventListener("click", function () {
  document.getElementById('data').style.display = 'none';
  document.getElementById('dataConfirmado').value = ''
  document.getElementById('dataConfirmado').required = false
});

document.getElementById("historicoCovid2").addEventListener("click", function () {
  document.getElementById('data').style.display = 'block';
  document.getElementById('dataConfirmado').required = true

});

//FUNCAO QUE DEIXA A DATA ATE HOJE.
var dateControl = document.querySelector('input[type="date"]');
var today = moment().format('YYYY-MM-DD');

dateControl.max = today;
