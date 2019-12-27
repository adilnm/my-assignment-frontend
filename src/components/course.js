class Course {
  constructor(courseJson,id) {
    this.id=id
    this.name=courseJson.name
    this.professor=courseJson.professor
    this.semester=courseJson.semester
  }

  render(){
    return `<h1 course-id=${this.id}>${this.name}</h1><span course-id=${this.id}>(${this.semester})</span><h3 course-id=${this.id}>${this.professor}</h3>`;
  }
}
