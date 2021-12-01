import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ButtonBox from "../components/buttonBox";
import { plantService } from '../services/plant'
import { userService } from '../services/user'
import { getFormattedDate, Logger } from '../helpers/helpers'

export default function User() {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [randomPlant, setRandomPlant] = useState([]);
  const [userPlant, setUserPlant] = useState({
    PlantImage: '/img/selectapicture.png',
    Description: 'No assigned plant',
    Humidity: '-',
    Watering: '-',
    Date: '-'
  })

  useEffect(() => {
    const cb = (user) => {
      if (user) {
        Logger('log', "👩🏻‍💻 🌱 el usuario ya estaba logueado, cargando info...", false)
        let randomPlant = plantService.getRandomPlant()
        setUserData(user);
        setRandomPlant(randomPlant)
        plantService.getPlant(user.uid).then(resp => {
          if (resp.data) {
            resp.data.Date = getFormattedDate(resp.data.Date)
            setUserPlant({ ...resp.data })
          }
        }).catch(err => Logger('log', "error:" + err))
      } else {
        router.push("/");
      }
    }

    userService.authState(cb)
  }, [])
  {(() => {
    if (!userPlant.Watering) {
      return (
        userPlant.Date = 'NOT CONTAIN DATA YET',
        userPlant.Humidity = 'NOT CONTAIN DATA YET',
        userPlant.Watering = 'NOT CONTAIN DATA YET'
      )
    }
  })()}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen xs:bg-opacity-80 xs:bg-gray-700 ">
      <main className="flex h-screen w-full xs:flex-col xs:invisible ">
        <section className="w-2/5 flex flex-col justify-around p-5 xs:visible xs:absolute xs:justify-between xs:p-0 xs:h-screen">
          <div className="flex xs:p-5">
            <img className="h-24 w-24 xs:rounded-3xl xs:shadow-sm" src={userData.photoURL} />
            <div className="flex flex-col pl-5 xs:text-white">
              <span>{userData.displayName}</span>
              <span>{userData.email} </span>
            </div>
          </div>
          <div className="xs:hidden">
            <h1 className="text-2xl text-green-500 border-b-2 border-gray-200">Daily tips.</h1>
            <div className="flex pt-5">
              <p className="text-gray-400">{randomPlant.tip}
              </p>
              <img className="bg-contain pl-1 h-28 w-28" src={randomPlant.img} />
            </div>
          </div>
          <ButtonBox url={router.route} />
        </section>
       
        <section className="w-3/5 flex flex-col justify-center items-center h-screen bg-opacity-80 bg-gray-700 p-5 xs:invisible xs:w-full xs:h-screen xs:p-0">
          <div className="flex items-center w-full h-3/5 xs:visible xs:flex-col xs:w-screen ">
            <div className="w-full h-full xs:w-full xs:px-5">
              <img className="bg-no-repeat bg-cover bg-center w-full h-full xs:rounded-3xl xs:shadow-md" src={userPlant.PlantImage} />
            </div>
            <div className="flex flex-col justify-center w-full h-full text-white p-5 xs:boder-2 xs:pt-1">
              <span className="pt-5 border-b-2 border-gray-300 text-2xl">{userPlant.Description}</span>
              <div className="flex flex-col">
                <div className="flex mt-5 w-full border-2 border-green-600">
                  <span className="w-1/2 pl-5">Last watering </span>
                  <span className="w-1/2">{userPlant.Date.toString('dd-MM-YYYY hh:mm:ss')}</span>
                </div>
                <div className="flex mt-5 w-full border-2 border-green-600">
                  <span className="w-1/2 pl-5">Humidity </span>
                  <span className="w-1/2">{userPlant.Humidity}</span>
                </div>
                <div className="flex justify-center mt-5 w-full border-2 border-green-600">
                  <span className="w-1/2 pl-5">Watering </span>
                  <span className="w-1/2 border-2 bg-green-600 text-center">{userPlant.Watering.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
