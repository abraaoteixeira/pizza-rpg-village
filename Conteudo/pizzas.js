window.TiposDePizza = {
  normal: "normal",
  picante: "picante",
  vegetariana: "vegetariana",
  fungo: "fungo",
  frio: "frio",
}

window.Pizzas = {
  /**
   * Pizza s001
   * Uma pizza samurai picante.
   */
  "s001": {
    nome: "Samurai da Fatia",
    descricao: "Uma pizza samurai picante.",
    tipo: TiposDePizza.picante,
    src: "/images/characters/pizzas/s001.png",
    icone: "/images/icons/spicy.png",
    acoes: [ "saucyStatus", "clumsyStatus", "damage1" ],
  },
  /**
   * Pizza s002
   * Uma pizza guerreira salgada que não teme nada.
   */
  "s002": {
    nome: "Brigada de Bacon",
    descricao: "Uma pizza guerreira salgada que não teme nada.",
    tipo: TiposDePizza.picante,
    src: "/images/characters/pizzas/s002.png",
    icone: "/images/icons/spicy.png",
    acoes: [ "damage1", "saucyStatus", "clumsyStatus" ],
  },
  /**
   * Pizza v001
   * Uma pizza vegetariana chamada Kale.
   */
  "v001": {
    nome: "Me Chame de Kale",
    descricao: "Uma pizza vegetariana chamada Kale.",
    tipo: TiposDePizza.vegetariana,
    src: "/images/characters/pizzas/v001.png",
    icone: "/images/icons/veggie.png",
    acoes: [ "damage1" ],
  },
  /**
   * Pizza v002
   * Uma pizza vegetariana chamada Archie Artichoke.
   */
  "v002": {
    nome: "Archie Alcachofra",
    descricao: "Uma pizza vegetariana chamada Archie Artichoke.",
    tipo: TiposDePizza.vegetariana,
    src: "/images/characters/pizzas/v001.png",
    icone: "/images/icons/veggie.png",
    acoes: [ "damage1" ],
  },
  /**
   * Pizza f001
   * Uma pizza de fungo chamada Portobello Express.
   */
  "f001": {
    nome: "Expresso Portobello",
    descricao: "Uma pizza de fungo chamada Portobello Express.",
    tipo: TiposDePizza.fungo,
    src: "/images/characters/pizzas/f001.png",
    icone: "/images/icons/fungi.png",
    acoes: [ "damage1" ],
  },
  /**
   * Pizza f002
   * Uma pizza de fungo chamada Say Shitake.
   */
  "f002": {
    nome: "Diga Shitake",
    descricao: "Uma pizza de fungo chamada Say Shitake.",
    tipo: TiposDePizza.fungo,
    src: "/images/characters/pizzas/f001.png",
    icone: "/images/icons/fungi.png",
    acoes: [ "damage1" ],
  }
}
