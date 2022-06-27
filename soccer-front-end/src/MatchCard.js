import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import React from 'react';
import {  Link } from 'react-router-dom';


function MatchCard({match}) {
  return (
    <Grid item xs={4}>
      <Card className='content-card'>
        <CardActionArea sx={{ minHeight: '200px' }}>
          <Link to={`match/${match.wyId}`} >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Gameweek {match.gameweek}
              </Typography>
              <Typography variant="h5" component="div">
                {match.label}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Date: {match.date}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default MatchCard;
