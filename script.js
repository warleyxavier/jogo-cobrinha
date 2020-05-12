const TAMANHO_CAIXA = 32;
const POSICAO_INICIAL = 0;
const QUANTIDADE_COLUNAS_LINHAS = 16;
const POSICAO_CENTRAL_CONTAINER = 8;
const CEM_MILISEGUNDOS = 100;
const PRIMEIRA_POSICAO = 0;
const ALTURA_LARGURA_CONTAINER = TAMANHO_CAIXA * QUANTIDADE_COLUNAS_LINHAS;
const DIRECOES = { CIMA: "CIMA", BAIXO: "BAIXO", ESQUERDA: "ESQUERDA", DIREITA: "DIREITA" };

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

let cobra = [{ x: POSICAO_CENTRAL_CONTAINER * TAMANHO_CAIXA, y: POSICAO_CENTRAL_CONTAINER * TAMANHO_CAIXA }];

let direcao = DIRECOES.DIREITA;

let POSICAO_COMIDA = geraPosicaoComida();

let jogo = setInterval(iniciarJogo, CEM_MILISEGUNDOS);

function iniciarJogo() {
  verificarSeACobraEncostouEmSi();

  mudarPosicaoCobraSeEstiverNaBorda();

  criarContainer();
  desenharCobra();
  desenharComida();

  fazerMovimentoCobra();
}

function verificarSeACobraEncostouEmSi() {
  let posicaoX = cobra[PRIMEIRA_POSICAO].x;
  let posicaoY = cobra[PRIMEIRA_POSICAO].y;

  for(contador = 1; contador < cobra.length; contador ++) 
    if (posicaoX == cobra[contador].x && posicaoY == cobra[contador].y) {
      clearInterval(jogo);
      alert('deu ruim meu chapa :(');
    }
}

function mudarPosicaoCobraSeEstiverNaBorda() {
  const posicaoX = cobra[PRIMEIRA_POSICAO].x;
  const posicaoY = cobra[PRIMEIRA_POSICAO].y;

  if (posicaoX >= ALTURA_LARGURA_CONTAINER && direcao == DIRECOES.DIREITA)
    cobra[PRIMEIRA_POSICAO].x = POSICAO_INICIAL
  else if (posicaoX < POSICAO_INICIAL && direcao == DIRECOES.ESQUERDA)
    cobra[PRIMEIRA_POSICAO].x = ALTURA_LARGURA_CONTAINER;

  if (posicaoY >= ALTURA_LARGURA_CONTAINER && direcao == DIRECOES.BAIXO)
    cobra[PRIMEIRA_POSICAO].y = POSICAO_INICIAL
  else if (posicaoY < POSICAO_INICIAL && direcao == DIRECOES.CIMA)
    cobra[PRIMEIRA_POSICAO].y = ALTURA_LARGURA_CONTAINER;

}

function criarContainer() {
  context.fillStyle = "lightgreen";
  context.fillRect(POSICAO_INICIAL, POSICAO_INICIAL, ALTURA_LARGURA_CONTAINER, ALTURA_LARGURA_CONTAINER);
}

function desenharCobra() {
  for (contador = 0; contador < cobra.length; contador++) {
    context.fillStyle = "black";
    context.fillRect(cobra[contador].x, cobra[contador].y, TAMANHO_CAIXA, TAMANHO_CAIXA);
  }
}

function desenharComida() {
  context.fillStyle = "red";
  context.fillRect(POSICAO_COMIDA.x, POSICAO_COMIDA.y, TAMANHO_CAIXA, TAMANHO_CAIXA);
}

function fazerMovimentoCobra() {
  let cobraX = cobra[PRIMEIRA_POSICAO].x;
  let cobraY = cobra[PRIMEIRA_POSICAO].y;

  switch (direcao) {
    case DIRECOES.DIREITA: cobraX += TAMANHO_CAIXA; break;
    case DIRECOES.ESQUERDA: cobraX -= TAMANHO_CAIXA; break;
    case DIRECOES.CIMA: cobraY -= TAMANHO_CAIXA; break;
    case DIRECOES.BAIXO: cobraY += TAMANHO_CAIXA; break;
  }

  if (cobraX != POSICAO_COMIDA.x || cobraY != POSICAO_COMIDA.y)
    cobra.pop()
  else
    POSICAO_COMIDA = geraPosicaoComida();

  let novaPosicao = { x: cobraX, y: cobraY };

  cobra.unshift(novaPosicao);
}

document.addEventListener('keydown', atualizarPosicao);

function atualizarPosicao(event) {
  const TECLAS = { CIMA: 38, BAIXO: 40, DIREITA: 39, ESQUERDA: 37 };
  const TECLA_DIGITADA = event.keyCode;

  switch (TECLA_DIGITADA) {
    case TECLAS.ESQUERDA:
      if (direcao != DIRECOES.DIREITA)
        direcao = DIRECOES.ESQUERDA;
      break;
    case TECLAS.DIREITA:
      if (direcao != DIRECOES.ESQUERDA)
        direcao = DIRECOES.DIREITA;
      break;
    case TECLAS.CIMA:
      if (direcao != DIRECOES.BAIXO)
        direcao = DIRECOES.CIMA;
      break;
    case TECLAS.BAIXO:
      if (direcao != DIRECOES.CIMA)
        direcao = DIRECOES.BAIXO;
      break;
  }

}

function geraPosicaoComida() {
  return {
    x: Math.floor(Math.random() * QUANTIDADE_COLUNAS_LINHAS) * TAMANHO_CAIXA,
    y: Math.floor(Math.random() * QUANTIDADE_COLUNAS_LINHAS) * TAMANHO_CAIXA
  };
}
