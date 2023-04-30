const usersController = require("../controllers/usersController");

module.exports = (app, upload) => {

    app.post('/api/users/registration', usersController.register);
    app.post('/api/users/registrationWithImg', upload.array('image', 1), usersController.registerWithImg);
    app.post('/api/users/login', usersController.login);

    app.put('/api/users/modification', usersController.update);
    app.put('/api/users/modificationWithImg', upload.array('image', 1), usersController.updateWithImg);
}