import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TeamDetails from './TeamDetails';
import { Graph, DefaultLink, DefaultNode } from '@visx/network';

function MatchDetails(props) {
  const details = props.details
  const players = props.players
  const positions = props.positions
  const team1Formation = JSON.parse(details['team1.formation'])
  const team2Formation = JSON.parse(details['team2.formation'])
  const team1 = {
    formation: team1Formation,
    name: details['team1.name'],
    id: details['team1.teamId']
  }
  const team2 = {
    formation: team2Formation,
    name: details['team2.name'],
    id: details['team2.teamId']
  }
  const team1Home = details['time1.side'] === 'home'
  const homeTeam = team1Home ? team1 : team2 
  const awayTeam = team1Home ? team2 : team1
  return (
    <Grid item sx={{ marginBottom: "15px" }}>
      <Card sx={{ width: '100%' }} className='heading-card'>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {details.label}
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            Date: {details.date}
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            Venue: {details.venue}
          </Typography>
        </CardContent>
      </Card> 
      <TeamDetails team={homeTeam} home={true} players={players} positions={positions}/>
      <TeamDetails team={awayTeam} home={false} players={players} positions={positions}/>
    </Grid>
  );
}

export default MatchDetails;
