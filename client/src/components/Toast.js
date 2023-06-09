import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";

const Toast = () => {
  const {
    state: { showToast },
    actions: { setShowToast },
  } = useContext(InfoContext);

  const [count, setCount] = useState(3);
  useEffect(() => {
    if (showToast.isShowing) {
      const threeSec = setTimeout(() => {
        clearTimeout(threeSec);
        clearInterval(everySecond);
        setShowToast({
          isShowing: false,
          message: "",
          duration: 3000,
        });
      }, showToast.duration);

      const everySecond = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => {
        clearTimeout(threeSec);
        clearInterval(everySecond);
      };
    }
  }, [showToast]);
  if (!showToast.isShowing) {
    return null;
  }
  return (
    <>
      {showToast.isShowing && (
        <ToastDiv>
          <span>{showToast.message}</span>
        </ToastDiv>
      )}
    </>
  );
};

const ToastDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  bottom: 10%;
  left: 50px;
  height: 60px;
  border: none;
  border-radius: 50px;
  color: whitesmoke;
  background-color: #383838;
  padding-left: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
  animation: fade-in 1000ms forwards;
  width: 400px;
  font-family: "Vollkorn", serif;

  & span::before {
  }
`;

/*

*/

export default Toast;
