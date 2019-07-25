// @flow
import React from 'react'

import ImageInput from './ImageInput'

import type {
  Extension, ImgRecord,
  ImageFieldProps as Props,
  ImageResult,
} from './ImageInput.flow.js'


const ImageField = ({input, meta, label, requirements}: Props) => {
  return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <ImageInput name={input.name} validate={requirements}
                    value={input.value} meta={meta} label={label}
                    onChange={input.onChange}
                    onBlur={input.onBlur}/>
      </div>
  )
}

export default ImageField
