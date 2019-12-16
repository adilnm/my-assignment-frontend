class Assignments {
  constructor() {
    this.adapter=new AssignmentsAdapter()
    this.getAssignments()
    this.createAssignments()
    this.initBindingsAndEventListeners()
    this.input=new Input()
  }
  initBindingsAndEventListeners(){
     this.divContainer=document.querySelector('#assignment-container')
  }

  getAssignments(){
    this.adapter.getAssignments()
      .then(json=>{
        json.data.forEach(assignmentCard=>{
          this.assignment=new Assignment(assignmentCard)
          const assignmentContainer=document.createElement('div')
          this.divContainer.appendChild(assignmentContainer)
          assignmentContainer.className='assignments-containers col-sm-6 '
          assignmentContainer.innerHTML=this.assignment.renderDiv()
        })
      }).then(()=>this.input.newAssignment(this.divContainer))
  }

  createAssignments(){
    this.adapter.createAssignments()
  }

}
