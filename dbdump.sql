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
DROP TABLE IF EXISTS `assignments`;
CREATE TABLE IF NOT EXISTS `assignments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.assignments: ~7 rows (approximately)
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` (`id`, `name`, `date_created`, `date_updated`) VALUES
	(26, 'A', '2018-03-07 22:55:14', '2018-03-07 22:55:14'),
	(27, 'B', '2018-03-07 22:55:22', '2018-03-07 22:55:22'),
	(28, 'C', '2018-03-07 22:55:38', '2018-03-07 22:55:38'),
	(29, 'A/B', '2018-03-07 22:55:46', '2018-03-07 22:55:46'),
	(30, 'B/C', '2018-03-07 22:55:58', '2018-03-07 22:55:58'),
	(31, 'A/B/C', '2018-03-07 22:56:08', '2018-03-07 22:56:08'),
	(32, 'float', '2018-03-07 22:56:18', '2018-03-07 22:56:18');
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;

-- Dumping structure for table tracker.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.categories: ~4 rows (approximately)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `date_created`, `date_updated`) VALUES
	(1, 'RN', '2014-06-01 00:35:07', '2014-05-30 17:34:33'),
	(2, 'LPN', '2014-06-01 00:35:07', '2014-05-30 17:34:33'),
	(3, 'UC', '2014-06-01 00:35:07', '2014-05-30 17:34:54'),
	(5, 'NA', '2014-06-02 00:35:08', '2016-01-08 13:27:26');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Dumping structure for table tracker.mods
DROP TABLE IF EXISTS `mods`;
CREATE TABLE IF NOT EXISTS `mods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.mods: ~7 rows (approximately)
/*!40000 ALTER TABLE `mods` DISABLE KEYS */;
INSERT INTO `mods` (`id`, `name`, `date_created`, `date_updated`) VALUES
	(19, 'burn', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(20, 'evd', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(21, 'crrt', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(22, 'vent', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(23, 'double', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(24, 'admit', '2018-03-07 08:48:00', '2018-03-07 08:50:11'),
	(25, 'codes', '2018-03-07 08:48:00', '2018-03-07 08:50:11');
/*!40000 ALTER TABLE `mods` ENABLE KEYS */;

-- Dumping structure for table tracker.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.roles: ~6 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `name`, `date_created`, `date_updated`) VALUES
	(1, 'bedside', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(2, 'charge', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(3, 'clinician', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(4, 'nursing attendant', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(5, 'outreach', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(6, 'unit clerk', '2018-03-06 23:23:10', '2018-03-06 23:27:59');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table tracker.shifts
DROP TABLE IF EXISTS `shifts`;
CREATE TABLE IF NOT EXISTS `shifts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shift_date` date NOT NULL,
  `shift_d_or_n` varchar(1) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_staff_shift` (`shift_date`,`staff_id`),
  KEY `shifts_ibfk_1` (`staff_id`),
  KEY `shifts_ibfk_2` (`role_id`),
  KEY `shifts_ibfk_3` (`assignment_id`),
  CONSTRAINT `shifts_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff_members` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `shifts_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `shifts_ibfk_3` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.shifts: ~1 rows (approximately)
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
INSERT INTO `shifts` (`id`, `shift_date`, `shift_d_or_n`, `staff_id`, `role_id`, `assignment_id`, `date_created`, `date_updated`, `created_by`, `updated_by`) VALUES
	(19, '2018-03-09', 'D', 19, 3, 29, '2018-03-09 14:00:58', '2018-03-09 14:00:58', 'tima', NULL);
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;

-- Dumping structure for table tracker.shift_to_mod
DROP TABLE IF EXISTS `shift_to_mod`;
CREATE TABLE IF NOT EXISTS `shift_to_mod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shift_id` int(11) NOT NULL,
  `mod_id` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_shift_mod` (`shift_id`,`mod_id`),
  KEY `fk_mod_id` (`mod_id`),
  CONSTRAINT `fk_mod_id` FOREIGN KEY (`mod_id`) REFERENCES `mods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_shift_id` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.shift_to_mod: ~0 rows (approximately)
/*!40000 ALTER TABLE `shift_to_mod` DISABLE KEYS */;
INSERT INTO `shift_to_mod` (`id`, `shift_id`, `mod_id`, `date_created`, `date_updated`) VALUES
	(1, 19, 24, '2018-03-09 14:03:18', '2018-03-09 14:03:18'),
	(4, 19, 25, '2018-03-09 14:05:15', '2018-03-09 14:05:15'),
	(5, 19, 21, '2018-03-09 14:45:34', '2018-03-09 14:45:34'),
	(6, 19, 20, '2018-03-09 14:45:54', '2018-03-09 14:45:54');
/*!40000 ALTER TABLE `shift_to_mod` ENABLE KEYS */;

-- Dumping structure for table tracker.staff_members
DROP TABLE IF EXISTS `staff_members`;
CREATE TABLE IF NOT EXISTS `staff_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `category_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_name` (`first_name`,`last_name`),
  KEY `staff_members_ibfk_1` (`category_id`),
  CONSTRAINT `staff_members_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.staff_members: ~1 rows (approximately)
/*!40000 ALTER TABLE `staff_members` DISABLE KEYS */;
INSERT INTO `staff_members` (`id`, `first_name`, `last_name`, `category_id`, `active`, `date_created`, `date_updated`, `created_by`, `updated_by`) VALUES
	(19, 'Tim', 'Austin', 1, 1, '2018-03-09 14:00:13', '2018-03-09 14:00:13', 'tima', NULL);
/*!40000 ALTER TABLE `staff_members` ENABLE KEYS */;

-- Dumping structure for table tracker.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.users: ~2 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `active`, `admin`, `date_created`, `date_updated`, `created_by`, `updated_by`) VALUES
	(20, 'tima', '$2y$10$HtV.pU8QMxV8ja24D7dV5uMQwbousvT4VW7r2flHJ9Fjr.6l9rSgW', 1, 1, '2018-03-08 22:44:00', '2018-03-09 09:53:57', 'root', 'root'),
	(21, 'root', '$2y$10$ihTu/fbECLvGkZR4bqIla.zyGCljlcdfwsDI5.JHJBTMQNZaEKip6', 1, 1, '2018-03-08 23:27:01', '2018-03-08 23:27:01', 'root', NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
