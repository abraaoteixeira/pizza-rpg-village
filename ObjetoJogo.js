/**
 * Classe ObjetoJogo
 * Esta classe representa um objeto no jogo.
 */
class ObjetoJogo {
  constructor(config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/hero.png",
    });
  }

  /**
   * Método mount
   * Monta o objeto no mapa.
   * @param {Object} map - O mapa onde o objeto será montado.
   */
  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    // Se tivermos comportamento, inicie após um curto atraso
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  /**
   * Método update
   * Atualiza o estado do objeto.
   */
  update() {}

  /**
   * Método doBehaviorEvent
   * Executa um evento de comportamento.
   * @param {Object} map - O mapa onde o evento ocorrerá.
   */
  async doBehaviorEvent(map) {
    // Não faz nada se não houver evento de comportamento configurado ou se o objeto não estiver montado
    if (!this.behaviorLoop || this.behaviorLoop.length === 0 || this.isStanding) {
      return;
    }

    // Configura um evento com informações relevantes
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    // Cria um evento
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    // Define o próximo evento a ser executado
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    // Chama a próxima vez que o objeto estiver pronto para se mover novamente
    this.doBehaviorEvent(map);
  }
}
