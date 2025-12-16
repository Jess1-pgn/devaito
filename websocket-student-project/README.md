# WebSocket Student Management Project

Un projet Java WebSocket pour gérer des étudiants en temps réel avec une base de données MySQL.

## 📋 Description

Ce projet implémente un système de gestion d'étudiants utilisant la technologie WebSocket pour des communications bidirectionnelles en temps réel entre le client et le serveur. Il permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur les données des étudiants.

## 🏗️ Architecture

Le projet est structuré en trois couches principales :

- **Couche DAO (Data Access Object)** : Gestion de l'accès à la base de données
  - `Student.java` : Modèle de données pour un étudiant
  - `IDao.java` : Interface définissant les opérations CRUD
  - `DaoImpl.java` : Implémentation concrète des opérations CRUD
  
- **Couche WebSocket** : Communication en temps réel
  - `StudentWebSocketServer.java` : Serveur WebSocket gérant les connexions et messages
  
- **Couche Client** : Interface utilisateur
  - `index.html` : Client web HTML/JavaScript pour interagir avec le serveur

## 🛠️ Technologies utilisées

- Java 8+
- Java WebSocket API (JSR 356)
- MySQL 8.0
- Gson (pour la sérialisation JSON)
- Maven (gestion des dépendances)
- Servlet API 3.1
- HTML5/CSS3/JavaScript

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- JDK 8 ou supérieur
- Apache Tomcat 8.5+ ou tout autre serveur compatible avec WebSocket
- MySQL 8.0+
- Maven 3.6+

## 🗄️ Configuration de la base de données

1. Créez une base de données MySQL :

```sql
CREATE DATABASE DB_SDDI_ESTEM;
USE DB_SDDI_ESTEM;
```

2. Créez la table STUDENTS :

```sql
CREATE TABLE STUDENTS (
    ID_STUDENT INT AUTO_INCREMENT PRIMARY KEY,
    FIRST_NAME_STUDENT VARCHAR(100) NOT NULL,
    LAST_NAME_STUDENT VARCHAR(100) NOT NULL,
    DATE_BIRTH_STUDENT DATE NOT NULL
);
```

3. Insérez des données de test (optionnel) :

```sql
INSERT INTO STUDENTS (FIRST_NAME_STUDENT, LAST_NAME_STUDENT, DATE_BIRTH_STUDENT) 
VALUES 
    ('Jean', 'Dupont', '1999-05-15'),
    ('Marie', 'Martin', '2000-08-22'),
    ('Pierre', 'Bernard', '1998-12-10');
```

4. Modifiez les paramètres de connexion dans `DaoImpl.java` si nécessaire :

```java
private final String s1 = "com.mysql.jdbc.Driver";
private final String s2 = "jdbc:mysql://localhost:3306/DB_SDDI_ESTEM?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
private final String s3 = "root";  // Votre nom d'utilisateur MySQL
private final String s4 = "";      // Votre mot de passe MySQL
```

## 🚀 Installation et déploiement

### Étape 1 : Cloner ou télécharger le projet

```bash
cd websocket-student-project
```

### Étape 2 : Compiler le projet avec Maven

```bash
mvn clean package
```

Cela génère un fichier WAR dans le dossier `target/`.

### Étape 3 : Déployer sur Tomcat

1. Copiez le fichier `target/websocket-student-project.war` dans le dossier `webapps` de votre installation Tomcat
2. Démarrez Tomcat :
   ```bash
   # Linux/Mac
   $CATALINA_HOME/bin/startup.sh
   
   # Windows
   %CATALINA_HOME%\bin\startup.bat
   ```

### Étape 4 : Accéder à l'application

Ouvrez votre navigateur et accédez à :
```
http://localhost:8080/websocket-student-project/
```

## 💻 Utilisation

### Interface Web

1. **Se connecter** : Cliquez sur le bouton "Se connecter" pour établir une connexion WebSocket
2. **Ajouter un étudiant** : Remplissez le formulaire et cliquez sur "Ajouter l'étudiant"
3. **Voir la liste** : Cliquez sur "Actualiser la liste" pour afficher tous les étudiants
4. **Supprimer un étudiant** : Cliquez sur le bouton "Supprimer" dans la ligne de l'étudiant

### API WebSocket

Le serveur WebSocket accepte des messages JSON avec les actions suivantes :

#### 1. Récupérer tous les étudiants
```json
{
    "action": "getAllStudents"
}
```

#### 2. Récupérer un étudiant par ID
```json
{
    "action": "getStudent",
    "id": 1
}
```

#### 3. Ajouter un étudiant
```json
{
    "action": "addStudent",
    "student": {
        "firstNameStudent": "John",
        "lastNameStudent": "Doe",
        "dateBirthStudent": "1999-05-15"
    }
}
```

#### 4. Mettre à jour un étudiant
```json
{
    "action": "updateStudent",
    "id": 1,
    "student": {
        "firstNameStudent": "John",
        "lastNameStudent": "Doe",
        "dateBirthStudent": "1999-05-15"
    }
}
```

#### 5. Supprimer un étudiant
```json
{
    "action": "deleteStudent",
    "id": 1
}
```

### Réponses du serveur

Le serveur renvoie des messages JSON dans les formats suivants :

#### Connexion établie
```json
{
    "type": "connection",
    "message": "Connected to Student WebSocket Server"
}
```

#### Liste des étudiants
```json
{
    "type": "students",
    "data": "[{\"idStudent\":1,\"firstNameStudent\":\"John\",\"lastNameStudent\":\"Doe\",\"dateBirthStudent\":\"1999-05-15\"}]"
}
```

#### Succès d'une opération
```json
{
    "type": "success",
    "message": "Student added successfully"
}
```

#### Erreur
```json
{
    "type": "error",
    "message": "Error message"
}
```

## 🧪 Tests

Pour tester la couche DAO sans WebSocket, exécutez la classe `TestDao` :

```bash
mvn exec:java -Dexec.mainClass="dao.TestDao"
```

## 📁 Structure du projet

```
websocket-student-project/
├── pom.xml
├── README.md
└── src/
    └── main/
        ├── java/
        │   ├── dao/
        │   │   ├── Student.java
        │   │   ├── IDao.java
        │   │   ├── DaoImpl.java
        │   │   └── TestDao.java
        │   └── websocket/
        │       └── StudentWebSocketServer.java
        ├── resources/
        └── webapp/
            ├── WEB-INF/
            │   └── web.xml
            └── index.html
```

## 🔧 Dépannage

### Problème de connexion WebSocket
- Vérifiez que Tomcat est bien démarré
- Assurez-vous que le port 8080 est disponible
- Vérifiez l'URL WebSocket dans `index.html`

### Problème de connexion à la base de données
- Vérifiez que MySQL est en cours d'exécution
- Vérifiez les identifiants de connexion dans `DaoImpl.java`
- Assurez-vous que la base de données et la table existent

### Erreur de compilation Maven
- Vérifiez que Java 8+ est installé : `java -version`
- Vérifiez que Maven est installé : `mvn -version`
- Nettoyez et recompilez : `mvn clean install`

## 📝 Notes importantes

- Le projet utilise le driver MySQL legacy (`com.mysql.jdbc.Driver`). Pour les versions récentes de MySQL, considérez l'utilisation de `com.mysql.cj.jdbc.Driver`
- Les connexions à la base de données sont créées à chaque requête. Pour un environnement de production, utilisez un pool de connexions (comme HikariCP ou C3P0)
- Les mots de passe de base de données ne doivent jamais être codés en dur dans le code source en production. Utilisez des fichiers de configuration externes ou des variables d'environnement

## 🎓 Contexte académique

Ce projet a été développé dans le cadre du cours SDDI 4 2025 sur les Web Services (REST & SOAP) et les WebSockets.

## 📄 Licence

Ce projet est développé à des fins éducatives.

## 👥 Auteur

Développé pour le cours SDDI 4 2025

---

**Bon développement ! 🚀**
