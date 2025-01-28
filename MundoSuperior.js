/**
 * Classe MundoSuperior
 * Esta classe representa o mundo superior onde o jogo acontece.
 */
class MundoSuperior {
  constructor(config) {
    this.elemento = config.elemento;
    this.canvas = this.elemento.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  /**
   * Método startGameLoop
   * Inicia o loop do jogo.
   */
  startGameLoop() {
    const passo = () => {
      // Limpa o canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Desenha o mapa inferior
      this.map.drawLowerImage(this.ctx, this.map.gameObjects.hero);

      // Desenha os objetos do jogo
      Object.values(this.map.gameObjects).forEach(obj => {
        obj.sprite.draw(this.ctx, this.map.gameObjects.hero);
      });

      // Desenha o mapa superior
      this.map.drawUpperImage(this.ctx, this.map.gameObjects.hero);

      requestAnimationFrame(() => {
        passo();
      });
    };
    passo();
  }

  /**
   * Método init
   * Inicializa o mundo superior.
   */
  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.overworld = this;

    this.map.mountObjects();

    this.startGameLoop();

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.map.startCutscene([
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "right" },
      { who: "hero", type: "walk", direction: "up" },
      { who: "hero", type: "walk", direction: "up" },
      { who: "hero", type: "walk", direction: "left" },
    ]);
  }

  /**
   * Método bindActionInput
   * Liga a entrada de ação para o herói.
   */
  bindActionInput() {
    new KeyPressListener("Enter", () => {
      this.map.checkForActionCutscene();
    });
  }

  /**
   * Método bindHeroPositionCheck
   * Liga a verificação da posição do herói.
   */
  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "hero") {
        this.map.checkForFootstepCutscene();
      }
    });
  }
}

window.Overworld = MundoSuperior;
