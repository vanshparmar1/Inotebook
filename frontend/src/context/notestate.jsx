import NoteContext from "./notecontext";
import { useState } from "react";
const NoteState = (props) => {
  const s1 = {
    'name': "Vansh",
    'age': 21,
  };
  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({ ...state, name: "Abhisheikh Aggarwal" , age:22 });
    }, 1000);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
