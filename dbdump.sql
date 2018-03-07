-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.13-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table tracker.assignments
CREATE TABLE IF NOT EXISTS `assignments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.assignments: 7 rows
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` (`id`, `name`, `date_created`, `modified`) VALUES
	(1, 'A', '2018-03-06 23:23:10', '2018-03-06 23:32:50'),
	(2, 'B', '2018-03-06 23:23:10', '2018-03-06 23:32:50'),
	(3, 'C', '2018-03-06 23:23:10', '2018-03-06 23:32:50'),
	(4, 'A/B', '2018-03-06 23:23:10', '2018-03-06 23:32:50'),
	(5, 'B/C', '2018-03-06 23:23:10', '2018-03-06 23:32:50'),
	(6, 'A/B/C', '2018-03-06 23:23:10', '2018-03-06 23:32:50'),
	(7, 'float', '2018-03-06 23:23:10', '2018-03-06 23:33:09');
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;

-- Dumping structure for table tracker.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.categories: 4 rows
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `date_created`, `date_updated`) VALUES
	(1, 'RN', '2014-06-01 00:35:07', '2014-05-30 17:34:33'),
	(2, 'LPN', '2014-06-01 00:35:07', '2014-05-30 17:34:33'),
	(3, 'UC', '2014-06-01 00:35:07', '2014-05-30 17:34:54'),
	(5, 'NA', '2014-06-02 00:35:08', '2016-01-08 13:27:26');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Dumping structure for table tracker.mods
CREATE TABLE IF NOT EXISTS `mods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.mods: 7 rows
/*!40000 ALTER TABLE `mods` DISABLE KEYS */;
INSERT INTO `mods` (`id`, `name`, `date_created`, `modified`) VALUES
	(19, 'burn', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(20, 'evd', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(21, 'crrt', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(22, 'vent', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(23, 'double', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(24, 'admit', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(25, 'codes', '2018-03-07 08:48:00', '2018-03-07 08:50:11');
/*!40000 ALTER TABLE `mods` ENABLE KEYS */;

-- Dumping structure for table tracker.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.roles: 6 rows
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `name`, `date_created`, `modified`) VALUES
	(1, 'bedside', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(2, 'charge', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(3, 'clinician', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(4, 'nursing attendant', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(5, 'outreach', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(6, 'unit clerk', '2018-03-06 23:23:10', '2018-03-06 23:27:59');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table tracker.shifts
CREATE TABLE IF NOT EXISTS `shifts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shift_date` date NOT NULL,
  `shift_d_or_n` varchar(1) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_staff_shift` (`shift_date`,`staff_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.shifts: 0 rows
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;

-- Dumping structure for table tracker.shift_to_mod
CREATE TABLE IF NOT EXISTS `shift_to_mod` (
  `shift_id` int(11) NOT NULL,
  `mod_id` int(11) NOT NULL,
  PRIMARY KEY (`shift_id`,`mod_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.shift_to_mod: 0 rows
/*!40000 ALTER TABLE `shift_to_mod` DISABLE KEYS */;
/*!40000 ALTER TABLE `shift_to_mod` ENABLE KEYS */;

-- Dumping structure for table tracker.staff_members
CREATE TABLE IF NOT EXISTS `staff_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `category_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `date_created` datetime NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_name` (`first_name`,`last_name`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.staff_members: 0 rows
/*!40000 ALTER TABLE `staff_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_members` ENABLE KEYS */;

-- Dumping structure for table tracker.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `date_created` datetime NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.users: 0 rows
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
