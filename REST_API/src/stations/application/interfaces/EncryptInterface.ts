export default interface EncryptInterface {
  hash(password: string): string;
}
