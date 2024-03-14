export default class Shipment {
  update({ id, username }) {
    console.log(`[${id}] - [shipment] will pack the user's order to [${username}]`);
  }
}

/**
 * Update eh responsavel por gerenciar suas proprias execptions
 * Nao deve ter await no notify por que a responsabilidade do notify eh so emitir eventos
 * Soh notificar todo mundo
 */