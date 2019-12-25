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
      return `<div class="card border-dark mb-3"><h1 class="card-header assignment-name"> ${this.name}</h1><h2>Category: <span class='editable-content assignment-category'>${this.category}</span></h2><h3>Deadline: <span class='editable-content assignment-deadline'>${this.deadline}</span></h3><h3>Description: <span class='editable-content assignment-description'>${this.description}</span></h3><h3>Grade: <span class='editable-content assignment-grade'>${this.grade}</span></h3></div>`
    }
}
