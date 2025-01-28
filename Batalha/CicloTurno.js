/**
 * Classe CicloDeTurnos
 * Esta classe representa o ciclo de turnos em uma batalha.
 */
class CicloDeTurnos {
  constructor({ batalha, aoNovoEvento, aoVencedor }) {
    this.batalha = batalha;
    this.aoNovoEvento = aoNovoEvento;
    this.aoVencedor = aoVencedor;
    this.equipeAtual = "jogador"; //ou "inimigo"
  }

  /**
   * Método turn
   * Executa o turno de um combatente.
   */
  async turn() {
    // Obtém o lançador
    const casterId = this.batalha.combatentesAtivos[this.equipeAtual];
    const caster = this.batalha.combatentes[casterId];
    const enemyId = this.batalha.combatentesAtivos[caster.equipe === "jogador" ? "inimigo" : "jogador"]
    const enemy = this.batalha.combatentes[enemyId];

    const submission = await this.aoNovoEvento({
      type: "submissionMenu",
      caster,
      enemy
    })

    // Para aqui se estivermos substituindo esta Pizza
    if (submission.replacement) {
      await this.aoNovoEvento({
        type: "replace",
        replacement: submission.replacement
      })
      await this.aoNovoEvento({
        type: "textMessage",
        text: `Vai lá, ${submission.replacement.name}!`
      })
      this.nextTurn();
      return;
    }

    if (submission.instanceId) {

      // Adiciona à lista para persistir no estado do jogador mais tarde
      this.batalha.idsDeInstanciasUsadas[submission.instanceId] = true;

      // Remove item do estado da batalha
      this.batalha.itens = this.batalha.itens.filter(i => i.instanceId !== submission.instanceId)
    }

    const resultingEvents = caster.getReplacedEvents(submission.action.success);

    for (let i=0; i<resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      }
      await this.aoNovoEvento(event);
    }

    // O alvo morreu?
    const targetDead = submission.target.hp <= 0;
    if (targetDead) {
      await this.aoNovoEvento({ 
        type: "textMessage", text: `${submission.target.name} está arruinado!`
      })

      if (submission.target.equipe === "inimigo") {

        const playerActivePizzaId = this.batalha.combatentesAtivos.jogador;
        const xp = submission.target.givesXp;

        await this.aoNovoEvento({
          type: "textMessage",
          text: `Ganhou ${xp} XP!`
        })
        await this.aoNovoEvento({
          type: "giveXp",
          xp,
          combatant: this.batalha.combatentes[playerActivePizzaId]
        })
      }
    }

    // Temos uma equipe vencedora?
    const winner = this.getWinningTeam();
    if (winner) {
      await this.aoNovoEvento({
        type: "textMessage",
        text: "Vencedor!"
      })
      this.aoVencedor(winner);
      return;
    }
      
    // Temos um alvo morto, mas ainda não há vencedor, então traga um substituto
    if (targetDead) {
      const replacement = await this.aoNovoEvento({
        type: "replacementMenu",
        equipe: submission.target.equipe
      })
      await this.aoNovoEvento({
        type: "replace",
        replacement: replacement
      })
      await this.aoNovoEvento({
        type: "textMessage",
        text: `${replacement.name} aparece!`
      })
    }

    // Verifica eventos pós-turno
    // (Faz coisas DEPOIS da submissão original do turno)
    const postEvents = caster.getPostEvents();
    for (let i=0; i < postEvents.length; i++ ) {
      const event = {
        ...postEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target, 
      }
      await this.aoNovoEvento(event);
    }

    // Verifica se o status expirou
    const expiredEvent = caster.decrementStatus();
    if (expiredEvent) {
      await this.aoNovoEvento(expiredEvent)
    }

    this.nextTurn();
  }

  /**
   * Método nextTurn
   * Alterna para a próxima equipe e executa o próximo turno.
   */
  nextTurn() {
    this.equipeAtual = this.equipeAtual === "jogador" ? "inimigo" : "jogador";
    this.turn();
  }

  /**
   * Método getWinningTeam
   * Verifica se há uma equipe vencedora.
   * @returns {string|null} - Retorna a equipe vencedora ou null se não houver vencedor.
   */
  getWinningTeam() {
    let aliveTeams = {};
    Object.values(this.batalha.combatentes).forEach(c => {
      if (c.hp > 0) {
        aliveTeams[c.equipe] = true;
      }
    })
    if (!aliveTeams["jogador"]) { return "inimigo"}
    if (!aliveTeams["inimigo"]) { return "jogador"}
    return null;
  }

  /**
   * Método init
   * Inicializa o ciclo de turnos.
   */
  async init() {
    await this.aoNovoEvento({
      type: "textMessage",
      text: `${this.batalha.inimigo.name} quer lutar!`
    })

    // Inicia o primeiro turno!
    this.turn();

  }

}
