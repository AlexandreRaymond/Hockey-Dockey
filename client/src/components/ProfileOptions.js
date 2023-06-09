import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileOptions = () => {
  const { logout, user } = useAuth0();
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    city: "",
    province: "",
    country: "",
    picture: "",
  });

  const {
    actions: { setShouldUpdate, setShowToast },
  } = useContext(InfoContext);

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  const handleChange = (value, name) => {
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handlePicture = (e) => {
    const photo = e.target.files[0];
    if (photo && photo.size > 700000) {
      return console.log("file too large");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        setProfileInfo({ ...profileInfo, picture: reader.result });
        setShouldUpdate(true);
      };
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    let filteredInfo = {};

    const entries = Object.entries(profileInfo);
    entries.forEach((entry) => {
      if (entry[1] !== "") {
        filteredInfo[entry[0]] = entry[1];
      }
    });

    axios
      .patch(`/api/patch/profile/${userId}`, {
        profileInfo: filteredInfo,
      })
      .then((response) => {
        setShowToast({
          isShowing: true,
          message: "Profile Updated!",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <MainContainer>
      <h1>Options</h1>
      <BLine></BLine>
      <HTitle>Main Infos</HTitle>
      <BLine></BLine>
      <div>
        <Form onSubmit={(e) => handleSumbit(e)}>
          <NameDiv>
            <span>Name:</span>
            <SubNameDiv>
              <input
                name="firstName"
                type="text"
                placeholder={"Your first name"}
                maxLength="25"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
              <input
                name="lastName"
                type="text"
                placeholder={"Your last name"}
                maxLength="25"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </SubNameDiv>
          </NameDiv>
          <AgeDiv>
            <span>Age:</span>
            <input
              name="age"
              type="number"
              placeholder="Your age"
              min="1"
              max="150"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </AgeDiv>
          <PlaceDiv>
            <span>Address:</span>
            <SubPlaceDiv>
              <input
                name="city"
                type="text"
                placeholder={"Your city"}
                maxLength="20"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
              <input
                name="province"
                type="text"
                placeholder={"Your Province or State"}
                maxLength="20"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
              <input
                name="country"
                type="text"
                placeholder={"Your country"}
                maxLength="20"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </SubPlaceDiv>
          </PlaceDiv>
          <PicDiv>
            <span>Picture</span>
            <Input
              name="picture"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => handlePicture(e)}
            />
          </PicDiv>
          <button type="submit">Save changes</button>
        </Form>
      </div>
      <div>
        <BLine></BLine>
        <HTitle>Others</HTitle>
        <BLine></BLine>
        <BadDiv>
          <LogOut
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            <p>Logout</p>
          </LogOut>
        </BadDiv>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 200px;
  margin: 35px auto;
  margin: 0 40px;
  align-items: center;
  justify-content: center;
  font-family: "Vollkorn", serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;

  & span {
    font-weight: bold;
  }

  & button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: limegreen;
    border: none;
    border-radius: 10px;
    height: 30px;
    font-weight: bold;
    font-size: 16px;
    color: whitesmoke;
    &:hover {
      cursor: pointer;
      opacity: 90%;
    }
  }
`;

const LogOut = styled.button`
  display: flex;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  background-color: red;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
    background-color: crimson;
  }
`;

const NameDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const SubNameDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const AgeDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const PicDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  margin-left: 50px;
`;

const PlaceDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const SubPlaceDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const BLine = styled.div`
  background-color: black;
  height: 3px;
  margin: 10px;
  width: 400px;
`;

const HTitle = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin: 20px;
`;

const BadDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
`;

export default ProfileOptions;
