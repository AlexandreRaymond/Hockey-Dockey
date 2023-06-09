import { useState, useContext } from "react";
import styled from "styled-components";
import Profile from "./Profile";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import Home from "./Home";
import Standings from "./Standings";
import Teams from "./Teams";
import Roster from "./Roster";
import Player from "./Player";
import NHLStanding from "./NHLStanding";
import RequireAuth from "./RequireAuth";
import ChatMenu from "./ChatMenu";
import TeamChat from "./TeamChat";
import PlayerChat from "./PlayerChat";
import Footer from "./Footer";
import Toast from "./Toast";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <RequireAuth>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/standings/nhl" element={<NHLStanding />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id/roster" element={<Roster />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/chat" element={<ChatMenu />} />
          <Route path="/teams/:id/chat" element={<TeamChat />} />
          <Route path="/player/:id/chat" element={<PlayerChat />} />
        </Routes>
      </RequireAuth>
      <Toast />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  min-height: 100avh;
`;

export default App;
