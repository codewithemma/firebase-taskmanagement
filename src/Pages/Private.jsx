import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getDatabase } from "firebase/database";
const Private = ({ user }) => {
  const db = getDatabase();
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const HandleSignOut = () => {
    signOut(auth)
      .then(() => console.log("sign out"))
      .catch((error) => console.log(error));
  };

  // const unsubscribe = ref(db, "/posts/foo-bar-123");

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection, (db, "todos"), (snapshot) => {
  //     setTodos(
  //       snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
  //     );
  //   });
  //   return () => unsubscribe();
  // }, []);

  // const addTodo = () => {
  //   try {
  //     if (input.trim === "") {
  //       addDoc(collection(db, "todos"), { todo: input });
  //       setInput("");
  //     }
  //   } catch (error) {}
  // };

  return (
    <div>
      {user ? (
        <h1>welcome, {user.email}</h1>
      ) : (
        <h1 className="mx-auto">Please log in to access this page</h1>
      )}
      <div className="mx-auto col-lg-6">
        <input type="text" className="form-control" />
      </div>
      <button>add</button>
      <button
        value={input}
        className="button-confirm btn btn-primary"
        onClick={HandleSignOut}
        onChange={(event) => setInput(event.target.value)}
      >
        Log out
      </button>
      <p></p>
    </div>
  );
};

export default Private;
