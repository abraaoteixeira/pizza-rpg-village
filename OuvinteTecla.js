/**
 * Classe OuvinteTecla
 * Esta classe lida com eventos de pressionamento de tecla.
 */
class OuvinteTecla {
  constructor(keyCode, callback) {
    this.keyCode = keyCode;
    this.callback = callback;
    this.keySafe = true;

    this.keydownFunction = (event) => {
      if (event.code === this.keyCode && this.keySafe) {
        this.keySafe = false;
        this.callback();
      }
    };

    this.keyupFunction = (event) => {
      if (event.code === this.keyCode) {
        this.keySafe = true;
      }
    };

    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }

  /**
   * Método unbind
   * Remove os ouvintes de eventos de pressionamento de tecla.
   */
  unbind() {
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}
