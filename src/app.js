const express = require("express");
const cors = require("cors");
const climaRoutes = require("./routes/climaRoutes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// ruta raíz
app.get("/", (req, res) => {
  res.json({
    ok: true,
    mensaje: "API de clima IoT funcionando"
  });
});

// rutas API
app.use("/api", climaRoutes);

// 🔴 IMPORTANTE (esto faltaba)
module.exports = app;