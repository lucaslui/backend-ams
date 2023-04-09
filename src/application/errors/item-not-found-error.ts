export class ItemNotFoundError extends Error {
  constructor (item: string, language?: string) {
    if (!language) {
      language = 'en'
    }

    const message = {
      en: `${item} not found`,
      pt: `${item} não encontrado`,
      es: `${item} no encontrado`
    }

    super(message[language])
    this.name = 'ItemNotFoundError'
  }
}
