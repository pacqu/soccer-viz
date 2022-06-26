import './App.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Routes, Route, useParams, useNavigate, Link } from 'react-router-dom';
import BackButton from './BackButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function Matches() {
  let { leagueId } = useParams();
  const [matches, setMatches] = useState([])
  const leagueInfo = [
    {
      name: "English Premier League", start: '2017-8-11', end: '2018-5-14',
      teams: [{ 'wyId': 1613, 'name': 'Newcastle United' }, { 'wyId': 1673, 'name': 'Huddersfield Town' }, { 'wyId': 10531, 'name': 'Swansea City' }, { 'wyId': 1659, 'name': 'AFC Bournemouth' }, { 'wyId': 1651, 'name': 'Brighton & Hove Albion' }, { 'wyId': 1646, 'name': 'Burnley' }, { 'wyId': 1631, 'name': 'Leicester City' }, { 'wyId': 1639, 'name': 'Stoke City' }, { 'wyId': 1644, 'name': 'Watford' }, { 'wyId': 1623, 'name': 'Everton' }, { 'wyId': 1627, 'name': 'West Bromwich Albion' }, { 'wyId': 1625, 'name': 'Manchester City' }, { 'wyId': 1624, 'name': 'Tottenham Hotspur' }, { 'wyId': 1628, 'name': 'Crystal Palace' }, { 'wyId': 1619, 'name': 'Southampton' }, { 'wyId': 1612, 'name': 'Liverpool' }, { 'wyId': 1610, 'name': 'Chelsea' }, { 'wyId': 1611, 'name': 'Manchester United' }, { 'wyId': 1609, 'name': 'Arsenal' }]
    },
    {
      name: "UEFA European Championship", start: '2016-6-10', end: '2016-7-11',
      teams: [{ 'wyId': 10451, 'name': 'Hungary' }, { 'wyId': 4687, 'name': 'Turkey' }, { 'wyId': 3148, 'name': 'Germany' }, { 'wyId': 11944, 'name': 'Romania' }, { 'wyId': 14496, 'name': 'Slovakia' }, { 'wyId': 10962, 'name': 'Northern Ireland' }, { 'wyId': 9905, 'name': 'Portugal' }, { 'wyId': 5629, 'name': 'Belgium' }, { 'wyId': 10682, 'name': 'Wales' }, { 'wyId': 2413, 'name': 'England' }, { 'wyId': 7839, 'name': 'Iceland' }, { 'wyId': 9598, 'name': 'Croatia' }, { 'wyId': 8274, 'name': 'Republic of Ireland' }, { 'wyId': 3757, 'name': 'Italy' }, { 'wyId': 4418, 'name': 'France' }, { 'wyId': 1598, 'name': 'Spain' }, { 'wyId': 6697, 'name': 'Switzerland' }, { 'wyId': 13869, 'name': 'Poland' }]
    },
    {
      name: "Ligue 1", start: '2017-8-4', end: '2018-5-20',
      teams: [{ 'wyId': 3795, 'name': 'Troyes' }, { 'wyId': 3766, 'name': 'Olympique Lyonnais' }, { 'wyId': 3767, 'name': 'PSG' }, { 'wyId': 3771, 'name': 'Olympique Marseille' }, { 'wyId': 3770, 'name': 'Nantes' }, { 'wyId': 3775, 'name': 'Nice' }, { 'wyId': 3774, 'name': 'Rennes' }, { 'wyId': 3779, 'name': 'Strasbourg' }, { 'wyId': 3799, 'name': 'Angers' }, { 'wyId': 3772, 'name': 'Bordeaux' }, { 'wyId': 3804, 'name': 'Dijon' }, { 'wyId': 3777, 'name': 'Metz' }, { 'wyId': 3782, 'name': 'Saint-Étienne' }, { 'wyId': 3776, 'name': 'Lille' }, { 'wyId': 3783, 'name': 'Caen' }, { 'wyId': 3780, 'name': 'Toulouse' }, { 'wyId': 3787, 'name': 'Montpellier' }, { 'wyId': 3785, 'name': 'Guingamp' }, { 'wyId': 3789, 'name': 'Amiens SC' }],
    },
    {
      name: "Bundesliga", start: '2017-8-18', end: '2018-5-21',
      teams: [{ 'wyId': 2454, 'name': "Borussia M'gladbach" }, { 'wyId': 2443, 'name': 'Werder Bremen' }, { 'wyId': 2446, 'name': 'Bayer Leverkusen' }, { 'wyId': 2447, 'name': 'Borussia Dortmund' }, { 'wyId': 2444, 'name': 'Bayern München' }, { 'wyId': 2445, 'name': 'Stuttgart' }, { 'wyId': 2449, 'name': 'Schalke 04' }, { 'wyId': 2455, 'name': 'Hannover 96' }, { 'wyId': 2457, 'name': 'Hertha BSC' }, { 'wyId': 2451, 'name': 'Wolfsburg' }, { 'wyId': 2450, 'name': 'Hamburger SV' }, { 'wyId': 2453, 'name': 'Freiburg' }, { 'wyId': 2482, 'name': 'Hoffenheim' }, { 'wyId': 2481, 'name': 'Augsburg' }, { 'wyId': 2460, 'name': 'Mainz 05' }, { 'wyId': 2462, 'name': 'Eintracht Frankfurt' }, { 'wyId': 2975, 'name': 'RB Leipzig' }]
    },
    {
      name: "Serie A", start: '2017-8-19', end: '2018-5-14',
      teams: [{ 'wyId': 3204, 'name': 'SPAL' }, { 'wyId': 3157, 'name': 'Milan' }, { 'wyId': 3159, 'name': 'Juventus' }, { 'wyId': 3158, 'name': 'Roma' }, { 'wyId': 3315, 'name': 'Sassuolo' }, { 'wyId': 3166, 'name': 'Bologna' }, { 'wyId': 3164, 'name': 'Sampdoria' }, { 'wyId': 3165, 'name': 'Chievo' }, { 'wyId': 3162, 'name': 'Lazio' }, { 'wyId': 3163, 'name': 'Udinese' }, { 'wyId': 3161, 'name': 'Internazionale' }, { 'wyId': 3219, 'name': 'Benevento' }, { 'wyId': 3173, 'name': 'Cagliari' }, { 'wyId': 3172, 'name': 'Atalanta' }, { 'wyId': 3176, 'name': 'Fiorentina' }, { 'wyId': 3185, 'name': 'Torino' }, { 'wyId': 3187, 'name': 'Napoli' }, { 'wyId': 3197, 'name': 'Crotone' }, { 'wyId': 3193, 'name': 'Genoa' }]
    },
    {
      name: "La Liga", start: '2017-8-18', end: '2018-5-21',
      teams: [{ 'wyId': 692, 'name': 'Celta de Vigo' }, { 'wyId': 691, 'name': 'Espanyol' }, { 'wyId': 696, 'name': 'Deportivo Alavés' }, { 'wyId': 698, 'name': 'Getafe' }, { 'wyId': 678, 'name': 'Athletic Club' }, { 'wyId': 679, 'name': 'Atlético Madrid' }, { 'wyId': 674, 'name': 'Valencia' }, { 'wyId': 675, 'name': 'Real Madrid' }, { 'wyId': 676, 'name': 'Barcelona' }, { 'wyId': 714, 'name': 'Las Palmas' }, { 'wyId': 712, 'name': 'Leganés' }, { 'wyId': 701, 'name': 'Eibar' }, { 'wyId': 756, 'name': 'Girona' }, { 'wyId': 677, 'name': 'Deportivo La Coruña' }, { 'wyId': 684, 'name': 'Real Betis' }, { 'wyId': 687, 'name': 'Real Sociedad' }, { 'wyId': 680, 'name': 'Sevilla' }, { 'wyId': 683, 'name': 'Málaga' }, { 'wyId': 682, 'name': 'Villarreal' }]
    },
    {
      name: "World Cup", start: '2018-6-14', end: '2018-7-16',
      teams: [{ 'wyId': 14358, 'name': 'Russia' }, { 'wyId': 7047, 'name': 'Sweden' }, { 'wyId': 6380, 'name': 'Brazil' }, { 'wyId': 3148, 'name': 'Germany' }, { 'wyId': 16216, 'name': 'Morocco' }, { 'wyId': 12430, 'name': 'Colombia' }, { 'wyId': 17929, 'name': 'Panama' }, { 'wyId': 8493, 'name': 'Australia' }, { 'wyId': 12274, 'name': 'Argentina' }, { 'wyId': 9905, 'name': 'Portugal' }, { 'wyId': 5629, 'name': 'Belgium' }, { 'wyId': 7712, 'name': 'Denmark' }, { 'wyId': 15670, 'name': 'Uruguay' }, { 'wyId': 2413, 'name': 'England' }, { 'wyId': 12913, 'name': 'Japan' }, { 'wyId': 9598, 'name': 'Croatia' }, { 'wyId': 15473, 'name': 'Mexico' }, { 'wyId': 4418, 'name': 'France' }, { 'wyId': 16521, 'name': 'Saudi Arabia' }, { 'wyId': 1598, 'name': 'Spain' }, { 'wyId': 17322, 'name': 'Serbia' }, { 'wyId': 6697, 'name': 'Switzerland' }, { 'wyId': 13869, 'name': 'Poland' }, { 'wyId': 16823, 'name': 'Nigeria' }]
    },
  ]
  const getMatches = async (start = leagueInfo[parseInt(leagueId)].start, end = leagueInfo[parseInt(leagueId)].end, sort='date') => await axios.get(`/matches/${leagueId}?start=${start}&end=${end}&sort=${sort}`)
    .then((res) => {
      setMatches(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  useEffect(() => {
    getMatches()
  }, [])
  const [startDate, setStart] = useState(moment(leagueInfo[parseInt(leagueId)].start));
  const [endDate, setEnd] = useState(moment(leagueInfo[parseInt(leagueId)].end));
  const [sortBy, setSort] = useState('date');
  const matchCards = matches.map(match => (
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
  ))
  return (
    <div className="App">
      <Grid container >
        <BackButton />
        <Grid container xs={10} spacing={2}>
          <Grid item xs={12}>
            <Grid item sx={{ marginBottom: "15px" }}>
              <Card className='heading-card' sx={{ width: '100%' }}>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    {leagueInfo[leagueId].name}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => {
                        const newStart = moment(newValue).format('YYYY-MM-DD')
                        getMatches(newStart,endDate,sortBy)
                        setStart(newStart);
                      }}
                      minDate={moment(leagueInfo[leagueId].start)}
                      maxDate={moment(leagueInfo[leagueId].end)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => {
                        const newEnd = moment(newValue).format('YYYY-MM-DD')
                        getMatches(startDate,newEnd, sortBy)
                        setEnd(newEnd);
                      }}
                      minDate={moment(leagueInfo[leagueId].start)}
                      maxDate={moment(leagueInfo[leagueId].end)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <FormControl sx={{width: '200px'}}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      defaultValue='date'
                      value={sortBy}
                      label="Sort"
                      onChange={(event) => {
                        const newSort = event.target.value
                        getMatches(startDate, endDate, newSort)
                        setSort(newSort);}}
                    >
                      <MenuItem value='date'>Date (Descending)</MenuItem>
                      <MenuItem value='date&asc=true'>Date (Ascending)</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {matchCards}
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default Matches;
