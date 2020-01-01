class Assignments {
  constructor() {
    this.adapter=new AssignmentsAdapter()
    this.getCourses()
    this.input=new Input()
    // this.getAssignments()
    this.initBindingsAndEventListeners()
    // this.countDown=new CountDown('01-30-2019')


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
            courseContainer.className="col-sm-12 course-container container-fluid "
            this.divContainer.appendChild(courseContainer)
            const course=new Course(courseItem.attributes,courseItem.id)

            courseContainer.innerHTML=course.render()
            const assignmentsContainer=document.createElement('div')
            courseContainer.appendChild(assignmentsContainer)
            assignmentsContainer.className="assignments-containers row"
            assignmentsContainer.id=courseItem.id
            courseItem.attributes.assignments.forEach((assignmentItems)=>{
              const div=document.createElement('div')
              div.className='col-sm-6'
              assignmentsContainer.appendChild(div)
              const assignmentContainer=document.createElement('div')
              div.appendChild(assignmentContainer)
              this.assignment=new Assignment(assignmentItems)
              assignmentContainer.innerHTML=this.assignment.render()
              assignmentContainer.className='assignment-container'
              assignmentContainer.setAttribute("Assignment-id", assignmentItems.id)

              const deadlineDate=assignmentContainer.querySelector('.assignment-deadline').innerText
              const remaining=new CountDown(deadlineDate)
              assignmentContainer.prepend(remaining.daysRemaining())

              this.submissionCheck(assignmentContainer)

              // if (checked) {
              //   const badge=assignmentContainer.querySelector('.badge')
              //   badge.className='badge badge-success'
              //   badge.innerText='SUBMITTED'
              // }
              const deltBtn=document.createElement('button')
              assignmentContainer.appendChild(deltBtn)
              deltBtn.innerText='DELETE'
              deltBtn.setAttribute("Assignment-id", assignmentItems.id)
              deltBtn.className='btn btn-outline-danger btn-lg'
              deltBtn.addEventListener('click',this.deleteAssignments.bind(this))
              const editBtn=document.createElement('button')
              assignmentContainer.appendChild(editBtn)
              editBtn.innerText='UPDATE'
              editBtn.className='btn btn-outline-primary btn-lg'
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
        }).then(this.editableAssignment.bind(this))
        .then(this.editableCourse.bind(this))
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
      const div=document.createElement('div')
      div.className='col-sm-6'
      document.getElementById(`${json.course_id}`).appendChild(div)
      const assignmentContainer=document.createElement('div')
      div.appendChild(assignmentContainer)
      this.assignment=new Assignment(json)
      assignmentContainer.innerHTML=this.assignment.render()
      assignmentContainer.className='assignment-container'

      const remaining=new CountDown(deadline)
      assignmentContainer.prepend(remaining.daysRemaining())

      const deltBtn=document.createElement('button')
      assignmentContainer.appendChild(deltBtn)
      deltBtn.innerText='DELETE'
      deltBtn.className='btn btn-outline-danger btn-lg'
      deltBtn.setAttribute("Assignment-id", json.id)
      deltBtn.addEventListener('click',this.deleteAssignments.bind(this))
      const editBtn=document.createElement('button')
      assignmentContainer.appendChild(editBtn)
      editBtn.innerText='UPDATE'
      editBtn.className='btn btn-outline-primary btn-lg'
      editBtn.setAttribute("Assignment-id", json.id)
      editBtn.addEventListener('click',this.editAssignments.bind(this))
    }).then(this.editableAssignment.bind(this))

  }


  editAssignments(e){
    const updatedCard=e.target.parentElement
    const assignmentId=e.target.getAttribute("assignment-id")
    const name=updatedCard.querySelector('.assignment-name').innerText
    const category=updatedCard.querySelector('.assignment-category').innerText
    const description=updatedCard.querySelector('.assignment-description').innerText
    const grade=updatedCard.querySelector('.assignment-grade').innerText
    const deadline=updatedCard.querySelector('.assignment-deadline').innerText
    const submitted=e.target.parentElement.querySelector('.assignment-submission')[0].checked


    this.adapter.updateAssignments(assignmentId, name, category, description,grade,deadline,submitted)
    .then(json=>{
      if (json.submitted) {
        const badge=updatedCard.querySelector('.badge')
        badge.className='badge badge-success'
        badge.innerText='ASSIGNMENT SUBMITTED'
      }
      else {
        const deadlineDate=updatedCard.querySelector('.assignment-deadline').innerText
        const remaining=new CountDown(deadlineDate)
        updatedCard.querySelector('.badge').remove()
        updatedCard.prepend(remaining.daysRemaining())
      }
    })
  }

  deleteAssignments(e){
    // confirm is used as a confirmation before deleting an assignmrnt
    const r=confirm("Are you sure ?")
    if(r==true)
    {
      this.adapter.deleteAssignments(e.target.getAttribute("assignment-id"))
      .then((json)=>{
        e.target.parentElement.parentElement.remove()
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

  editableAssignment(){
    const assignmentEditables=document.querySelectorAll('.editable-assignment')
    const deadlineEditable=document.querySelectorAll('.editable-deadline')
    assignmentEditables.forEach(item=>{
      item.addEventListener('dblclick',(e)=>{
        e.target.contentEditable=true
        e.target.classList.add("edit")
      })
      item.addEventListener('blur',(e)=>{
        e.target.contentEditable=false
        e.target.classList.remove("edit")
      })
    })
    deadlineEditable.forEach((item)=>{
      item.addEventListener('dblclick',(e)=>{
        e.target.innerHTML=`<input type="date" class="deadline">`
        const deadlineInput=e.target.querySelector('input')
        deadlineInput.addEventListener('blur',(e)=>{
          e.target.parentElement.innerHTML=this.dateFormat(e.target.value)
        })

      })

    })
  }

  editableCourse(){
    const courseEditables=document.querySelectorAll('.editable-course')
    courseEditables.forEach(item=>{
      item.addEventListener('dblclick',(e)=>{
        e.target.contentEditable=true
        e.target.classList.add("edit")
      })
      item.addEventListener('blur',(e)=>{
        e.target.contentEditable=false
        e.target.classList.remove("edit")
        this.editCourse.call(this,e)
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
      const course=new Course(json,courseId)
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
    }).then(this.editableCourse.bind(this))
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

  editCourse(e){
    const courseId=e.target.getAttribute('course-id')
    const div=e.target.parentElement
    const courseName=div.querySelector('.course-name').innerText
    const courseProfessor=div.querySelector('.course-professor').innerText
    const courseSemester=div.querySelector('.course-semester').innerText
    this.adapter.updateCourse(courseId, courseName, courseProfessor, courseSemester)
  }

  dateFormat(date){
    var initial = date.split('-');
    return [initial[1],initial[2],initial[0]].join('-')

  }

  submissionCheck(container){
    const checked=container.querySelector('.assignment-submission')[0]
    if (this.assignment.submitted) {
      checked.checked=true
      const badge=container.querySelector('.badge')
      badge.className='badge badge-success'
      badge.innerText='ASSIGNMENT SUBMITTED'
    }
  }


}
