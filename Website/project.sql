-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2022 at 01:22 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor_details`
--

CREATE TABLE `doctor_details` (
  `Doctor_ID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Email_ID` varchar(50) DEFAULT NULL,
  `Password` char(60) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `Hospital` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_details`
--

INSERT INTO `doctor_details` (`Doctor_ID`, `Name`, `Email_ID`, `Password`, `Age`, `Hospital`) VALUES
(1, 'John', 'john@gmail.com', 'johnjacobs', 34, 'BJ_Medical'),
(2, 'Rita', 'Rita@gmail.com', 'ritazd', 40, 'RubyHall');

-- --------------------------------------------------------

--
-- Table structure for table `patient_details`
--

CREATE TABLE `patient_details` (
  `Patient_ID` int(11) NOT NULL,
  `Doctor_ID` int(11) DEFAULT NULL,
  `Patient_Name` varchar(50) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Contact` char(10) DEFAULT NULL,
  `Previous_Medical_History` varchar(50) DEFAULT NULL,
  `Scan` blob DEFAULT NULL,
  `Report` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctor_details`
--
ALTER TABLE `doctor_details`
  ADD PRIMARY KEY (`Doctor_ID`);

--
-- Indexes for table `patient_details`
--
ALTER TABLE `patient_details`
  ADD PRIMARY KEY (`Patient_ID`),
  ADD KEY `Doctor_ID` (`Doctor_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `patient_details`
--
ALTER TABLE `patient_details`
  ADD CONSTRAINT `patient_details_ibfk_1` FOREIGN KEY (`Doctor_ID`) REFERENCES `doctor_details` (`Doctor_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
