package dao;

import java.util.List;

public interface IDao {
	
	void addStudent(Student s);
	
	Student getStudentById(int id);
	
	List<Student> getAllStudent();
	
	void deleteStudent(int id);
	
	void updateStudent(int id, Student s);
}
