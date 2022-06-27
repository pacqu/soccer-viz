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
import FormationGraph from './FormationGraph';

function TeamDetails(props) {
  const posOrder = { 'GK': 1, 'DF': 2, 'MD': 3, 'FW': 4 }
  const team = props.team
  const players = props.players
  const positions = props.positions
  const lineup = team.formation.lineup.map(player => {
    let posCode = '-';
    let posNum = '-1';
    if (players[player.playerId]) {
      posCode = JSON.parse(players[player.playerId]['role'])['code2'];
      posNum = posOrder[JSON.parse(players[player.playerId]['role'])['code2']]
    }
    else {
      return { posCode: posCode, posNum: posNum, firstName: 'Unknown', lastName: 'Player' }
    }
    return { posCode: posCode, posNum: posNum, ...players[player.playerId] }
  }).sort((a, b) => a.posNum - b.posNum)
  const bench = team.formation.bench.map(player => {
    let posCode = '-';
    let posNum = '-1';
    if (players[player.playerId]) {
      posCode = JSON.parse(players[player.playerId]['role'])['code2'];
      posNum = posOrder[JSON.parse(players[player.playerId]['role'])['code2']]
    }
    else {
      return { posCode: posCode, posNum: posNum, firstName: 'Unknown', lastName: 'Player' }
    }
    return { posCode: posCode, posNum: posNum, ...players[player.playerId] }
  }).sort((a, b) => a.posNum - b.posNum)
  return (
    <Card sx={{ width: '100%', marginTop: '20px' }} className='content-card'>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${props.home ? "Home Team: " : "Away Team:"} ${team.name}`}
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h6" component="div">
              Starting Lineup
            </Typography>
            <TableContainer >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Position</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lineup.map(player => (
                    <TableRow>
                      <TableCell component="th" scope="row">{`${player.posCode} `}</TableCell>
                      <TableCell>{`${player.firstName} ${player.lastName}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h6" component="div">
              Bench
            </Typography>
            <TableContainer >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Position</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bench.map(player => (
                    <TableRow>
                      <TableCell component="th" scope="row">{`${player.posCode} `}</TableCell>
                      <TableCell>{`${player.firstName} ${player.lastName}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid container>
            <Typography gutterBottom variant="h6" component="div">
              Formation
            </Typography>
            <FormationGraph home={props.home} width={1150} height={780} team={team} players={players} positions={positions} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TeamDetails;
