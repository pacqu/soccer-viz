import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useEffect, useState } from 'react';

function MatchEvent(props) {
  const event = props.event
  const player = props.player
  const timeStamp = `${Math.ceil(event.eventSec/60)}'`
  return (
    <Card sx={{marginBottom:"10px"}}>
      <CardContent>
        {timeStamp} {event.eventName} {player ? `- ${player.shortName}` : ""}
      </CardContent>
    </Card>
  );
}

export default MatchEvent;
