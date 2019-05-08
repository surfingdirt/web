import routes from '../routes';

const { CLUB, MATCH, PLAYER, VIDEO } = routes;

const ID_REGEXP = new RegExp(':id');

export const clubRoute = (id) => CLUB.replace(ID_REGEXP, id);

export const matchRoute = (id) => MATCH.replace(ID_REGEXP, id);

export const playerRoute = (id) => PLAYER.replace(ID_REGEXP, id);

export const videoRoute = (id) => VIDEO.replace(ID_REGEXP, id);
