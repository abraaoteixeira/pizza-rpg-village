/**
 * Objeto AnimacoesBatalha
 * Este objeto contém métodos para animações de batalha.
 */
window.AnimacoesBatalha = {
  /**
   * Método spin
   * Anima a rotação de um elemento de pizza.
   * @param {Object} evento - Evento de animação.
   * @param {Function} aoCompletar - Função a ser chamada ao completar a animação.
   */
  async spin(evento, aoCompletar) {
    const elemento = evento.caster.pizzaElement;
    const nomeClasseAnimacao = evento.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
    elemento.classList.add(nomeClasseAnimacao);

    // Remove a classe quando a animação estiver completamente concluída
    elemento.addEventListener("animationend", () => {
      elemento.classList.remove(nomeClasseAnimacao);
    }, { once:true });

    // Continua o ciclo de batalha quando as pizzas colidem
    await utils.wait(100);
    aoCompletar();
  },

  /**
   * Método glob
   * Anima um orbe de glob.
   * @param {Object} evento - Evento de animação.
   * @param {Function} aoCompletar - Função a ser chamada ao completar a animação.
   */
  async glob(evento, aoCompletar) {
    const {caster} = evento;
    let div = document.createElement("div");
    div.classList.add("glob-orb");
    div.classList.add(caster.team === "player" ? "battle-glob-right" : "battle-glob-left");

    div.innerHTML = (`
      <svg viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="16" fill="${evento.color}" />
      </svg>
    `);

    // Remove a classe quando a animação estiver completamente concluída
    div.addEventListener("animationend", () => {
      div.remove();
    });

    // Adiciona à cena
    document.querySelector(".Battle").appendChild(div);

    await utils.wait(820);
    aoCompletar();
  }
}
