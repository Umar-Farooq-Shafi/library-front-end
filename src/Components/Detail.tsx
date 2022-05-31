import React from 'react';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import axios from 'axios';

type StudentProps = {
  id: number;
  name: string;
  last_name: string;
  updated_at: string;
  created_at: string;
};

export default React.memo(function Detail({ data }: { data: any }) {
  const [student, setStudent] = React.useState(Object as any as StudentProps);

  React.useEffect(() => {
    if (data?.student_id) {
      (async () => {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8080/student/${data?.student_id}`,
          );

          setStudent(res.data?.student[0]);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [data?.student_id]);

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        {String(data?.name).toLocaleUpperCase()} Detail
      </Typography>
      <List disablePadding>
        {Object.keys(data)?.map(
          (key: any, index: any) =>
            key !== 'id' && (
              <ListItem key={key} sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={
                    key === 'student_id'
                      ? 'STUDENT NAME'
                      : String(key).toUpperCase()
                  }
                />
                <Typography variant='body2'>
                  {key === 'student_id' && data?.student_id
                    ? `${student?.name}  ${student?.last_name}`
                    : data?.[key]}
                </Typography>
              </ListItem>
            ),
        )}
      </List>
    </React.Fragment>
  );
});
