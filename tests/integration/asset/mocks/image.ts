import { ObjectID } from 'mongodb'

const imageMock = {
  _id: new ObjectID('5f9f1b9b9b9b9b9b9b9b9b9b'),
  fieldname: 'imageBinary',
  originalname: 'image.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer: '',
  size: 1111111,
  createdAt: '2023-01-01T00:00:00'
}

export { imageMock }
