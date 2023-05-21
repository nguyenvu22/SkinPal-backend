const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const chatGPT = async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      temperature: 0,
      max_tokens: 150,
    });
    console.log("response.data: ", response.data);
    const reply = response.data.choices[0].text;
    console.log("reply: ", reply);
    return res.status(200).json({
      success: true,
      message: reply,
    });
  } catch (err) {
    return err;
  }
};
module.exports = {
  chatGPT,
};
