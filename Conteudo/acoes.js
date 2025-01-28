/**
 * Objeto acoes
 * Este objeto contém ações que podem ser realizadas durante a batalha.
 */
window.acoes = {
  /**
   * Ação damage1
   * Causa dano ao alvo.
   */
  damage1: {
    nome: "Whomp!",
    descricao: "Soco macio de massa",
    sucesso: [
      { tipo: "mensagemTexto", texto: "{LANÇADOR} usa {AÇÃO}!"},
      { tipo: "animação", animação: "girar"},
      { tipo: "alterarEstado", dano: 10}
    ]
  },
  /**
   * Ação saucyStatus
   * Aplica o status Saucy ao alvo.
   */
  saucyStatus: {
    nome: "Tomato Squeeze",
    descricao: "Aplica o status Saucy",
    tipoAlvo: "amigável",
    sucesso: [
      { tipo: "mensagemTexto", texto: "{LANÇADOR} usa {AÇÃO}!"},
      { tipo: "alterarEstado", status: { tipo: "saucy", expiresIn: 3 } }
    ]
  },
  /**
   * Ação clumsyStatus
   * Aplica o status Clumsy ao alvo.
   */
  clumsyStatus: {
    nome: "Olive Oil",
    descricao: "Bagunça escorregadia de delícias",
    sucesso: [
      { tipo: "mensagemTexto", texto: "{LANÇADOR} usa {AÇÃO}!"},
      { tipo: "animação", animação: "glob", cor: "#dafd2a" },
      { tipo: "alterarEstado", status: { tipo: "clumsy", expiraEm: 3 } },
      { tipo: "mensagemTexto", texto: "{ALVO} está escorregando por toda parte!"},
    ]
  },
  //Itens
  item_recoverStatus: {
    nome: "Heating Lamp",
    descricao: "Sentindo-se fresco e aquecido",
    tipoAlvo: "amigável",
    sucesso: [
      { tipo: "mensagemTexto", texto: "{LANÇADOR} usa um {AÇÃO}!"},
      { tipo: "alterarEstado", status: null },
      { tipo: "mensagemTexto", texto: "Sentindo-se fresco!", },
    ]
  },
  item_recoverHp: {
    nome: "Parmesan",
    tipoAlvo: "amigável",
    sucesso: [
      { tipo:"mensagemTexto", texto: "{LANÇADOR} polvilha um pouco de {AÇÃO}!", },
      { tipo:"alterarEstado", recuperar: 10, },
      { tipo:"mensagemTexto", texto: "{LANÇADOR} recupera HP!", },
    ]
  },
}
