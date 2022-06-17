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
  const team = props.team
  const players = props.players
  const positions = props.positions
  const lineup = team.formation.lineup.map(player => players[player.playerId])
  const bench = team.formation.bench.map(player => players[player.playerId])
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
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid container>
            <svg viewBox="0 0 1150 780" xmlns="http://www.w3.org/2000/svg" >
              <path d="M0 0h1150v780H0z" className="turf" />
              <path className="line" d="M575 730V50h525v680H50V50h525" />
              <circle cx={575} cy={390} className="line" r={91.5} />
              <circle cx={575} cy={390} className="dot" />
              <circle cx={160} cy={390} className="dot" />
              <circle cx={990} cy={390} className="dot" />
              <path
                d="M251.5 390a91.5 91.5 0 0 0-36.5-73.4m36.5 73.4a91.5 91.5 0 0 1-36.5 73.4M898.5 390a91.5 95.5 0 0 0 36.5 73.4M898.5 390a91.5 95.5 0 0 1 36.5-73.4M50 60q10 0 10-10m1030 0q0 10 10 10M50 720q10 0 10 10m1030 0q0-10 10-10"
                className="line"
              />
              <path className="goal" d="M50 426.6H35v-73.2h15M1100 426.6h15v-73.2h-15" />
              <path
                className="line"
                d="M50 481.6h55V298.4H50v293.2h165V188.4H50M1100 481.6h-55V298.4h55v293.2H935V188.4h165"
              />
              <FormationGraph home={props.home} width={1150} height={780} team={team} players={players} positions={positions} />
            </svg>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}

export default TeamDetails;
