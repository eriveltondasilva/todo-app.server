import { Express } from 'express'

import { APP_PORT } from '@/config/constants'

/** --------------------------
 * @class Server
 * @desc Represents a server that starts and listens for incoming connections.
 **/
class Server {
  private static readonly message = '🚀 Server running... \n🚪 Port: %i'
  private static readonly port = APP_PORT

  /** @desc Starts the server and listens on the specified port 3000 **/
  static start(app: Express): void {
    app.listen(this.port, () => {
      console.log(this.message, this.port)
    })
  }
}

// --------------------------
export default Server
