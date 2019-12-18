class Assignment {
  constructor(assignmentJson) {
    this.id=assignmentJson.id
    this.name=assignmentJson.name
    this.category=assignmentJson.category
    this.deadline=assignmentJson.deadline
    this.description=assignmentJson.description
    this.submitted=assignmentJson.submitted
    this.grade=assignmentJson.grade

  }

    render(){
      return `<h1>${this.category}</h1><h2>${this.name}</h2><h3>Deadline: ${this.deadline}</h3><h3>Description: ${this.description}</p></h3>`
    }
}
