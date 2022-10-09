import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/conversations";
import { IAddConversationDto } from "@real-time-chat/util-api/features/conversations/abstractions/conversation.dto";
import { getUserId, logout_async } from "@real-time-chat/util-shared/auth/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactList } from "./components/contact-list";
import { ConversationList } from "./components/conversation-list";
import { ToolbarActions } from "./components/toolbar-actions";
import LogoutIcon from '@mui/icons-material/Logout';
import Conversation from "./components/conversation";

const drawerWidth = 340;

export default () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showContacts, setShowContacts] = useState(false);

  const doShowContacts = () => setShowContacts(true);
  const doHideContacts = () => setShowContacts(false);

  const createConversation = async (userId: string) => {
    const currentUserId = getUserId();
    if (currentUserId == null) return;

    const requestBody: IAddConversationDto = { isGroupChat: false, participants: [userId, currentUserId] };
    await axios.post(baseApiRoute, requestBody);
  }

  const { mutate } = useMutation(createConversation, {
    onSuccess: () => queryClient.invalidateQueries(['conversations']),
  });

  const logout = async () => {
    await logout_async();
    navigate('/login');
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline/>

      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>

          <IconButton onClick={logout}>
            <LogoutIcon/>
          </IconButton>
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
          {showContacts
            ? <IconButton onClick={doHideContacts}>
              <ArrowBackIcon/>
            </IconButton>
            : <ToolbarActions openConversation={doShowContacts}/>
          }
        </Toolbar>

        <Divider/>

        {showContacts ? <ContactList onContactClick={(id: string) => mutate(id)}/> : <ConversationList/>}
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
