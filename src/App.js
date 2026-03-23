import './App.css';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
//material ui components
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';

//external libiraries
import axios from "axios";
import moment from "moment";
import "moment/min/locales"
moment.locale("ar")


// const axios = require('axios');
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"]
  }
})
var cancelAxios = null
function App ()
{

  //states
  const { t, i18n } = useTranslation();
  const [dateandtime, setdateandtime] = useState(null)

  console.log(dateandtime)
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  })
  const [local, setlocal] = useState("ar")
  const direction= local==="ar" ? "rtl" :"ltr"

  //event handler
  function handlelangclick ()
  {
    if (local === 'en') {
      setlocal("ar")
      i18n.changeLanguage("ar")
      moment.locale("ar")
    }
    else {
      setlocal("en")
      i18n.changeLanguage("en")
      moment.locale("en")
    }
    setdateandtime(moment().format('Do MMMM YYYY , h:mm a'))

  }
  useEffect(() =>
  {

    // changing languge


  }, [])

  useEffect(() =>
  {
    axios.get(
      'https://api.openweathermap.org/data/2.5/weather?lat=24.7&lon=46.5&appid=28cd7afcfbc8c160ed654d73cf0601df',
      {
        cancelToken: new axios.CancelToken((c) =>
        {
          cancelAxios = c
        })
      }
    )
      .then(function (response)
      {
        // handle success
        const responsetemp = Math.round(response.data.main.temp - 272.15)
        const min = Math.round(response.data.main.temp_min - 272.15)
        const max = Math.round(response.data.main.temp_max - 272.15)
        const discription = response.data.weather[0].description
        const responseIcon = response.data.weather[0].icon


        setdateandtime(moment().format('Do MMMM YYYY , h:mm a'))


        setTemp({ number: responsetemp, min: min, max: max, description: discription, icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png` })
        console.log(min, max, discription, responseIcon);
        console.log(response.data)
      })
      .catch(function (error)
      {
        // handle error
        console.log(error);
      })
    //useEffect clean up
    return () =>
    {
      console.log("cancle axios")
      cancelAxios()
    }

  }, [])
  return (
    <div className="App">

      <ThemeProvider theme={theme}>


        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
            {/* content container */}
            <div
              style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'

              }}
            >
              {/* card */}
              <div style={{
                backgroundColor: 'rgb(28 52 91 /36%)',
                color: 'white',
                padding: '10px',
                borderRadius: '0px 15px',
                boxShadow: '0px 11px 1px rgpa(0 0 0 0.05)',
                width: '100%',
              }}
                dir={direction}
              >
                {/* content */}
                <div style={{}}>
                  {/* city + time */}
                  <div style={{ 
                    display: "flex",
                    alignItems: "end", 
                    justifyContent: 'start'
                  }} 
                    dir={direction}
                    >
                    <Typography variant="h3" style={{ marginRight: '20px' }}>
                      {t("Riyadh")}
                    </Typography>
                    <Typography variant="h5" style={{ marginRight: '20px' }}>
                      {dateandtime}
                    </Typography>
                  </div>
                  {/* city + time */}

                  <hr />


                  {/* container of degree & cloud icons */}
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {/* degree + discreption */}
                    <div>
                      {/* tempreture */}
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h2" style={{ textAlign: 'right' }}>
                          {temp.number}
                        </Typography>
                        <img src={temp.icon} alt="" />
                      </div>
                      <Typography variant="h6" style={{ textAlign: 'right' }}>
                        {t(temp.description)}
                      </Typography>
                      {/* min & max */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5>{t("min")} : {temp.min}</h5>
                        <h5 style={{ margin: '0px 5px' }}>|</h5>
                        <h5>{t("max")} : {temp.max}</h5>
                      </div>
                      {/* tempreture */}
                    </div>
                    {/* degree + discreption */}
                    <CloudIcon style={{ fontSize: '200px', color: 'white' }} />

                  </div>
                  {/* container of degree & cloud icons */}
                </div>
                {/* content */}
              </div>
              {/* card */}
              {/* transilation container */}
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'end',
                
                marginTop: '20px',
              }}
              dir={direction}
              >
                <Button variant="text" style={{ color: 'white' }} onClick={handlelangclick}>
                  {local === "en" ? "Arabic" : "انجليزى"}

                </Button>
              </div>
              {/* transilation container */}
            </div>
            {/* content container */}
          </Container>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
}

export default App;
