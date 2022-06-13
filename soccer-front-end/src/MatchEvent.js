import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function MatchEvent(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [firstExpanded, setFirstExpanded] = React.useState(false);
  const event = props.event
  const player = props.player
  const timeStamp = `${Math.ceil(event.eventSec / 60)}'`
  const getEventDetails = async () => await axios.get(`/matches/${props.leagueId}/match/${event.matchId}/events`)
      .then((res) => { setMatchEvents(res.data) })
      .catch((err) => { console.log(err) })
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded && !(firstExpanded)) {
      setFirstExpanded(true)
    }
  };

  return (
    <Accordion expanded={expanded === event.id} onChange={handleChange(event.id)} sx={{ marginBottom: "10px" }} TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{timeStamp} {event.eventName} {player ? `- ${player.shortName}` : ""}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <CircularProgress />
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default MatchEvent;
