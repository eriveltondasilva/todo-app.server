import type { Express } from 'express';
import { APP_PORT } from '../src/app/config/setting';

/** --------------------------
 * @class Server
 * @desc Represents a server that starts and listens for incoming connections.
 **/
class Server {
  private static readonly message = '🚀 Server running... \n🚪 Port: %s';
  private static readonly port = APP_PORT;

  /**
   * @desc Starts the server and listens on the specified port.
   * @param {Express} app - The Express app instance.
   **/
  public static start(app: Express): void {
    app.listen(this.port, () => {
      console.log(this.message, this.port);
    });
  }
}

// --------------------------
export default Server;
