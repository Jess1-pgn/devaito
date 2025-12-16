package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class DaoImpl implements IDao {
	
	private final String s1 = "com.mysql.jdbc.Driver";
	private final String s2 = "jdbc:mysql://localhost:3306/DB_SDDI_ESTEM?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
	private final String s3 = "root";
	private final String s4 = "";
	Student st;

	@Override
	public void addStudent(Student s) {
		try {
			Class.forName(s1);
			Connection connection = DriverManager.getConnection(s2, s3, s4);
			PreparedStatement ps = connection.prepareStatement("insert into STUDENTS(FIRST_NAME_STUDENT,LAST_NAME_STUDENT, DATE_BIRTH_STUDENT) values(?,?,?)");
			ps.setString(1, s.getFirstNameStudent());
			ps.setString(2, s.getLastNameStudent());
			ps.setDate(3, s.getDateBirthStudent());
			ps.executeUpdate();
			ps.close();
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Student getStudentById(int id) {
		st = new Student();
		try {
			Class.forName(s1);
			Connection connection = DriverManager.getConnection(s2, s3, s4);
			PreparedStatement ps = connection.prepareStatement("select * from STUDENTS where ID_STUDENT = ?");
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()){
				st.setIdStudent(rs.getInt("ID_STUDENT"));
				st.setFirstNameStudent(rs.getString("FIRST_NAME_STUDENT"));
				st.setLastNameStudent(rs.getString("LAST_NAME_STUDENT"));
				st.setDateBirthStudent(rs.getDate("DATE_BIRTH_STUDENT"));
			}
			
			ps.close();
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return st;
	}

	@Override
	public List<Student> getAllStudent() {
		List<Student> stds = new ArrayList<Student>();
		
		try {
			Class.forName(s1);
			Connection con = DriverManager.getConnection(s2, s3, s4);
			PreparedStatement ps = con.prepareStatement("select * from STUDENTS");
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()){
				Student etd = new Student();
				etd.setIdStudent(rs.getInt(1));
				etd.setFirstNameStudent(rs.getString(2));
				etd.setLastNameStudent(rs.getString(3));
				etd.setDateBirthStudent(rs.getDate(4));
				stds.add(etd);
			}
			
			ps.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return stds;
	}

	@Override
	public void deleteStudent(int id) {
		try {
			Class.forName(s1);
			Connection connection = DriverManager.getConnection(s2, s3, s4);
			PreparedStatement ps = connection.prepareStatement("delete from STUDENTS where ID_STUDENT = ?");
			ps.setInt(1, id);
			ps.executeUpdate();
			ps.close();
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void updateStudent(int id, Student s) {
		try {
			Class.forName(s1);
			Connection connection = DriverManager.getConnection(s2, s3, s4);
			PreparedStatement ps = connection.prepareStatement("update STUDENTS set FIRST_NAME_STUDENT = ?, LAST_NAME_STUDENT = ?, DATE_BIRTH_STUDENT = ? where ID_STUDENT = ?");
			ps.setString(1, s.getFirstNameStudent());
			ps.setString(2, s.getLastNameStudent());
			ps.setDate(3, s.getDateBirthStudent());
			ps.setInt(4, id);
			ps.executeUpdate();
			ps.close();
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
