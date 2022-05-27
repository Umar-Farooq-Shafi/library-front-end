import React from 'react';

import Grid from '@mui/material/Grid';
import axios from 'axios';

import List from '../Components/List';

/* imported BookData, StudentData, */
import { StudentHeadCell } from '../interfaces/Student';
import { BookHeadCell } from '../interfaces/Book';

// function createStudentData(
//   name: string,
//   last_name: string,
//   action: string,
// ): StudentData {
//   return {
//     name,
//     last_name,
//     action,
//   };
// }

// const studentRows = [
//   createStudentData('Cupcake', '305', '() => {}'),
//   createStudentData('Donut', '452', '() => {}'),
//   createStudentData('Eclair', '262', '() => {}'),
// ]

// function createBookData(
//   name: string,
//   author: string,
//   borrow_by: string,
//   issue_date: string,
//   return_date: string,
//   action: string,
// ): BookData {
//   return {
//     name,
//     author,
//     borrow_by,
//     issue_date,
//     return_date,
//     action,
//   };
// }

// const bookRows = [
//   createBookData('Cupcake', '3.7', '67', '4.3', '4.3', '() => {}'),
//   createBookData('Donut', '25.0', '51', '4.9', '4.3', '() => {}'),
//   createBookData('Eclair', '16.0', '24', '6.0', '4.3', '() => {}'),
// ];

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

          // TODO: fix this
          setStudentRows(
            data?.students?.map((student: any) => ({
              ...student,
              name: student.first_name,
            })),
          );
        } catch (error) {
          console.error(error);
        }
      })();

      (async () => {
        try {
          const { data } = await axios.get('http://127.0.0.1:8080/book');

          // TODO: Fix this
          setBookRows(
            data?.books?.map((book: any) => ({
              ...book,
              name: book.book_name,
              borrow_by: studentRows.find(
                (stu: any) => stu.id === book.student_id,
              )?.name,
            })),
          );
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
        <Grid item xs={12} md={5}>
          <List
            title='Student'
            rows={studentRows}
            headCells={studentHeadCells}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <List title='Book' rows={bookRows} headCells={bookHeadCells} />
        </Grid>
      </Grid>
    </>
  );
}
