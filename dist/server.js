"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("./app/config/env.config");
class Server {
    static start(app) {
        try {
            app.listen(this.port, () => {
                console.log(this.message, this.port);
            });
        }
        catch (error) {
            console.error(error.message);
            process.exit(1);
        }
    }
}
Server.message = '🚀 Server running... \n🚪 Port: %d';
Server.port = env_config_1.APP_PORT;
exports.default = Server;
//# sourceMappingURL=server.js.map