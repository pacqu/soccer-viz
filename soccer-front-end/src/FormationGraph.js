import './App.css';
import * as React from 'react';
import { Graph, DefaultLink, DefaultNode } from '@visx/network';

function FormationGraph(props) {
  const posColors = {
    GK: 'red',
    DF: 'orange',
    MD: 'yellow',
    FW: 'blue'
  }
  const width = props.width
  const height = props.height
  const team = props.team
  const players = props.players
  const positions = props.positions
  const lineup = team.formation.lineup.map(player => players[player.playerId])
  const bench = team.formation.bench.map(player => players[player.playerId])
  const nodes = team.formation.lineup.map(player => {
    const player_position = positions[player.playerId]
    const posCode = JSON.parse(players[player.playerId]['role'])['code2']
     return { 
       x: player_position.start_x * (width / 100), 
       y: player_position.start_y * (height / 100),
       color: posColors[posCode]
    }
    {/*if (props.home) return { x: width - (player_position.start_x * (width / 100)), y: height - (player_position.start_y * (height / 100)) }*/}
  })
  const dataSample = { nodes, links: [] }
  console.log(dataSample)
  return (
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
      <svg width={width} height={height}><Graph graph={dataSample} linkComponent={DefaultLink} nodeComponent={({ node: { color } }) =>
          color ? <DefaultNode fill={color} /> : <DefaultNode />
        } /></svg>
    </svg>
  );
}

export default FormationGraph;
