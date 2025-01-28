/**
 * Classe MenuSubstituicao
 * Esta classe representa o menu de substituição onde o jogador pode escolher um substituto.
 */
class MenuSubstituicao {
  constructor({ substituicoes, aoCompletar }) {
    this.substituicoes = substituicoes;
    this.aoCompletar = aoCompletar;
  }

  /**
   * Método decide
   * Decide automaticamente o substituto.
   */
  decide() {
    this.menuSubmit(this.substituicoes[0])
  }

  /**
   * Método menuSubmit
   * Submete o substituto escolhido.
   * @param {Object} substituicao - O substituto escolhido.
   */
  menuSubmit(substituicao) {
    this.menuTeclado?.end();
    this.aoCompletar(substituicao)
  }

  /**
   * Método showMenu
   * Exibe o menu de substituição.
   * @param {HTMLElement} container - O contêiner onde o menu será renderizado.
   */
  showMenu(container) {
    this.menuTeclado = new MenuTeclado();
    this.menuTeclado.init(container);
    this.menuTeclado.setOptions(this.substituicoes.map(c => {
      return {
        label: c.nome,
        description: c.descricao,
        handler: () => {
          this.menuSubmit(c);
        }
      }
    }))
  }

  init(container) {

    if (this.substituicoes[0].controladoPeloJogador) {
      this.showMenu(container);
    } else {
      this.decide();
    }
  }
}
