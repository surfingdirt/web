// @flow
import React from 'react'

import type {Extension} from './ImageInput.flow.js'


export const validate = (e: SyntheticInputEvent<HTMLInputElement>, validate, onChange, onBlur) => {
  debugger
  onBlur()
  // get choosed file from form
  const file: File = e.target.files[0]

  if (!file) {
    throw new Error('file required')
  }

  // test image ext
  const extRequired = testFileExtension(file.type, validate.type)

  const sizePromise = testImgSize(file, validate.width, validate.height)
    .then(({w, h}) => {
      getBase64Image(file).then(({preview, ...rest}) => {
        // remove `preview` if invalid data
        const value = w && h && extRequired
          ? {preview, ...rest}
          : {...rest}
        onChange({...value, w, h, extRequired})
      })
  })
}

const testFileExtension = (typeToCheck: Extension, reqiredType: Extension): boolean => {
  return typeToCheck === reqiredType
}

const testImgSize = (f: File,
  vw: number, vh: number) => {
  return new Promise((resolve, reject) => {
  // https://stackoverflow.com/questions/13572129/is-it-possible-to-check-dimensions-of-image-before-uploading
  if (f) {
    const img = new Image();
    img.src = window.URL.createObjectURL(f);
    img.onload = () => {
      const {naturalWidth, naturalHeight} = img

      window.URL.revokeObjectURL(img.src)
      resolve({
        w: naturalWidth === vw,
        h: naturalHeight === vh
      })
    }
  }
})}

const getBase64Image = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = readerEvt => {
    const rawData = readerEvt.target.result
    // const b64FileData = fileData.replace(/data:([\w//]+);base64,/, '')

    resolve({rawData, preview: rawData})
      // fileData: b64FileData,
      // fileName: file.name,
      // fileType: file.type,
      // rawData,
    // })
  }
  reader.readAsDataURL(file)
})
