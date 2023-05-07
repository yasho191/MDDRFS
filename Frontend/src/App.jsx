import {React, useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Test from "./components/models/test";
import LoginPage from "./components/authentication/login";
import SignUpPage from "./components/authentication/signup";
import RiskClassification from "./components/risk_classification/risk_classification";
import DiseaseDetection from "./components/disease_detection/disease_detection";
import NerveSegmentation from "./components/nerve_segmentation/nerve_segmentation";
import Patients from "./components/patients/patients";
import Profile from "./components/profile/profile";
import { UserContext } from "./context/UserContext";


function App() {
  const [token] = useContext(UserContext);
  
  return (
    <div className="App" style={{ backgroundImage: "url(/images/services-bg.png)" }}>

      {
        !token ? (
          <Router>
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/signup" element={<SignUpPage />} />
            </Routes>
          </Router>
          
          
        ) : (
          <Router>
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/test" element={<Test />} />
              <Route exact path="/risk_classification" element={<RiskClassification />} />
              <Route exact path="/disease_detection" element={<DiseaseDetection />} />
              <Route exact path="/nerve_segmentation" element={<NerveSegmentation />} />
              <Route exact path="/patients" element={<Patients />} />
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/signup" element={<SignUpPage />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </Router>
         
        )
      }
    </div>
  );
}


export default App;
