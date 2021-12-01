import { query } from "../../../config/postgre"
import { Logger } from "../../../helpers/helpers"

export default function userHandler(req, res) {

  // api/users/1
  // 1 -> req.query.slug[0] = "1"
  // /1/plants -> req.query.slug[1] = "plants"
  if (req.method === "GET") {
    if (req.query.slug.length === 1) {
      query('SELECT * FROM Customers WHERE "GoogleID" = $1', [req.query.slug[0]], (err, rest) => {
        if (err) {
          Logger('🚩 💿 - Query - Errpr al verificar si existe el usuario', err)
          res.status(500).send({ error: 'error al obtener el usuario' })
        } else {
          Logger('✅ Se obtuvo el usuario correctamente de la base', Boolean(rest.rows.length))
          res.status(200).send(Boolean(rest.rows.length))
        }
      })
    } else {
      //api/users/1/plants
      query('SELECT pt."Description", p."Name", pd."Humidity", pd."Watering" as "Watering", pd."Date", p."Image" as "PlantImage", p."PlantCode", p."PlantTypeId" FROM "plants" p LEFT JOIN "plantData" pd ON pd."PlantCode" = p."PlantCode" inner JOIN "plantType" pt on pt."PlantTypeID" = p."PlantTypeId" where p."GoogleID" LIKE $1 order by pd."Date" desc limit 1 ',
        [req.query.slug[0]], (err, rest) => {
          if (err) {
            Logger('error', '🚩💿 Query - Error al obtener la planta del usuario')
            res.status(500).send({ error: 'error al obtener la planta del usuario' })
          } else {
            Logger('✅ 💿 Query - Se obtuvo la planta del usuario', rest.rows[0])
            res.status(200).send(rest.rows[0])
          }
        })
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
