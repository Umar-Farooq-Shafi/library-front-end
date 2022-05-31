import React from 'react';

import Grid from '@mui/material/Grid';
import axios from 'axios';

import List from '../Components/List';

import { StudentHeadCell } from '../interfaces/Student';
import { BookHeadCell } from '../interfaces/Book';

const bookHeadCells: readonly BookHeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: true,
    label: 'Author',
  },
  {
    id: 'borrow_by',
    numeric: false,
    disablePadding: true,
    label: 'Borrowed By',
  },
  {
    id: 'issue_date',
    numeric: false,
    disablePadding: true,
    label: 'Date Of Borrow',
  },
  {
    id: 'return_date',
    numeric: false,
    disablePadding: true,
    label: 'Return Date',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: true,
    label: 'Action',
  },
];

const studentHeadCells: readonly StudentHeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'First Name',
  },
  {
    id: 'last_name',
    numeric: false,
    disablePadding: true,
    label: 'Last Name',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: true,
    label: 'Action',
  },
];

export default function ShowList() {
  const [studentRows, setStudentRows] = React.useState<any>([]);
  const [bookRows, setBookRows] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchData = () => {
      (async () => {
        try {
          const { data } = await axios.get('http://127.0.0.1:8080/student');

          setStudentRows(data?.students);
        } catch (error) {
          console.error(error);
        }
      })();

      (async () => {
        try {
          const { data } = await axios.get('http://127.0.0.1:8080/book');

          setBookRows(data?.books);
        } catch (error) {
          console.error(error);
        }
      })();
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Library management system</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <List
            title='Student'
            rows={studentRows}
            headCells={studentHeadCells}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <List title='Book' rows={bookRows} headCells={bookHeadCells} />
        </Grid>
      </Grid>
    </>
  );
}
