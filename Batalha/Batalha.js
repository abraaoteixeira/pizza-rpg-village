/**
 * Classe Batalha
 * Esta classe representa uma batalha entre o jogador e um inimigo.
 */
class Batalha {
  constructor({ inimigo, aoCompletar, arena }) {

    this.inimigo = inimigo;
    this.aoCompletar = aoCompletar;
    this.arena = arena;

    this.combatentes = {
      "jogador1": new Combatente({
        ...Pizzas.s001,
        equipe: "jogador",
        hp: 30,
        maxHp: 50,
        xp: 95,
        maxXp: 100,
        nivel: 1,
        status: { tipo: "saucy" },
        controladoPeloJogador: true
      }, this),
      "jogador2": new Combatente({
        ...Pizzas.s002,
        equipe: "jogador",
        hp: 30,
        maxHp: 50,
        xp: 75,
        maxXp: 100,
        nivel: 1,
        status: null,
        controladoPeloJogador: true
      }, this),
      "inimigo1": new Combatente({
        ...Pizzas.v001,
        equipe: "inimigo",
        hp: 1,
        maxHp: 50,
        xp: 20,
        maxXp: 100,
        nivel: 1,
      }, this),
      "inimigo2": new Combatente({
        ...Pizzas.f001,
        equipe: "inimigo",
        hp: 25,
        maxHp: 50,
        xp: 30,
        maxXp: 100,
        nivel: 1,
      }, this)
    }

    this.combatentesAtivos = {
      jogador: null, //"jogador1",
      inimigo: null, //"inimigo1",
    }

    // Adiciona dinamicamente a equipe do jogador
    window.estadoDoJogador.lineup.forEach(id => {
      this.adicionarCombatente(id, "jogador", window.estadoDoJogador.pizzas[id])
    });
    // Agora a equipe inimiga
    Object.keys(this.inimigo.pizzas).forEach(key => {
      this.adicionarCombatente("e_"+key, "inimigo", this.inimigo.pizzas[key])
    })


    // Começa vazio
    this.itens = []

    // Adiciona itens do jogador
    window.estadoDoJogador.itens.forEach(item => {
      this.itens.push({
        ...item,
        equipe: "jogador"
      })
    })

    this.idsDeInstanciasUsadas = {};

  }

  /**
   * Método para adicionar combatente
   * @param {string} id - O ID do combatente.
   * @param {string} equipe - A equipe do combatente (jogador ou inimigo).
   * @param {Object} config - A configuração do combatente.
   */
  adicionarCombatente(id, equipe, config) {
      this.combatentes[id] = new Combatente({
        ...Pizzas[config.pizzaId],
        ...config,
        equipe,
        controladoPeloJogador: equipe === "jogador"
      }, this)

      // Popula a primeira pizza ativa
      this.combatentesAtivos[equipe] = this.combatentesAtivos[equipe] || id
  }

  /**
   * Método para criar elemento HTML da batalha
   */
  criarElemento() {
    this.elemento = document.createElement("div");
    this.elemento.classList.add("Batalha");

    // Se fornecido, adiciona uma classe CSS para definir o fundo da arena
    if (this.arena) {
      this.elemento.classList.add(this.arena);
    }

    this.elemento.innerHTML = (`
    <div class="Batalha_heroi">
      <img src="${'/images/characters/people/hero.png'}" alt="Herói" />
    </div>
    <div class="Batalha_inimigo">
      <img src=${this.inimigo.src} alt=${this.inimigo.nome} />
    </div>
    `)
  }

  /**
   * Método para inicializar a batalha
   * @param {HTMLElement} container - O contêiner onde a batalha será renderizada.
   */
  init(container) {
    this.criarElemento();
    container.appendChild(this.elemento);

    this.equipeDoJogador = new Equipe("jogador", "Herói");
    this.equipeInimiga = new Equipe("inimigo", "Bully");

    Object.keys(this.combatentes).forEach(key => {
      let combatente = this.combatentes[key];
      combatente.id = key;
      combatente.init(this.elemento)
      
      // Adiciona ao time correto
      if (combatente.equipe === "jogador") {
        this.equipeDoJogador.combatentes.push(combatente);
      } else if (combatente.equipe === "inimigo") {
        this.equipeInimiga.combatentes.push(combatente);
      }
    })

    this.equipeDoJogador.init(this.elemento);
    this.equipeInimiga.init(this.elemento);

    this.cicloDeTurnos = new CicloDeTurnos({
      batalha: this,
      aoNovoEvento: evento => {
        return new Promise(resolve => {
          const eventoDeBatalha = new EventoDeBatalha(evento, this)
          eventoDeBatalha.init(resolve);
        })
      },
      aoVencedor: vencedor => {

        if (vencedor === "jogador") {
          const estadoDoJogador = window.estadoDoJogador;
          Object.keys(estadoDoJogador.pizzas).forEach(id => {
            const pizzaDoEstadoDoJogador = estadoDoJogador.pizzas[id];
            const combatente = this.combatentes[id];
            if (combatente) {
              pizzaDoEstadoDoJogador.hp = combatente.hp;
              pizzaDoEstadoDoJogador.xp = combatente.xp;
              pizzaDoEstadoDoJogador.maxXp = combatente.maxXp;
              pizzaDoEstadoDoJogador.nivel = combatente.nivel;
            }
          })

          // Remove itens usados pelo jogador
          estadoDoJogador.itens = estadoDoJogador.itens.filter(item => {
            return !this.idsDeInstanciasUsadas[item.instanceId]
          })

          // Envia sinal para atualizar
          utils.emitEvent("EstadoDoJogadorAtualizado");
        }

        this.elemento.remove();
        this.aoCompletar(vencedor === "jogador");
      }
    })
    this.cicloDeTurnos.init();


  }

}
