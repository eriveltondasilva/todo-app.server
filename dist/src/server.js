"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setting_1 = require("../src/app/config/setting");
/** --------------------------
 * @class Server
 * @desc Represents a server that starts and listens for incoming connections.
 **/
class Server {
    /**
     * @desc Starts the server and listens on the specified port.
     * @param {Express} app - The Express app instance.
     **/
    static start(app) {
        app.listen(this.port, () => {
            console.log(this.message, this.port);
        });
    }
}
Server.message = '🚀 Server running... \n🚪 Port: %s';
Server.port = setting_1.APP_PORT;
// --------------------------
exports.default = Server;
