import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Routes, Route, useParams, useNavigate, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function Match() {
  let { leagueId, matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState({})
  const [matchEvents, setMatchEvents] = useState([])
  const [matchPositions, setMatchPositions] = useState([])
  useEffect(() => {
    const getMatchDetails = async () => await axios.get(`/matches/${leagueId}/match/${matchId}`)
      .then((res) => {
        console.log(res)
        setMatchDetails(res.data)
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
    getMatchDetails()
    getMatchEvents()
    getMatchPositions()
  }, [])
  const eventCards = matchEvents.map((event) => (
    <Grid item xs={12} sx={{ marginBottom: "15px" }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.summary_str}
          </Typography>
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
      </Card>
    </Grid>
  ) : (<CircularProgress />)
  //console.log(eventCards)
  return (
    <div className="App">
      <Grid container>
        <Grid xs={1}></Grid>
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
