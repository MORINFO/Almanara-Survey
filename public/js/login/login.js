
function verificaLogado() {
if(sessionStorage.getItem('sessao')){
  console.log(sessionStorage.getItem('sessao'))
  location.href='/principal'
}
}
verificaLogado()

// FUNCAO DE LOGAR NO SISTEMA
async function logar() {
  event.preventDefault()
  const Senha = document.getElementById('Senha').value
  const Usuario = document.getElementById('Usuario').value

    await axios.post('/login', {
        "Senha": `${Senha}`,
        "Usuario": `${Usuario}`
      })
      .then(function (response) {
        console.log(response.data)
        sessionStorage.setItem('sessao', response.data)
          Swal.fire({
            allowOutsideClick: false,
            position: 'center',
            icon: 'success',
            title: 'Logado com Sucesso !',
            showConfirmButton: false,
            timer: 1800

          }).then((result) => {

            if (result.dismiss === Swal.DismissReason.timer) {
              window.location.replace("principal");
            }
          })
      })
      .catch(function(erro){
        Swal.fire({
          allowOutsideClick: false,
          position: 'center',
          icon: 'error',
          title: 'Problema no Login, informar o suporte !',
          showConfirmButton: false,
          timer: 2500

        }).then((result) => {

          if (result.dismiss === Swal.DismissReason.timer) {
           document.getElementById('Usuario').focus
          }
        })

      })

  }

