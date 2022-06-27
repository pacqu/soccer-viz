import './App.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Graph, DefaultLink, DefaultNode } from '@visx/network';

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
  const nodes = eventDetails ? ([
    { x: eventDetails.start_x * 2.16, y: eventDetails.start_y * 1.3 },
    { x: eventDetails.end_x * 2.16, y: eventDetails.end_y * 1.3 }
  ]) : null
  const dataSample = eventDetails ? ({
    nodes,
    links: [
      { source: nodes[0], target: nodes[1] }
    ]
  }) : null
  const details = (Object.keys(eventDetails).length ? (
    <>
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
      <svg width={216} height={130}><Graph graph={dataSample} linkComponent={DefaultLink} nodeComponent={DefaultNode} /></svg>
      
    </>
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
