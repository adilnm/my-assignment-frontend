class AssignmentsAdapter {
  constructor() {
    this.assignmentUrl="http://localhost:3000/api/v1/assignments"
  }

  getAssignments(){
    return fetch("http://localhost:3000/api/v1/assignments")
      .then(res=>res.json())
  }
}
