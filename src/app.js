const express = require("express");
const cors = require("cors");
const climaRoutes = require("./routes/climaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    mensaje: "API de clima IoT funcionando"
  });
});

app.use("/api", climaRoutes);

module.exports = app;