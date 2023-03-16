import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";

const MyForm = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [allergies, setAllergies] = useState("");
  const [history, setHistory] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAllergiesChange = (event) => {
    setAllergies(event.target.value);
  };

  const handleHistoryChange = (event) => {
    setHistory(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        value={first_name}
        onChange={handleFirstNameChange}
      /><br/>
      <TextField
        label="Last Name"
        value={last_name}
        onChange={handleLastNameChange}
      /><br/>
      <TextField
        label="Email"
        value={email}
        onChange={handleEmailChange}
      /><br/>
      <TextField
        label="Age"
        value={age}
        onChange={handleAgeChange}
      /><br/>
      <TextField
        label="Phone Number"
        value={phone_number}
        onChange={handlePhoneNumberChange}
      /><br/>
      <TextField
        label="Allergies"
        value={allergies}
        onChange={handleAllergiesChange}
      /><br/>
      <TextField
        label="History"
        value={history}
        onChange={handleHistoryChange}
      /><br/>
      <TextField
        label="Height"
        value={height}
        onChange={handleHeightChange}
      /><br/>
      <TextField
        label="Weight"
        value={weight}
        onChange={handleWeightChange}
      /><br/>
      <FormControl component="fieldset" style ={{marginTop: 10}}><br/>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup value={gender} onChange={handleGenderChange}>
          <FormControlLabel
            value="Male"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value="Female"
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            value="Other"
            control={<Radio />}
            label="Other"
          />
        </RadioGroup>
      </FormControl><br/>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
    </div>
  );
};

export default MyForm;
