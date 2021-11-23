import { Client } from "pg";

export default function userHandler(req, res) {
  const method = req.method;
  const codMaceta = req.body.codMaceta;
//  console.log(method, uid);

  switch (method) {
    case "POST":
      const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      client.connect((err) => {
        if (err) {
          console.log(err);
          return;
        }
        client.query(
          'select * from datosplanta where datosplanta."codMaceta" = $1',
          [codMaceta],
          (err, rest) => {
            if (err) {
              throw err;
            }
            res.status(200).json((rest.rows));
            client.end();
          }
        );
      });

      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
