/**
 * Exemples d'utilisation du WebSocket Student Management API
 * 
 * Ce fichier contient des exemples de code JavaScript pour interagir
 * avec le serveur WebSocket de gestion des étudiants.
 */

// =============================================================================
// Configuration
// =============================================================================

const WEBSOCKET_URL = "ws://localhost:8080/websocket-student-project/studentWebSocket";

// =============================================================================
// Classe WebSocket Client pour la gestion des étudiants
// =============================================================================

class StudentWebSocketClient {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.listeners = {
            onConnect: [],
            onDisconnect: [],
            onMessage: [],
            onError: []
        };
    }

    /**
     * Connexion au serveur WebSocket
     */
    connect() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.onopen = (event) => {
                console.log("✅ Connecté au serveur WebSocket");
                this.listeners.onConnect.forEach(callback => callback(event));
                resolve(event);
            };

            this.ws.onmessage = (event) => {
                console.log("📨 Message reçu:", event.data);
                const data = JSON.parse(event.data);
                this.listeners.onMessage.forEach(callback => callback(data));
            };

            this.ws.onerror = (error) => {
                console.error("❌ Erreur WebSocket:", error);
                this.listeners.onError.forEach(callback => callback(error));
                reject(error);
            };

            this.ws.onclose = (event) => {
                console.log("🔌 Connexion fermée");
                this.listeners.onDisconnect.forEach(callback => callback(event));
            };
        });
    }

    /**
     * Déconnexion du serveur
     */
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    /**
     * Envoyer un message au serveur
     */
    send(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
            console.log("📤 Message envoyé:", message);
        } else {
            console.error("❌ WebSocket non connecté");
        }
    }

    /**
     * Ajouter un listener pour un événement
     */
    on(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    }

    // =========================================================================
    // Méthodes API pour la gestion des étudiants
    // =========================================================================

    /**
     * Récupérer tous les étudiants
     */
    getAllStudents() {
        this.send({ action: "getAllStudents" });
    }

    /**
     * Récupérer un étudiant par son ID
     */
    getStudentById(id) {
        this.send({ 
            action: "getStudent", 
            id: id 
        });
    }

    /**
     * Ajouter un nouvel étudiant
     */
    addStudent(firstName, lastName, birthDate) {
        this.send({
            action: "addStudent",
            student: {
                firstNameStudent: firstName,
                lastNameStudent: lastName,
                dateBirthStudent: birthDate
            }
        });
    }

    /**
     * Mettre à jour un étudiant existant
     */
    updateStudent(id, firstName, lastName, birthDate) {
        this.send({
            action: "updateStudent",
            id: id,
            student: {
                firstNameStudent: firstName,
                lastNameStudent: lastName,
                dateBirthStudent: birthDate
            }
        });
    }

    /**
     * Supprimer un étudiant
     */
    deleteStudent(id) {
        this.send({
            action: "deleteStudent",
            id: id
        });
    }
}

// =============================================================================
// Exemples d'utilisation
// =============================================================================

/**
 * Exemple 1: Connexion simple et récupération des étudiants
 */
async function example1() {
    console.log("\n=== Exemple 1: Connexion et récupération ===\n");
    
    const client = new StudentWebSocketClient(WEBSOCKET_URL);
    
    // Gérer les messages reçus
    client.on('onMessage', (data) => {
        if (data.type === 'students') {
            const students = JSON.parse(data.data);
            console.log("📋 Liste des étudiants:", students);
        }
    });
    
    // Se connecter
    await client.connect();
    
    // Récupérer tous les étudiants
    client.getAllStudents();
}

/**
 * Exemple 2: Ajouter un étudiant
 */
async function example2() {
    console.log("\n=== Exemple 2: Ajouter un étudiant ===\n");
    
    const client = new StudentWebSocketClient(WEBSOCKET_URL);
    
    client.on('onMessage', (data) => {
        if (data.type === 'success') {
            console.log("✅", data.message);
        }
    });
    
    await client.connect();
    
    // Ajouter un nouvel étudiant
    client.addStudent("Alice", "Dupont", "2000-01-15");
}

/**
 * Exemple 3: CRUD complet
 */
async function example3() {
    console.log("\n=== Exemple 3: CRUD complet ===\n");
    
    const client = new StudentWebSocketClient(WEBSOCKET_URL);
    let studentId = null;
    
    client.on('onMessage', async (data) => {
        switch(data.type) {
            case 'students':
                const students = JSON.parse(data.data);
                console.log("📋 Nombre d'étudiants:", students.length);
                if (students.length > 0) {
                    studentId = students[0].idStudent;
                    console.log("🔍 Récupération de l'étudiant ID:", studentId);
                    client.getStudentById(studentId);
                }
                break;
                
            case 'student':
                const student = JSON.parse(data.data);
                console.log("👤 Étudiant:", student);
                console.log("✏️  Mise à jour de l'étudiant...");
                client.updateStudent(
                    student.idStudent,
                    student.firstNameStudent,
                    "UPDATED_" + student.lastNameStudent,
                    student.dateBirthStudent
                );
                break;
                
            case 'success':
                console.log("✅", data.message);
                break;
                
            case 'error':
                console.error("❌", data.message);
                break;
        }
    });
    
    await client.connect();
    client.getAllStudents();
}

/**
 * Exemple 4: Gestion des erreurs
 */
async function example4() {
    console.log("\n=== Exemple 4: Gestion des erreurs ===\n");
    
    const client = new StudentWebSocketClient(WEBSOCKET_URL);
    
    client.on('onError', (error) => {
        console.error("❌ Erreur de connexion:", error);
    });
    
    client.on('onMessage', (data) => {
        if (data.type === 'error') {
            console.error("❌ Erreur du serveur:", data.message);
        }
    });
    
    try {
        await client.connect();
        
        // Tentative de récupération d'un étudiant inexistant
        client.getStudentById(99999);
        
    } catch (error) {
        console.error("❌ Erreur lors de la connexion:", error);
    }
}

/**
 * Exemple 5: Écoute en temps réel des changements
 */
async function example5() {
    console.log("\n=== Exemple 5: Écoute en temps réel ===\n");
    
    const client = new StudentWebSocketClient(WEBSOCKET_URL);
    
    client.on('onMessage', (data) => {
        console.log(`[${new Date().toLocaleTimeString()}]`, data.type, ":", data.message || "");
        
        // Actualiser automatiquement la liste après chaque changement
        if (data.type === 'success') {
            setTimeout(() => {
                console.log("🔄 Actualisation de la liste...");
                client.getAllStudents();
            }, 1000);
        }
    });
    
    await client.connect();
    
    // Ajouter plusieurs étudiants
    setTimeout(() => client.addStudent("Bob", "Martin", "1999-05-20"), 1000);
    setTimeout(() => client.addStudent("Charlie", "Bernard", "2001-03-10"), 3000);
    setTimeout(() => client.addStudent("Diana", "Thomas", "2000-07-25"), 5000);
}

/**
 * Exemple 6: Utilisation avec async/await et Promises
 */
async function example6() {
    console.log("\n=== Exemple 6: Utilisation avec Promises ===\n");
    
    const client = new StudentWebSocketClient(WEBSOCKET_URL);
    
    // Wrapper pour recevoir des réponses avec Promise
    function sendAndWaitForResponse(action, expectedType) {
        return new Promise((resolve) => {
            const handler = (data) => {
                if (data.type === expectedType) {
                    resolve(data);
                    // Retirer le listener après utilisation
                    const index = client.listeners.onMessage.indexOf(handler);
                    if (index > -1) {
                        client.listeners.onMessage.splice(index, 1);
                    }
                }
            };
            client.on('onMessage', handler);
            client.send(action);
        });
    }
    
    await client.connect();
    
    // Récupérer tous les étudiants et attendre la réponse
    const response = await sendAndWaitForResponse(
        { action: "getAllStudents" },
        "students"
    );
    
    const students = JSON.parse(response.data);
    console.log("📋 Reçu", students.length, "étudiants");
    
    client.disconnect();
}

// =============================================================================
// Exemple d'intégration avec Node.js (nécessite le package 'ws')
// =============================================================================

/**
 * Exemple pour Node.js
 * Installation: npm install ws
 */
function nodeJsExample() {
    console.log("\n=== Exemple Node.js ===\n");
    
    // Décommenter pour utiliser avec Node.js
    /*
    const WebSocket = require('ws');
    
    const ws = new WebSocket(WEBSOCKET_URL);
    
    ws.on('open', function open() {
        console.log('✅ Connecté');
        
        // Envoyer une requête
        ws.send(JSON.stringify({ action: 'getAllStudents' }));
    });
    
    ws.on('message', function message(data) {
        console.log('📨 Reçu:', data.toString());
        const response = JSON.parse(data.toString());
        
        if (response.type === 'students') {
            const students = JSON.parse(response.data);
            console.log('Nombre d\'étudiants:', students.length);
        }
    });
    
    ws.on('error', function error(err) {
        console.error('❌ Erreur:', err);
    });
    
    ws.on('close', function close() {
        console.log('🔌 Déconnecté');
    });
    */
}

// =============================================================================
// Exécution des exemples (décommenter pour tester)
// =============================================================================

// example1();
// example2();
// example3();
// example4();
// example5();
// example6();
// nodeJsExample();

// Export pour utilisation en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StudentWebSocketClient };
}
