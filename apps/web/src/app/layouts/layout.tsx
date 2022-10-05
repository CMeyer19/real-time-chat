import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/conversations";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link, Route, Routes } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Conversation from "../pages/conversation";
import React from "react";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 340;

export function Layout() {
  const { data } = useQuery(
    ["conversations"],
    () => axios.get(baseApiRoute).then((res) => res.data)
  );

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
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
        <Toolbar>
          <IconButton>
            <AddIcon/>
          </IconButton>
        </Toolbar>

        <Divider/>

        <List>
          {data?.map((item: { _id: string }) => (
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
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Toolbar/>

        <Routes>
          <Route path="/:id" element={<Conversation/>}/>
        </Routes>
      </Box>
    </Box>
  );
}
