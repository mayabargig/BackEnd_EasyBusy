const { app } = require("./app");
const mongoose = require("mongoose");
const { config } = require("./config")

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("connected to db EasyBusy");

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
      console.log(`the server is running on http://localhost:${PORT}`);
  });
})
.catch(error => {
  console.error("DB connection error:", error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`the server is running on http://localhost:${PORT}`);
})
