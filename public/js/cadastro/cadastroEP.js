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
    var selectSetor = document.getElementById("selectSetor")
    var option = document.createElement("option")
    option.text = dados[i].Descricao
    option.value = dados[i].id
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
carregarSetor()

async function carregarDepartamento() {

  await axios.get('/departamento')
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {

        var node = document.createElement('div')

        node.innerHTML = '<div class="form-check customCheck "><label class="form-check-label"><input class="form-check-input checkboxCadastro" type="checkbox" value="' +
          response.data[i].Codigo + '">' +
          response.data[i].Descricao + '<span class="form-check-sign"><span class="check"></span></span></label></div>'
        document.getElementById('checkbox').appendChild(node);

      }
    })
    .catch(function (error) {
      console.log(error)
    })
}
carregarDepartamento()
async function carregarDepartamentoAltera() {

  await axios.get('/departamento')
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {

        var node = document.createElement('div')

        node.innerHTML = '<div class="form-check customCheck "><label class="form-check-label"><input class="form-check-input checkboxAltera" type="checkbox" value="' +
          response.data[i].Codigo + '">' +
          response.data[i].Descricao + '<span class="form-check-sign"><span class="check"></span></span></label></div>'
        document.getElementById('checkboxAltera').appendChild(node);

      }
    })
    .catch(function (error) {
      console.log(error)
    })
   
}
carregarDepartamentoAltera()

async function carregarEPI() {
  var dados
  await axios.get('/epi')
    .then(function (response) {
      dados = response.data
    })
    .catch(function (erro) {
      console.log(erro)
    })
  for (var i = 0; i < dados.length; i++) {
    var selectEPIAltera = document.getElementById("selectEPIAltera")
    var option = document.createElement("option")
    option.text ='Código: '+dados[i].id+' - '+'Descrição: ' +  dados[i].DescricaoInterno
    option.value = dados[i].id
    selectEPIAltera.add(option)
  }
}
carregarEPI()


async function cadastrarEPI() {
  event.preventDefault()

  var tipoIndex = document.getElementById("selectTipo").selectedIndex;
  var tipoOtion = document.getElementById("selectTipo").options;
  var tipo = tipoOtion[tipoIndex].text

  var agentesIndex = document.getElementById("selectAgentes").selectedIndex;
  var agentesOption = document.getElementById("selectAgentes").options;
  var agentes = agentesOption[agentesIndex].text

  var riscosIndex = document.getElementById("selectRiscos").selectedIndex;
  var riscosOption = document.getElementById("selectRiscos").options;
  var riscos = riscosOption[riscosIndex].text

  var setorIndex = document.getElementById("selectSetor").selectedIndex;
  var setorOption = document.getElementById("selectSetor").options;
  var setor = setorOption[setorIndex].text

  await axios.post('/epi',
    {
      "DescricaoInterno": document.getElementById('DescricaoInterno').value,
      "DescricaoMinTrabalho": document.getElementById('DescricaoMinTrabalho').value,
      "Tipo": tipo,
      "Agentes": agentes,
      "Riscos": riscos,
      "Setor": setor,
    }
  )
    .then(function (response) {
      sessionStorage.setItem('idEpi', response.data.id)


    })
    .catch(function (erro) {
      console.log(erro)


    })
    mudaCheckbox()
  var local = sessionStorage.getItem('CodDepartamentos')

  if (local) {

    var dados = JSON.parse(local)
    var IdDepartamento = [...dados]
    
    await axios.post('/epidepartamento',
      {
        "idEpi": sessionStorage.getItem('idEpi'),
        "idDepartamento": IdDepartamento
      })
      .then(function (response) {
        Swal.fire({
          allowOutsideClick: false,
          position: 'center',
          icon: 'success',
          title: 'EPI cadastrado com sucesso !',
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
          title: 'Erro no cadastro ! Verificar log !',
          showConfirmButton: false,
          timer: 1800

        }).then((result) => {

          if (result.dismiss === Swal.DismissReason.timer) {
            document.getElementById('formCadastro').reset()           
          }
        })
      })
  }
}

function igualaRiscos() {

  var agente = document.getElementById('selectAgentes').selectedIndex
  var riscos = document.getElementById('selectRiscos')

  if (agente == 1 || agente == 2 || agente == 3 || agente == 4) {
    riscos[0].text = 'FÍSICO'
  }
  else if (agente > 4 && agente < 8) {
    riscos[0].text = 'BIOLÓGICOS'
  }
  else if (agente = 8) {
    riscos[0].text = 'QUÍMICO'
  }

}
function igualaRiscosAltera() {

  var agente = document.getElementById('selectAgentesAltera').selectedIndex
  var riscos = document.getElementById('selectAgentesAltera')

  if (agente == 1 || agente == 2 || agente == 3 || agente == 4) {
    riscos[0].text = 'FÍSICO'
  }
  else if (agente > 4 && agente < 8) {
    riscos[0].text = 'BIOLÓGICOS'
  }
  else if (agente = 8) {
    riscos[0].text = 'QUÍMICO'
  }

}
async function buscarEPI() {

  
  var epiIndex = document.getElementById("selectEPIAltera").selectedIndex;
  var epiOption = document.getElementById("selectEPIAltera").options;
  var epi = epiOption[epiIndex].value
  console.log(epiIndex)
  var tipoIndex = document.getElementById("selectTipoAltera").selectedIndex;
  var tipooption = document.getElementById("selectTipoAltera").options;

  var agentasIndex = document.getElementById("selectAgentesAltera").selectedIndex;
  var agentesoption = document.getElementById("selectAgentesAltera").options;

  var riscosindex = document.getElementById("selectRiscosAltera").selectedIndex;
  var riscosoption = document.getElementById("selectRiscosAltera").options;

  var setorindex = document.getElementById("selectSetorAltera").selectedIndex;
  var setoroption = document.getElementById("selectSetorAltera").options;


  if (epiIndex > 0) {
    await axios.get('/epi/' + epi)
      .then(function (response) {
        sessionStorage.setItem('idEpi', response.data.id)
        document.getElementById('composAltera').disabled = false
        document.getElementById('DescricaoInternoAltera').value = response.data.DescricaoInterno
        document.getElementById('DescricaoMinTrabalhoAltera').value = response.data.DescricaoMinTrabalho
        tipooption[0].text = response.data.Tipo
        agentesoption[0].text = response.data.Agentes
        riscosoption[0].text = response.data.Riscos
        setoroption[0].text = response.data.Setor
       
      })
      .catch(function (erro) {
        console.log(erro)

      })
  
  await axios.get('/epidepartamento/' + sessionStorage.getItem('idEpi'))
  .then(function (response) {
    var inputs = document.querySelectorAll(".checkboxAltera")
    
    var count1 = 0
    var count2 = 0

    while (count1 <= inputs.length) { //7
      
      while (count2 <= response.data.epi.length) {     //3      
        
        if (inputs[count1].value == response.data.epi[count2].idDepartamento) {

          inputs[count1].checked = true

          count2++ 
       
        }
        count1++ //6
      }
      
    } 

  })   
}
  if (epiIndex === 0) {
    limparCampos()
  }

}

async function alterarEPI() {
  event.preventDefault()

  var epiIndex = document.getElementById("selectEPIAltera").selectedIndex;
  var epiOption = document.getElementById("selectEPIAltera").options;
  var epi = epiOption[epiIndex].value

  var tipoIndex = document.getElementById("selectTipoAltera").selectedIndex;
  var tipoOtion = document.getElementById("selectTipoAltera").options;
  var tipo = tipoOtion[tipoIndex].text

  var agentesIndex = document.getElementById("selectAgentesAltera").selectedIndex;
  var agentesOption = document.getElementById("selectAgentesAltera").options;
  var agente = agentesOption[agentesIndex].text

  var riscosIndex = document.getElementById("selectRiscosAltera").selectedIndex;
  var riscosOption = document.getElementById("selectRiscosAltera").options;
  var riscos = riscosOption[riscosIndex].text

  var setorIndex = document.getElementById("selectSetorAltera").selectedIndex;
  var setorOption = document.getElementById("selectSetorAltera").options;
  var setor = setorOption[setorIndex].text

  var data = {
    "DescricaoInterno": document.getElementById('DescricaoInternoAltera').value,
    "DescricaoMinTrabalho": document.getElementById('DescricaoMinTrabalhoAltera').value,
    "Tipo": tipo,
    "Agentes": agente,
    "Riscos": riscos,
    "Setor": setor,
  }


  console.log(data)
  await axios.put('/epi/' + epi, data)
    .then(function (response) {

    })
    .catch(function (erro) {
      console.log(erro)
    })

    mudaCheckboxAltera()

    var local = sessionStorage.getItem('CodDepartamentos')

    if (local) {
  
      var dados = JSON.parse(local)
      var IdDepartamento = [...dados]
      
      await axios.put('/epidepartamento',
        {
          "idEpi": sessionStorage.getItem('idEpi'),
          "idDepartamento": IdDepartamento
        })
        .then(function (response) {
          Swal.fire({
            allowOutsideClick: false,
            position: 'center',
            icon: 'success',
            title: 'EPI Alterado com sucesso !',
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
            title: 'Erro na alteração! Verificar log !',
            showConfirmButton: false,
            timer: 1800
  
          }).then((result) => {
  
            if (result.dismiss === Swal.DismissReason.timer) {
              document.getElementById('formAltera').reset()           
            }
          })
        })
    }
}


async function excluirEPI() {

  var epiIndex = document.getElementById("selectEPIAltera").selectedIndex;
  var epiOption = document.getElementById("selectEPIAltera").options;
  var epi = epiOption[epiIndex].value

  Swal.fire({
    allowOutsideClick: false,
    title: 'Excluir EPI',
    text: "Você tem certeza ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Sim'
  }).then((result) => {
    if (result.value) {

      axios.delete('/epidepartamento/' + epi)

      axios.delete('/epi/' + epi)
        .then(function (response) {
          Swal.fire(
            'Deletado!',
            'EPI deletado com sucesso.',
            'success',
            location.reload()
          )
        })
        .catch(function (erro) {
          console.log(erro)
        })

    }
  })

}

function limparCampos() {

  document.getElementById('composAltera').disabled = true
  document.getElementById('formAltera').reset()
  document.getElementById('selectEPIAltera').selectedIndex = 0
  document.getElementById('selectTipoAltera').selectedIndex = 0
  document.getElementById('selectAgentesAltera').selectedIndex = 0
  document.getElementById('selectRiscosAltera').selectedIndex = 0
  document.getElementById('selectSetorAltera').selectedIndex = 0
}

function mudaCheckbox() {
  var CodDepartamentos = Array.from(document.querySelectorAll(".checkboxCadastro:checked"))
    .map(function (checkbox) {
      return checkbox.value
    })

  sessionStorage.setItem('CodDepartamentos', JSON.stringify(CodDepartamentos))

}
function mudaCheckboxAltera() {
  var CodDepartamentos = Array.from(document.querySelectorAll(".checkboxAltera:checked"))
    .map(function (checkbox) {
      return checkbox.value
    })

  sessionStorage.setItem('CodDepartamentos', JSON.stringify(CodDepartamentos))

}