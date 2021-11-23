import { Client } from "pg";

export default function userHandler(req,res) {
  const humedad = req.body.humedad;
  const codMaceta = req.body.codMaceta;
  const riego = req.body.riego;
  const method = req.method;
  //console.log(req.body.name);
  console.log(humedad);
  //res.status(200).json(Boolean(parseInt(200)));
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
            'insert into datosplanta ("codMaceta","humedad","riego","fecha") values ($1,$2,$3,now())',
          [codMaceta, humedad,riego],
          (err, rest) => {
            if (err) {
              throw err;
            }
            res.status(200).end;
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

  
