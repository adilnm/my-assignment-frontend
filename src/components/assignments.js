class Assignments {
  constructor() {
    this.adapter=new AssignmentsAdapter()
    this.ctreateAssignments()
    this.initBindingsAndEventListeners()
  }
  initBindingsAndEventListeners(){
     this.divContainer=document.querySelector('#assignment-container')
  }

  ctreateAssignments(){
    this.adapter.getAssignments()
      .then(json=>{
        json.data.forEach(assignmentCard=>{
          this.assignment=new Assignment(assignmentCard)
          const assignmentContainer=document.createElement('div')
          this.divContainer.appendChild(assignmentContainer)
          assignmentContainer.className='assignments-containers col-sm-4 '
          assignmentContainer.innerHTML=this.assignment.renderDiv()
        })
      })
  }

}
