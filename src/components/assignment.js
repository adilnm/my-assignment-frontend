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
      return `<div"><h1 class="editable-assignment card-header assignment-name"> ${this.name}</h1><table class="table table-bordered"><tbody><tr><th scope="row"><h3>CATEGORY</h3></th><td class='editable-assignment assignment-category'>${this.category}</td></tr><tr><th scope="row"><h3>DEADLINE</h3></th><td class='editable-assignment assignment-deadline'>${this.deadline}</td></tr><tr><th scope="row"><h3>DESCRIPTION</h3></th><td class='editable-assignment assignment-deadline'>${this.description}</td></tr><tr><th scope="row"><h3>GRADE</h3></th><td class='editable-assignment assignment-deadline'>${this.grade}</td></tr></tbody></table>`
      // return `<div class="card border-dark mb-3"><h1 class="editable-assignment card-header assignment-name"> ${this.name}</h1><h2>Category: <span class='editable-assignment assignment-category'>${this.category}</span></h2><h3>Deadline: <span class='editable-assignment assignment-deadline'>${this.deadline}</span></h3><h3>Description: <span class='editable-assignment assignment-description'>${this.description}</span></h3><h3>Grade: <span class='editable-assignment assignment-grade'>${this.grade}</span></h3></div>`
    }
}
// return `<table class="table table-bordered"><tbody><tr><th scope="row">Category</th><td class='editable-assignment assignment-category'>${this.category}</td></tr><tr><th scope="row">Deadline</th><td class='editable-assignment assignment-deadline'>${this.deadline}</td></tr><tr><th scope="row">Description</th><td class='editable-assignment assignment-deadline'>${this.description}</td></tr><tr><th scope="row">Grade</th><td class='editable-assignment assignment-deadline'>${this.grade}</td></tr>`
