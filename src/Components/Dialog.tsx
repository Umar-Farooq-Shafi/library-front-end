import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import Form from './Form';

export interface SimpleDialogProps {
  open: boolean;
  values: any;
  onClose: () => void;
  endPoint: string;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, values, endPoint } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add new Record</DialogTitle>
      <List sx={{ pt: 0 }}>
        <Box
          component='span'
          sx={{
            '& > :not(style)': { m: 1, width: 500, maxWidth: '100%' },
          }}>
          <Form
            endPoint={endPoint}
            method='post'
            values={values}
            handleListItemClick={handleListItemClick}
          />
        </Box>
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick()}></ListItem>
      </List>
    </Dialog>
  );
}

export default SimpleDialog;
