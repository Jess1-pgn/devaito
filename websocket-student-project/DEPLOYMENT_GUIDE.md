# Guide de Déploiement et Configuration
## WebSocket Student Management Project

Ce guide fournit des instructions détaillées pour configurer et déployer le projet.

---

## 📋 Table des matières

1. [Prérequis système](#prérequis-système)
2. [Installation de MySQL](#installation-de-mysql)
3. [Configuration de la base de données](#configuration-de-la-base-de-données)
4. [Installation d'Apache Tomcat](#installation-dapache-tomcat)
5. [Compilation du projet](#compilation-du-projet)
6. [Déploiement sur Tomcat](#déploiement-sur-tomcat)
7. [Test de l'application](#test-de-lapplication)
8. [Dépannage](#dépannage)

---

## 🖥️ Prérequis système

### Logiciels requis

- **Java Development Kit (JDK)**: version 8 ou supérieure
- **Apache Maven**: version 3.6 ou supérieure
- **MySQL Server**: version 8.0 ou supérieure
- **Apache Tomcat**: version 8.5 ou supérieure

### Vérification des installations

```bash
# Vérifier Java
java -version
javac -version

# Vérifier Maven
mvn -version

# Vérifier MySQL
mysql --version
```

---

## 🗄️ Installation de MySQL

### Windows

1. Téléchargez MySQL depuis [mysql.com](https://dev.mysql.com/downloads/installer/)
2. Exécutez l'installateur
3. Choisissez "Developer Default"
4. Suivez l'assistant d'installation
5. Configurez le mot de passe root

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
sudo mysql_secure_installation
```

### macOS

```bash
# Avec Homebrew
brew install mysql
brew services start mysql
mysql_secure_installation
```

---

## ⚙️ Configuration de la base de données

### Étape 1: Connexion à MySQL

```bash
# Connexion en tant que root
mysql -u root -p
```

### Étape 2: Exécution du script de configuration

Deux options possibles:

**Option A: Via la ligne de commande MySQL**

```bash
mysql -u root -p < database_setup.sql
```

**Option B: Depuis le client MySQL**

```sql
mysql> source /chemin/vers/database_setup.sql
```

**Option C: Manuellement**

```sql
-- 1. Créer la base de données
CREATE DATABASE DB_SDDI_ESTEM;
USE DB_SDDI_ESTEM;

-- 2. Créer la table
CREATE TABLE STUDENTS (
    ID_STUDENT INT AUTO_INCREMENT PRIMARY KEY,
    FIRST_NAME_STUDENT VARCHAR(100) NOT NULL,
    LAST_NAME_STUDENT VARCHAR(100) NOT NULL,
    DATE_BIRTH_STUDENT DATE NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Insérer des données de test
INSERT INTO STUDENTS (FIRST_NAME_STUDENT, LAST_NAME_STUDENT, DATE_BIRTH_STUDENT) 
VALUES
    ('Jean', 'Dupont', '1999-05-15'),
    ('Marie', 'Martin', '2000-08-22'),
    ('Pierre', 'Bernard', '1998-12-10');

-- 4. Vérifier
SELECT * FROM STUDENTS;
```

### Étape 3: Configuration des identifiants

Modifiez le fichier `src/main/java/dao/DaoImpl.java` selon vos identifiants MySQL:

```java
private final String s3 = "root";      // Votre nom d'utilisateur
private final String s4 = "votreMotDePasse";  // Votre mot de passe
```

**Note de sécurité**: En production, utilisez le fichier `database.properties` plutôt que de coder en dur les identifiants.

---

## 🚀 Installation d'Apache Tomcat

### Windows

1. Téléchargez Tomcat depuis [tomcat.apache.org](https://tomcat.apache.org/download-90.cgi)
2. Extrayez l'archive dans `C:\Program Files\Apache Tomcat 9.0`
3. Définissez la variable d'environnement `CATALINA_HOME`:
   ```
   CATALINA_HOME=C:\Program Files\Apache Tomcat 9.0
   ```

### Linux/macOS

```bash
# Télécharger Tomcat
cd /opt
sudo wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.82/bin/apache-tomcat-9.0.82.tar.gz

# Extraire
sudo tar xzvf apache-tomcat-9.0.82.tar.gz
sudo mv apache-tomcat-9.0.82 tomcat

# Définir CATALINA_HOME
echo 'export CATALINA_HOME=/opt/tomcat' >> ~/.bashrc
source ~/.bashrc

# Rendre les scripts exécutables
sudo chmod +x /opt/tomcat/bin/*.sh
```

---

## 🔨 Compilation du projet

### Étape 1: Naviguer vers le répertoire du projet

```bash
cd websocket-student-project
```

### Étape 2: Nettoyer et compiler

```bash
# Nettoyer les anciens builds
mvn clean

# Compiler le projet
mvn compile

# Créer le package WAR
mvn package
```

Le fichier WAR sera créé dans: `target/websocket-student-project.war`

### Vérification

Si la compilation réussit, vous devriez voir:

```
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

---

## 📦 Déploiement sur Tomcat

### Méthode 1: Déploiement automatique

```bash
# Copier le fichier WAR dans le répertoire webapps de Tomcat
cp target/websocket-student-project.war $CATALINA_HOME/webapps/

# Démarrer Tomcat
$CATALINA_HOME/bin/startup.sh  # Linux/macOS
%CATALINA_HOME%\bin\startup.bat  # Windows
```

Tomcat déploiera automatiquement le fichier WAR.

### Méthode 2: Déploiement via Tomcat Manager

1. Accédez à `http://localhost:8080/manager/html`
2. Connectez-vous avec vos identifiants Tomcat
3. Dans la section "WAR file to deploy", cliquez sur "Choisir un fichier"
4. Sélectionnez `target/websocket-student-project.war`
5. Cliquez sur "Deploy"

### Méthode 3: Déploiement manuel

1. Extrayez le contenu du WAR:
   ```bash
   cd $CATALINA_HOME/webapps
   mkdir websocket-student-project
   cd websocket-student-project
   jar -xvf /chemin/vers/websocket-student-project.war
   ```

2. Redémarrez Tomcat:
   ```bash
   $CATALINA_HOME/bin/shutdown.sh
   $CATALINA_HOME/bin/startup.sh
   ```

### Vérification du déploiement

Consultez les logs de Tomcat:

```bash
tail -f $CATALINA_HOME/logs/catalina.out
```

Vous devriez voir des messages indiquant que l'application a été déployée avec succès.

---

## ✅ Test de l'application

### Étape 1: Accéder à l'application

Ouvrez votre navigateur et accédez à:

```
http://localhost:8080/websocket-student-project/
```

### Étape 2: Tester la connexion WebSocket

1. Cliquez sur "Se connecter"
2. Vérifiez que le statut passe à "Connecté" (fond vert)
3. Consultez les messages WebSocket en bas de page

### Étape 3: Tester les fonctionnalités CRUD

**Lister les étudiants:**
1. Cliquez sur "Actualiser la liste"
2. La table devrait afficher les étudiants de la base de données

**Ajouter un étudiant:**
1. Remplissez le formulaire (Prénom, Nom, Date de naissance)
2. Cliquez sur "Ajouter l'étudiant"
3. Vérifiez que l'étudiant apparaît dans la liste

**Supprimer un étudiant:**
1. Cliquez sur "Supprimer" dans la ligne d'un étudiant
2. Confirmez la suppression
3. Vérifiez que l'étudiant a été supprimé

### Tests avec un client WebSocket externe

Vous pouvez également tester avec un client WebSocket comme [Postman](https://www.postman.com/) ou [websocat](https://github.com/vi/websocat):

```bash
# Exemple avec websocat
websocat ws://localhost:8080/websocket-student-project/studentWebSocket

# Envoyer un message
{"action":"getAllStudents"}
```

---

## 🔧 Dépannage

### Problème 1: Tomcat ne démarre pas

**Symptômes**: Impossible d'accéder à `http://localhost:8080`

**Solutions**:
1. Vérifiez que le port 8080 n'est pas déjà utilisé:
   ```bash
   # Linux/macOS
   lsof -i :8080
   
   # Windows
   netstat -ano | findstr :8080
   ```

2. Vérifiez les logs Tomcat:
   ```bash
   cat $CATALINA_HOME/logs/catalina.out
   ```

3. Changez le port dans `$CATALINA_HOME/conf/server.xml`:
   ```xml
   <Connector port="8081" protocol="HTTP/1.1" ... />
   ```

### Problème 2: Erreur de connexion à MySQL

**Symptômes**: Messages d'erreur liés à la base de données dans les logs

**Solutions**:
1. Vérifiez que MySQL est démarré:
   ```bash
   sudo systemctl status mysql
   ```

2. Testez la connexion manuellement:
   ```bash
   mysql -u root -p DB_SDDI_ESTEM
   ```

3. Vérifiez les identifiants dans `DaoImpl.java`

4. Assurez-vous que le driver MySQL est dans le classpath (Maven le gère automatiquement)

### Problème 3: WebSocket ne se connecte pas

**Symptômes**: Le bouton "Se connecter" ne fonctionne pas, erreur dans la console du navigateur

**Solutions**:
1. Vérifiez l'URL WebSocket dans `index.html`:
   ```javascript
   const wsUrl = "ws://localhost:8080/websocket-student-project/studentWebSocket";
   ```

2. Vérifiez que votre navigateur supporte WebSocket (tous les navigateurs modernes le supportent)

3. Consultez les logs Tomcat pour les erreurs WebSocket

4. Vérifiez les règles de pare-feu

### Problème 4: Erreur 404 - Application non trouvée

**Symptômes**: "HTTP Status 404 – Not Found"

**Solutions**:
1. Vérifiez que le WAR est bien déployé:
   ```bash
   ls $CATALINA_HOME/webapps/
   ```

2. Attendez quelques secondes que Tomcat déploie le WAR

3. Redémarrez Tomcat:
   ```bash
   $CATALINA_HOME/bin/shutdown.sh
   $CATALINA_HOME/bin/startup.sh
   ```

### Problème 5: Erreur de compilation Maven

**Symptômes**: "BUILD FAILURE" lors de `mvn compile`

**Solutions**:
1. Nettoyez le projet:
   ```bash
   mvn clean
   ```

2. Mettez à jour les dépendances:
   ```bash
   mvn dependency:resolve
   ```

3. Vérifiez votre connexion Internet (Maven télécharge les dépendances)

4. Supprimez le cache Maven local si nécessaire:
   ```bash
   rm -rf ~/.m2/repository
   ```

---

## 📞 Support

Pour obtenir de l'aide supplémentaire:

- Consultez la documentation Tomcat: [tomcat.apache.org/tomcat-9.0-doc/](https://tomcat.apache.org/tomcat-9.0-doc/)
- Documentation MySQL: [dev.mysql.com/doc/](https://dev.mysql.com/doc/)
- Documentation Maven: [maven.apache.org/guides/](https://maven.apache.org/guides/)

---

## 📝 Checklist de déploiement

- [ ] JDK installé et configuré
- [ ] Maven installé
- [ ] MySQL installé et démarré
- [ ] Base de données créée et configurée
- [ ] Tomcat installé
- [ ] Identifiants MySQL configurés dans le code
- [ ] Projet compilé avec Maven
- [ ] WAR déployé sur Tomcat
- [ ] Tomcat démarré
- [ ] Application accessible via navigateur
- [ ] WebSocket se connecte correctement
- [ ] Opérations CRUD fonctionnent

---

**Bon déploiement ! 🚀**
