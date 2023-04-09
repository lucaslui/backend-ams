import { entityUserSchema } from './entity-user-schema'

export const loadUsersSchema = {
  type: 'array',
  items: entityUserSchema
}
