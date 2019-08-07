import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import Button from 'Components/Button';
import FileField from 'Components/Form/FileField';
import Translate from 'Hocs/Translate';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

const { AVATAR_UPDATE } = actions;

const MAX_TARGET_SIZE = 640;
const MAX_WIDTH = MAX_TARGET_SIZE;
const MAX_HEIGHT = MAX_TARGET_SIZE;

const getOrientation = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const view = new DataView(event.target.result);

      if (view.getUint16(0, false) !== 0xffd8) {
        resolve(-2);
        return;
      }

      const length = view.byteLength;
      let offset = 2;

      while (offset < length) {
        const marker = view.getUint16(offset, false);
        offset += 2;

        if (marker === 0xffe1) {
          if (view.getUint32((offset += 2), false) !== 0x45786966) {
            resolve(-1);
            return;
          }
          const little = view.getUint16((offset += 6), false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;

          for (let i = 0; i < tags; i++)
            if (view.getUint16(offset + i * 12, little) === 0x0112) {
              resolve(view.getUint16(offset + i * 12 + 8, little));
              return;
            }
        } else if ((marker & 0xff00) !== 0xff00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      resolve(-1);
    });
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  });
};

const getBlob = (file, orientation, canvas) => {
  return new Promise((resolve) => {
    // Create an image
    const img = document.createElement('img');
    // Create a file reader
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      img.src = e.target.result;

      img.addEventListener('load', () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        if (4 < orientation && orientation < 9) {
          // Switch dimensions because we're going to rotate the content 90 degrees.
          canvas.width = height;
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // transform context before drawing image
        switch (orientation) {
          case 2:
            ctx.transform(-1, 0, 0, 1, width, 0);
            break;
          case 3:
            ctx.transform(-1, 0, 0, -1, width, height);
            break;
          case 4:
            ctx.transform(1, 0, 0, -1, 0, height);
            break;
          case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
          case 6:
            ctx.transform(0, 1, -1, 0, height, 0);
            break;
          case 7:
            ctx.transform(0, -1, -1, 0, height, width);
            break;
          case 8:
            ctx.transform(0, -1, 1, 0, 0, width);
            break;
          default:
            break;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const dataurl = canvas.toDataURL('image/jpeg');
        const blobBin = atob(dataurl.split(',')[1]);
        const array = [];
        for (let i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
        }
        resolve(new Blob([new Uint8Array(array)], { type: 'image/jpeg', name: 'photo.jpg' }));
      });
    });
    reader.readAsDataURL(file);
  });
};

class AvatarUpdateForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.previewRef = React.createRef();

    this.state = { fileData: null };
  }

  // TODO: drop final form for this, it's not useful


  onFileChange(e) {
    console.log('onFileChange', e);
    // TODO: resize and possibly rotate the image on the fly.

    const file = e.target.files[0];
    const p = getOrientation(file).then((orientation) => {
      this.setState({ fileData: getBlob(file, orientation, this.previewRef.current) });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('onSubmit', this.state.fileData);
    // TODO: add validation in some other method.
  }

  render() {
    const { t } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, submitting, submitError, errors }) => (
          <form
            onSubmit={handleSubmit}
            action={actionRoute(AVATAR_UPDATE)}
            method="POST"
            encType="multipart/form-data"
          >
            <FileField
              id="avatar"
              name="file"
              label={t('avatar')}
              canvasRef={this.previewRef}
              onChange={this.onFileChange}
            />
            <canvas ref={this.previewRef} className={styles.preview} />

            <Button
              buttonType="submit"
              label={t('update')}
              disabled={submitting}
              loading={submitting}
            />
          </form>
        )}
      />
    );
  }
}

export default Translate(messages)(AvatarUpdateForm);
