import './App.css';
import MatchDetails from './MatchDetails';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import BackButton from './BackButton';

function Match() {
  let { leagueId, matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState({})
  const [matchEvents, setMatchEvents] = useState([])
  const [matchPositions, setMatchPositions] = useState({})
  const [matchPlayers, setMatchPlayers] = useState([])
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
      .then((res) => { setMatchPositions(res.data); console.log(res) })
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
        <BackButton  gridSpace={1}/>
        <Grid xs={1} />
        <Grid xs={8} spacing={2}>
          {(Object.keys(matchDetails).length && Object.keys(matchPlayers).length && Object.keys(matchPositions).length) ? <MatchDetails details={matchDetails} players={matchPlayers} positions={matchPositions}/> : <CircularProgress />}
        </Grid>
        <Grid xs={2}></Grid>
      </Grid>
    </div>
  );
}

export default Match;
