import './App.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function MatchEvent(props) {
  const [eventDetails, setEventDetails] =  React.useState({})
  const [expanded, setExpanded] = React.useState(false);
  const [firstExpanded, setFirstExpanded] = React.useState(false);
  const event = props.event
  const player = props.player
  const timeStamp = `${Math.ceil(event.eventSec / 60)}'`
  const getEventDetails = async () => await axios.get(`/matches/${props.leagueId}/match/${event.matchId}/events/${event.id}`)
    .then((res) => { setEventDetails(res.data); console.log(res.data)})
    .catch((err) => { console.log(err) })
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded && !(firstExpanded)) {
      setFirstExpanded(true)
      getEventDetails()
    }
  };
  const details = (Object.keys(eventDetails).length ? (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          {(player ? <TableRow>
            <TableCell component="th" scope="row">Player</TableCell>
            <TableCell >{`${player.firstName} ${player.lastName}`}</TableCell>
          </TableRow> : null)}
            <TableRow>
              <TableCell component="th" scope="row">Sub-Event Name:</TableCell>
              <TableCell >{eventDetails.subEventName}</TableCell>
            </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Event Tags:</TableCell>
            <TableCell >{eventDetails.tag_str}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ): <CircularProgress />)
  return (
    <Accordion expanded={expanded === event.id} onChange={handleChange(event.id)} sx={{ marginBottom: "10px" }} TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{timeStamp} {event.eventName} {player ? `- ${player.shortName}` : ""}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {details}
      </AccordionDetails>
    </Accordion>
  );
}

export default MatchEvent;
