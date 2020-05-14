var url = window.location.href
var valor = url.split('=')
var idAlteracao = valor[1]

function verificaAlteração() {

  if (idAlteracao === undefined) {
    sessionStorage.removeItem('itemAlteracao')
  }
}
verificaAlteração()

function inicializa() {

  //inicializa a pagina com os camps zerados e bloqueados
  sessionStorage.removeItem('itemAlteracao')
  sessionStorage.removeItem('itens')
  document.getElementById('descricaoEquipamentos').value = ''
  document.getElementById('tipoDoEquipamento').value = ''
  document.getElementById('quantidade').disabled = true
  document.getElementById('quantidade').value = ''
  document.getElementById('add').disabled = true
}
inicializa()

async function carregaFuncionario() {

  now = new Date
  console.log(now.getFullYear() + (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1))

  var dados
  await axios.get('/funcionario')
    .then(function (response) {

      dados = response.data

    })
    .catch(function (erro) {

    })
  for (var i = 0; i < dados.length; i++) {
    var selectFuncionario = document.getElementById("selectFuncionario")
    var option = document.createElement("option")
    option.text = dados[i].Nome
    option.value = dados[i].Codigo
    selectFuncionario.add(option)
  }
}
carregaFuncionario()

async function carregaEPI() {
  var dados
  await axios.get('/epi')
    .then(function (response) {
      dados = response.data
    })
    .catch(function (erro) {
      console.log(erro)
    })
  for (var i = 0; i < dados.length; i++) {
    var selectEPI = document.getElementById("selectEPI")
    var option = document.createElement("option")
    option.text = dados[i].DescricaoInterno
    option.value = dados[i].id
    selectEPI.add(option)
  }
}
carregaEPI()

async function igualaEPI() {
  var epiIndex = document.getElementById("selectEPI").selectedIndex;
  var epiOption = document.getElementById("selectEPI").options;
  var epi = epiOption[epiIndex].value

  if (epiIndex > 0) {
    //inicializa()
    document.getElementById('quantidade').disabled = false
    document.getElementById('add').disabled = false

    await axios.get('/epi/' + epi)
      .then(function (response) {
        document.getElementById('descricaoEquipamentos').value = response.data.DescricaoInterno
        document.getElementById('tipoDoEquipamento').value = response.data.Tipo
      })
      .catch(function (erro) {
        console.log(erro)
      })
  }
  if (epiIndex == 0) {
    document.getElementById('descricaoEquipamentos').value = ''
    document.getElementById('tipoDoEquipamento').value = ''
    document.getElementById('quantidade').disabled = true
    document.getElementById('add').disabled = true
  }
}

async function carregaItens() {

  var funcionarioIndex = document.getElementById("selectFuncionario").selectedIndex;
  var funcionarioOption = document.getElementById("selectFuncionario").options;
  var CodFuncionario = funcionarioOption[funcionarioIndex].value
  var NomeFuncionario = funcionarioOption[funcionarioIndex].text

  var epiIndex = document.getElementById("selectEPI").selectedIndex;
  var epiOption = document.getElementById("selectEPI").options;
  var CodEpi = funcionarioOption[funcionarioIndex].value
  var descricaoEpi = epiOption[epiIndex].text
  var data
  
  if (idAlteracao > 0) {
    document.getElementById('botaoGravar').disabled = false

    await axios.get('/requisicao/' + idAlteracao)
      .then(function (response) {
        funcionarioOption[0].text = response.data.NomeFuncionario
        funcionarioOption[0].value = response.data.CodFuncionario
        document.getElementById('observacao').value = response.data.Observacao

      })
      .catch(function (erro) {
        console.log(erro)
      })

    await axios.get('/itemrequisicao/' + idAlteracao)
      .then(function (response) {
        itens = response.data
        sessionStorage.removeItem('itemAlteracao')
        data = response.data
        sessionStorage.setItem('itemAlteracao', JSON.stringify(response.data))



      })
      .catch(function (erro) {
        console.log(erro)
      })

  }
  itensTabela()
}

function itensTabela() {

  var $table = $('#itensRequisicao')
  var $button = $('#add')
  var data = JSON.parse(sessionStorage.getItem('itemAlteracao'))

  if (data === null) {
    data = []
  }

  $(function () {
    $table.bootstrapTable('load', data)
    $table.bootstrapTable({
      data: data
    })
    $table.bootstrapTable('refresh')
    itens.push($table.bootstrapTable('getData'))
    sessionStorage.setItem('itens',JSON.stringify(itens))   
  })

  $(function () {
    $button.click(function () {
      document.getElementById('botaoGravar').disabled = true
      itens = $table.bootstrapTable('getData')
      var epiIndex = document.getElementById("selectEPI").selectedIndex;
      var epiOption = document.getElementById("selectEPI").options;
      var epi = epiOption[epiIndex].value

      // função que checa se existe o epi na grid
      console.log(itens)
      const verifica = (epi) => {
       
        itens.includes(epi) ? alert('EPI já adicionado !') : adionaNaGrid();
      }

      verifica(epi);    
  
      function adionaNaGrid() {
        sessionStorage.setItem('itemAlteracao','')
        document.getElementById('botaoGravar').disabled = false
        dados.push(itens)
        $table.bootstrapTable('insertRow', {
          index: epi,
          row: {
            CodEquipamento: epi,
            DescricaoEquipamento: document.getElementById('descricaoEquipamentos').value,
            TipoEquipamento: document.getElementById('tipoDoEquipamento').value,
            Quantidade: document.getElementById('quantidade').value
          }
        })
      }
      itens = JSON.stringify($table.bootstrapTable('getData'))
      console.log(itens)
      sessionStorage.setItem('itens', itens)
      document.getElementById("selectEPI").selectedIndex = 0
      document.getElementById('descricaoEquipamentos').value = '',
      document.getElementById('tipoDoEquipamento').value = '',
      document.getElementById('quantidade').value = ''

    })
  })


}
async function gravaRequisicao() {

  document.getElementById('botaoGravar').enabled = false
  sessionStorage.setItem('itens',JSON.stringify($table.bootstrapTable('getData')))
  var id
  var itens =  $table.bootstrapTable('getData')
  var id
  var dados

  var funcionarioIndex = document.getElementById("selectFuncionario").selectedIndex;
  var funcionarioOption = document.getElementById("selectFuncionario").options;
  var CodFuncionario = funcionarioOption[funcionarioIndex].value
  var NomeFuncionario = funcionarioOption[funcionarioIndex].text

  var epiIndex = document.getElementById("selectEPI").selectedIndex;
  var epiOption = document.getElementById("selectEPI").options;
  var CodEpi = funcionarioOption[funcionarioIndex].value
  var descricaoEpi = epiOption[epiIndex].text

  //CHECA SE É ALTERAÇÃO MAIOR QUE 0 POIS É ALTERAÇÃO


  if (idAlteracao === undefined) {

    await axios.post('/requisicao', {
      'CodFuncionario': CodFuncionario,
      'NomeFuncionario': NomeFuncionario,
      'Observacao': document.getElementById('observacao').value,
      'Usuario': sessionStorage.getItem('sessao')
    })
      .then(function (response) {
        id = response.data.id
      })
      .catch(function (erro) {
        console.log(erro)
      })

    dados = {
      'id': id,
      'Itens': itens
    }
    await axios.post('/itemrequisicao', dados)
      .then(function (response) {
        alert('Requisição registrada com sucesso !')
        location.reload()
      })
      .catch(function (erro) {
        console.log(erro)
        alert('Problema ao gravar a requisição ! Verificar LOG !')
      })

  }

  if (idAlteracao > 0) {

    await axios.put('/requisicao/' + idAlteracao, {
      'CodFuncionario': CodFuncionario,
      'NomeFuncionario': NomeFuncionario,
      'Observacao': document.getElementById('observacao').value,
      'Usuario': sessionStorage.getItem('sessao')
    })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (erro) {
        console.log(erro)
      })

    dados = {
      'id': idAlteracao,
      'Itens': itens
    }
    console.log(itens)
    await axios.post('/itemrequisicao', dados)
      .then(function (response) {
        alert('Requisição registrada com sucesso !')
        sessionStorage.removeItem('itemAlteracao')
        sessionStorage.removeItem('itens')
        dados = []
        location.replace('/pag/requisicao')
      })
      .catch(function (erro) {
        console.log(erro)
        alert('Problema ao gravar a requisição ! Verificar LOG !')
      })


  }
}

carregaItens()

