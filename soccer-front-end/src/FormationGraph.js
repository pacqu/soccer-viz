import './App.css';
import * as React from 'react';
import { Graph, DefaultLink, DefaultNode } from '@visx/network';

function FormationGraph(props) {
  const width = props.width
  const height = props.height
  const team = props.team
  const players = props.players
  const positions = props.positions
  const lineup = team.formation.lineup.map(player => players[player.playerId])
  const bench = team.formation.bench.map(player => players[player.playerId])
  const nodes = team.formation.lineup.map(player => {
    const player_position = positions[player.playerId]
    if (props.home) return { x: player_position.start_x * (width/100), y: player_position.start_y * (height/100) }
    else return { x: width - (player_position.start_x * (width / 100)), y: height - (player_position.start_y * (height / 100)) }
  })
  const dataSample = { nodes, links: [] }
  return (
    <svg width={width} height={height}><Graph graph={dataSample} linkComponent={DefaultLink} nodeComponent={DefaultNode} /></svg>
  );
}

export default FormationGraph;
