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
     this.divContainer=document.querySelector('#assignment-container')
  }

  getCourses(){
    this.adapter.getCourses()
      .then((json)=>{
        json.data.forEach(courseItem=>{
          const courseContainer=document.createElement('div')
          courseContainer.className="col-sm-9 course-container"
          this.divContainer.appendChild(courseContainer)
          const course=new Course(courseItem.attributes)
          courseContainer.innerHTML=course.render()
          courseItem.attributes.assignments.forEach((item)=>{
            const assignmentContainer=document.createElement('div')
            courseContainer.appendChild(assignmentContainer)
            assignmentContainer.innerHTML=item.name
          })

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

  // createAssignments(){
  //   const assignmentName=document.querySelector('#name')
  //   const assignmentCategory=document.querySelector('#category')
  //   const assignmentDescription=document.querySelector('#description')
  //   const assignmentGrade=document.querySelector('#grade')
  //   this.adapter.createAssignments()
  //
  // }

  // createCourse(){
  //   this.adapter.createCourses()
  // }

}
