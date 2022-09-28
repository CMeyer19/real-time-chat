// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { Link, Route, Routes, useParams } from "react-router-dom";

const drawerWidth = 340;

axios.defaults.baseURL = 'api';
const queryClient = new QueryClient();

function Example() {
  const { isLoading, error, data, isFetching } = useQuery(
    ["conversations"],
    () => axios.get('conversations').then((res) => res.data)
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar/>

        <Divider/>

        <List>
          {data?.map((item: any, index: number) => (
            <ListItem key={item._id} component={Link} to={item._id} disablePadding>
              <ListItemButton>
                <ListItemText primary={item._id}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar/>

        <Routes>
          <Route path="/:id" element={<Conversation/>}/>
        </Routes>
      </Box>
    </Box>
  );
}

export function Conversation() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get('messages').then((res) => {
      console.log(res.data);
    })
  }, []);

  const addMessage = (id: string | undefined) => {
    if (!id) return;

    axios.post('messages', {
      text: 'hello',
      conversationId: id
    }).then(x => {
      console.log(x);
    });
  }

  return (
    <div>
      <p>{id}</p>
      <button onClick={() => addMessage(id)}>Submit</button>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example/>
    </QueryClientProvider>
  );
}
