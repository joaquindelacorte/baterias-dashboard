"use strict";
const googleTrends = require("google-trends-api");

exports.handler = async (event) => {
  const { start, end } = event.queryStringParameters || {};

  const startTime = start ? new Date(start) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endTime   = end   ? new Date(end)   : new Date();

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const raw = await googleTrends.interestByRegion({
      keyword: "bateria auto",
      geo: "AR",
      resolution: "REGION",
      startTime,
      endTime,
    });

    // google-trends-api returns a JSON string
    const parsed = JSON.parse(raw);
    return { statusCode: 200, headers, body: JSON.stringify(parsed) };
  } catch (err) {
    // Fallback: synthetic data so the dashboard still renders
    const fallback = {
      geoMapData: [
        { geoCode: "AR-C", geoName: "Ciudad de Buenos Aires", value: [95] },
        { geoCode: "AR-B", geoName: "Buenos Aires",           value: [88] },
        { geoCode: "AR-X", geoName: "Cordoba",                value: [72] },
        { geoCode: "AR-S", geoName: "Santa Fe",               value: [68] },
        { geoCode: "AR-M", geoName: "Mendoza",                value: [55] },
        { geoCode: "AR-T", geoName: "Tucuman",                value: [48] },
        { geoCode: "AR-A", geoName: "Salta",                  value: [40] },
        { geoCode: "AR-E", geoName: "Entre Rios",             value: [38] },
        { geoCode: "AR-W", geoName: "Corrientes",             value: [35] },
        { geoCode: "AR-Q", geoName: "Neuquen",                value: [32] },
        { geoCode: "AR-R", geoName: "Rio Negro",              value: [30] },
        { geoCode: "AR-N", geoName: "Misiones",               value: [28] },
        { geoCode: "AR-H", geoName: "Chaco",                  value: [25] },
        { geoCode: "AR-G", geoName: "Santiago del Estero",    value: [22] },
        { geoCode: "AR-J", geoName: "San Juan",               value: [20] },
        { geoCode: "AR-K", geoName: "Catamarca",              value: [18] },
        { geoCode: "AR-Y", geoName: "Jujuy",                  value: [16] },
        { geoCode: "AR-D", geoName: "San Luis",               value: [14] },
        { geoCode: "AR-L", geoName: "La Pampa",               value: [12] },
        { geoCode: "AR-P", geoName: "Formosa",                value: [10] },
        { geoCode: "AR-F", geoName: "La Rioja",               value: [10] },
        { geoCode: "AR-U", geoName: "Chubut",                 value: [9]  },
        { geoCode: "AR-Z", geoName: "Santa Cruz",             value: [7]  },
        { geoCode: "AR-V", geoName: "Tierra del Fuego",       value: [5]  },
      ],
      _fallback: true,
      _error: err.message,
    };
    return { statusCode: 200, headers, body: JSON.stringify(fallback) };
  }
};
