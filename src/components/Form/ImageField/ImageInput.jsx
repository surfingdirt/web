// @flow
import React from 'react'
import cn from 'classnames'

import * as enums from './ImageInput.enum.js'
import * as helpers from './ImageInput.helpers.js'

import type {Props, State} from './ImageInput.flow.js'


class ImageInput extends React.Component<Props, State> {

  render() {
    const {meta = {}, validate, validate: {width, height}} = this.props
    const extensionLabel = enums.getExtLabel(validate.type) // '*.png'
    const inputCN = cn('form-control', {
              'is-invalid': meta.error && meta.touched})

    const showPreview = typeof this.props.value === 'object'
      && !!this.props.value
      && this.props.value.preview
    const previewValue = showPreview ? this.props.value.preview : void 0

    return (
      <div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <small id="passwordHelpBlock"
                   className="form-text text-muted">
              <mark>
                Image must be <strong>{extensionLabel} {width}x{height}</strong>
              </mark>
            </small>
            <input type="file" id={this.props.name}
                   className={inputCN}
                   onChange={this.handleChange}/>
             {meta.error &&
               <div className="invalid-feedback">{meta.error}</div>
             }
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {showPreview &&
            <div className="img-thumbnail">
              <img style={enums.IMAGE_STYLE} src={previewValue}/>
            </div>
          }
        </div>
      </div>
      </div>
    )
  }

  /*
    Methods are used in render
  */
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    debugger
    const {validate, onChange, onBlur} = this.props

    helpers.validate(e, validate, onChange, onBlur)
  }
}

export default ImageInput
