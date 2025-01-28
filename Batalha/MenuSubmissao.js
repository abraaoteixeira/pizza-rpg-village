/**
 * Classe MenuSubmissao
 * Esta classe representa o menu de submissão onde o jogador pode escolher uma ação.
 */
class MenuSubmissao { 
  constructor({ lançador, inimigo, aoCompletar, itens, substituições }) {
    this.lançador = lançador;
    this.inimigo = inimigo;
    this.substituições = substituições;
    this.aoCompletar = aoCompletar;

    let mapaDeQuantidade = {};
    itens.forEach(item => {
      if (item.equipe === lançador.equipe) {
        let existente = mapaDeQuantidade[item.açãoId];
        if (existente) {
          existente.quantidade += 1;
        } else {
          mapaDeQuantidade[item.açãoId] = {
            açãoId: item.açãoId,
            quantidade: 1,
            instânciaId: item.instânciaId,
          }
       }
      }
    })
    this.itens = Object.values(mapaDeQuantidade);
  }

  /**
   * Método getPages
   * Retorna as páginas de opções do menu de submissão.
   * @returns {Object} - Objeto contendo as páginas de opções.
   */
  getPages() {

    const opçãoVoltar = {
      label: "Voltar",
      description: "Retornar à página anterior",
      handler: () => {
        this.menuTeclado.setOptions(this.getPages().root)
      }
    };

    return {
      root: [
        {
          label: "Atacar",
          description: "Escolher um ataque",
          handler: () => {
            //Faz algo quando escolhido...
            this.menuTeclado.setOptions( this.getPages().ataques )
          }
        },
        {
          label: "Itens",
          description: "Escolher um item",
          handler: () => {
            //Ir para a página de itens...
            this.menuTeclado.setOptions( this.getPages().itens )
          }
        },
        {
          label: "Trocar",
          description: "Mudar para outra pizza",
          handler: () => { 
            //Ver opções de pizza
            this.menuTeclado.setOptions( this.getPages().substituições )
          }
        },
      ],
      ataques: [
        ...this.lançador.ações.map(key => {
          const ação = Ações[key];
          return {
            label: ação.nome,
            description: ação.descrição,
            handler: () => {
              this.menuSubmit(ação)
            }
          }
        }),
        opçãoVoltar
      ],
      itens: [
        ...this.itens.map(item => {
          const ação = Ações[item.açãoId];
          return {
            label: ação.nome,
            description: ação.descrição,
            right: () => {
              return "x"+item.quantidade;
            },
            handler: () => {
              this.menuSubmit(ação, item.instânciaId)
            }
          }
        }),
        opçãoVoltar
      ],
      substituições: [
        ...this.substituições.map(substituição => {
          return {
            label: substituição.nome,
            description: substituição.descrição,
            handler: () => {
              //Troque-me, treinador!
              this.menuSubmitReplacement(substituição)
            }
          }
        }),
        opçãoVoltar
      ]
    }
  }

  /**
   * Método menuSubmitReplacement
   * Submete a substituição de um combatente.
   * @param {Object} substituição - O combatente de substituição.
   */
  menuSubmitReplacement(substituição) {
    this.menuTeclado?.end();
    this.aoCompletar({
      substituição
    })
  }

  /**
   * Método menuSubmit
   * Submete a ação escolhida pelo jogador.
   * @param {Object} ação - A ação escolhida.
   * @param {string} [instânciaId=null] - O ID da instância do item, se aplicável.
   */
  menuSubmit(ação, instânciaId=null) {

    this.menuTeclado?.end();

    this.aoCompletar({
      ação,
      alvo: ação.tipoAlvo === "amigável" ? this.lançador : this.inimigo,
      instânciaId
    })
  }

  decide() {
    //TODO: Inimigos devem decidir aleatoriamente o que fazer...
    this.menuSubmit(Ações[ this.lançador.ações[0] ]);
  }

  showMenu(container) {
    this.menuTeclado = new MenuTeclado();
    this.menuTeclado.init(container);
    this.menuTeclado.setOptions( this.getPages().root )
  }

  init(container) {

    if (this.lançador.controladoPeloJogador) {
      //Mostrar alguma UI
      this.showMenu(container)
    } else {
      this.decide()
    }
  }
}
