import React from 'react';
import Main from './route/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './route/detail';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './globalStyles';
import { lightTheme, darkTheme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle />
          <BrowserRouter>
            <Routes>
              <Route path='/detail/:id/*' element={<Detail />}/>
              <Route path='/' element={<Main />}/>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
