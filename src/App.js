import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import Window from './components/window';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const App = () => {
  const [openWindows, setOpenWindows] = useState(new Set());
  const [shuffledNumbers, setShuffledNumbers] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);

  const messages = [
    "Der erste Advent und ein lichtchen brennt",
    "Möge dein Herz in dieser festlichen Zeit genauso leuchten wie die Weihnachtslichter.",
    "Weihnachten ist die Zeit des Gebens – nicht nur Geschenke, sondern auch Liebe und Freude.",
    "Der wahre Zauber von Weihnachten liegt in den kleinen Momenten der Liebe.",
    "Nutze die Feiertage, um neue Erinnerungen zu schaffen, die ein Leben lang halten.",
    "Das Fest der Liebe ist der perfekte Moment, um dankbar zu sein für das, was du hast.",
    "Der Advent ist eine Einladung, innezuhalten und das Leben zu genießen.",
    "In der Weihnachtszeit wird die Welt ein kleines bisschen heller.",
    "Glaube an den Zauber von Weihnachten und die Kraft der Liebe.",
    "Lass das Licht der Kerzen in deinem Herzen weiterleuchten.",
    "Weihnachten ist mehr als nur ein Tag, es ist eine Lebensweise voller Liebe.",
    "Freude teilen ist das schönste Geschenk, das du geben kannst.",
    "Jeder Tag im Dezember ist eine Gelegenheit, das Gute im Leben zu feiern.",
    "Die wahre Bedeutung von Weihnachten ist es, Liebe und Hoffnung zu verbreiten.",
    "Möge der Frieden der Weihnacht dein Herz erfüllen.",
    "Advent ist der Moment, in dem wir uns auf das Wesentliche besinnen.",
    "Die besten Geschenke kann man nicht verpacken – sie sind Liebe, Zeit und Zuwendung.",
    "Lass den Zauber der Weihnacht deine Seele erleuchten.",
    "Die festliche Zeit lädt uns ein, die Verbindung mit unseren Lieben zu stärken.",
    "Vertraue darauf, dass die besten Geschenke immer die sind, die das Herz berühren.",
    "Weihnachten ist die Zeit, in der wir den wahren Wert von Familie und Freundschaft erkennen.",
    "Die Wärme der Weihnacht soll dich durch das ganze Jahr begleiten.",
    "Jeder Tag im Advent bringt neue Hoffnung und Freude – öffne dein Herz!",
    "Frohe Weihnachten!",
  ];

  // Get the current day
  const getCurrentDay = () => new Date().getDate();

  useEffect(() => {
    // Set current day
    setCurrentDay(getCurrentDay());

    // Shuffle the numbers 1-24 for the calendar
    setShuffledNumbers(shuffleArray([...Array(24).keys()].map((n) => n + 1)));
  }, []);

  const toggleWindow = (index) => {
    console.log(`Toggling window: ${index}, Current Day: ${currentDay}`); // Debug output
    const shuffledDay = shuffledNumbers[index]; // Get the actual day from shuffled array
    if (shuffledDay <= currentDay) {
      setOpenWindows((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    }
  };

  return (
    <Container
      sx={{
        paddingTop: '16px',
        paddingBottom: '16px',
        backgroundImage: `url('https://cdn.pixabay.com/photo/2022/11/15/14/19/candle-7594082_1280.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 0,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom color="white">
        Dein Kalender
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px', // Max width for better control over layout
          padding: '16px',
          display: 'flex',
          justifyContent: 'center', // Center the grid container horizontally
          alignItems: 'center', // Center items vertically
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {shuffledNumbers.map((number, index) => (
            <Grid
              item
              xs={6}  // 2 columns on small screens
              sm={4}  // 3 columns on medium screens
              md={3}  // 4 columns on large screens
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '150px',
              }}
            >
              <Window
                number={number}
                message={messages[number - 1]}
                isOpen={openWindows.has(index)}
                toggleWindow={() => toggleWindow(index)}
                isClickable={number <= currentDay}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
