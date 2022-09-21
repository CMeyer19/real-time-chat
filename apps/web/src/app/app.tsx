// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    fetch('/api').then(async x => {
      const meh = await x.json();
      console.log(meh);
      debugger;
    }).catch(e => console.error(e));
  }, []);

  return (
    <p>Hello</p>
  );
}

export default App;
