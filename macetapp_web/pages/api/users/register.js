import { Client } from "pg";

export default function userHandler(req,res) {
  const uid = req.body.uid;
  const method = req.method;
  //console.log(req.body.name);
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
            'insert into clientes ("GoogleID","FechaAlta","TipoClienteID") values ($1,now(),1)',
          [uid],
          (err, rest) => {
            if (err) {
              throw err;
            }
           // res.status(200).json(Boolean(parseInt(rest.rows[0].exist)));
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

  
