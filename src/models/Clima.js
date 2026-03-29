const mongoose = require("mongoose");

const climaSchema = new mongoose.Schema(
  {
    ciudad: {
      type: String,
      required: true,
      trim: true
    },
    temperatura: {
      type: Number,
      required: true
    },
    humedad: {
      type: Number,
      required: true
    },
    presion: {
      type: Number,
      required: true
    },
    nubosidad: {
      type: Number,
      required: true
    },
    weatherCode: {
      type: Number,
      required: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    fuente: {
      type: String,
      default: "Open-Meteo"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Clima", climaSchema);