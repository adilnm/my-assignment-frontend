class Assignments {
  constructor() {

    this.adapter=new AssignmentsAdapter()
    this.getCourses()
    this.input=new Input()
    // this.getAssignments()
    this.initBindingsAndEventListeners()


    // this.createCourse()

  }
  initBindingsAndEventListeners(){
     this.divContainer=document.querySelector('#container')
     // this.assignmentForm=document.querySelector('.assignments-containers')
     // this.assignmentForm.addEventListener('submit',this.createAssignments(e))
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
            this.input.newAssignment(assignmentsContainer,courseId)
        })
      }).then(()=>{
          const assignmentForm=document.querySelector('.assignments-containers')
          // if we make createAssignments an arrow function we won't need to bind because this keyword will be the Assignment object
          assignmentForm.addEventListener('submit',this.createAssignments.bind(this))
        }).then(()=>{
            console.log("something")
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

  createAssignments(e){
    e.preventDefault()
    const assignmentName=document.querySelector('#name').value
    const assignmentCategory=document.querySelector('#category').value
    const assignmentDescription=document.querySelector('#description').value
    const assignmentGrade=document.querySelector('#grade').value
    const courseId=document.querySelector('#course-id').value

    this.adapter.createAssignments(assignmentName, assignmentCategory, assignmentDescription,assignmentGrade,courseId)
  }

  // createCourse(){
  //   this.adapter.createCourses()
  // }

}
