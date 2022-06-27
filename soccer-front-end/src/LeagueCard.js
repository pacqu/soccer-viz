import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";


function LeagueCard({card,i}) {
  return (
    <Grid item xs={4}>
      <Card className='content-card'>
        <CardActionArea>
          <Link to={`matches/${i}`} >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {card.type}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="200"
              image={card.image}
              alt={card.alt}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {card.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {card.sub}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default LeagueCard;
