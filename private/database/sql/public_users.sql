-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: public
-- ------------------------------------------------------
-- Server version	5.7.12-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `idusers` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL,
  `permission` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 normal\n\n1 other \n\n2 admin',
  `token` varchar(200) NOT NULL,
  `avatar` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `idusers_UNIQUE` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='table for storing user information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'123@123.com','Ricardo Reis','123456','0','',0),(4,'123@gmail.com','Francisco','y9NYrKijNmIcim4u2OuiXg==','0','',0),(6,'Xico@gmail.com','XicoMane','��!�7%�m����~��','0','',0),(8,'zecas@gmail.com','XicoMane','��!�7%�m����~��','0','',0),(10,'sasa@gmail.com','olaaa','��!�7%�m����~��','0','',0),(11,'terere@gmail.com','olaaa','��!�7%�m����~��','0','',0),(13,'aaaaa@gmail.com','olaaa','��!�7%�m����~��','0','',0),(14,'bb@gmail.com','LEL','f������TU�<ߖ','0','',0),(15,'Francis@gmail.com','Francis','N�⡥2�I��a9�','0','',0),(16,'try3333@gmail.com','trye90000','N�⡥2�I��a9�','0','',0),(17,'teste9000@gmail.com','trye90000','25f9e794323b453885f5181f1b624d0b','0','',0),(18,'asdasdasdas@gmail.com','trye90000','d3e835d7a1f116e1325172aeeaf98ff9','0','',0),(20,'to@gmail.com','to','dbd29db27f5c5bd1d81104c64b1de112','0','',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-28 16:48:41
