class PauseMenu {
  constructor({progress, onComplete}) {
    this.progress = progress;
    this.onComplete = onComplete;
  }

  getOptions(pageKey) {

    // Caso 1: Mostrar a primeira página de opções
    if (pageKey === "root") {
      const lineupPizzas = playerState.lineup.map(id => {
        const {pizzaId} = playerState.pizzas[id];
        const base = Pizzas[pizzaId];
        return {
          label: base.nome,
          description: base.descricao,
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions(id) )
          }
        }
      })
      return [
        ...lineupPizzas,
        {
          label: "Salvar",
          description: "Salvar seu progresso",
          handler: () => {
            this.progress.save();
            this.close();
          }
        },
        {
          label: "Fechar",
          description: "Fechar o menu de pausa",
          handler: () => {
            this.close();
          }
        }
      ]
    }

    // Caso 2: Mostrar as opções para apenas uma pizza (por id)
    const unequipped = Object.keys(playerState.pizzas).filter(id => {
      return playerState.lineup.indexOf(id) === -1;
    }).map(id => {
      const {pizzaId} = playerState.pizzas[id];
      const base = Pizzas[pizzaId];
      return {
        label: `Trocar por ${base.nome}`,
        description: base.descricao,
        handler: () => {
          playerState.swapLineup(pageKey, id);
          this.keyboardMenu.setOptions( this.getOptions("root") );
        }
      }
    })

    return [
      ...unequipped,
      {
        label: "Mover para frente",
        description: "Mover esta pizza para a frente da lista",
        handler: () => {
          playerState.moveToFront(pageKey);
          this.keyboardMenu.setOptions( this.getOptions("root") );
        }
      },
      {
        label: "Voltar",
        description: "Voltar ao menu principal",
        handler: () => {
          this.keyboardMenu.setOptions( this.getOptions("root") );
        }
      }
    ];
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("PauseMenu");
    this.element.classList.add("overlayMenu");
    this.element.innerHTML = (`
      <h2>Menu de Pausa</h2>
    `)
  }

  close() {
    this.esc?.unbind();
    this.keyboardMenu.end();
    this.element.remove();
    this.onComplete();
  }

  async init(container) {
    this.createElement();
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container
    })
    this.keyboardMenu.init(this.element);
    this.keyboardMenu.setOptions(this.getOptions("root"));

    container.appendChild(this.element);

    utils.wait(200);
    this.esc = new KeyPressListener("Escape", () => {
      this.close();
    })
  }

}
