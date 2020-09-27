-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: protect_my_community
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ranking_list`
--

DROP TABLE IF EXISTS `ranking_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranking_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listName` varchar(45) DEFAULT NULL,
  `playerName` varchar(45) DEFAULT NULL,
  `passTime` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `passTimeString` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking_list`
--

LOCK TABLES `ranking_list` WRITE;
/*!40000 ALTER TABLE `ranking_list` DISABLE KEYS */;
INSERT INTO `ranking_list` VALUES (11,'CET4','qiumengke',100,200,'2020-05-21 09:20:34','1 min 40 seconds'),(12,'CET4','tony',99,230,'2020-05-21 09:20:34','1 min 39 seconds'),(13,'CET4','mike',70,90,'2020-05-21 09:20:34','1 min 10 seconds'),(14,'CET4','juicy',60,100,'2020-05-21 09:20:34','1 min 0 seconds'),(15,'CET6','qiumengke',100,200,'2020-05-21 09:20:34','1 min 40 seconds'),(16,'CET6','juicy',60,100,'2020-05-21 09:20:34','1 min 0 seconds'),(17,'CET4','Tian hao',40,30,'2020-05-21 09:20:34','0 min 40 seconds'),(18,'CET4','qiumengke',110,300,'2020-05-21 09:20:34','1 min 50 seconds'),(24,'CET4','Jack Ma',100,190,'2020-05-25 22:47:40','1 minutes,40 seconds'),(25,'CET6','Tester :D',46,70,'2020-06-02 03:48:24','0 minutes,46 seconds');
/*!40000 ALTER TABLE `ranking_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_vocabulary`
--

DROP TABLE IF EXISTS `word_vocabulary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_vocabulary` (
  `wordListName` varchar(45) DEFAULT NULL,
  `word` varchar(45) NOT NULL,
  `hword` varchar(45) DEFAULT NULL,
  `wid` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`wid`),
  UNIQUE KEY `wid_UNIQUE` (`wid`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_vocabulary`
--

LOCK TABLES `word_vocabulary` WRITE;
/*!40000 ALTER TABLE `word_vocabulary` DISABLE KEYS */;
INSERT INTO `word_vocabulary` VALUES ('CET4','captives','cap-tives',1),('CET4','leader','lead-er',2),('CET4','rejoice','re-joice',3),('CET4','survival','sur-vi-val',4),('CET4','universal','u-ni-ver-sal',5),('CET4','programme','pro-gramme',23),('CET4','delay','de-lay',25),('CET4','permission','per-mi-ssion',30),('CET4','	armament','	ar-ma-ment',31),('CET4','injustice','in-jus-tice',32),('CET4','	beloved','	be-lo-ved',34),('CET4','legacy','le-ga-cy',35),('CET6','victories','vic-to-ries',36),('CET6','fortunate','for-tu-nate',37),('CET6','countrymen','coun-try-men',38),('CET6','rejoice','re-joice',41),('Sample','rejoice','re-joice',43),('Sample','censure','cen-sure',44),('Sample','interred','in-terred',45),('Sample','delay','de-lay',46),('Sample','dectate','dec-tate',47),('Sample','instead','in-stead',48),('Sample','senate','se-nate',49),('Sample','devil','de-vil',50),('Sample','suspect','sus-pect',51),('Sample','	deepest','	deep-est',52),('Sample','purpose','pur-pose',53),('Sample','	vanquish','	van-quish',54),('Sample','dormant','dor-mant',55),('Sample','beautiful','beau-ti-ful',56),('Sample','intention	','in-ten-tion',57),('Sample','lupercal','lu-per-cal',58),('Sample','testament','tes-ta-ment',59),('Sample','unkindly','un-kind-ly',60),('Sample','beloved','be-lo-ved',61),('Sample','victories','vic-to-ries',62),('Sample','benefit','be-ne-fit',63),('Sample','element','e-le-ment',64),('Sample','experiment','ex-peri-ment',65);
/*!40000 ALTER TABLE `word_vocabulary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wordlist_name`
--

DROP TABLE IF EXISTS `wordlist_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wordlist_name` (
  `wname` varchar(45) NOT NULL,
  `wauthor` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`wname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wordlist_name`
--

LOCK TABLES `wordlist_name` WRITE;
/*!40000 ALTER TABLE `wordlist_name` DISABLE KEYS */;
INSERT INTO `wordlist_name` VALUES ('CET4','TONY'),('CET6','Qiu Mengke'),('Sample','Sample');
/*!40000 ALTER TABLE `wordlist_name` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-11 21:17:07
