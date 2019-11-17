import uuid from 'uuid/v4'

export const emptyRow = () => {
  return {
    domain: '',
    range: '',
    id: uuid(),
  }
}

export const emptyMetadata = {
  id: '',
  timestamp: '',
}
