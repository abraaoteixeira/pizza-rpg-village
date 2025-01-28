/**
 * Classe Hud
 * Esta classe representa o HUD (Heads-Up Display) que exibe informações sobre o estado do jogador.
 */
class Hud {
  constructor() {
    this.placares = [];
  }

  /**
   * Método update
   * Atualiza os placares com as informações mais recentes das pizzas do jogador.
   */
  update() {
    this.placares.forEach(s => {
      s.update(window.estadoDoJogador.pizzas[s.id])
    })
  }

  /**
   * Método createElement
   * Cria os elementos HTML para o HUD.
   */
  createElement() {

    if (this.elemento) {
      this.elemento.remove();
      this.placares = [];
    }

    this.elemento = document.createElement("div");
    this.elemento.classList.add("Hud");

    const {estadoDoJogador} = window;
    estadoDoJogador.lineup.forEach(key => {
      const pizza = estadoDoJogador.pizzas[key];
      const placar = new Combatente({
        id: key,
        ...Pizzas[pizza.pizzaId],
        ...pizza,
      }, null)
      placar.createElement();
      this.placares.push(placar);
      this.elemento.appendChild(placar.hudElement);
    })
    this.update();
  }

  /**
   * Método init
   * Inicializa o HUD e adiciona os elementos ao contêiner.
   * @param {HTMLElement} container - O contêiner onde o HUD será renderizado.
   */
  init(container) {
    this.createElement();
    container.appendChild(this.elemento);

    document.addEventListener("EstadoDoJogadorAtualizado", () => {
      this.update();
    })

    document.addEventListener("LineupChanged", () => {
      this.createElement();
      container.appendChild(this.elemento);
    })

  }
}
