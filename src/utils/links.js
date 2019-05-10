import routes from '../routes';

const { VIDEO } = routes;

const ID_REGEXP = new RegExp(':id');

export const videoRoute = (id) => VIDEO.replace(ID_REGEXP, id);
