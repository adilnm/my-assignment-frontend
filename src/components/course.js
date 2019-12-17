class Course {
  constructor(courseJson) {
    this.name=courseJson.name
    this.professor=courseJson.professor
    this.semester=courseJson.semester
  }

  render(){
    return `<h1>${this.name}</h1><span>(${this.semester})</span><h3>${this.professor}</h3>`;
  }
}
