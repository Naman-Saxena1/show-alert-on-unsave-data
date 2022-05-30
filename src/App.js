import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState(``);
  const [isDataSaved, setIsDataSaved] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    window.onbeforeunload =
      isDataSaved === false && (() => "Are you sure you want to exit?");

    return () => {
      window.onbeforeunload = null;
    };
  }, [isDataSaved]);

  return (
    <div className="App">
      <form
        style={{
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `center`,
          gap: `1rem`,
          maxWidth: `380px`,
          margin: `0 auto`
        }}
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem(`text`, text);
          setIsDataSaved(true);
        }}
      >
        <input
          type="text"
          placeholder="Enter some text"
          ref={textRef}
          style={{ padding: `8px` }}
          onChange={(e) => {
            setText(e.target.value);
            setIsDataSaved(false);
          }}
        />

        <button type="submit" style={{ padding: `8px` }}>
          Save Data
        </button>
      </form>
    </div>
  );
}

// Create a text editor, which will save its content to local storage
// by clicking the save button. But if the user tries to close the tab
// or the window without saving, it should
// show a prompt saying: “Your data may be lost! save now!”
