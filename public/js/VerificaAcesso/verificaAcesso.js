
 function verificaAcesso() {

  if(!sessionStorage.getItem('sessao')){
    deslogar()
  }
}

 function deslogar() {
  sessionStorage.clear()
  localStorage.clear()
  window.location.replace("..");
}

verificaAcesso()

