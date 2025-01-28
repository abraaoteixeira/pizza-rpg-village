/**
 * Classe EventoBatalha
 * Esta classe representa um evento de batalha.
 */
class EventoBatalha {
  constructor(evento, batalha) {
    this.evento = evento;
    this.batalha = batalha;
  }
  
  /**
   * Método mensagemTexto
   * Exibe uma mensagem de texto na tela.
   * @param {Function} resolver - Função a ser chamada ao completar a exibição da mensagem.
   */
  mensagemTexto(resolver) {
    const texto = this.evento.texto
    .replace("{LANÇADOR}", this.evento.lançador?.nome)
    .replace("{ALVO}", this.evento.alvo?.nome)
    .replace("{AÇÃO}", this.evento.ação?.nome)

    const mensagem = new MensagemTexto({
      texto,
      aoCompletar: () => {
        resolver();
      }
    })
    mensagem.init( this.batalha.elemento )
  }

  /**
   * Método alterarEstado
   * Altera o estado de um combatente (HP, status, etc.).
   * @param {Function} resolver - Função a ser chamada ao completar a alteração de estado.
   */
  async alterarEstado(resolver) {
    const {lançador, alvo, dano, recuperar, status, ação} = this.evento;
    let quem = this.evento.noLançador ? lançador : alvo;

    if (dano) {
      // Modifica o alvo para ter menos HP
      alvo.update({
        hp: alvo.hp - dano
      })
      
      // Inicia o piscar
      alvo.elementoPizza.classList.add("piscar-dano-batalha");
    }

    if (recuperar) {
      let novoHp = quem.hp + recuperar;
      if (novoHp > quem.maxHp) {
        novoHp = quem.maxHp;
      }
      quem.update({
        hp: novoHp
      })
    }

    if (status) {
      quem.update({
        status: {...status}
      })
    }
    if (status === null) {
      quem.update({
        status: null
      })
    }

    // Aguarda um pouco
    await utils.wait(600)

    // Atualiza os componentes da equipe
    this.batalha.equipeJogador.update();
    this.batalha.equipeInimiga.update();

    // Para de piscar
    alvo.elementoPizza.classList.remove("piscar-dano-batalha");
    resolver();
  }

  /**
   * Método menuSubmissao
   * Exibe o menu de submissão para o jogador escolher uma ação.
   * @param {Function} resolver - Função a ser chamada ao completar a escolha da ação.
   */
  menuSubmissao(resolver) {
    const {lançador} = this.evento;
    const menu = new MenuSubmissao({
      lançador: lançador,
      inimigo: this.evento.inimigo,
      itens: this.batalha.itens,
      substituições: Object.values(this.batalha.combatentes).filter(c => {
        return c.id !== lançador.id && c.equipe === lançador.equipe && c.hp > 0
      }),
      aoCompletar: submissao => {
        // Submissão { qual movimento usar, em quem usar }
        resolver(submissao)
      }
    })
    menu.init( this.batalha.elemento )
  }

  /**
   * Método menuSubstituicao
   * Exibe o menu de substituição para o jogador escolher um substituto.
   * @param {Function} resolver - Função a ser chamada ao completar a escolha do substituto.
   */
  menuSubstituicao(resolver) {
    const menu = new MenuSubstituicao({
      substituições: Object.values(this.batalha.combatentes).filter(c => {
        return c.equipe === this.evento.equipe && c.hp > 0
      }),
      aoCompletar: substituicao => {
        resolver(substituicao)
      }
    })
    menu.init( this.batalha.elemento )
  }

  /**
   * Método substituir
   * Substitui um combatente por outro.
   * @param {Function} resolver - Função a ser chamada ao completar a substituição.
   */
  async substituir(resolver) {
    const {substituicao} = this.evento;

    // Limpa o combatente antigo
    const combatenteAnterior = this.batalha.combatentes[this.batalha.combatentesAtivos[substituicao.equipe]];
    this.batalha.combatentesAtivos[substituicao.equipe] = null;
    combatenteAnterior.update();
    await utils.wait(400);

    // Entra o novo!
    this.batalha.combatentesAtivos[substituicao.equipe] = substituicao.id;
    substituicao.update();
    await utils.wait(400);

    // Atualiza os componentes da equipe
    this.batalha.equipeJogador.update();
    this.batalha.equipeInimiga.update();

    resolver();
  }

  /**
   * Método darXp
   * Concede experiência (XP) a um combatente.
   * @param {Function} resolver - Função a ser chamada ao completar a concessão de XP.
   */
  darXp(resolver) {
    let quantidade = this.evento.xp;
    const {combatente} = this.evento;
    const passo = () => {
      if (quantidade > 0) {
        quantidade -= 1;
        combatente.xp += 1;

        // Verifica se atingimos o ponto de subir de nível
        if (combatente.xp === combatente.maxXp) {
          combatente.xp = 0;
          combatente.maxXp = 100;
          combatente.nivel += 1;
        }

        combatente.update();
        requestAnimationFrame(passo);
        return;
      }
      resolver();
    }
    requestAnimationFrame(passo);
  }

  /**
   * Método animacao
   * Executa uma animação de batalha.
   * @param {Function} resolver - Função a ser chamada ao completar a animação.
   */
  animacao(resolver) {
    const fn = AnimacoesBatalha[this.evento.animacao];
    fn(this.evento, resolver);
  }

  /**
   * Método init
   * Inicializa o evento de batalha.
   * @param {Function} resolver - Função a ser chamada ao completar a inicialização.
   */
  init(resolver) {
    this[this.evento.tipo](resolver);
  }
}
