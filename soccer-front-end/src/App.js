import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';

function App() {
  const cardTitles = ['England','European Championship','France','Germany','Italy','Spain','World Cup']
  const cards = cardTitles.map(title => (
    <Grid item xs={3}>
      <Card sx={{minHeight: "200px"}}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))
  return (
    <div className="App">
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid container xs={10} spacing={2}>
          {cards}
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default App;
