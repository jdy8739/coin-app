import React from 'react';
import Main from './route/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './route/detail';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './globalStyles';
import { lightTheme, darkTheme } from './theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path='/detail/:id/*' element={<Detail />}/>
            <Route path='/' element={<Main />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
