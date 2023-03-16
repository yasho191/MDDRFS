import React, { useState } from "react";
import {
  TextField,
  Button,
} from "@material-ui/core";

const DocForm = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [qualification, setQualification] = useState("");
  

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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

  const handleQualificationChange = (event) => {
    setQualification(event.target.value);
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
        label="Password"
        value={password}
        onChange={handlePasswordChange}
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
        label="Qualification"
        value={qualification}
        onChange={handleQualificationChange}
      /><br/>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
    </div>
  );
};

export default DocForm;
