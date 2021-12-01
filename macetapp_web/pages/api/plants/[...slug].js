import { query } from "../../../config/postgre"

// se podría borrar, no se usa y no le veo uso en ningun lado, aparte esta la query desactualizada.
export default function userHandler(req, res) {
  if (req.method === "GET") {
    let plantTypeId = req.query.slug[0]
    query('SELECT Description FROM tipoplanta WHERE PlantTypeId = $1', [plantTypeId], (err, rest) => {
      if (err) {
        res.status(500).send({ error: 'error al obtener un tipo de planta especifico' })
      } else {
        res.status(200).send(Boolean(rest.rows))
      }
    })
  }
}