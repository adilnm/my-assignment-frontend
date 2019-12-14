class Assignment {
  constructor(assignmentJson) {
    this.id=assignmentJson.id
    this.name=assignmentJson.attributes.name
    this.category=assignmentJson.attributes.category
    this.deadline=assignmentJson.attributes.deadline
    this.description=assignmentJson.attributes.description
    this.submitted=assignmentJson.attributes.submitted
    this.grade=assignmentJson.attributes.grade
    this.courseName=assignmentJson.attributes.course.name

  }

    renderDiv(){
      return `<h1>${this.category}</h1><h2>${this.name}</h2><h3>Deadline: ${this.deadline}</h3><h3>Description: ${this.description}</p></h3>`
    }
}
