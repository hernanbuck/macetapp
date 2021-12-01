import { query } from "../../config/postgre"
import { Logger } from "../../helpers/helpers"

export default function userHandler(req, res) {
  query('INSERT INTO Customers ("GoogleID","EntryDate","CustomerTypeId") values ($1,now(),1)', [req.body.GoogleID], (err, rest) => {
    if (err) {
      Logger('error', "🚩 💿 Query - Error al insertar el usuario: ", err, false)
      res.status(500).send({ error: 'error al insertar el usuario' })
    } else {
      Logger("✅  💿 Query -insert de usuario correcto", false)
      res.status(200).end();
    }
  })
}
