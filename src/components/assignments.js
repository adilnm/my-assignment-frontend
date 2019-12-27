class Assignments {
  constructor() {
    this.adapter=new AssignmentsAdapter()
    this.getCourses()
    this.input=new Input()
    // this.getAssignments()
    this.initBindingsAndEventListeners()



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
            courseContainer.className="col-sm-12 course-container "
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
              deltBtn.className='btn btn-danger btn-lg'
              const editBtn=document.createElement('button')
              assignmentContainer.appendChild(editBtn)
              editBtn.innerText='UPDATE'
              editBtn.className='btn btn-info btn-lg'
              editBtn.setAttribute("Assignment-id", assignmentItems.id)
              editBtn.addEventListener('click',this.editAssignments.bind(this))
            })
            const courseId=courseItem.id
            //display the add assignmrnt form
            this.input.newAssignment(assignmentsContainer,courseId)
            const courseDeltBtn=document.createElement('button')
            courseContainer.appendChild(courseDeltBtn)
            courseDeltBtn.className='delete-course btn btn-danger btn-lg'
            courseDeltBtn.innerText='DELETE COURSE'
            courseDeltBtn.setAttribute("course-id", courseId)
            courseDeltBtn.addEventListener('click', this.deleteCourse.bind(this))
        })
      }).then(()=>{
          const assignmentForms=document.querySelectorAll('.assignment-form')
          // if we make createAssignments an arrow function we won't need to bind because this keyword will be the Assignment object
          assignmentForms.forEach((form)=>form.addEventListener('submit',this.createAssignments.bind(this)))
        }).then(this.editableContent)
          .then(this.courseForm.bind(this))
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
      deltBtn.className='btn btn-danger btn-lg'
      deltBtn.setAttribute("Assignment-id", json.id)
      deltBtn.addEventListener('click',this.deleteAssignments.bind(this))
      const editBtn=document.createElement('button')
      assignmentContainer.appendChild(editBtn)
      editBtn.innerText='UPDATE'
      editBtn.className='btn btn-info btn-lg'
      editBtn.setAttribute("Assignment-id", json.id)
      editBtn.addEventListener('click',this.editAssignments.bind(this))
    }).then(this.editableContent)

  }


  editAssignments(e){
    const updatedCard=e.target.parentElement
    const assignmentId=e.target.getAttribute("assignment-id")
    const name=updatedCard.querySelector('.assignment-name').innerText
    const category=updatedCard.querySelector('.assignment-category').innerText
    const description=updatedCard.querySelector('.assignment-description').innerText
    const grade=updatedCard.querySelector('.assignment-grade').innerText
    const deadline=updatedCard.querySelector('.assignment-deadline').innerText
    this.adapter.updateAssignments(assignmentId, name, category, description,grade,deadline)

  }

  deleteAssignments(e){
    // confirm is used as a confirmation before deleting an assignmrnt
    const r=confirm("Are you sure ?")
    if(r==true)
    {
      this.adapter.deleteAssignments(e.target.getAttribute("assignment-id"))
      .then((json)=>{
        e.target.parentElement.remove()
      })
    }
  }


  courseForm(){
    const div=document.createElement('div')
    div.className="col-sm-12 course-container "
    this.divContainer.appendChild(div)
    this.input.newCourse(div)
    this.newCourseForm=document.querySelector('#course-form')
    this.newCourseForm.addEventListener('submit',this.createCourse.bind(this))
    // this.adapter.createCourses()
  }

  editableContent(){
    const editables=document.querySelectorAll('.editable-content')
    editables.forEach(item=>{
      item.addEventListener('dblclick',(e)=>{
        e.target.contentEditable=true
        e.target.classList.add("edit")
      })
      item.addEventListener('blur',(e)=>{
        e.target.contentEditable=false
        e.target.classList.remove("edit")
      })
    })
  }

  createCourse(e){
    e.preventDefault()
    const name=document.querySelector('#course-name').value
    const professor=document.querySelector('#professor').value
    const semester=document.querySelector('#semester').value
    this.adapter.createCourses(name, professor, semester)
    .then((json)=>{
      const courseId=json.id
      const courseContainer=document.createElement('div')
      courseContainer.className="col-sm-12 course-container "
      this.divContainer.appendChild(courseContainer)
      const course=new Course(json)
      courseContainer.innerHTML=course.render()
      const assignmentsContainer=document.createElement('div')
      courseContainer.appendChild(assignmentsContainer)
      assignmentsContainer.className="assignments-containers row"
      assignmentsContainer.id=json.id
      this.input.newAssignment(assignmentsContainer,courseId)
      const courseDeltBtn=document.createElement('button')
      courseContainer.appendChild(courseDeltBtn)
      courseDeltBtn.className='delete-course btn btn-danger btn-lg'
      courseDeltBtn.innerText='DELETE COURSE'
      courseDeltBtn.setAttribute("course-id", courseId)
      courseDeltBtn.addEventListener('click', this.deleteCourse.bind(this))
      const assignmentsForm=document.querySelectorAll('.assignment-form')
      // select the assignment form of the last added course
      const newAssignmentForm=assignmentsForm[assignmentsForm.length-1]
      newAssignmentForm.addEventListener('submit',this.createAssignments.bind(this))

    })
  }

  deleteCourse(e){
    const r=confirm("Are you sure you want to remove this course?")
    if(r==true)
    {
      const courseId=e.target.getAttribute("course-id")
      this.adapter.deleteCourses(courseId)
        .then((json)=>{
          e.target.parentElement.remove()
        })
    }
  }


}
