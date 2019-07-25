import type {Extension} from './ImageInput.flow.js'

export const IMAGE_STYLE = {
  display: 'inline-block',
  width: '150px',
}

export const EXT_LABELS = {
  'image/gif': '*.gif',
  'image/jpeg': '*.jpeg',
  'image/png': '*.png',
}

export const getExtLabel = (t: Extension): string => EXT_LABELS[t]
