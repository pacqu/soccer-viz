import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Routes, Route, useParams, useNavigate, Link } from 'react-router-dom';
import BackButton from './BackButton';

function Matches() {
  let { leagueId } = useParams();
  const [matches, setMatches] = useState([])  
  const cardInfo = [
    { type: "Club League", name: "English Premier League", sub: "2017-18 Season of England's Top Flight", image: "/static/images/eplson.jpg", alt: "Son Heung-Min dribbling against Stoke City" },
    { type: "International Tournament", name: "UEFA European Championship", sub: "2016 Edition showcasing Europe's best", image: "/static/images/italyeuros.jpeg", alt: "Andrea Pirlo dribbling against Germany" },
    { type: "Club League", name: "Ligue 1", sub: "The tantalizing French football of 2017-18", image: "/static/images/mbappel1.jpeg", alt: "Kylian Mbappe celebrating" },
    { type: "Club League", name: "Bundesliga", sub: "All the action of Germany's 2017-18 Season", image: "/static/images/thiagobund.jpeg", alt: "Thiago Alcantara running" },
    { type: "Club League", name: "Serie A", sub: "2017-18's Scintillating Italian Calcio", image: "/static/images/salahseriea.jpg", alt: "Mo Salah chasing a ball" },
    { type: "Club League", name: "La Liga", sub: "No one expects the Spanish 2017-18 season", image: "/static/images/messi.jpeg", alt: "Leo Messi showing off his shirt" },
    { type: "International Tournament", name: "World Cup", sub: "The Pinnacle of Football as played in 2018", image: "/static/images/mbappemodric.jpeg", alt: "Luka Modric and Kylian Mbappe fighting for a ball" },
  ]
  useEffect(() => {
    const getMatches = async () => await axios.get(`/matches/${leagueId}`)
      .then((res) => {
        setMatches(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      getMatches()
  }, [])
  const matchCards = matches.map(match => (
    <Grid item xs={4}>
      <Card className='content-card'>
        <CardActionArea sx={{ minHeight: '200px' }}>
          <Link to={`match/${match.wyId}`} >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Gameweek {match.gameweek}
              </Typography>
              <Typography variant="h5" component="div">
                {match.label}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Date: {match.date}
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
        <BackButton />
        <Grid container xs={10} spacing={2}>
          <Grid item xs={12}>
            <Grid item sx={{ marginBottom: "15px" }}>
              <Card className='heading-card' sx={{ width: '100%' }}>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    {cardInfo[leagueId].name}
                  </Typography>
                </CardContent>
              </Card>

            </Grid>
          </Grid>
          {matchCards}
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default Matches;
