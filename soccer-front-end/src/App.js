import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";

function App() {
  const cardTitles = ['England', 'European Championship', 'France', 'Germany', 'Italy', 'Spain', 'World Cup']
  const cardInfo = [
    { type: "Club League", name: "English Premier League", sub: "2016-17 Season of England's Top Flight", image: "/static/images/eplson.jpg", alt: "Son Heung-Min dribbling against Stoke City" },
    { type: "International Tournament", name: "UEFA European Championship", sub: "2016 Edition showcasing Europe's best", image: "/static/images/italyeuros.jpeg", alt: "Andrea Pirlo dribbling against Germany" },
    { type: "Club League", name: "Ligue 1", sub: "The tantalizing French football of 2016-17", image: "/static/images/mbappel1.jpeg", alt: "Kylian Mbappe celebrating" },
    { type: "Club League", name: "Bundesliga", sub: "All the action of Germany's 2016-17 Season", image: "/static/images/thiagobund.jpeg", alt: "Thiago Alcantara running" },
    { type: "Club League", name: "Serie A", sub: "2016-17's Scintillating Italian Calcio", image: "/static/images/salahseriea.jpg", alt: "Mo Salah chasing a ball" },
    { type: "Club League", name: "La Liga", sub: "No one expects the Spanish 2016-17 season", image: "/static/images/messi.jpeg", alt: "Leo Messi showing off his shirt" },
    { type: "International Tournament", name: "World Cup", sub: "The Pinnacle of Football as played in 2018", image: "/static/images/mbappemodric.jpeg", alt: "Luka Modric and Kylian Mbappe fighting for a ball" },
  ]
  const cards = cardInfo.map((card, i) => (
    <Grid item xs={4}>
      <Card>
        <CardActionArea>
          <Link to={`matches/${i}`} >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {card.type}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="200"
              image={card.image}
              alt={card.alt}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {card.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {card.sub}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </Grid>
  ))
  return (
    <div className="App">
      <Grid container >
        <Grid xs={1}></Grid>
        <Grid container xs={10} spacing={2} justifyContent="center">
          {cards}
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default App;