import react from "react";
import { useContext } from "react";
import { useEffect } from "react";
import NoteContext from "../context/notecontext";
const About = () => {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
  }, []);
  return (
    <div>
      <h1>About iNotebook</h1>
      <p>
        (This is About {a.state.name}, {a.state.age})
      </p>
    </div>
  );
};

export default About;
