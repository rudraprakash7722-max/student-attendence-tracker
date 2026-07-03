import { useState,useEffect } from 'react';
import StudentList from './StudentList.jsx';
import StudentCard from './StudentCard.jsx';
import './App.css';

function retrieveStudentsFromLocalStorage() {
  const storedStudents = localStorage.getItem('students');
  return storedStudents ? JSON.parse(storedStudents) : [];
}

function App() {
  const [students, setStudents] = useState(retrieveStudentsFromLocalStorage());


 
  const [filter, setFilter] = useState('all');

  const filteredStudents = students.filter((student) => {
    if (filter === 'present') return student.present;
    if (filter === 'absent') return !student.present;
    return true;
  });

  const presentCount = students.filter((s) => s.present).length;
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  useEffect(()=>
  {
    localStorage.setItem('students', JSON.stringify(students));
  },[students])


  return (
    <div className="roster-app">
      <div className="roster-shell">
        <div className="roster-header">
          <div>
            <p className="roster-eyebrow">Roll call</p>
            <h1 className="roster-title">Class roster</h1>
          </div>
          <p className="roster-date">{today}</p>
        </div>

        <StudentList students={students} setStudents={setStudents} />

        <div className="filter-row">
          {['all', 'present', 'absent'].map((option) => (
            <button
              key={option}
              className={`filter-tab ${filter === option ? 'active' : ''}`}
              onClick={() => setFilter(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        <StudentCard students={filteredStudents} setStudents={setStudents} />

        <div className="roster-footer">
          <span>{students.length} students enrolled</span>
          <span>{presentCount} present today</span>
        </div>
      </div>
    </div>
  );
}

export default App;
