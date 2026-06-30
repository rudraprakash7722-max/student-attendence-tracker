import { useState } from 'react';

function StudentList({ students, setStudents }) {
  const [newStudent, setNewStudent] = useState('');

  const addStudent = () => {
    if (newStudent.trim() !== '') {
      setStudents([
        ...students,
        { name: newStudent.trim(), id: students.length + 1, present: false },
      ]);
      setNewStudent('');
    }
  };

  return (
    <div className="add-row">
      <input
        className="add-input"
        type="text"
        value={newStudent}
        onChange={(e) => setNewStudent(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addStudent()}
        placeholder="Add a student to the roster"
      />
      <button className="add-button" onClick={addStudent}>
        Add student
      </button>
    </div>
  );
}

export default StudentList;
