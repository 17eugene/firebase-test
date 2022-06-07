import React from "react";
import { useState } from "react";
import { app, db, storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// import {
//   collection,
//   addDoc,
//   getDocs,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";

// import {
//   getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";

const Form = () => {
  const [data, setData] = useState({});
  const [file, setFile] = useState({});

  //   const collectionRef = collection(db, "users");
  //   const auth = getAuth();
  //   const googleProvider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const inputData = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputData });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // const dbData = { email: data.email, password: data.password };
    // addDoc(collectionRef, dbData)
    //   .then(console.log("User added", dbData))
    //   .catch((error) => console.log(error.message));
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} % done`);
      },
      (error) => console.log(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File avaliable at", downloadURL);
        });
      }
    );
  };

  //   const getData = () => {
  //     getDocs(collectionRef)
  //       .then((response) =>
  //         console.log(
  //           response.docs.map((item) => {
  //             return { ...item.data(), id: item.id };
  //           })
  //         )
  //       )
  //       .catch((error) => console.log(error));
  //   };

  //   const updateData = () => {
  //     const docToUpdate = doc(db, "users", "txQsEczZP8gfsQZeFETB");
  //     updateDoc(docToUpdate, {
  //       email: "bob47@mail.com",
  //     })
  //       .then(() => console.log("Data updated"))
  //       .catch((error) => console.log(error.message));
  //   };

  //   const deleteDocument = () => {
  //     const docToDelete = doc(db, "users", "5xZgLA1K2VvdmRMF0Dtw");
  //     deleteDoc(docToDelete)
  //       .then(() => console.log("Document deleted"))
  //       .catch((error) => console.log(error.message));
  //   };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input
          name="email"
          placeholder="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          name="password"
          placeholder="password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={uploadHandler}>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" />
        <button type="submit">Submit file upload</button>
      </form>
      {/* <button onClick={getData} type="submit">
        Get data
      </button>
      <button onClick={updateData} type="submit">
        Update data
      </button>
      <button onClick={deleteDocument} type="submit">
        Delete document
      </button> */}
    </>
  );
};

export default Form;
