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

function TeamDetails(props) {
  const team = props.team
  const players = props.players
  const lineup = team.formation.lineup.map(player => players[player.playerId])
  const bench = team.formation.bench.map(player => players[player.playerId])
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        {team.name}
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        Starting Lineup
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineup.map(player => (
              <TableRow>
                <TableCell component="th" scope="row">{`${player.firstName} ${player.lastName}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography gutterBottom variant="h6" component="div">
        Bench
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bench.map(player => (
              <TableRow>
                <TableCell component="th" scope="row">{`${player.firstName} ${player.lastName}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TeamDetails;
