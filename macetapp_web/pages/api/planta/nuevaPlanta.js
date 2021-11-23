import { Client } from "pg";

export default function userHandler(req,res) {
  const nombre = req.body.nombre;
  const uid = req.body.uid;
  const codMaceta = req.body.codMaceta;
  const tipoPlantaID = req.body.tipoPlantaID;
  const method = req.method;
  //console.log(req.body.name);
//  console.log(humedad);
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
            'insert into plantas ("codMaceta","nombre","tipoPlantaID","fechaAlta") values ($1,$2,$3,now())',
          [codMaceta, nombre,tipoPlantaID],
          (err, rest) => {
            if (err) {
              throw err;
            }        
            res.status(200);
           // client.end();
          }
          );    
      
        client.query(
            'insert into cliente_x_planta ("codMaceta","GoogleID") values ($1,$2)',
        [codMaceta,uid],
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

    
