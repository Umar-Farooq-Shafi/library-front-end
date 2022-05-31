import React from 'react';

import TextField from '@mui/material/TextField';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import { Formik, Form } from 'formik';
import axios from 'axios';

type Method = 'post' | 'put' | 'delete';

export default function EditForm({
  values,
  handleListItemClick,
  endPoint,
  method,
}: any) {
  const [students, setStudents] = React.useState<any>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8080/student');

        setStudents(data?.students);
      } catch (error) {
        console.error(error);
      }
    })();
  });

  return (
    <Formik
      initialValues={values}
      onSubmit={async (fields: any, { setSubmitting, setValues }) => {
        setSubmitting(false);
        setValues(values);
        await axios[method as Method](
          'http://127.0.0.1:8080/' + endPoint,
          fields,
        );
        handleListItemClick();
      }}
      render={({ values, handleChange, handleSubmit }) => {
        return (
          <Form
            role='form'
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            {Object.keys(values)?.map((key: any, index: number) =>
              key === 'student_id' ? (
                <FormControl fullWidth margin='normal'>
                  <InputLabel id='demo-simple-select-label'>
                    Student Name
                  </InputLabel>
                  <Select
                    labelId={`student-name-label`}
                    id={key}
                    label='Student Name'
                    value=''
                    name={key}
                    onChange={handleChange}>
                    {students.map((student: any) => (
                      <MenuItem value={student.id}>
                        {student.name} {student.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl fullWidth margin='normal'>
                  {/* <InputLabel>{key}</InputLabel> */}
                  <TextField
                    type={
                      key === 'issue_date' || key === 'return_date'
                        ? 'date'
                        : 'text'
                    }
                    onChange={handleChange}
                    name={key}
                    label={key}
                    id={key}
                  />
                </FormControl>
              ),
            )}
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </Form>
        );
      }}
    />
  );
}
