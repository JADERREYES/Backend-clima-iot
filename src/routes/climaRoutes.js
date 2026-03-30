const express = require("express");
const router = express.Router();

const {
  registrarClima,
  obtenerHistorialClima,
  obtenerUltimoClima,
  obtenerEstadisticas
} = require("../controllers/climaController");

// rutas
router.post("/clima", registrarClima);
router.get("/clima", obtenerHistorialClima);
router.get("/clima/ultimo", obtenerUltimoClima);
router.get("/clima/stats", obtenerEstadisticas);

module.exports = router;