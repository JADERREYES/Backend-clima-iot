const Clima = require("../models/Clima");

const registrarClima = async (req, res) => {
  try {
    const {
      ciudad,
      temperatura,
      humedad,
      presion,
      nubosidad,
      weatherCode,
      descripcion,
      fuente
    } = req.body;

    if (
      !ciudad ||
      temperatura === undefined ||
      humedad === undefined ||
      presion === undefined ||
      nubosidad === undefined ||
      weatherCode === undefined ||
      !descripcion
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: "Todos los campos son obligatorios"
      });
    }

    const nuevoRegistro = new Clima({
      ciudad,
      temperatura,
      humedad,
      presion,
      nubosidad,
      weatherCode,
      descripcion,
      fuente: fuente || "Open-Meteo"
    });

    const guardado = await nuevoRegistro.save();

    res.status(201).json({
      ok: true,
      mensaje: "Registro de clima guardado correctamente",
      data: guardado
    });
  } catch (error) {
    console.error("Error al registrar clima:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor"
    });
  }
};

const obtenerHistorialClima = async (req, res) => {
  try {
    const registros = await Clima.find().sort({ createdAt: -1 });

    res.json({
      ok: true,
      total: registros.length,
      data: registros
    });
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor"
    });
  }
};

const obtenerUltimoClima = async (req, res) => {
  try {
    const ultimo = await Clima.findOne().sort({ createdAt: -1 });

    if (!ultimo) {
      return res.status(404).json({
        ok: false,
        mensaje: "No hay registros de clima"
      });
    }

    res.json({
      ok: true,
      data: ultimo
    });
  } catch (error) {
    console.error("Error al obtener último registro:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor"
    });
  }
};

const obtenerEstadisticas = async (req, res) => {
  try {
    const registros = await Clima.find();

    if (registros.length === 0) {
      return res.json({
        ok: true,
        data: {
          totalRegistros: 0,
          promedioTemperatura: 0,
          promedioHumedad: 0,
          promedioPresion: 0
        }
      });
    }

    const total = registros.length;

    const sumaTemperatura = registros.reduce((acc, item) => acc + item.temperatura, 0);
    const sumaHumedad = registros.reduce((acc, item) => acc + item.humedad, 0);
    const sumaPresion = registros.reduce((acc, item) => acc + item.presion, 0);

    res.json({
      ok: true,
      data: {
        totalRegistros: total,
        promedioTemperatura: Number((sumaTemperatura / total).toFixed(2)),
        promedioHumedad: Number((sumaHumedad / total).toFixed(2)),
        promedioPresion: Number((sumaPresion / total).toFixed(2))
      }
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor"
    });
  }
};

module.exports = {
  registrarClima,
  obtenerHistorialClima,
  obtenerUltimoClima,
  obtenerEstadisticas
};