import IconButton from "@mui/material/IconButton";
import React, { useRef } from "react";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Button from "@mui/material/Button";
import axios from "axios";
import { baseApiRoute } from "@real-time-chat/util-api/features/user-associations";
import { getUserId } from "@real-time-chat/util-shared/auth/auth.service";
import {
  IAddUserAssociationDto
} from "@real-time-chat/util-api/features/user-associations/abstractions/user-association.dto";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const InvitePersonAction = () => {
  const usernameInputRef = useRef<HTMLInputElement>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inviteUser = async () => {
    const username = usernameInputRef.current;
    const initiatorUserId = getUserId();

    if (!username || !initiatorUserId) return;

    const data: IAddUserAssociationDto = { initiator: initiatorUserId, association: username.value };
    const response = await axios.post(baseApiRoute, data);
    console.log(response);
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <PersonAddIcon/>
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            inputRef={usernameInputRef}
            label="Username"
            variant="outlined"
            className="w-full"
          />

          <Button onClick={inviteUser}>Invite</Button>
        </Box>
      </Modal>
    </>
  );
}

interface IToolbarActionsProps {
  openConversation: () => void;
}

const ToolbarActions = ({ openConversation }: IToolbarActionsProps) => {
  return (
    <>
      <IconButton onClick={openConversation}>
        <AddCommentIcon/>
      </IconButton>

      <InvitePersonAction/>
    </>
  );
}

export { InvitePersonAction, ToolbarActions };
