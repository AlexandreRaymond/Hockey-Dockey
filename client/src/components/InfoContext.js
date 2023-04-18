import { useState, createContext } from "react";

export const InfoContext = createContext(null);
export const InfoProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentPic, setCurrentPic] = useState(null);
  const [currentStats, setCurrentStats] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentLogo, setCurrentLogo] = useState(null);
  const [currentRoster, setCurrentRoster] = useState(null);
  const [currentStanding, setCurrentStanding] = useState(null);
  const [currentFocus, setCurrentFocus] = useState("stats");
  const [copyrights, setCopyrights] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <InfoContext.Provider
      value={{
        state: {
          currentPlayer,
          currentTeam,
          logged,
          copyrights,
          currentStats,
          currentPic,
          currentFocus,
          currentLogo,
          currentRoster,
          modalOpen,
          currentStanding,
        },
        actions: {
          setCurrentPlayer,
          setCurrentTeam,
          setLogged,
          setCopyrights,
          setCurrentStats,
          setCurrentPic,
          setCurrentFocus,
          setCurrentLogo,
          setCurrentRoster,
          setModalOpen,
          setCurrentStanding,
        },
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};