const chatController = require("../controllers/chatController");

module.exports = (app) => {
    app.post('/api/chat-gpt', chatController.chatGPT);
}