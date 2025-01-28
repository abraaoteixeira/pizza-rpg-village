/**
 * Classe Equipe
 * Esta classe representa uma equipe na batalha.
 */
class Equipe {
  constructor(equipe, nome) {
    this.equipe = equipe;
    this.nome = nome;
    this.combatentes = [];
  }

  /**
   * Método createElement
   * Cria o elemento HTML para a equipe.
   */
  createElement() {
    this.elemento = document.createElement("div");
    this.elemento.classList.add("Equipe");
    this.elemento.setAttribute("data-equipe", this.equipe);
    this.combatentes.forEach(c => {
      let icone = document.createElement("div");
      icone.setAttribute("data-combatente", c.id);
      icone.innerHTML = (`
        <svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 -0.5 7 10" shape-rendering="crispEdges">
          <path stroke="#3a160d" d="M2 0h3M1 1h1M5 1h1M0 2h1M6 2h1M0 3h1M6 3h1M0 4h1M6 4h1M1 5h1M5 5h1M2 6h3" />
          <path stroke="#e2b051" d="M2 1h1M4 1h1M1 2h1M5 2h1M1 4h1M5 4h1M2 5h1M4 5h1" />
          <path stroke="#ffd986" d="M3 1h1M2 2h3M1 3h5M2 4h3M3 5h1" />
          
          <!-- O indicador de pizza ativa aparece quando necessário com CSS -->
          <path class="indicador-pizza-ativa" stroke="#3a160d" d="M3 8h1M2 9h3" />
          
          <!-- Caminhos de pizza morta aparecem quando necessário com CSS -->
          <path class="pizza-morta" stroke="#3a160d" d="M2 0h3M1 1h1M5 1h1M0 2h1M2 2h1M4 2h1M6 2h1M0 3h1M3 3h1M6 3h1M0 4h1M2 4h1M4 4h1M6 4h1M1 5h1M5 5h1M2 6h3" />
          <path class="pizza-morta" stroke="#9b917f" d="M2 1h3M1 2h1M5 2h1" />
          <path class="pizza-morta" stroke="#c4bdae" d="M3 2h1M1 3h2M4 3h2M1 4h1M3 4h1M5 4h1M2 5h3" />
        </svg> 
      `)
      // Adiciona ao elemento pai
      this.elemento.appendChild(icone)
    })
  }

  /**
   * Método update
   * Atualiza os elementos HTML dos combatentes na equipe.
   */
  update() {
    this.combatentes.forEach(c => {
      const icone = this.elemento.querySelector(`[data-combatente="${c.id}"]`)
      icone.setAttribute("data-morto", c.hp <= 0 );
      icone.setAttribute("data-ativo", c.isActive );
    })
  }

  /**
   * Método init
   * Inicializa a equipe e adiciona o elemento HTML ao contêiner.
   * @param {HTMLElement} container - O contêiner onde a equipe será renderizada.
   */
  init(container) {
    this.createElement();
    this.update();
    container.appendChild(this.elemento);
  }
}
