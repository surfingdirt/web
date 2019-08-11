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

const getBlob = (file, orientation, canvasEl, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    // Create an image
    const img = document.createElement('img');
    // Create a file reader
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      img.src = e.target.result;

      img.addEventListener('error', () => {
        reject(new Error('Invalid image'));
      });

      img.addEventListener('load', () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        if (4 < orientation && orientation < 9) {
          // Switch dimensions because we're going to rotate the content 90 degrees.
          canvasEl.width = height;
          canvasEl.height = width;
        } else {
          canvasEl.width = width;
          canvasEl.height = height;
        }

        const ctx = canvasEl.getContext('2d');
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
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

        const dataurl = canvasEl.toDataURL('image/jpeg');
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

export const previewResizeAndOrientFile = async (file, canvasEl, maxWidth, maxHeight) => {
  const fileData = await getOrientation(file).then((orientation) => {
    return getBlob(file, orientation, canvasEl, maxWidth, maxHeight);
  });

  return fileData;
};