"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./app/config/constants");
/** --------------------------
 * @class Server
 * @desc Represents a server that starts and listens for incoming connections.
 **/
class Server {
    /** @desc Starts the server and listens on the specified port 3000 **/
    static start(app) {
        app.listen(this.port, () => {
            console.log(this.message, this.port);
        });
    }
}
Server.message = '🚀 Server running... \n🚪 Port: %i';
Server.port = constants_1.APP_PORT;
// --------------------------
exports.default = Server;
