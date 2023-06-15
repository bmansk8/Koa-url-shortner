export class ApiCall {
  public key?: string;
  public url?: string;
  public customName?: string;
  constructor(url?: string);
  constructor(url?: string, key?: string);
  constructor(url?: string, key?: string, customName?: string) 
  constructor(url?: string, key?: string, customName?: string) {
    this.key = key;
    this.url = url;
    this.customName = customName;
  }
}
