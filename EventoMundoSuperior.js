/**
 * Classe EventoMundoSuperior
 * Esta classe representa um evento no mundo superior.
 */
class EventoMundoSuperior {
  constructor({ map, event}) {
    this.map = map;
    this.event = event;
  }

  /**
   * Método stand
   * Faz o personagem ficar parado por um tempo.
   * @param {Function} resolve - Função a ser chamada ao completar a ação.
   */
  stand(resolve) {
    const who = this.map.gameObjects[ this.event.who ];

    who.startBehavior({
      map: this.map
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time
    })
    
    // Configura um manipulador para completar quando a pessoa correta terminar de andar, então resolve o evento
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    }
    document.addEventListener("PersonStandComplete", completeHandler)
  }

  /**
   * Método walk
   * Faz o personagem andar em uma direção específica.
   * @param {Function} resolve - Função a ser chamada ao completar a ação.
   */
  walk(resolve) {
    const who = this.map.gameObjects[ this.event.who ];

    who.startBehavior({
      map: this.map
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true
    })

    // Configura um manipulador para completar quando a pessoa correta terminar de andar, então resolve o evento
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    }
    document.addEventListener("PersonWalkingComplete", completeHandler)

  }

  /**
   * Método textMessage
   * Exibe uma mensagem de texto na tela.
   * @param {Function} resolve - Função a ser chamada ao completar a exibição da mensagem.
   */
  textMessage(resolve) {

    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    })
    message.init( document.querySelector(".game-container") )
  }

  /**
   * Método changeMap
   * Muda o mapa atual para um novo mapa.
   * @param {Function} resolve - Função a ser chamada ao completar a mudança de mapa.
   */
  changeMap(resolve) {

    // Para todas as coisas da Pessoa
    Object.values(this.map.gameObjects).forEach(obj => {
      obj.isMounted = false;
    })

    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".game-container"), () => {
      this.map.overworld.startMap( window.OverworldMaps[this.event.map], {
        x: this.event.x,
        y: this.event.y,
        direction: this.event.direction,
      });
      resolve();
      sceneTransition.fadeOut();
    })
  }

  /**
   * Método battle
   * Inicia uma batalha com um inimigo.
   * @param {Function} resolve - Função a ser chamada ao completar a batalha.
   */
  battle(resolve) {
    const battle = new Battle({
      enemy: Enemies[this.event.enemyId],
      arena: this.event.arena || null,
      onComplete: (didWin) => {
        resolve(didWin ? "WON_BATTLE" : "LOST_BATTLE");
      }
    })
    battle.init(document.querySelector(".game-container"));

  }

  /**
   * Método pause
   * Pausa o jogo e exibe o menu de pausa.
   * @param {Function} resolve - Função a ser chamada ao sair do menu de pausa.
   */
  pause(resolve) {
    this.map.isPaused = true;
    const menu = new PauseMenu({
      progress: this.map.overworld.progress,
      onComplete: () => {
        resolve();
        this.map.isPaused = false;
        this.map.overworld.startGameLoop();
      }
    });
    menu.init(document.querySelector(".game-container"));
  }

  /**
   * Método addStoryFlag
   * Adiciona uma bandeira de história ao estado do jogador.
   * @param {Function} resolve - Função a ser chamada ao completar a adição da bandeira de história.
   */
  addStoryFlag(resolve) {
    window.playerState.storyFlags[this.event.flag] = true;
    resolve();
  }

  /**
   * Método craftingMenu
   * Exibe o menu de criação de pizzas.
   * @param {Function} resolve - Função a ser chamada ao sair do menu de criação.
   */
  craftingMenu(resolve) {
    const menu = new CraftingMenu({
      pizzas: this.event.pizzas,
      onComplete: () => {
        resolve();
      }
    })
    menu.init(document.querySelector(".game-container"))
  }

  /**
   * Método init
   * Inicializa o evento no mundo superior.
   * @returns {Promise} - Retorna uma promessa que é resolvida ao completar o evento.
   */
  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)      
    })
  }

}
