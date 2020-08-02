import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Game from './screens/Game/';

const App = () => {
  return (
    <ThemeProvider>
      <Game />
    </ThemeProvider>
  );
}

export default App;
