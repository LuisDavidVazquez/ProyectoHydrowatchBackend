export default interface EncryptInterface {
  compare(hash: string, original: string): boolean;
}
