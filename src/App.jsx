import React, { useReducer, createContext, memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Home from './page/Home';
import Detail from './page/Detail';
import Update from './page/Update';
import NotFound from './page/404';
import { UserReducer, defaultState } from './hardware/UserReducer.js';
import Warn from './page/Warn';

export const UserContext = createContext()

function App() {
  const [UserState, dispatch] = useReducer(UserReducer, defaultState)
  return (
    <BrowserRouter>
      <Layout>
        <UserContext.Provider value={{ UserState, dispatch }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:uid'>
              <Route index element={<Warn />} />
              <Route path='detail' element={<Detail />} />
              <Route path='update' element={<Update />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </Layout>
    </BrowserRouter>
  );
}

export default memo(App);
