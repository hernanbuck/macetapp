import { query } from "../../config/postgre"
import { Logger } from "../../helpers/helpers"

export default function userHandler(req, res) {
    let method = req.method
    const { plantName, userId, plantCode, plantTypeId, plantImage } = req.body;

    switch (method) {
        case "GET":
            query('SELECT "PlantTypeID", "Description" FROM "plantType"', (err, rest) => {
                if (err) {
                    Logger('log', "🚩 💿 Query - Error al obtener plantas: ", err, false)
                    res.status(500).send({ error: 'error al obtener plantas' })
                } else {
                    Logger('log', "✅  obtención de plantas correctamente", rest.rows, false)
                    res.status(200).json(rest.rows);
                }
            })
            break;
        case "POST":

            query('INSERT INTO Plants ("PlantCode","Name","PlantTypeId","EntryDate","GoogleID", "Image") VALUES ($1,$2,$3,now(),$4, $5)',
                [plantCode, plantName, plantTypeId, userId, plantImage],
                (err, rest) => {
                    if (err) {
                        Logger('error', "🚩 💿 Query - Error al crear plantas: ", err, false)
                        res.status(500).send({ error: 'error al crear planta' })
                    } else {
                        Logger("✅  💿 Query -creación de planta correctamente", rest.rows, false)
                        res.status(201).json(rest.rows);
                    }
                });
            break;
        case "PATCH":
            query('update plants set "Image" = $1, "Name" = $2, "PlantTypeId" = $3 where "PlantCode" = $4',
                [plantImage, plantName, plantTypeId, plantCode], (err, rest) => {
                    if (err) {
                        Logger('error', '"🚩 💿 Query - Error al eliminar la planta del usuario', err)
                        res.status(500).send({ error: 'error al eliminar la planta del usuario' })
                    } else {
                        Logger('✅  💿 Query - Se actualizó la planta correctamente')
                        res.status(200).send()
                    }
                })
            break
        default:
            res.setHeader("Allow", ["GET", "POST", "PATCH"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}