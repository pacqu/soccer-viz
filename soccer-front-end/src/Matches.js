import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Routes, Route, useParams } from 'react-router-dom';

function Matches() {
  let { leagueId } = useParams();
  //console.log(leagueId)
  const [matches, setMatches] = useState([])
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
  const matchCards = matches.map((match) => (
    <Grid item xs={3}>
      <Card sx={{minHeight: "200px"}}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
              {match.label}
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
          {matchCards}
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default Matches;
