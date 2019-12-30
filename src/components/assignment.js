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
      return `<div><h1 class="editable-assignment card-header assignment-name"> ${this.name}</h1>
      <table class="table table-striped ">
      <tbody><tr><th scope="row"><h3>CATEGORY</h3></th><td class='editable-assignment assignment-category'>${this.category}</td></tr>
      <tr><th scope="row"><h3>DEADLINE</h3></th><td class='editable-deadline assignment-deadline'>${this.deadline}</td></tr>
      <tr><th scope="row"><h3>DESCRIPTION</h3></th><td class='editable-assignment assignment-description'>${this.description}</td></tr>
      <tr><th scope="row"><h3>SUBMITTED</h3></th><td>
      <form class='assignment-submission'>
          <input type="radio" name="optradio" value=true> YES<br>
          <input type="radio" name="optradio" value=false checked> NOT YET

    </form></td></tr>
      <tr><th scope="row"><h3>GRADE</h3></th><td class='editable-assignment assignment-grade'>${this.grade}</td></tr></tbody></table>`

    }
}
