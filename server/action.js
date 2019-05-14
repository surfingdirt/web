import actions, { ACTION_PREFIX } from '~/actions';

const { PHOTO_NEW } = actions;

const action = async (req, res, next) => {
  console.log('action!');
  console.log(req.url);
  console.log(req.file);
  console.log(req.body);

  const actionName = req.url.replace(ACTION_PREFIX, '');
  switch (actionName) {
    case PHOTO_NEW:
      // TODO: perform graphql call, then forward to another page
      break;

    default:
      next(new Error(`Unhandled action '${actionName}'`));
  }
};

export default action;
