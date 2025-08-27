var titulo = document.querySelector(".escolher-jogo")
var conteudoMenu = document.querySelector(".escolher-jogo-div");
var megaSenaGerar = document.querySelector(".mega-sena-gerar");
var lotoFacilGerar = document.querySelector(".loto-facil-gerar");
var megaSenaOutputs = document.querySelector(".mega-sena-outputs");
var lotoFacilOutputs = document.querySelector(".loto-facil-outputs");
var input = document.querySelectorAll("input");
var voltar = document.querySelector(".voltar");

// Criando a lista de números disponíveis
const numerosDisponiveis = Array.from({ length: 25 }, (_, i) => i + 1);
// Criando a lista JOGO1 com quinze números aleatórios diferentes
var JOGO1 = [];
// Criando a lista JOGO2 com dez números aleatórios dos sobrantes
var JOGO2 = [];

var indiceAnterior = []


// Criando as listas de jogo
var listasJogo = [];
var listaJogo = []
const totalNumerosPorLista = 6;
const totalListas = 10;
var nomeLista = ""
var numerosDisponiveis2 = Array.from({ length: 60 }, (_, i) => i + 1);



if(voltar.style.visibility != "hidden"){
    voltar.addEventListener("click",()=>{
      location.reload()
    })
}
if(input){
    input.forEach((el)=>{
        el.setAttribute("readonly",true)
    })
}

if(conteudoMenu){
    var botaoMenu1 = conteudoMenu.firstElementChild
    var botaoMenu2 = conteudoMenu.lastElementChild
    botaoMenu1.addEventListener("click",megaSena);
    botaoMenu2.addEventListener("click",lotoFacil);
}



if(megaSenaGerar.style.visibility != "hidden"){
    var btn = megaSenaGerar.querySelector("button")
    btn.addEventListener("click",gerarMegaSena)

}
if(lotoFacilGerar.style.visibility != "hidden"){
    var btn = lotoFacilGerar.querySelector("button")
    btn.addEventListener("click",gerarLotoFacil)

}



function lotoFacil(){
    titulo.style.transform = "translateY(-50vh)"
    titulo.style.visibility = "hidden"
    conteudoMenu.style.transform = "translateY(-50vh)"
    conteudoMenu.style.visibility = "hidden"
    lotoFacilGerar.style.transform = "translateY(-50vh)"
    lotoFacilOutputs.style.transform = "translateY(-50vh)"
    voltar.style.transform = "translateY(-40vh)"
    lotoFacilOutputs.style.visibility = "visible"
    lotoFacilGerar.style.visibility = "visible"
    voltar.style.visibility = "visible"


}
function megaSena(){
    titulo.style.transform = "translateY(-50vh)"
    titulo.style.visibility = "hidden"
    conteudoMenu.style.transform = "translateY(-50vh)"
    conteudoMenu.style.visibility = "hidden"
    voltar.style.transform = "translateY(-40vh)"
    megaSenaGerar.style.transform = "translateY(-50vh)"
    megaSenaOutputs.style.transform = "translateY(-50vh)"
    megaSenaOutputs.style.visibility = "visible"
    megaSenaGerar.style.visibility = "visible"
    voltar.style.visibility = "visible"
}

function gerarLotoFacil() {
  // Criando um array com todos os números possíveis (1 a 25)
  const numerosDisponiveis = Array.from({ length: 25 }, (_, i) => i + 1);
  indiceAnterior = []

  // Criando as duas listas vazias para armazenar os jogos
  JOGO1 = [];
  JOGO2 = [];

  // Gerando os números para o JOGO1
  while (JOGO1.length < 15) {
    const indiceAleatorio = Math.floor(Math.random() * numerosDisponiveis.length);
    const numeroAleatorio = numerosDisponiveis[indiceAleatorio];
    JOGO1.push(numeroAleatorio);

    // Removendo o número sorteado do array de números disponíveis
    numerosDisponiveis.splice(indiceAleatorio, 1);
  }

  // Gerando os números para o JOGO2
  while (JOGO2.length <15) {
    if(JOGO2.length <10){
    const indiceAleatorio = Math.floor(Math.random() * numerosDisponiveis.length);
    const numeroSobrante = numerosDisponiveis[indiceAleatorio];
    JOGO2.push(numeroSobrante);
    numerosDisponiveis.splice(indiceAleatorio, 1);
    }
    else if(JOGO2.length >= 10){
        let novoIndice = Math.floor(Math.random()*JOGO1.length)
          
        if(!indiceAnterior.includes(novoIndice)){
            JOGO2.push(JOGO1[novoIndice])
            
        }
        indiceAnterior.push(novoIndice)

  }
   
  }


  // Atualizando os elementos HTML com os jogos gerados
  lotoFacilOutputs.firstElementChild.value = JOGO1.join(',');
  lotoFacilOutputs.lastElementChild.value = JOGO2.join(',');
}

// Função para gerar um número aleatório entre um intervalo (sem alterações)
function gerarAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
function gerarMegaSena(){
    
  

  numerosDisponiveis2 = Array.from({ length: 60 }, (_, i) => i + 1);
  listasJogo = []
  for (let i = 1; i <= totalListas; i++) {
    nomeLista = `JOGO${i};`
    listaJogo = criarListaJogo(nomeLista, totalNumerosPorLista, numerosDisponiveis2);
    listasJogo.push(listaJogo);
  }

        
    var outputs = megaSenaOutputs.querySelectorAll("input")
    for (var [indice, listaJ] of listasJogo.entries()) {

        outputs[indice].value = listaJ;
    }
    
    


}


// Função para criar e preencher uma lista de jogo
function criarListaJogo(nomeLista, totalNumeros, numerosDisponiveis2) {
  
  listaJogo = [];
  while (listaJogo.length < totalNumeros) {
    const indiceAleatorio = gerarAleatorio(0, numerosDisponiveis2.length - 1);
    const numeroAleatorio = numerosDisponiveis2[indiceAleatorio];
    listaJogo.push(numeroAleatorio);
    numerosDisponiveis2.splice(indiceAleatorio, 1);
  }
  return listaJogo;
}








