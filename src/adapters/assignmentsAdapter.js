class AssignmentsAdapter {
  constructor() {
    this.assignmentUrl="http://localhost:3000/api/v1/assignments"
    this.courseUrl="http://localhost:3000/api/v1/courses"
  }

  getCourses(){
    return fetch(this.courseUrl)
      .then(res=>res.json())
  }

  // getAssignments(){
  //   return fetch(this.assignmentUrl)
  //     .then(res=>res.json())
  // }

  createAssignments(name,category,description,grade,courseId){

      let formData={
        name:name,
        category:category,
        description:description,
        grade:grade,
        course_id:courseId
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

  createCourses(){
    let formData={
    name:"physics",
    professor:"Mr David",
    semester:"Fall 2019",
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
}
