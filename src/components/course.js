class Course {
  constructor(courseJson,id) {
    this.id=id
    this.name=courseJson.name
    this.professor=courseJson.professor
    this.semester=courseJson.semester
  }

  render(){
    return `<div><h1 class="course-name editable-course" course-id=${this.id}>${this.name}</h1><span class=" course-semester editable-course" course-id=${this.id}>${this.semester}</span><h3 class="course-professor editable-course" course-id=${this.id}>${this.professor}</h3></div>`;
  }
}
