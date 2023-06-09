import { useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import teamColors from "../utils/backgrounds";
import Conversation from "./Conversation";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";
import AdminButtons from "./AdminButtons";

const PlayerChatInfos = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const { isAuthenticated, user, isLoading } = useAuth0();

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  const {
    state: { currentChat, currentTeam, yourComment, yourProfile, adminPost },
    actions: { setYourComment, setShouldUpdate, setShowToast, setAdminPost },
  } = useContext(InfoContext);

  const color = teamColors[currentTeam.name];

  if (isLoading) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }

  const addZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  let hours = addZero(today.getHours());
  let minutes = addZero(today.getMinutes());
  let seconds = addZero(today.getSeconds());

  let time = `${hours}:${minutes}:${seconds}`;

  let playerId = currentChat.person.id;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/post/comment`, {
        comment: yourComment,
        user: user,
        userId: userId,
        date: date,
        time: time,
        player: currentChat.person.fullName,
        playerId: playerId,
        adminPost: adminPost,
      })
      .then((response) => {
        setShowToast({
          isShowing: true,
          message: "Message successfuly posted!",
          duration: 3000,
        });
        setShouldUpdate(true);
        setAdminPost(false);
        setYourComment("");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  let wordLimit = 100;

  if (adminPost) {
    wordLimit = 200;
  } else {
    wordLimit = 100;
  }

  return (
    isAuthenticated && (
      <>
        <ChatArea backgroundColor={color}>
          <div>
            <Conversation chatId={currentChat.person.id} />
          </div>
        </ChatArea>
        <Form onSubmit={handleSubmit}>
          <Input
            rows="60"
            cols="2"
            value={yourComment}
            maxLength={wordLimit + 5}
            placeholder={" Comment here"}
            onChange={(e) => setYourComment(e.target.value)}
          />
          <Postin>
            {yourProfile.isAdmin ? <AdminButtons /> : <div></div>}
            <Wordcount>{yourComment.length}</Wordcount>
            <span>
              {yourComment.length > wordLimit ? (
                <SendComment
                  type="submit"
                  disabled="disabled"
                  backgroundColor={color}
                >
                  Too long
                </SendComment>
              ) : (
                <SendComment type="submit" backgroundColor={color}>
                  SEND
                </SendComment>
              )}
            </span>
          </Postin>
        </Form>
      </>
    )
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  width: 550px;
`;

const ChatArea = styled.div`
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
  font-family: "Vollkorn", serif;
  height: 500px;
  width: 550px;
  margin: 10px 10px 0 10px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.textarea`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  position: relative;
  resize: none;
  height: 80px;
  width: 540px;
  font-family: "Vollkorn", serif;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Postin = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const Wordcount = styled.span`
  position: absolute;
  color: darkgray;
  display: flex;
  flex-direction: row;
  right: 1.5%;
  bottom: 120%;
`;

const SendComment = styled.button`
  border: none;
  border-radius: 5px;
  margin: 5px 0;
  width: 550px;
  height: 30px;
  color: whitesmoke;
  font-weight: bold;
  background-color: ${(props) => props.backgroundColor};

  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 50%;
    background-color: grey;
  }
`;

export default PlayerChatInfos;
