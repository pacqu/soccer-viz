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

function MatchEvent(props) {
  const [expanded, setExpanded] = React.useState(false);
  const event = props.event
  const player = props.player
  const timeStamp = `${Math.ceil(event.eventSec / 60)}'`
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
