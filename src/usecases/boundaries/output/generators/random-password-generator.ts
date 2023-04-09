export interface RandomPasswordGenerator {
  generate: () => Promise<string>
}
