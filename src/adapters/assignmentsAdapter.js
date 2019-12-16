class AssignmentsAdapter {
  constructor() {
    this.assignmentUrl="http://localhost:3000/api/v1/assignments"
  }

  getAssignments(){
    return fetch(this.assignmentUrl)
      .then(res=>res.json())
  }

  createAssignments(){

     let formData = {

     };

     let configObj = {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify(formData)
     };

     return fetch(this.assignmentUrl, configObj);

  }
}
