import React, { useReducer } from "react";

const initialStudents = [
  { id: 1, name: "Rahul", status: "" },
  { id: 2, name: "Priya", status: "" },
  { id: 3, name: "Amit", status: "" }
];

function attendanceReducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map((student) =>
        student.id === action.id ? { ...student, status: "Present" } : student
      );

    case "MARK_ABSENT":
      return state.map((student) =>
        student.id === action.id ? { ...student, status: "Absent" } : student
      );

    case "RESET":
      return initialStudents;

    default:
      return state;
  }
}

export default function AttendanceApp() {
  const [students, dispatch] = useReducer(attendanceReducer, initialStudents);

  return (
    <div>
      <h2>Classroom Attendance</h2>

      {students.map((student) => (
        <div key={student.id} style={{ marginBottom: "10px" }}>
          <b>{student.name}</b>
          <button
            onClick={() => dispatch({ type: "MARK_PRESENT", id: student.id })}
            style={{ marginLeft: "10px" }}
          >
            Present
          </button>
          <button
            onClick={() => dispatch({ type: "MARK_ABSENT", id: student.id })}
            style={{ marginLeft: "10px" }}
          >
            Absent
          </button>
        </div>
      ))}

      <button onClick={() => dispatch({ type: "RESET" })}>
        Reset Attendance
      </button>

      <h3>Final Attendance</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.status || "Not Marked"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
