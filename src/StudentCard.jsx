function StudentCard({ students, setStudents }) {
  if (students.length === 0) {
    return <p className="roster-empty">No students match this view.</p>;
  }

  return (
    <div className="roster-list">
      {students.map((student) => (
        <div className="student-card" key={student.id}>
          <span className="student-id">{String(student.id).padStart(2, '0')}</span>

          <div className="student-info">
            <p className="student-name">{student.name}</p>
            <span className={`student-status ${student.present ? 'present' : 'absent'}`}>
              {student.present ? 'Present' : 'Absent'}
            </span>
          </div>

          <button
            className={`stamp-toggle ${student.present ? 'present' : 'absent'}`}
            onClick={() => {
              setStudents(
                students.map((s) =>
                  s.id === student.id ? { ...s, present: !s.present } : s
                )
              );
            }}
            aria-label={`Mark ${student.name} as ${student.present ? 'absent' : 'present'}`}
          >
            <span className="stamp-dot"></span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default StudentCard;
