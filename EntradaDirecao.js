/**
 * Classe EntradaDirecao
 * Esta classe lida com a entrada de direção do jogador.
 */
class EntradaDirecao {
  constructor() {
    this.direcoesMantidas = [];

    this.mapa = {
      "ArrowUp": "cima",
      "KeyW": "cima",
      "ArrowDown": "baixo",
      "KeyS": "baixo",
      "ArrowLeft": "esquerda",
      "KeyA": "esquerda",
      "ArrowRight": "direita",
      "KeyD": "direita",
    }
  }

  /**
   * Método get direction
   * Retorna a direção atual mantida.
   * @returns {string} - A direção atual.
   */
  get direcao() {
    return this.direcoesMantidas[0];
  }

  /**
   * Método init
   * Inicializa os ouvintes de eventos para capturar a entrada de direção.
   */
  init() {
    document.addEventListener("keydown", e => {
      const dir = this.mapa[e.code];
      if (dir && this.direcoesMantidas.indexOf(dir) === -1) {
        this.direcoesMantidas.unshift(dir);
      }
    });
    document.addEventListener("keyup", e => {
      const dir = this.mapa[e.code];
      const index = this.direcoesMantidas.indexOf(dir);
      if (index > -1) {
        this.direcoesMantidas.splice(index, 1);
      }
    })

  }

}
