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

function MatchDetails(props) {
  const details = props.details
  const players = props.players
  const team1Formation = JSON.parse(details['team1.formation'])
  const team1Lineup = team1Formation.lineup.map(player => players[player.playerId])
  const team2Formation = JSON.parse(details['team2.formation'])
  const team2Lineup = team2Formation.lineup.map(player => players[player.playerId])
  return (
    <Grid item xs={11} sx={{ marginBottom: "15px" }}>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {details.label}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Date: {details.date}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Venue: {details.venue}
          </Typography>
          <Grid container>
            <Grid item xs={5}>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {team1Lineup.map(player => (
                      <TableRow>
                        <TableCell component="th" scope="row">{`${player.firstName} ${player.lastName}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {team2Lineup.map(player => (
                      <TableRow>
                        <TableCell component="th" scope="row">{`${player.firstName} ${player.lastName}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MatchDetails;
