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
import { Graph, DefaultLink, DefaultNode } from '@visx/network';
import { ParentSize } from '@visx/responsive';
import FormationGraph from './FormationGraph';

function TeamDetails(props) {
  const posOrder = {'GK': 1, 'DF': 2, 'MD': 3, 'FW': 4}
  const team = props.team
  const players = props.players
  const positions = props.positions
  const lineup = team.formation.lineup.map(player => ({posCode: JSON.parse(players[player.playerId]['role'])['code2'], posNum: posOrder[JSON.parse(players[player.playerId]['role'])['code2']], ...players[player.playerId]})).sort((a,b) => a.posNum - b.posNum)
  const bench = team.formation.bench.map(player => ({posCode: JSON.parse(players[player.playerId]['role'])['code2'], posNum: posOrder[JSON.parse(players[player.playerId]['role'])['code2']], ...players[player.playerId]})).sort((a,b) => a.posNum - b.posNum)
  const nodes = team.formation.lineup.map(player => {
    const player_position = positions[player.playerId]
    if (props.home) return { x: player_position.start_x * 10.1, y: player_position.start_y * 6.8 }
    return { x: 1010 - (player_position.start_x * 10.1), y: 680 - (player_position.start_y * 6.8) }
  })
  return (
    <Card sx={{ width: '100%', marginTop: '20px' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${props.home ? "Home Team: " : "Away Team:"} ${team.name}`}
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h6" component="div">
              Starting Lineup
            </Typography>
            <TableContainer component={Paper}>
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
            <TableContainer component={Paper}>
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
              <FormationGraph home={props.home} width={1150} height={780} team={team} players={players} positions={positions} />
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}

export default TeamDetails;
