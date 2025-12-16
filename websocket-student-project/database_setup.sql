-- Script de création de la base de données pour le projet WebSocket Student Management
-- Auteur: SDDI 4 2025
-- Date: 2024

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS DB_SDDI_ESTEM;
USE DB_SDDI_ESTEM;

-- Suppression de la table si elle existe déjà
DROP TABLE IF EXISTS STUDENTS;

-- Création de la table STUDENTS
CREATE TABLE STUDENTS (
    ID_STUDENT INT AUTO_INCREMENT PRIMARY KEY,
    FIRST_NAME_STUDENT VARCHAR(100) NOT NULL,
    LAST_NAME_STUDENT VARCHAR(100) NOT NULL,
    DATE_BIRTH_STUDENT DATE NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion de données de test
INSERT INTO STUDENTS (FIRST_NAME_STUDENT, LAST_NAME_STUDENT, DATE_BIRTH_STUDENT) VALUES
    ('Jean', 'Dupont', '1999-05-15'),
    ('Marie', 'Martin', '2000-08-22'),
    ('Pierre', 'Bernard', '1998-12-10'),
    ('Sophie', 'Dubois', '2001-03-07'),
    ('Lucas', 'Thomas', '1999-11-30');

-- Vérification des données insérées
SELECT * FROM STUDENTS;

-- Affichage du nombre d'étudiants
SELECT COUNT(*) AS total_students FROM STUDENTS;
