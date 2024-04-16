export default interface EncryptInterface {
  hash(password: string): string;
  compare(hash: string, original: string): boolean;
}
