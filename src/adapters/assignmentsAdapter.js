class AssignmentsAdapter {
  constructor() {
    this.assignmentUrl="http://localhost:3000/api/v1/assignments"
    this.courseUrl="http://localhost:3000/api/v1/courses"
  }

  getCourses(){
    return fetch(this.courseUrl)
      .then(res=>res.json())
  }

  createAssignments(name,category,description,grade,courseId, deadline){

      let formData={
        name:name,
        category:category,
        description:description,
        grade:grade,
        course_id:courseId,
        deadline:deadline
      };
     let configObj = {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify(formData)
     };

     return fetch(this.assignmentUrl, configObj)
      .then(res=>res.json())

  }

  updateAssignments(assignmentId,name,category,description,grade,deadline,submitted){
      let formData={
        id:assignmentId,
        name:name,
        category:category,
        category:category,
        description:description,
        grade:grade,
        deadline:deadline,
        submitted:submitted

      };
     let configObj = {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(formData)
     };
     return fetch(`${this.assignmentUrl}/${assignmentId}`, configObj)
      .then(res=>res.json())

  }

  deleteAssignments(id){
    return fetch(`${this.assignmentUrl}/${id}`, {method: 'DELETE'})
      .then(res=>res.json())
  }

  createCourses(name, professor, semester){
    let formData={
      name:name,
      professor:professor,
      semester:semester,
    };
 let configObj = {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
     "Accept": "application/json"
   },
   body: JSON.stringify(formData)
  };

 return fetch(this.courseUrl, configObj)
  .then(res=>res.json())
}

  deleteCourses(id){
    return fetch(`${this.courseUrl}/${id}`, {method: 'DELETE'})
      .then(res=>res.json())
  }

  updateCourse(courseId, name, professor, semester){
    let formData={
      name:name,
      professor:professor,
      semester:semester
    };
   let configObj = {
     method: "PATCH",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(formData)
   };
   return fetch(`${this.courseUrl}/${courseId}`, configObj)
    .then(res=>res.json())
  }
}
