import { query } from "../../../config/postgre"
import { Logger } from "../../../helpers/helpers";

export default function userHandler(req, res) {
  const plantCode = req.query.plantCode;
  let script = ''

  if (req.method === "GET") {
    if (req.query.q && req.query.watering) {
      script = 'SELECT * FROM "plantData"  WHERE "PlantCode" = $1 AND "Watering" = \'' + req.query.watering + '\' ORDER BY "Date" DESC LIMIT ' + req.query.q;
    } else if (req.query.q) {
      script = 'SELECT * FROM "plantData"  WHERE "PlantCode" = $1 ORDER BY "Date" DESC LIMIT ' + req.query.q;
    } else if (req.query.watering) {
      script = 'SELECT * FROM "plantData"  WHERE "PlantCode" = $1 AND "Watering" = \'' + req.query.watering + '\' ORDER BY "Date"';
    } else {
      script = 'SELECT * FROM "plantData"  WHERE "PlantCode" = $1 ORDER BY "Date"';
    }

    query(script, [plantCode], (err, rest) => {
      if (err) {
        Logger('error', '🚩 💿 Query - Error las metricas de la planta', err)
        res.status(500).send({ error: 'error al obtener la planta' })
      } else {
        Logger('✅ Se obtuvieron las metricas de la planta', rest.rows)
        res.status(200).send(rest.rows)
      }
    })
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}