import './App.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import React from 'react';
import {  useNavigate } from 'react-router-dom';

function BackButton(props) {
  const space = (props.gridSpace ? props.gridSpace : 1)
  const navigate = useNavigate();
  return (
        <Grid container justifyContent='center' xs={space} sx={{ height: "50px", marginTop: '15px' }}>
          <Button variant="outlined" onClick={() => navigate(-1)}>Go back</Button>
        </Grid>
  );
}

export default BackButton;
