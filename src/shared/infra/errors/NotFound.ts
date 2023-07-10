export class NotFound {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string) {
    this.message = message;
    this.statusCode = 404;
  }
}
