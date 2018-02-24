-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2018 at 02:19 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_onlinepreneur`
--

-- --------------------------------------------------------

--
-- Table structure for table `core_problems`
--

CREATE TABLE `core_problems` (
  `id` bigint(20) NOT NULL,
  `persona_id` bigint(20) NOT NULL,
  `core_goals` longtext NOT NULL,
  `core_values` longtext NOT NULL,
  `core_challenges` longtext NOT NULL,
  `pain_point_1` longtext NOT NULL,
  `pain_point_2` longtext NOT NULL,
  `pain_point_3` longtext NOT NULL,
  `solution_1` longtext NOT NULL,
  `solution_2` longtext NOT NULL,
  `solution_3` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

CREATE TABLE `goals` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `omissions` longtext NOT NULL,
  `engagement` longtext NOT NULL,
  `statement` longtext NOT NULL,
  `financial_goal` float NOT NULL,
  `product_price` float NOT NULL,
  `ctr_traffic` float NOT NULL,
  `ctr_optin` float NOT NULL,
  `ctr_closerate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `journeys`
--

CREATE TABLE `journeys` (
  `id` bigint(20) NOT NULL,
  `goal_id` bigint(20) NOT NULL,
  `aware` longtext NOT NULL,
  `engage` longtext NOT NULL,
  `subscribe` longtext NOT NULL,
  `convert` longtext NOT NULL,
  `excite` longtext NOT NULL,
  `ascend_1` longtext NOT NULL,
  `ascend_2` longtext NOT NULL,
  `ascend_3` longtext NOT NULL,
  `ascend_4` longtext NOT NULL,
  `advocate` longtext NOT NULL,
  `promote` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `metric_values`
--

CREATE TABLE `metric_values` (
  `id` bigint(20) NOT NULL,
  `goal_id` bigint(20) NOT NULL,
  `goal` float NOT NULL,
  `actual` float NOT NULL,
  `type` varchar(50) NOT NULL,
  `month` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `personas`
--

CREATE TABLE `personas` (
  `id` bigint(20) NOT NULL,
  `goal_id` bigint(20) NOT NULL,
  `avatar` longtext,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `age` int(11) NOT NULL,
  `gender` text NOT NULL,
  `marital_status` text NOT NULL,
  `location` longtext NOT NULL,
  `children` longtext NOT NULL,
  `quote` longtext NOT NULL,
  `job_title` longtext NOT NULL,
  `annual_income` float NOT NULL,
  `education_level` longtext NOT NULL,
  `other_info` longtext NOT NULL,
  `books` longtext NOT NULL,
  `magazines` longtext NOT NULL,
  `blogs` longtext NOT NULL,
  `gurus` longtext NOT NULL,
  `other_sources` longtext NOT NULL,
  `purchase_objections` longtext NOT NULL,
  `purchase_role` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sales_canvas`
--

CREATE TABLE `sales_canvas` (
  `id` bigint(20) NOT NULL,
  `persona_id` bigint(20) NOT NULL,
  `trigger` longtext NOT NULL,
  `action` longtext NOT NULL,
  `conversation` longtext NOT NULL,
  `sell` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `avatar` longtext NOT NULL,
  `default_goal_id` bigint(20) DEFAULT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `email` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `last_login` date NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `core_problems`
--
ALTER TABLE `core_problems`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `goal_id` (`persona_id`);

--
-- Indexes for table `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usertogoals` (`user_id`);

--
-- Indexes for table `journeys`
--
ALTER TABLE `journeys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `goal_id` (`goal_id`),
  ADD KEY `goal_id_2` (`goal_id`);

--
-- Indexes for table `metric_values`
--
ALTER TABLE `metric_values`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `metric_unique` (`goal_id`,`type`,`month`);

--
-- Indexes for table `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `personatogoal` (`goal_id`),
  ADD KEY `goal_id` (`goal_id`);

--
-- Indexes for table `sales_canvas`
--
ALTER TABLE `sales_canvas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `persona_id` (`persona_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `_id` (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `default_goal_id` (`default_goal_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `core_problems`
--
ALTER TABLE `core_problems`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `goals`
--
ALTER TABLE `goals`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `journeys`
--
ALTER TABLE `journeys`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `metric_values`
--
ALTER TABLE `metric_values`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=672;

--
-- AUTO_INCREMENT for table `personas`
--
ALTER TABLE `personas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT for table `sales_canvas`
--
ALTER TABLE `sales_canvas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `core_problems`
--
ALTER TABLE `core_problems`
  ADD CONSTRAINT `core_problems_persona` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `goals`
--
ALTER TABLE `goals`
  ADD CONSTRAINT `usertogoals` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `journeys`
--
ALTER TABLE `journeys`
  ADD CONSTRAINT `journeys_ibfk_1` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `metric_values`
--
ALTER TABLE `metric_values`
  ADD CONSTRAINT `metricvaluestogoal` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sales_canvas`
--
ALTER TABLE `sales_canvas`
  ADD CONSTRAINT `sales_canvas_persona` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`default_goal_id`) REFERENCES `goals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
