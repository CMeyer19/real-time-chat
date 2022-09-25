// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    <Box sx={{ flexGrow: 1 }}>
      <p>{message}</p>
      
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
