/**
 * Objeto inimigos
 * Este objeto contém informações sobre os inimigos no jogo.
 */
window.inimigos = {
  /**
   * Inimigo erio
   * Um inimigo chamado Erio.
   */
  "erio": {
    nome: "Erio",
    src: "/images/characters/people/erio.png",
    pizzas: {
      "a": {
        pizzaId: "s001",
        maxHp: 50,
        nivel: 1,
      },
      "b": {
        pizzaId: "s002",
        maxHp: 50,
        nivel: 1,
      },
    }
  },
  /**
   * Inimigo beth
   * Um inimigo chamado Beth.
   */
  "beth": {
    nome: "Beth",
    src: "/images/characters/people/npc1.png",
    pizzas: {
      "a": {
        hp: 1,
        pizzaId: "f001",
        maxHp: 50,
        nivel: 1,
      },
    }
  },
  /**
   * Inimigo chefRootie
   * Um inimigo chamado Rootie.
   */
  "chefRootie": {
    nome: "Rootie",
    src: "/images/characters/people/secondBoss.png",
    pizzas: {
      "a": {
        pizzaId: "f002",
        maxHp: 30,
        nivel: 2,
      }
    }
  },
  "streetNorthBattle": {
    nome: "Pizza Thug",
    src: "/images/characters/people/npc8.png",
    pizzas: {
      "a": {
        pizzaId: "s001",
        maxHp: 20,
        nivel: 1,
      }
    }
  },
  "diningRoomBattle": {
    nome: "Pizza Thug",
    src: "/images/characters/people/npc8.png",
    pizzas: {
      "a": {
        pizzaId: "s001",
        maxHp: 15,
        nivel: 1,
      },
      "b": {
        pizzaId: "s002",
        maxHp: 15,
        nivel: 1,
      }
    }
  },
  "streetBattle": {
    nome: "Pizza Thug",
    src: "/images/characters/people/npc8.png",
    pizzas: {
      "a": {
        pizzaId: "f002",
        maxHp: 25,
        nivel: 1,
      }
    }
  }
}
