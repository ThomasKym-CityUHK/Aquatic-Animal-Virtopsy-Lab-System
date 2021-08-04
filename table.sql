-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-07-16 05:30:22
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `fyp_0`
--

-- --------------------------------------------------------

--
-- 資料表結構 `blubber`
--

CREATE TABLE `blubber` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mA1` decimal(4,1) DEFAULT NULL,
  `mA2` decimal(4,1) DEFAULT NULL,
  `mA3` decimal(4,1) DEFAULT NULL,
  `mB1` decimal(4,1) DEFAULT NULL,
  `mB2` decimal(4,1) DEFAULT NULL,
  `mB3` decimal(4,1) DEFAULT NULL,
  `mC1` decimal(4,1) DEFAULT NULL,
  `mC2` decimal(4,1) DEFAULT NULL,
  `mC3` decimal(4,1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `boatgps`
--

CREATE TABLE `boatgps` (
  `date` date NOT NULL,
  `time` time NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `boatrecord`
--

CREATE TABLE `boatrecord` (
  `date` date NOT NULL,
  `vessel` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surveyors` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wind` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seaState` int(11) NOT NULL,
  `species` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `starTime` time NOT NULL,
  `endTime` time NOT NULL,
  `starPosition` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endPosition` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `a` int(11) NOT NULL,
  `s` int(11) NOT NULL,
  `j` int(11) NOT NULL,
  `c` int(11) NOT NULL,
  `u` int(11) NOT NULL,
  `behaviours` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `association` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `caseconclusion`
--

CREATE TABLE `caseconclusion` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comments` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `COD` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CODVerified` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `circulatory`
--

CREATE TABLE `circulatory` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pericardial` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `heart` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `endocrine`
--

CREATE TABLE `endocrine` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adreGlands` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brain` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pituGland` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `external`
--

CREATE TABLE `external` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oBodyScore` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cBodyScore` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wounds` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lesions` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parasites` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nostrils` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `oralCavity` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tongue` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eyes` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ears` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mammary` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anus` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `files`
--

CREATE TABLE `files` (
  `fileID` int(11) NOT NULL,
  `sid` varchar(20) NOT NULL,
  `uid` varchar(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `path` varchar(500) NOT NULL,
  `class` varchar(100) NOT NULL,
  `category` varchar(300) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `type` varchar(200) NOT NULL,
  `size` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `flipper`
--

CREATE TABLE `flipper` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `m29` decimal(4,1) DEFAULT NULL,
  `m30` decimal(4,1) DEFAULT NULL,
  `m31` decimal(4,1) DEFAULT NULL,
  `m32` decimal(4,1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `fluke`
--

CREATE TABLE `fluke` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `m33` decimal(4,1) DEFAULT NULL,
  `m34` decimal(4,1) DEFAULT NULL,
  `m35` decimal(4,1) DEFAULT NULL,
  `m36` decimal(4,1) DEFAULT NULL,
  `m37` decimal(4,1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `gastrointestinal`
--

CREATE TABLE `gastrointestinal` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `esophagus` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stomach` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foreStomach` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fundStomach` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pyloStomach` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `intestines` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `liver` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pancreas` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `girth`
--

CREATE TABLE `girth` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `m17` decimal(4,1) DEFAULT NULL,
  `m18` decimal(4,1) DEFAULT NULL,
  `m19` decimal(4,1) DEFAULT NULL,
  `m20` decimal(4,1) DEFAULT NULL,
  `m21` decimal(4,1) DEFAULT NULL,
  `m22m` decimal(4,1) DEFAULT NULL,
  `m22f` decimal(4,1) DEFAULT NULL,
  `m23` decimal(4,1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `head`
--

CREATE TABLE `head` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `m24` decimal(4,1) DEFAULT NULL,
  `m25` decimal(4,1) DEFAULT NULL,
  `m26` decimal(4,1) DEFAULT NULL,
  `m27` decimal(4,1) DEFAULT NULL,
  `m28` decimal(4,1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `logs`
--

CREATE TABLE `logs` (
  `logid` int(11) NOT NULL,
  `uid` varchar(11) NOT NULL,
  `content` text NOT NULL,
  `creatTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `lymphatic`
--

CREATE TABLE `lymphatic` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `spleen` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lympNodes` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `morphometric`
--

CREATE TABLE `morphometric` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `m1` decimal(4,1) DEFAULT NULL,
  `m2` decimal(4,1) DEFAULT NULL,
  `m2b` decimal(4,1) DEFAULT NULL,
  `m3` decimal(4,1) DEFAULT NULL,
  `m3b` decimal(4,1) DEFAULT NULL,
  `m4` decimal(4,1) DEFAULT NULL,
  `m5` decimal(4,1) DEFAULT NULL,
  `m6` decimal(4,1) DEFAULT NULL,
  `m7` decimal(4,1) DEFAULT NULL,
  `m8` decimal(4,1) DEFAULT NULL,
  `m9` decimal(4,1) DEFAULT NULL,
  `m10m` decimal(4,1) DEFAULT NULL,
  `m10f` decimal(4,1) DEFAULT NULL,
  `m11` decimal(4,1) DEFAULT NULL,
  `m12` decimal(4,1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `musculo`
--

CREATE TABLE `musculo` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blubber` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `muscle` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `necropsyothers`
--

CREATE TABLE `necropsyothers` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thorCavity` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `periCavity` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thyroid` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parathyroid` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thymus` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sample` varchar(4000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `necropsyrecord`
--

CREATE TABLE `necropsyrecord` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ageClass` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `necrDate` date DEFAULT NULL,
  `COD` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personnel` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `length` decimal(4,1) DEFAULT NULL,
  `weight` decimal(4,1) DEFAULT NULL,
  `comments` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `other`
--

CREATE TABLE `other` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mUL` decimal(4,1) DEFAULT NULL,
  `mLL` decimal(4,1) DEFAULT NULL,
  `mUR` decimal(4,1) DEFAULT NULL,
  `mLR` decimal(4,1) DEFAULT NULL,
  `mLMSL` decimal(4,1) DEFAULT NULL,
  `mLMSR` decimal(4,1) DEFAULT NULL,
  `m13` decimal(4,1) DEFAULT NULL,
  `mIWD` decimal(4,1) DEFAULT NULL,
  `mD` decimal(4,1) DEFAULT NULL,
  `mLOO` decimal(4,1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `pulmonary`
--

CREATE TABLE `pulmonary` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trachea` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lungs` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rLung` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lLung` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pharTonsils` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glottis` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `recourse`
--

CREATE TABLE `recourse` (
  `rid` int(10) UNSIGNED NOT NULL,
  `uid` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `latiDegree` int(11) DEFAULT NULL,
  `latiMinute` int(11) DEFAULT NULL,
  `latiSecond` decimal(3,1) DEFAULT NULL,
  `latiDirection` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longDegree` int(11) DEFAULT NULL,
  `longMinute` int(11) DEFAULT NULL,
  `longSecond` decimal(3,1) DEFAULT NULL,
  `longDirection` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(2000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `ridge`
--

CREATE TABLE `ridge` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `m14` decimal(4,1) DEFAULT NULL,
  `m14b` decimal(4,1) DEFAULT NULL,
  `m15` decimal(4,1) DEFAULT NULL,
  `m16` decimal(4,1) DEFAULT NULL,
  `m16b` decimal(4,1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `strandingreport`
--

CREATE TABLE `strandingreport` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uid` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastUpdaUid` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `species` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specSpecific` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `straDate` date NOT NULL,
  `straTime` time DEFAULT NULL,
  `latiDegree` int(11) DEFAULT NULL,
  `latiMinute` int(11) DEFAULT NULL,
  `latiSecond` decimal(3,1) DEFAULT NULL,
  `latiDirection` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longDegree` int(11) DEFAULT NULL,
  `longMinute` int(11) DEFAULT NULL,
  `longSecond` decimal(3,1) DEFAULT NULL,
  `longDirection` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ageClass` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `length` decimal(5,1) DEFAULT NULL,
  `weight` decimal(4,1) DEFAULT NULL,
  `personnel` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comments` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `frozen` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `windDirection` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `windSpeed` decimal(4,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `urinary`
--

CREATE TABLE `urinary` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kidneys` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rKidneys` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lKidneys` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bladder` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `testes` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rTestes` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lTestes` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `penis` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skeletal` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vertebrae` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `joints` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `userconfig`
--

CREATE TABLE `userconfig` (
  `ucID` int(11) NOT NULL,
  `uid` varchar(11) NOT NULL,
  `config` mediumtext NOT NULL,
  `createTime` datetime NOT NULL,
  `lastEditTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `uid` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userlevel` int(5) NOT NULL DEFAULT 0,
  `token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `phonNumber` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `virtopsy`
--

CREATE TABLE `virtopsy` (
  `sid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `scanDate` date DEFAULT NULL,
  `scanTime` time DEFAULT NULL,
  `COD` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personnel` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modaUsed` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comments` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dicomPath` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `blubber`
--
ALTER TABLE `blubber`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `caseconclusion`
--
ALTER TABLE `caseconclusion`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `circulatory`
--
ALTER TABLE `circulatory`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `endocrine`
--
ALTER TABLE `endocrine`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `external`
--
ALTER TABLE `external`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`fileID`);

--
-- 資料表索引 `flipper`
--
ALTER TABLE `flipper`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `fluke`
--
ALTER TABLE `fluke`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `gastrointestinal`
--
ALTER TABLE `gastrointestinal`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `girth`
--
ALTER TABLE `girth`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `head`
--
ALTER TABLE `head`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`logid`);

--
-- 資料表索引 `lymphatic`
--
ALTER TABLE `lymphatic`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `morphometric`
--
ALTER TABLE `morphometric`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `musculo`
--
ALTER TABLE `musculo`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `necropsyothers`
--
ALTER TABLE `necropsyothers`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `necropsyrecord`
--
ALTER TABLE `necropsyrecord`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `other`
--
ALTER TABLE `other`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `pulmonary`
--
ALTER TABLE `pulmonary`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `recourse`
--
ALTER TABLE `recourse`
  ADD PRIMARY KEY (`rid`);

--
-- 資料表索引 `ridge`
--
ALTER TABLE `ridge`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `strandingreport`
--
ALTER TABLE `strandingreport`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `urinary`
--
ALTER TABLE `urinary`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `userconfig`
--
ALTER TABLE `userconfig`
  ADD PRIMARY KEY (`ucID`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- 資料表索引 `virtopsy`
--
ALTER TABLE `virtopsy`
  ADD PRIMARY KEY (`sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `files`
--
ALTER TABLE `files`
  MODIFY `fileID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `logs`
--
ALTER TABLE `logs`
  MODIFY `logid` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `recourse`
--
ALTER TABLE `recourse`
  MODIFY `rid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `userconfig`
--
ALTER TABLE `userconfig`
  MODIFY `ucID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `strandingreport`
--
ALTER TABLE `strandingreport`
  ADD CONSTRAINT `strandingreport_uid_foreign` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
