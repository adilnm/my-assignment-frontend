class Assignments {
  constructor() {
    this.adapter=new AssignmentsAdapter()
    this.getCourses()
    this.input=new Input()
    this.initBindingsAndEventListeners()
    this.errors=new Error()
  }

  initBindingsAndEventListeners(){
    this.divContainer=document.querySelector('#container')
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
        const sortBtn=document.createElement('button')
        courseContainer.appendChild(sortBtn)
        sortBtn.innerHTML='Sort By Deadline'
        sortBtn.className='sort btn btn-info'
        sortBtn.setAttribute("course-id", courseItem.id)

        const assignmentsContainer=document.createElement('div')
        courseContainer.appendChild(assignmentsContainer)
        assignmentsContainer.className="assignments-containers row"
        assignmentsContainer.id=courseItem.id

        courseItem.attributes.assignments.forEach((assignmentItems)=>this.assignmentCard(assignmentItems,assignmentsContainer))
        const courseId=courseItem.id
        //display the add assignment form
        this.input.newAssignment(assignmentsContainer,courseId)
        this.deltCourseBtn(courseContainer, courseId)

      })
    }).then(()=>{
      const assignmentForms=document.querySelectorAll('.assignment-form')
      // if we make createAssignments an arrow function we won't need to bind because this keyword will be the Assignment object
      assignmentForms.forEach((form)=>form.addEventListener('submit',this.createAssignments.bind(this)))
    }).then(this.editableAssignment.bind(this))
    .then(this.editableCourse.bind(this))
    .then(this.courseForm.bind(this))
    .then(()=>{
      const sortBtn=document.querySelectorAll('.sort')
      sortBtn.forEach(item=>{
        item.addEventListener('click', this.deadlineSort.bind(this))
      })

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
    const deadline=this.dateFormat(e.target.querySelector('.deadline').value)
    // clear the form after submission
    e.target.reset()
    this.adapter.createAssignments(assignmentName, assignmentCategory, assignmentDescription,assignmentGrade,courseId, deadline)

    .then((json)=>{
      if (json.status==200) {
        this.clearErrors(e)
        const div=document.createElement('div')
        div.className='col-sm-6'
        document.getElementById(`${json.body.course_id}`).insertBefore(div, e.target.parentElement)

        const assignmentContainer=document.createElement('div')

        this.assignmentContent(div, assignmentContainer, json.body)

        this.remainingDays(deadline, assignmentContainer)
        this.deleteBtn(assignmentContainer, json.body)
        this.editBtn(assignmentContainer, json.body)
      }

      else {
        this.clearErrors(e)
        const errorContainer=e.target.querySelector('.errors')
        this.errors.displayErrors(json.body,errorContainer)
      }

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
        badge.className='badge badge-pill badge-success'
        badge.innerText='ASSIGNMENT SUBMITTED'
      }
      else {
        const deadlineDate=updatedCard.querySelector('.assignment-deadline').innerText
        updatedCard.querySelector('.badge').parentElement.remove()
        this.remainingDays(deadlineDate, updatedCard)
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
    div.className="col-sm-12 course-container container-fluid"
    this.divContainer.appendChild(div)
    this.input.newCourse(div)
    this.newCourseForm=document.querySelector('#course-form')
    this.newCourseForm.addEventListener('submit',this.createCourse.bind(this))
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
        const today=new Date()
        let day=today.getDate()
        let month=today.getMonth() + 1
        if (day<10) {
          day=`0${day}`
        }
        if (month<10) {
          month=`0${month}`
        }
        const todayDate=`${today.getFullYear()}-${month}-${day}`
        e.target.innerHTML=`<input type="date" value=${todayDate} class="deadline">`
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
    // clear the form after submission
    e.target.reset()
    this.adapter.createCourses(name, professor, semester)
    .then((json)=>{
      if (json.status==200){
        this.clearErrors(e)

        const courseId=json.body.id
        const courseContainer=document.createElement('div')
        courseContainer.className="col-sm-12 course-container "
        this.divContainer.insertBefore(courseContainer,e.target.parentElement)

        const course=new Course(json.body,courseId)
        courseContainer.innerHTML=course.render()
        const sortBtn=document.createElement('button')
        courseContainer.appendChild(sortBtn)
        sortBtn.innerHTML='Sort By Deadline'
        sortBtn.className='sort btn btn-info'
        sortBtn.setAttribute("course-id", courseId)

        const assignmentsContainer=document.createElement('div')
        courseContainer.appendChild(assignmentsContainer)
        assignmentsContainer.className="assignments-containers row"
        assignmentsContainer.id=json.body.id
        this.input.newAssignment(assignmentsContainer,courseId)

        this.deltCourseBtn(courseContainer, courseId)

        const assignmentsForm=document.querySelectorAll('.assignment-form')
        // select the assignment form of the last added course
        const newAssignmentForm=assignmentsForm[assignmentsForm.length-1]
        newAssignmentForm.addEventListener('submit',this.createAssignments.bind(this))
      }
      else {
        // clear the errors box
        this.clearErrors(e)
        const errorContainer=e.target.querySelector('.errors')
        this.errors.displayErrors(json.body,errorContainer)
      }
    }).then(this.editableCourse.bind(this))
    .then(()=>{
      const sortBtn=document.querySelectorAll('.sort')
      sortBtn.forEach(item=>{
        item.addEventListener('click', this.deadlineSort.bind(this))
      })
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
      badge.className='badge badge-pill badge-success'
      badge.innerText='ASSIGNMENT SUBMITTED'
    }
  }

  deleteBtn(container, assignmentItems){
    const deltBtn=document.createElement('button')
    container.appendChild(deltBtn)
    deltBtn.innerText='DELETE'
    deltBtn.setAttribute("Assignment-id", assignmentItems.id)
    deltBtn.className='btn btn-outline-danger btn-lg'
    deltBtn.addEventListener('click',this.deleteAssignments.bind(this))
  }

  editBtn(container, assignmentItems){
    const editBtn=document.createElement('button')
    container.appendChild(editBtn)
    editBtn.innerText='UPDATE'
    editBtn.className='btn btn-outline-primary btn-lg'
    editBtn.setAttribute("Assignment-id", assignmentItems.id)
    editBtn.addEventListener('click',this.editAssignments.bind(this))
  }

  deltCourseBtn(container, courseId){
    const courseDeltBtn=document.createElement('button')
    container.appendChild(courseDeltBtn)
    courseDeltBtn.className='delete-course btn btn-danger btn-lg'
    courseDeltBtn.innerText='DELETE COURSE'
    courseDeltBtn.setAttribute("course-id", courseId)
    courseDeltBtn.addEventListener('click', this.deleteCourse.bind(this))
  }

  clearErrors(event){
    const errorContainer=event.target.querySelector('.errors')
    errorContainer.innerHTML=''
    errorContainer.classList.remove("alert");
    errorContainer.classList.remove("alert-danger");
  }

  remainingDays(deadline, container) {
    const remaining=new CountDown(deadline)
    const h2=document.createElement('h2')
    container.prepend(h2)
    h2.prepend(remaining.daysRemaining())
  }

  assignmentContent(container, assignmentContainer, content){
    container.appendChild(assignmentContainer)
    this.assignment=new Assignment(content)
    assignmentContainer.innerHTML=this.assignment.render()
    assignmentContainer.className='assignment-container'
    assignmentContainer.setAttribute("Assignment-id", content.id)
  }

  deadlineSort(e){

    const courseId=e.target.getAttribute("course-id")
    this.adapter.getCourse(courseId)
      .then(json=>{
        const courseaAssignments=json.data.attributes.assignments
        courseaAssignments.sort((a,b)=>new Date(a.deadline)-new Date(b.deadline))
        const assignmentsContainer=document.getElementById(courseId)
        assignmentsContainer.innerHTML=''
        courseaAssignments.forEach((assignmentItems)=>this.assignmentCard(assignmentItems,assignmentsContainer))
        this.input.newAssignment(assignmentsContainer,courseId)
        return assignmentsContainer;
      }).then((assignmentsContainer)=>{
        const assignmentForm=assignmentsContainer.querySelector('.assignment-form')
        assignmentForm.addEventListener('submit',this.createAssignments.bind(this))
      }).then(this.editableAssignment.bind(this))
  }

  assignmentCard(content,assignmentsContainer){
    const div=document.createElement('div')
    div.className='col-sm-6'
    assignmentsContainer.appendChild(div)

    const assignmentContainer=document.createElement('div')

    this.assignmentContent(div, assignmentContainer, content)

    const deadlineDate=assignmentContainer.querySelector('.assignment-deadline').innerText

    this.remainingDays(deadlineDate, assignmentContainer)

    this.submissionCheck(assignmentContainer)

    this.deleteBtn(assignmentContainer, content)
    this.editBtn(assignmentContainer, content)

  }
}
