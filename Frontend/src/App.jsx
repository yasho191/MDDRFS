import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveDrawer from './components/nav';
import BasicTextFields from './components/pat';
import BasicStack1 from './components/pat_info';
import Variants from './components/profile';
import BasicStack from './components/upload';
import MyForm from './components/pat_form';
import DirectionStack from './components/dashboard';
import Authentication from './components/authentication';
import ResponsiveStack from './components/rc';
import ResponsiveStack1 from './components/report';
// import DirectionStack from './components/dashboard';
import ResponsiveStack2 from './components/dd';
import ResponsiveStack3 from './components/ns';
import ResponsiveStack4 from './components/dd_report';
import ResponsiveStack5 from './components/ns_report';
// import MyForm from './components/pat_form';
// import DocForm from './components/doc_login';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <ResponsiveDrawer />
                <Router>
                    <Routes>
                        <Route exact path="/" element={<ResponsiveDrawer/>} />
                        <Route exact path="/profile" element={<Variants/>} />
                        <Route exact path="/upload" element={<BasicStack/>} />
                        <Route exact path="/patient" element={<BasicTextFields/>}/>
                        <Route exact path="/add-patient" element={<MyForm/>}/>
                        <Route exact path="/dashboard" element={<DirectionStack/>}/>
                        <Route exact path="/authentication" element={<Authentication/>}/>
                        <Route exact path="/rc" element={<ResponsiveStack/>}/>
                        <Route exact path="/report" element={<ResponsiveStack1/>}/>
                        <Route exact path="/dd" element={<ResponsiveStack2/>}/>
                        <Route exact path="/ns" element={<ResponsiveStack3/>}/>
                        <Route exact path="/dd_report" element={<ResponsiveStack4/>}/>
                        <Route exact path="/ns_report" element={<ResponsiveStack5/>}/>
                    </Routes>
                </Router>
            </div>

            /*<div className="stack">
                <BasicStack />
            </div>*/
            /*<div className="item">
                <ResponsiveStack1 />
            </div>*/
            /*<div className="patient">
            <BasicTextFields />
            </div>*/
            /*<div className="patientinfo">
            <BasicStack1 />
            </div>*/
            /*<div classname="profile">
            <Variants />
            </div>*/
            /*<div classname="dashboard">
            <ResponsiveStack2 />
            </div>*/
            /*<div className="form">
                <MyForm />
            </div>*/
            /*<div className="doc_login">
            <DocForm />
            </div>*/

        );
    }
}

export default App;