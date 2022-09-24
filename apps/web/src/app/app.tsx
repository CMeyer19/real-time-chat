// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";

export function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api').then(async response => {
      const responseData: { message: string } = await response.json();
      setMessage(responseData.message);
    }).catch(e => console.error(e));

    fetch('/api/conversations').then(async response => {
      const responseData: Array<unknown> = await response.json();
      console.log(responseData);
    }).catch(e => console.error(e));
  }, []);

  return (
    <p>{message}</p>
  );
}

export default App;
