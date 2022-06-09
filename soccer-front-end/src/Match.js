import './App.css';
import MatchEvent from './MatchEvent';
import MatchDetails from './MatchDetails';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
        setMatchDetails(res.data)
        let playerIds = [];
        const team1 = JSON.parse(res.data['team1.formation'])
        const team2 = JSON.parse(res.data['team2.formation'])
        for (const team of [team1, team2]) {
          team.lineup.forEach(player => playerIds.push(player.playerId))
          team.bench.forEach(player => playerIds.push(player.playerId))
        }
        getPlayers(playerIds.join(','))
      })
      .catch((err) => { console.log(err) })
    const getMatchEvents = async () => await axios.get(`/matches/${leagueId}/match/${matchId}/events`)
      .then((res) => { setMatchEvents(res.data) })
      .catch((err) => { console.log(err) })
    const getMatchPositions = async () => await axios.get(`/matches/${leagueId}/match/${matchId}/positions`)
      .then((res) => { setMatchPositions(res.data) })
      .catch((err) => { console.log(err) })
    const getPlayers = async (playerIds) => await axios.get(`/player?id=${playerIds}`)
      .then((res) => { setMatchPlayers(res.data) })
      .catch((err) => { console.log(err) })
    getMatchDetails()
    getMatchEvents()
    getMatchPositions()
  }, [])
  return (
    <div className="App">
      <Grid container>
        <Grid item container xs={1} sx={{ height: "100px" }}>
          <Button variant="outlined" onClick={() => navigate(-1)}>Go back</Button>
        </Grid>
        <Grid xs={7} spacing={2}>
          {(Object.keys(matchDetails).length && Object.keys(matchPlayers).length) ? <MatchDetails details={matchDetails} players={matchPlayers}/> : <CircularProgress />}
        </Grid>
        <Grid xs={3} sx={{ height: "100vh", overflowY: "scroll" }} id="events" justifyContent="center" alignItems="center">
          {(matchEvents.length && Object.keys(matchPlayers).length) ? (
            matchEvents.map(event => {
              const player = event.playerId === 0 ? null : matchPlayers[event.playerId]
              return <MatchEvent event={event} player={player} />
            }
            )) : <CircularProgress />}
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default Match;
