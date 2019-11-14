import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';

import CREATE_COMMENT_ALBUM from 'Apollo/mutations/createCommentAlbum.gql';
import CREATE_COMMENT_PHOTO from 'Apollo/mutations/createCommentPhoto.gql';
import CREATE_COMMENT_VIDEO from 'Apollo/mutations/createCommentVideo.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import Translate from 'Hocs/Translate';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { COMMENT_NEW_ALBUM, COMMENT_NEW_PHOTO, COMMENT_NEW_VIDEO } = actions;
const { ACTION } = buttonTypes;

const ALBUM = 'album';
const PHOTO = 'photo';
const VIDEO = 'video';

export const commentTypes = { ALBUM, PHOTO, VIDEO };

const MUTATIONS = {
  [ALBUM]: CREATE_COMMENT_ALBUM,
  [PHOTO]: CREATE_COMMENT_PHOTO,
  [VIDEO]: CREATE_COMMENT_VIDEO,
};

const ACTIONS = {
  [ALBUM]: COMMENT_NEW_ALBUM,
  [PHOTO]: COMMENT_NEW_PHOTO,
  [VIDEO]: COMMENT_NEW_VIDEO,
};

class CommentForm extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = { displayError: null };

    this.formRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  async onSubmit(mutate) {
    const { t } = this.props;

    const response = await mutate({ variables: {} });
    const { cover } = response.data.updateCover;
    this.context.updateCover(cover);
  }

  onCancel() {}

  async validate() {
    const { t } = this.props;
    return null;
  }

  render() {
    const { className, t, type, id } = this.props;

    return (
      <div className={classnames(styles.wrapper, className)}>
        <form
          className={styles.form}
          action={actionRoute(ACTIONS[type])}
          method="POST"
          encType="multipart/form-data"
          ref={this.formRef}
        >
          <div>
            <div>
              <label htmlFor="tone">Tone</label>
            </div>
            <input type="text" id="tone" name="tone" />
          </div>
          <div>
            <div>
              <label htmlFor="content">Content</label>
            </div>
            <textarea id="content" name="content" />
          </div>
          <input type="hidden" name="parentId" value={id} />
          <div className={styles.buttons}>
            <Button buttonType="submit" label="Post" type={ACTION} />
          </div>
        </form>
      </div>
    );
  }
}

export default Translate(messages)(CommentForm);
