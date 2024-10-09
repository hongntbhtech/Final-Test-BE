const authRoute = require('./auth.route');

class Routes {
    constructor(app) {
        app.use('/api/auth', authRoute); 
    }
}
module.exports = Routes;