/**
 * Classe MenuTeclado
 * Esta classe representa um menu de teclado que permite ao jogador selecionar opções.
 */
class MenuTeclado {
  constructor() {
    this.options = []; // Opções do menu
    this.up = null; // Ouvinte de tecla para cima
    this.down = null; // Ouvinte de tecla para baixo
    this.prevFocus = null; // Elemento anteriormente focado
  }

  /**
   * Método setOptions
   * Define as opções do menu e atualiza a interface do usuário.
   * @param {Array} options - Array de opções do menu.
   */
  setOptions(options) {
    this.options = options;
    this.element.innerHTML = this.options.map((option, index) => {
      const disabledAttr = option.disabled ? "disabled" : "";
      return `
        <div class="option" data-index="${index}" ${disabledAttr}>
          <span class="label">${option.label}</span>
          <span class="right">${option.right ? option.right() : ""}</span>
        </div>
      `;
    }).join("");

    this.element.querySelectorAll(".option").forEach(option => {
      option.addEventListener("click", () => {
        const index = Number(option.dataset.index);
        this.options[index].handler();
      });
    });

    this.prevFocus = null;
    this.element.querySelector(".option:not([disabled])").focus();
  }

  /**
   * Método createElement
   * Cria o elemento HTML para o menu de teclado.
   */
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("MenuTeclado");
    this.element.setAttribute("tabindex", "0");
  }

  /**
   * Método end
   * Remove os ouvintes de tecla e o elemento do menu de teclado.
   */
  end() {
    this.element.remove();
    this.up.unbind();
    this.down.unbind();
  }

  /**
   * Método init
   * Inicializa o menu de teclado e adiciona os ouvintes de tecla.
   * @param {HTMLElement} container - O contêiner onde o menu será renderizado.
   */
  init(container) {
    this.createElement();
    container.appendChild(this.element);

    this.up = new OuvinteTecla("ArrowUp", () => {
      const current = Number(this.element.querySelector(".option:focus").dataset.index);
      const prev = this.options[current - 1];
      if (prev && !prev.disabled) {
        this.element.querySelector(`.option[data-index="${current - 1}"]`).focus();
      }
    });

    this.down = new OuvinteTecla("ArrowDown", () => {
      const current = Number(this.element.querySelector(".option:focus").dataset.index);
      const next = this.options[current + 1];
      if (next && !next.disabled) {
        this.element.querySelector(`.option[data-index="${current + 1}"]`).focus();
      }
    });
  }
}
