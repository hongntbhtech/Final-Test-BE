const authRoute = require('./auth.route');

class Routes {
    constructor(app) {
        app.use('/api/auth', authRoute); // Route for server
    }
}
module.exports = Routes;