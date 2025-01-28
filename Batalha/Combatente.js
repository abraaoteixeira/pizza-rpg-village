/**
 * Classe Combatente
 * Esta classe representa um combatente na batalha.
 */
class Combatente {
  constructor(config, batalha) {
    Object.keys(config).forEach(key => {
      this[key] = config[key];
    })
    this.hp = typeof(this.hp) === "undefined" ? this.maxHp : this.hp;
    this.batalha = batalha;
    this.equipe = config.equipe; // Certifique-se de que a propriedade `equipe` esteja corretamente inicializada
  }

  get hpPercent() {
    const percent = this.hp / this.maxHp * 100;
    return percent > 0 ? percent : 0;
  }

  get xpPercent() {
    return this.xp / this.maxXp * 100;
  }

  get isActive() {
    return this.batalha?.combatentesAtivos[this.equipe] === this.id;
  }

  get givesXp() {
    return this.nivel * 20;
  }

  /**
   * Método createElement
   * Cria os elementos HTML para o HUD e a pizza do combatente.
   */
  createElement() {
    this.hudElement = document.createElement("div");
    this.hudElement.classList.add("Combatente");
    this.hudElement.setAttribute("data-combatente", this.id);
    this.hudElement.setAttribute("data-equipe", this.equipe);
    this.hudElement.innerHTML = (`
      <p class="Combatente_nome">${this.nome}</p>
      <p class="Combatente_nivel"></p>
      <div class="Combatente_personagem_crop">
        <img class="Combatente_personagem" alt="${this.nome}" src="${this.src}" />
      </div>
      <img class="Combatente_tipo" src="${this.icone}" alt="${this.tipo}" />
      <svg viewBox="0 0 26 3" class="Combatente_vida-container">
        <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
        <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
      </svg>
      <svg viewBox="0 0 26 2" class="Combatente_xp-container">
        <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
        <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
      </svg>
      <p class="Combatente_status"></p>
    `);

    this.elementoPizza = document.createElement("img");
    this.elementoPizza.classList.add("Pizza");
    this.elementoPizza.setAttribute("src", this.src );
    this.elementoPizza.setAttribute("alt", this.nome );
    this.elementoPizza.setAttribute("data-equipe", this.equipe );

    this.preenchimentosHp = this.hudElement.querySelectorAll(".Combatente_vida-container > rect");
    this.preenchimentosXp = this.hudElement.querySelectorAll(".Combatente_xp-container > rect");
  }

  /**
   * Método update
   * Atualiza as propriedades do combatente e os elementos HTML correspondentes.
   * @param {Object} changes - Objeto contendo as mudanças a serem aplicadas.
   */
  update(changes={}) {
    // Atualiza qualquer mudança recebida
    Object.keys(changes).forEach(key => {
      this[key] = changes[key]
    });

    // Atualiza a flag ativa para mostrar a pizza e o HUD corretos
    this.hudElement.setAttribute("data-ativo", this.isActive);
    this.elementoPizza.setAttribute("data-ativo", this.isActive);

    // Atualiza os preenchimentos de porcentagem de HP e XP
    this.preenchimentosHp.forEach(rect => rect.style.width = `${this.hpPercent}%`)
    this.preenchimentosXp.forEach(rect => rect.style.width = `${this.xpPercent}%`)

    // Atualiza o nível na tela
    this.hudElement.querySelector(".Combatente_nivel").innerText = this.nivel;

    // Atualiza o status
    const statusElement = this.hudElement.querySelector(".Combatente_status");
    if (this.status) {
      statusElement.innerText = this.status.tipo;
      statusElement.style.display = "block";
    } else {
      statusElement.innerText = "";
      statusElement.style.display = "none";
    }
  }

  /**
   * Método getReplacedEvents
   * Substitui eventos originais por eventos modificados com base no status do combatente.
   * @param {Array} originalEvents - Array de eventos originais.
   * @returns {Array} - Array de eventos modificados.
   */
  getReplacedEvents(originalEvents) {

    if (this.status?.tipo === "clumsy" && utils.randomFromArray([true, false, false])) {
      return [
        { tipo: "mensagemTexto", texto: `${this.nome} tropeça!` },
      ]
    }

    return originalEvents;
  }

  getPostEvents() {
    if (this.status?.tipo === "saucy") {
      return [
        { tipo: "mensagemTexto", texto: "Sentindo-se saucy!" },
        { tipo: "alterarEstado", recuperar: 5, noLançador: true }
      ]
    } 
    return [];
  }

  decrementStatus() {
    if (this.status?.expiraEm > 0) {
      this.status.expiraEm -= 1;
      if (this.status.expiraEm === 0) {
        this.update({
          status: null
        })
        return {
          tipo: "mensagemTexto",
          texto: "Status expirado!"
        }
      }
    }
    return null;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.hudElement);
    container.appendChild(this.elementoPizza);
    this.update();
  }

}
