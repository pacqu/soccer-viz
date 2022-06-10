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

function MatchDetails(props) {
  const details = props.details
  const players = props.players
  const team1Formation = JSON.parse(details['team1.formation'])
  const team2Formation = JSON.parse(details['team2.formation'])
  const team1 = {
    formation: team1Formation,
    name: details['team1.name']
  }
  const team2 = {
    formation: team2Formation,
    name: details['team2.name']
  }
  const team1Home = details['time1.side'] === 'home'
  const homeTeam = team1Home ? team1 : team2 
  const awayTeam = team1Home ? team2 : team1
  return (
    <Grid item xs={11} sx={{ marginBottom: "15px" }}>
      <Card sx={{ width: '100%' }}>
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
          <Grid container>
            <Grid item xs={5}>
              <TeamDetails team={homeTeam} home={true} players={players}/>
            </Grid>
            <Grid item xs={2 }></Grid>
            <Grid item xs={5}>
              <TeamDetails team={awayTeam} home={false} players={players}/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MatchDetails;
