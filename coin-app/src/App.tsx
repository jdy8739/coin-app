import React, { useState } from 'react';
import Main, { Card } from './route/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './route/detail';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './globalStyles';
import { lightTheme, darkTheme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRecoilState } from 'recoil';
import { isDarkAtom } from './atoms';

const queryClient = new QueryClient();

const ModeToggleBtn = styled(Card)`
  position: fixed;
  right: 50px;
  top: 30px;
  width: 110px;
  height: 40px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

function App() {

  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyle />
          <ModeToggleBtn onClick={() => setIsDark(!isDark)}>{ isDark ? 'dark mode' : 'light mode' }</ModeToggleBtn>
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
