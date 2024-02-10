"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./app/config/constants");
class Server {
    static start(app) {
        try {
            app.listen(this.port, () => {
                console.log(this.message, this.port);
            });
        }
        catch (error) {
            console.error(error.message);
        }
    }
}
Server.message = '🚀 Server running... \n🚪 Port: %i';
Server.port = constants_1.APP_PORT;
exports.default = Server;
//# sourceMappingURL=server.js.map