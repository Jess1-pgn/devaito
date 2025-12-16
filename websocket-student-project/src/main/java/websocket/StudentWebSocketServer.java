package websocket;

import java.io.IOException;
import java.sql.Date;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import dao.DaoImpl;
import dao.Student;

@ServerEndpoint("/studentWebSocket")
public class StudentWebSocketServer {

	private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
	private DaoImpl dao = new DaoImpl();
	private Gson gson = new Gson();

	@OnOpen
	public void onOpen(Session session) {
		clients.add(session);
		System.out.println("New connection: " + session.getId());
		
		// Send welcome message
		try {
			JsonObject response = new JsonObject();
			response.addProperty("type", "connection");
			response.addProperty("message", "Connected to Student WebSocket Server");
			session.getBasicRemote().sendText(response.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@OnMessage
	public void onMessage(String message, Session session) {
		System.out.println("Message from " + session.getId() + ": " + message);
		
		try {
			JsonObject jsonMessage = gson.fromJson(message, JsonObject.class);
			String action = jsonMessage.get("action").getAsString();
			
			JsonObject response = new JsonObject();
			
			switch (action) {
				case "getAllStudents":
					List<Student> students = dao.getAllStudent();
					response.addProperty("type", "students");
					response.addProperty("data", gson.toJson(students));
					session.getBasicRemote().sendText(response.toString());
					break;
					
				case "getStudent":
					int id = jsonMessage.get("id").getAsInt();
					Student student = dao.getStudentById(id);
					response.addProperty("type", "student");
					response.addProperty("data", gson.toJson(student));
					session.getBasicRemote().sendText(response.toString());
					break;
					
				case "addStudent":
					JsonObject studentData = jsonMessage.getAsJsonObject("student");
					String firstName = studentData.get("firstNameStudent").getAsString();
					String lastName = studentData.get("lastNameStudent").getAsString();
					String dateStr = studentData.get("dateBirthStudent").getAsString();
					Date dateBirth = Date.valueOf(dateStr);
					
					Student newStudent = new Student(firstName, lastName, dateBirth);
					dao.addStudent(newStudent);
					
					response.addProperty("type", "success");
					response.addProperty("message", "Student added successfully");
					broadcastToAll(response.toString());
					break;
					
				case "updateStudent":
					int updateId = jsonMessage.get("id").getAsInt();
					JsonObject updateData = jsonMessage.getAsJsonObject("student");
					String updateFirstName = updateData.get("firstNameStudent").getAsString();
					String updateLastName = updateData.get("lastNameStudent").getAsString();
					String updateDateStr = updateData.get("dateBirthStudent").getAsString();
					Date updateDateBirth = Date.valueOf(updateDateStr);
					
					Student updateStudent = new Student(updateFirstName, updateLastName, updateDateBirth);
					dao.updateStudent(updateId, updateStudent);
					
					response.addProperty("type", "success");
					response.addProperty("message", "Student updated successfully");
					broadcastToAll(response.toString());
					break;
					
				case "deleteStudent":
					int deleteId = jsonMessage.get("id").getAsInt();
					dao.deleteStudent(deleteId);
					
					response.addProperty("type", "success");
					response.addProperty("message", "Student deleted successfully");
					broadcastToAll(response.toString());
					break;
					
				default:
					response.addProperty("type", "error");
					response.addProperty("message", "Unknown action: " + action);
					session.getBasicRemote().sendText(response.toString());
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			try {
				JsonObject errorResponse = new JsonObject();
				errorResponse.addProperty("type", "error");
				errorResponse.addProperty("message", "Error processing request: " + e.getMessage());
				session.getBasicRemote().sendText(errorResponse.toString());
			} catch (IOException ioException) {
				ioException.printStackTrace();
			}
		}
	}

	@OnClose
	public void onClose(Session session) {
		clients.remove(session);
		System.out.println("Connection closed: " + session.getId());
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		System.out.println("Error on session " + session.getId());
		throwable.printStackTrace();
	}

	private void broadcastToAll(String message) {
		synchronized (clients) {
			for (Session client : clients) {
				try {
					client.getBasicRemote().sendText(message);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
