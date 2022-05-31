import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Detail from '../Components/Detail';
import Form from '../Components/Form';
import { bookForm } from '../interfaces/Book';
import { studentForm } from '../interfaces/Student';

const theme = createTheme();

function getStepContent(
  step: number,
  endPoint: string,
  values: any,
  data: any,
  handleListItemClick: any,
) {
  switch (step) {
    case 0:
      return <Detail data={data} />;
    case 1:
      return (
        <Form
          endPoint={endPoint}
          method='put'
          values={values}
          handleListItemClick={handleListItemClick}
        />
      );
    default:
      throw new Error('Unknown step');
  }
}

export default function Details() {
  const { slug, id } = useParams();
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<any>([]);

  const navigate = useNavigate();

  const handleListItemClick = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8080/${slug}/${id}');}`,
        );

        setData(data);
        setData(data?.[String(slug).toLowerCase() ?? 'student'][0]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [slug, id]);

  const handleBack = () => {
    setStep(step === 1 ? 0 : 1);
  };

  const endPoint: string = slug === 'Student' ? `student/${id}` : `book/${id}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position='absolute'
        color='default'
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            Library management system
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component='h1' variant='h4' align='center'>
            {slug} Detail
          </Typography>
          <React.Fragment>
            <React.Fragment>
              {getStepContent(
                step,
                endPoint,
                slug === 'Book' ? bookForm : studentForm,
                data,
                handleListItemClick,
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  to='/'
                  style={{
                    textDecoration: 'none',
                  }}>
                  <Button sx={{ mt: 3, ml: 1 }}>Back</Button>
                </Link>

                <Button
                  onClick={handleBack}
                  variant='contained'
                  sx={{ mt: 3, ml: 1 }}>
                  {step === 0 ? 'Edit' : 'Show'}
                </Button>
              </Box>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
