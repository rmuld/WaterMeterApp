-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema WaterMeter
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `watermeter` ;
USE `watermeter` ;

-- -----------------------------------------------------
-- Table `WaterMeter`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `watermeter`.`Roles` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` ENUM('Admin', 'User', 'Client') NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WaterMeter`.`Addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `watermeter`.`Addresses` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `postalCode` INT NOT NULL,
  `houseNumber` VARCHAR(45) NOT NULL,
  `apartmentNumber` VARCHAR(45) NULL,
  `streetName` VARCHAR(45) NOT NULL,
  `municipality` VARCHAR(45) NOT NULL,
  `county` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WaterMeter`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `watermeter`.`Users` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `personalNumber` VARCHAR(45) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `password` VARCHAR(120) NOT NULL,
  `creationTime` DATETIME NOT NULL,
  `userRoleID` INT NOT NULL,
  `userAddressID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `roleID_idx` (`userRoleID` ASC) VISIBLE,
  INDEX `addressID_idx` (`userAddressID` ASC) VISIBLE,
  CONSTRAINT `userRoleID`
    FOREIGN KEY (`userRoleID`)
    REFERENCES `watermeter`.`Roles` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userAddressID`
    FOREIGN KEY (`userAddressID`)
    REFERENCES `watermeter`.`Addresses` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WaterMeter`.`WaterMeterTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `watermeter`.`WaterMeterTypes` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` ENUM('peakraan', 'kastmiskraan') NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WaterMeter`.`WaterMeters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `watermeter`.`WaterMeters` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `number` INT NOT NULL,
  `checkingDate` DATETIME NULL,
  `creationTime` DATETIME NOT NULL,
  `sealNumber` BIGINT NOT NULL,
  `wmAddressID` INT NOT NULL,
  `wmTypeID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `addressID_idx` (`wmAddressID` ASC) VISIBLE,
  INDEX `typeID_idx` (`wmTypeID` ASC) VISIBLE,
  CONSTRAINT `wmAddressID`
    FOREIGN KEY (`wmAddressID`)
    REFERENCES `watermeter`.`Addresses` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `wmTypeID`
    FOREIGN KEY (`wmTypeID`)
    REFERENCES `watermeter`.`WaterMeterTypes` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WaterMeter`.`UsersRoles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `watermeter`.`UsersRoles` (
  `urUserID` INT NOT NULL,
  `urRoleID` INT NOT NULL,
  INDEX `userID_idx` (`urUserID` ASC) VISIBLE,
  INDEX `roleID_idx` (`urRoleID` ASC) VISIBLE,
  PRIMARY KEY (`urRoleID`, `urUserID`),
  CONSTRAINT `urUserID`
    FOREIGN KEY (`urUserID`)
    REFERENCES `watermeter`.`Users` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `urRoleID`
    FOREIGN KEY (`urRoleID`)
    REFERENCES `watermeter`.`Roles` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WaterMeter`.`WaterUsage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `watermeter`.`WaterUsage` (
  `ID` INT NOT NULL,
  `amount` INT NOT NULL,
  `creationTime` DATETIME NOT NULL,
  `waterMeterID` INT NOT NULL,
  `consumptionTime` DATE NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `waterMeterID_idx` (`waterMeterID` ASC) VISIBLE,
  CONSTRAINT `waterMeterID`
    FOREIGN KEY (`waterMeterID`)
    REFERENCES `watermeter`.`WaterMeters` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
