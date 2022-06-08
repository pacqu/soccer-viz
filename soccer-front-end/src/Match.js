import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Routes, Route, useParams, useNavigate, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function Match() {
  let { leagueId, matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState({})
  const [matchEvents, setMatchEvents] = useState([])
  const [matchPositions, setMatchPositions] = useState([])
  const [matchPlayers, setMatchPlayers] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    const getMatchDetails = async () => await axios.get(`/matches/${leagueId}/match/${matchId}`)
      .then((res) => {
        console.log(res)
        setMatchDetails(res.data)
        let playerIds = [];
        const team1 = JSON.parse(res.data['team1.formation'])
        const team2 = JSON.parse(res.data['team2.formation'])
        for (const team of [team1, team2]){
          team.lineup.forEach(player => playerIds.push(player.playerId))
          team.bench.forEach(player => playerIds.push(player.playerId))
        }
        getPlayers(playerIds.join(','))
      })
      .catch((err) => {
        console.log(err)
      })
    const getMatchEvents = async () => await axios.get(`/matches/${leagueId}/match/${matchId}/events`)
      .then((res) => {
        console.log(res)
        setMatchEvents(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    const getMatchPositions = async () => await axios.get(`/matches/${leagueId}/match/${matchId}/positions`)
      .then((res) => {
        console.log(res)
        setMatchPositions(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    const getPlayers = async (playerIds) => await axios.get(`/player?id=${playerIds}`)
      .then((res) => {
        console.log(res)
        setMatchPlayers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    getMatchDetails()
    getMatchEvents()
    getMatchPositions()
  }, [])
  const eventCards = matchEvents.map((event) => (
    <Grid item xs={12} sx={{ marginBottom: "15px" }}>
      <Card>
        <CardContent>
          {event.summary_str}
        </CardContent>
      </Card>
    </Grid>
  ))
  const detailsCard = Object.keys(matchDetails).length ? (
    <Grid item xs={11} sx={{ marginBottom: "15px" }}>
      <Card sx={{ width: '100%' }}>
        <Typography gutterBottom variant="h5" component="div">
          {matchDetails.label}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Date: {matchDetails.date}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Venue: {matchDetails.venue}
        </Typography>
      </Card>
    </Grid>
  ) : (<CircularProgress />)
  //console.log(eventCards)
  return (
    <div className="App">
      <Grid container>
        <Grid item container xs={1} sx={{ height: "100px" }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>Go back</Button>
        </Grid>
        <Grid xs={7} spacing={2}>
          {detailsCard}
        </Grid>
        <Grid xs={3} sx={{ height: "100vh", overflowY: "scroll" }} id="events" justifyContent="center" alignItems="center">
          {eventCards.length ? eventCards : <CircularProgress />}
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default Match;
