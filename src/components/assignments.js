class Assignments {
  constructor() {
    this.adapter=new AssignmentsAdapter()
    // this.getAssignments()
    this.initBindingsAndEventListeners()
    this.input=new Input()
    this.getCourses()
    // this.createAssignments()
    // this.createCourse()

  }
  initBindingsAndEventListeners(){
     this.divContainer=document.querySelector('#container')
  }

  getCourses(){
    this.adapter.getCourses()
      .then((json)=>{
        json.data.forEach(courseItem=>{
            const courseContainer=document.createElement('div')
            courseContainer.className="col-sm-9 course-container "
            this.divContainer.appendChild(courseContainer)
            const course=new Course(courseItem.attributes)
            courseContainer.innerHTML=course.render()
            const assignmentsContainer=document.createElement('div')
            courseContainer.appendChild(assignmentsContainer)
            assignmentsContainer.className="row"
            courseItem.attributes.assignments.forEach((assignmentItems)=>{
              const assignmentContainer=document.createElement('div')
              assignmentsContainer.appendChild(assignmentContainer)
              this.assignment=new Assignment(assignmentItems)
              assignmentContainer.innerHTML=this.assignment.render()
              assignmentContainer.className='assignment-container col-sm-5 '
            })
            const courseId=courseItem.id
            console.log(courseId)
            this.input.newAssignment(assignmentsContainer,courseId)
        })
      })
  }



  // getAssignments(){
  //   this.adapter.getAssignments()
  //     .then(json=>{
  //       const courseContainer=document.createElement('div')
  //       json.data.forEach(assignmentCard=>{
  //         this.assignment=new Assignment(assignmentCard)
  //         const assignmentContainer=document.createElement('div')
  //         this.divContainer.appendChild(assignmentContainer)
  //         assignmentContainer.className='assignments-containers col-sm-6 '
  //         assignmentContainer.innerHTML=this.assignment.renderDiv()
  //       })
  //     }).then(()=>this.input.newAssignment(this.divContainer))
  //       .then(()=>this.input.newCourse(this.divContainer))
  // }

  createAssignments(){
    const assignmentName=document.querySelector('#name')
    console.log()
    const assignmentCategory=document.querySelector('#category')
    const assignmentDescription=document.querySelector('#description')
    const assignmentGrade=document.querySelector('#grade')
    // this.adapter.createAssignments()

  }

  // createCourse(){
  //   this.adapter.createCourses()
  // }

}
