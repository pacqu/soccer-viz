import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import LeagueCard from './LeagueCard';


function App() {
  const cardInfo = [
    { type: "Club League", name: "English Premier League", sub: "2017-18 Season of England's Top Flight", image: "/static/images/eplson.jpg", alt: "Son Heung-Min dribbling against Stoke City" },
    { type: "International Tournament", name: "UEFA European Championship", sub: "2016 Edition showcasing Europe's best", image: "/static/images/italyeuros.jpeg", alt: "Andrea Pirlo dribbling against Germany" },
    { type: "Club League", name: "Ligue 1", sub: "The tantalizing French football of 2017-18", image: "/static/images/mbappel1.jpeg", alt: "Kylian Mbappe celebrating" },
    { type: "Club League", name: "Bundesliga", sub: "All the action of Germany's 2017-18 Season", image: "/static/images/thiagobund.jpeg", alt: "Thiago Alcantara running" },
    { type: "Club League", name: "Serie A", sub: "2017-18's Scintillating Italian Calcio", image: "/static/images/salahseriea.jpg", alt: "Mo Salah chasing a ball" },
    { type: "Club League", name: "La Liga", sub: "No one expects the Spanish 2017-18 season", image: "/static/images/messi.jpeg", alt: "Leo Messi showing off his shirt" },
    { type: "International Tournament", name: "World Cup", sub: "The Pinnacle of Football as played in 2018", image: "/static/images/mbappemodric.jpeg", alt: "Luka Modric and Kylian Mbappe fighting for a ball" },
  ]
  return (
    <div className="App">
      <Grid container >
        <Grid xs={1}></Grid>
        <Grid container xs={10} rowSpacing={2} justifyContent="center" alignItems='center' direction='row'>
          <Card sx={{ width: '100%' }} className='heading-card'>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                A Soccer Data Visualizer
              </Typography>
              <Typography gutterBottom variant="h4" component="div">
                A visualizer for public soccer data from Europe's largest competitions from 2016-2018
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Current Visualizations: Lineup and Positional Data from 2017-18 matches from Europe's Top 5 Leagues, as well as the 2016 Euros and 2018 World Cup
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Planned Visualizations: Match Event Filtering and Positional Data, Player-Specific Event and Positional Data, Team-Specific Event and Positional Data
              </Typography>
            </CardContent>
          </Card>
          {cardInfo.map((card,i) => <LeagueCard card={card} i={i} />)}
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default App;
