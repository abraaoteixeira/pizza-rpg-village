/**
 * Classe MenuCriacao
 * Esta classe representa o menu de criação onde o jogador pode criar uma pizza.
 */
class MenuCriacao {
  constructor({ pizzas, onComplete}) {
    this.pizzas = pizzas;
    this.onComplete = onComplete;
  }

  /**
   * Método getOptions
   * Retorna as opções de pizzas disponíveis para criação.
   * @returns {Array} - Array contendo as opções de pizzas.
   */
  getOptions() {
    return this.pizzas.map(id => {
      const base = Pizzas[id];
      return {
        label: base.nome,
        description: base.descricao,
        handler: () => {
          playerState.addPizza(id);
          this.close();
        }
      }
    })
  }

  /**
   * Método createElement
   * Cria o elemento HTML para o menu de criação.
   */
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("MenuCriacao");
    this.element.classList.add("overlayMenu");
    this.element.innerHTML = (`
      <h2>Criar uma Pizza</h2>
    `)
  }

  /**
   * Método close
   * Fecha o menu de criação.
   */
  close() {
    this.keyboardMenu.end();
    this.element.remove();
    this.onComplete();
  }

  /**
   * Método init
   * Inicializa o menu de criação.
   * @param {HTMLElement} container - O contêiner onde o menu será renderizado.
   */
  init(container) {
    this.createElement();
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container
    })
    this.keyboardMenu.init(this.element)
    this.keyboardMenu.setOptions(this.getOptions())

    container.appendChild(this.element);
  }
}
