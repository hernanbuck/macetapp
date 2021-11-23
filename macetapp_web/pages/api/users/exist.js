import { Client } from "pg";

export default function userHandler(req, res) {
  const method = req.method;
  const uid = req.body.uid;
  console.log(method, uid);

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
          'select count(clientes."ClienteID") AS exist from clientes where clientes."GoogleID" = $1',
          [uid],
          (err, rest) => {
            if (err) {
              throw err;
            }
            res.status(200).json(Boolean(parseInt(rest.rows[0].exist)));
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
