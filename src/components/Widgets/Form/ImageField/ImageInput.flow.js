export type Props = {
  validate: {
    
  },
  id: String,
  title: String,
  fileName: String,
  url: String,
  onChange: () => void,
  toDelete: Boolean,
  onDeleteClick: () => void,
  showModal: () => void,
  chosenFilename: String,
  currentFileUrl: String,
}

export type Extension = 'image/gif' | 'image/jpeg' | 'image/png'

type State = {
  image?: string,
  fileExt?: Extension,
  width?: number,
  height?: number,
}

type FormFile = {
  size: number,
  type: Extension,
}
