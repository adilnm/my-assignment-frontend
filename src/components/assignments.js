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
            assignmentsContainer.className="assignments-containers row"
            assignmentsContainer.id=courseItem.id
            courseItem.attributes.assignments.forEach((assignmentItems)=>{
              const assignmentContainer=document.createElement('div')
              assignmentsContainer.appendChild(assignmentContainer)
              this.assignment=new Assignment(assignmentItems)
              assignmentContainer.innerHTML=this.assignment.render()
              assignmentContainer.className='assignment-container col-sm-5'
              assignmentContainer.setAttribute("Assignment-id", assignmentItems.id)
              const deltBtn=document.createElement('button')
              assignmentContainer.appendChild(deltBtn)
              deltBtn.innerText='DELETE'
              deltBtn.setAttribute("Assignment-id", assignmentItems.id)
              deltBtn.addEventListener('click',this.deleteAssignments.bind(this))
              const editBtn=document.createElement('button')
              assignmentContainer.appendChild(editBtn)
              editBtn.innerText='EDIT'
              editBtn.setAttribute("Assignment-id", assignmentItems.id)
              editBtn.addEventListener('click',this.editAssignments.bind(this))
            })
            const courseId=courseItem.id
            //display the add assignmrnt form
            this.input.newAssignment(assignmentsContainer,courseId)
        })
      }).then(()=>{
          const assignmentForm=document.querySelectorAll('.assignment-form')
          // if we make createAssignments an arrow function we won't need to bind because this keyword will be the Assignment object
          assignmentForm.forEach((form)=>form.addEventListener('submit',this.createAssignments.bind(this)))
        })
  }


  createAssignments(e){
    e.preventDefault()
    // Use of e.target to be able to get the value from that spcific form that we filled out
    const assignmentName=e.target.querySelector('.name').value
    const assignmentCategory=e.target.querySelector('.category').value
    const assignmentDescription=e.target.querySelector('.description').value
    const assignmentGrade=e.target.querySelector('.grade').value
    const courseId=e.target.querySelector('#course-id').value
    const deadline=e.target.querySelector('.deadline').value

    this.adapter.createAssignments(assignmentName, assignmentCategory, assignmentDescription,assignmentGrade,courseId, deadline)
    .then((json)=>{
      const assignmentContainer=document.createElement('div')
      document.getElementById(`${json.course_id}`).appendChild(assignmentContainer)
      this.assignment=new Assignment(json)
      assignmentContainer.innerHTML=this.assignment.render()
      assignmentContainer.className='assignment-container col-sm-5 '
      const deltBtn=document.createElement('button')
      assignmentContainer.appendChild(deltBtn)
      deltBtn.innerText='DELETE'
      deltBtn.setAttribute("Assignment-id", json.id)
      deltBtn.addEventListener('click',this.deleteAssignments.bind(this))
      const editBtn=document.createElement('button')
      assignmentContainer.appendChild(editBtn)
      editBtn.innerText='EDIT'
      editBtn.setAttribute("Assignment-id", assignmentItems.id)
      editBtn.addEventListener('click',this.editAssignments.bind(this))
    })

  }

  editAssignments(e){
    this.adapter.updateAssignments("Arabic")
    .then(json=>console.log(json))
  }

  deleteAssignments(e){
    this.adapter.deleteAssignments(e.target.getAttribute("assignment-id"))
    .then((json)=>{
      e.target.parentElement.remove()
    })
  }


  // createCourse(){
  //   this.adapter.createCourses()
  // }

}
