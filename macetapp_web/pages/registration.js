import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./header";
import Button from "./button";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { firebseApp } from "../config/firebase";
import axios from "axios";

export default function User() {
  const formRef = React.useRef();
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = getAuth(firebseApp);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
  }, []);

  const logout = () => {
    const auth = getAuth(firebseApp);
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        router.push("/error");
      });
  };
  function handleSubmit(evt) {
    //router.push("/user");
    
    evt.preventDefault();
    /*
        1. Usamos FormData para obtener la información
        2. FormData requiere la referencia del DOM,
           gracias al REF API podemos pasar esa referencia
        3. Finalmente obtenemos los datos serializados
      */
    const formData = new FormData(formRef.current);
    const values = Object.fromEntries(formData);
    
    // Aquí puedes usar values para enviar la información
    
    axios.post('/api/registro/register', {
      name: values.name,
      email: values.email
    }).then(()=>{
      console.log()
      }).catch(error => {
      console.log(error)
      })
      router.push("/");
    //router.push("/users"+values.nombre);
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
    <h1>Complete su registro</h1><br />
    <label htmlFor="email">Email:   </label>
    <input id="email" name="email" type="email" size="50" value={user.email} readOnly/><br />
    <label htmlFor="name">Nombre Completo:   </label>
    <input id="name" name="name" type="text" /><br />
    <button type="submit">Submit</button>
  </form>
);
}
