/**
 * Função init
 * Inicializa o jogo MundoSuperior.
 */
(function () {

  const mundoSuperior = new MundoSuperior({
    elemento: document.querySelector(".game-container")
  });
  mundoSuperior.init();

})();
