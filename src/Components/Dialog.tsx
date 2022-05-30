import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export interface SimpleDialogProps {
  open: boolean;
  data: any;
  onClose: () => void;
  // callback: (data: any) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, data } = props;
  const [name, setName] = React.useState('');

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
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: 500, maxWidth: '100%' },
          }}
          onSubmit={() => {
            // callback({});
          }}
          noValidate
          autoComplete='off'>
          <FormControl fullWidth>
            {data.map((item: any) =>
              item.label !== 'students' ? (
                <TextField
                  id='outlined-basic'
                  label={item?.label}
                  variant='outlined'
                  key={item?.label}
                />
              ) : (
                <>
                  <InputLabel id='demo-simple-select-label'>
                    Student Name...
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={name}
                    label='Student Name...'
                    onChange={(event: SelectChangeEvent) => {
                      setName(event.target.value as string);
                    }}>
                    {item?.student.map((student: any) => (
                      <MenuItem value={student?.id}>{student?.name}</MenuItem>
                    ))}
                  </Select>
                </>
              ),
            )}
          </FormControl>
        </Box>
        <ListItem autoFocus button onClick={() => handleListItemClick()}>
          <ListItemText primary='Submit' />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default SimpleDialog;
