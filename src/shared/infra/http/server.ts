import { app } from "./app";
import { Signale } from "signale";

export default class Server {
  public app;
  public log;

  private applicationPort = process.env.APP_PORT;

  constructor() {
    this.app = app;
    this.log = new Signale();
  }

  public start() {
    this.app.listen(this.applicationPort, () =>
      this.log
        .scope("Server")
        .success(`Server running on port: ${process.env.APP_PORT}`)
    );
  }
}
