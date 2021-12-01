import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button
  from "../components/button";
import ButtonBox
  from "../components/buttonBox";
import { plantService } from '../services/plant'
import { userService } from '../services/user'
import { convertBase64, Logger } from '../helpers/helpers'
import Label from '../components/label'

export default function Plant() {
  const router = useRouter();
  const [form, setForm] = useState({
    plantCode: '',
    plantImage: '/img/selectapicture.png',
    plantTypeId: '',
    plantName: '',
    userId: '',
    dataType: 'NEW'
  })

  const [plants, setPlants] = useState([])

  const getUserPlant = (userId) => {
    plantService.getPlant(userId).then(plant => {
      if (plant.data) {
        Logger('log', 'plant', plant.data)
        let data = {
          plantCode: plant.data.PlantCode,
          plantImage: plant.data.PlantImage,
          plantTypeId: plant.data.PlantTypeId,
          plantName: plant.data.Name,
          userId: userId,
          dataType: 'LOADED'
        }

        Logger('log', 'data', data)
        setForm({ ...data, userId: userId })
      } else {
        setForm({ ...form, userId: userId })
      }
    }).catch(err => {
      Logger('log', "🚩 error al obtener la planta", err)
    })
  }

  useEffect(() => {
    const cb = (user) => {
      if (user) {
        Logger('log', "👩🏻‍💻 🌱 el usuario ya estaba logueado, obteniendo plantas y userId 🌱 🌱 🌱")

        plantService.getPlants().then(resp => {
          Logger('log', "🌱 plantas y userId ", resp, user.uid, false)
          setPlants(resp)
          getUserPlant(user.uid)
        }).catch(err => {
          Logger('log', "🚩 error al obtener plantas", err)
          router.push("/");
        })
      } else {
        router.push("/");
      }
    }

    userService.authState(cb)
  }, [])

  const selectFileHandler = async (e) => {
    if (event.target.files && event.target.files[0]) {
      const base64 = await convertBase64(event.target.files[0])
      setForm({ ...form, plantImage: base64 })
    }
  }

  const formHandler = (e) => {
    let value = e.target.value
    if (e.target.name === "plantTypeId") {
      value = plants.filter(plant => plant.Description === e.target.value)[0].PlantTypeID
    }

    setForm(prevstate => ({ ...prevstate, [e.target.name]: value }))
  }

  const checkValidityForm = () => {
    let disable = !!(form.plantCode && form.plantImage && form.plantTypeId && form.plantName && form.userId)
    return !disable
  }

  const formSubmitHandler = () => {
    plantService.addPlant({ ...form })
      .then(() => {
        alert("planta creada correctamente")
        getUserPlant(form.userId)
        router.push("/user");
      })
      .catch(err => alert(err))
  }

  const updateHandler = () => {
    Logger('log', form)

    plantService.updatePlant({ ...form })
      .then(() => {
        alert("Planta actualizada correctamente.")
        getUserPlant(form.userId)
      })
      .catch(err => {
        alert("Ocurrió un error al dar de alta la planta.")
      })
  }

  return (
    <main className="bg-plant-wall bg-cover bg-no-repeat w-full h-screen xs:flex xs:flex-col xs:h-screen">
      <div className="w-full h-4/5 flex items-center justify-center">
        <div className="w-1/2 h-full flex justify-between bg-gray-900 bg-opacity-60 xs:w-screen xs:items-center xs:flex-col xs:invisible xs:mt-10 xs:justify-evenly">
          <div className="flex flex-col justify-center w-3/4 ml-20 xs:w-screen xs:m-0 xs:visible xs:items-center">
            <img src={form.plantImage} alt="" className="w-full h-4/5 xs:w-2/4" />
            <input className="text-transparent xs:w-1/2" type="file"
              id="plantImage" name="plantImage"
              accept="image/png, image/jpeg" onChange={selectFileHandler} />
          </div>
          <div className="w-1/4 pl-5 flex flex-col xs:p-0 xs:m-0 xs:w-4/5 xs:items-center xs:visible">
            <Label className="text-white text-4xl pt-5 xs:text-lg xs:text-left xs:mt-0">Select a plant</Label>
            <select name="plantTypeId" id="plantTypeId" size="4" onChange={formHandler} className="text-black mt-5 xs:w-4/5 xs:self-center">
              {plants?.length > 0 ?
                plants.map(plant => {
                  let desc = plant.Description
                  return <option key={desc} selected={plant.PlantTypeID == form.plantTypeId} id={plant.PlantTypeID}>{desc[0].toLocaleUpperCase() + desc.substring(1)}</option>
                })
                :
                <option key="loading">loading...</option>
              }
            </select>
            <Label lblFor="plantName">Name</Label>
            <input className="xs:w-4/5" name="plantName" id="plantName" defaultValue={form.plantName} onChange={formHandler} />
            <Label lbllFor="plantCode" className="xs:text-left">Plant Code</Label>
            <input name="plantCode" id="plantCode" className={`xs:w-4/5 ${form.dataType === "LOADED" ? 'text-white' : 'text-black'}`} disabled={form.dataType === "LOADED"} defaultValue={form.plantCode} onChange={formHandler} />
          </div>
          {form.dataType === "LOADED" ?
            <>
              <Button classLink="bg-gray-600 p-5" className="p-0 m-0 bg-transparent" icon="edit" onClick={updateHandler} disable={checkValidityForm()} />
            </>
            :
            <Button className="bg-gray-600 p-5" icon="plus" onClick={formSubmitHandler} disable={checkValidityForm()} />
          }
        </div>

      </div>
      <div className="h-1/5 pl-5 w-full xs:p-0">
        <ButtonBox url={router.route} />
      </div>
    </main>
  );
}
