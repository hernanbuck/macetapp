
import { query } from "../../config/postgre"
import { Logger } from "../../helpers/helpers"

export default function userHandler(req, res) {
    let method = req.method
    const { PlantCode, watering, humidity } = req.body;

    switch (method) {
        case "POST":

            query('INSERT INTO PUBLIC."plantData" ("PlantCode","Humidity","Watering","Date") VALUES ($1,$2,$3,now())',
                [PlantCode, humidity, watering],
                (err, rest) => {
                    if (err) {
                        Logger('error', "🚩 💿 Query - Error al crear metrica: ", err, false)
                        res.status(500).send({ error: 'error al crear planta' })
                    } else {
                        Logger("✅  💿 Query -creación de metrica correctamente", rest.rows, false)
                        res.status(201).json(rest.rows);
                    }
                });
            break;

        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}