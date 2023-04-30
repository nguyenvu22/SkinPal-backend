const routinesController = require("../controllers/routinesController");

module.exports = (app) => {
    app.post("/api/routines/create", routinesController.create);
    app.get("/api/routines/allRoutineOfUser/:idUser", routinesController.findAll);
}