-- Database creation
CREATE DATABASE IF NOT EXISTS devaito_training CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE devaito_training;

-- Users table (admin, formateur, assistant)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'formateur', 'assistant') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Formateurs table (trainers with keywords and remarks)
CREATE TABLE IF NOT EXISTS formateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telephone VARCHAR(20),
  competences TEXT,
  remarques TEXT,
  statut ENUM('interne', 'externe', 'en_attente') DEFAULT 'interne',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_email (email),
  INDEX idx_statut (statut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Formations table (training courses)
CREATE TABLE IF NOT EXISTS formations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  categorie VARCHAR(100),
  nombre_heures INT NOT NULL,
  cout DECIMAL(10, 2) NOT NULL,
  objectifs TEXT,
  programme TEXT,
  type_public ENUM('entreprise', 'individuel', 'mixte') DEFAULT 'mixte',
  ville VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_categorie (categorie),
  INDEX idx_ville (ville),
  INDEX idx_type_public (type_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Entreprises table (companies)
CREATE TABLE IF NOT EXISTS entreprises (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  adresse TEXT,
  telephone VARCHAR(20),
  email VARCHAR(255),
  url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_nom (nom)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sessions de formation (training sessions/schedules)
CREATE TABLE IF NOT EXISTS sessions_formation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  formation_id INT NOT NULL,
  formateur_id INT,
  entreprise_id INT,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  statut ENUM('planifie', 'en_cours', 'termine', 'annule') DEFAULT 'planifie',
  type_session ENUM('entreprise', 'individuel') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE,
  FOREIGN KEY (formateur_id) REFERENCES formateurs(id) ON DELETE SET NULL,
  FOREIGN KEY (entreprise_id) REFERENCES entreprises(id) ON DELETE SET NULL,
  INDEX idx_formation (formation_id),
  INDEX idx_formateur (formateur_id),
  INDEX idx_entreprise (entreprise_id),
  INDEX idx_dates (date_debut, date_fin),
  INDEX idx_statut (statut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Participants individuels (individual participants)
CREATE TABLE IF NOT EXISTS participants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  date_naissance DATE,
  ville VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_nom_prenom (nom, prenom)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inscriptions (registrations linking participants to sessions)
CREATE TABLE IF NOT EXISTS inscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  participant_id INT NOT NULL,
  session_id INT NOT NULL,
  statut ENUM('en_attente', 'confirme', 'annule') DEFAULT 'en_attente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
  FOREIGN KEY (session_id) REFERENCES sessions_formation(id) ON DELETE CASCADE,
  INDEX idx_participant (participant_id),
  INDEX idx_session (session_id),
  INDEX idx_statut (statut),
  UNIQUE KEY unique_inscription (participant_id, session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Evaluations (training evaluations from participants)
CREATE TABLE IF NOT EXISTS evaluations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  participant_id INT NOT NULL,
  formateur_id INT NOT NULL,
  note_pedagogie INT CHECK (note_pedagogie BETWEEN 1 AND 5),
  note_rythme INT CHECK (note_rythme BETWEEN 1 AND 5),
  note_support INT CHECK (note_support BETWEEN 1 AND 5),
  note_maitrise INT CHECK (note_maitrise BETWEEN 1 AND 5),
  commentaires TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions_formation(id) ON DELETE CASCADE,
  FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
  FOREIGN KEY (formateur_id) REFERENCES formateurs(id) ON DELETE CASCADE,
  INDEX idx_session (session_id),
  INDEX idx_participant (participant_id),
  INDEX idx_formateur (formateur_id),
  UNIQUE KEY unique_evaluation (session_id, participant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default admin user (password: admin123)
INSERT INTO users (email, password, role) 
VALUES ('admin@devaito.com', '$2a$10$8K1p/a0dL3.1G8L8B7VYjOKhJW1Y0nZ7QvhDn0Q5HX7cXm0WZXhVC', 'admin')
ON DUPLICATE KEY UPDATE email=email;
