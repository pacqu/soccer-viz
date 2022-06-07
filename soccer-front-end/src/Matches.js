import logo from './logo.svg';
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

function Matches() {
  let { leagueId } = useParams();
  const [matches, setMatches] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    const getMatches = async () => await axios.get(`/matches/${leagueId}`)
      .then((res) => {
        //console.log('hello')
        console.log(res)
        setMatches(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      getMatches()
  }, [])
  const matchCards = matches.map(match => (
    <Grid item xs={4}>
      <Card>
        <CardActionArea>
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
      <Grid container>
        <Grid container xs={1} sx={{ height: "100px" }}>
          <Button variant="outlined" onClick={() => navigate(-1)}>Go back</Button>
        </Grid>
        <Grid container xs={10} spacing={2}>
          {matchCards}
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default Matches;
