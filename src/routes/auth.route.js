const { Router } = require('express');
const AuthController = require("../controller/auth.controller");

class AuthRouter {
    router = Router();

    controller = new AuthController(); // Controller handle API

    constructor() {
        this.initialize();
    }

    initialize() {
        this.router.get('/', this.controller.getListAuth); // route get all user
        this.router.post('/sign-in', this.controller.signIn); //route sign-in
        this.router.post('/sign-up', this.controller.signUp);//route sign-up
    }
}

module.exports = new AuthRouter().router;
