import { useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { AiFillHeart } from "react-icons/ai";

const RemoveOfFavourites = ({ favored, setFavored }) => {
  const {
    state: { currentPlayer },
    actions: { setShowToast },
  } = useContext(InfoContext);

  const { user } = useAuth0();

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  let playerId = currentPlayer.people[0].id;
  const player = currentPlayer.people[0];

  const toggleLike = (e) => {
    e.preventDefault();

    if (favored) {
      axios.patch(`/api/delete/favourites/${userId}`, {
        playerId: playerId,
      });
      setShowToast({
        isShowing: true,
        message: `${player.fullName} was removed from your favourites!`,
        duration: 3000,
      });
      setFavored(!favored);
    }
  };

  return (
    <>
      <AddFavorites onClick={(e) => toggleLike(e)}>
        <AiFillHeart />
      </AddFavorites>
    </>
  );
};

const AddFavorites = styled.button`
  height: 50px;
  width: 50px;
  font-size: 30px;
  border: none;
  background-color: inherit;
  color: crimson;
  cursor: pointer;
  & :hover {
    color: salmon;
  }
`;

export default RemoveOfFavourites;
