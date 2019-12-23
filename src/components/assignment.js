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
      return `<div class="card border-dark mb-3"><h1 class="card-header"> ${this.name}</h1><h2>Category: <span>${this.category}</span></h2><h3>Deadline: ${this.deadline}</h3><h3>Description: ${this.description}</h3><h3>Grade: ${this.grade}</h3></div>`
    }
}
