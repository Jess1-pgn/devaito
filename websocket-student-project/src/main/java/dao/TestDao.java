package dao;

import java.sql.Date;
import java.time.LocalDate;

public class TestDao {

	public static void main(String[] args) {
		DaoImpl d = new DaoImpl();
		
		// Example: Add students
		// d.addStudent(new Student("TSOKA", "TSOKA", Date.valueOf(LocalDate.of(1999, 8, 26))));
		// d.addStudent(new Student("KOFFI", "KOFFI", Date.valueOf(LocalDate.of(1999, 8, 26))));
		
		// Get all students
		d.getAllStudent().forEach(et -> {
			System.out.println(et);
		});
	}
}
