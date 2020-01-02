class Input {

  newCourse(divContainer){
    const courseBox=document.createElement('form')
    divContainer.appendChild(courseBox)
    courseBox.className='col-sm-12 justify-content-md-center'
    courseBox.id='course-form'
    courseBox.innerHTML=`<h1 class="card-header">Add a New Course</h1>`
    const div2=document.createElement('div')
    div2.className="col-sm-6 center"
    courseBox.appendChild(div2)

    const div3=document.createElement('div')
    div3.className='errors'
    div2.appendChild(div3)

    const nameInput=document.createElement('input')
    div2.appendChild(nameInput)
    nameInput.type="text"
    nameInput.placeholder="Name"
    nameInput.id='course-name'
    nameInput.className='name form-control form-control-lg'
    div2.innerHTML+='<br>'

    const profrssorInput=document.createElement('input')
    div2.appendChild(profrssorInput)
    profrssorInput.type="text"
    profrssorInput.placeholder="Professor"
    profrssorInput.id='professor'
    profrssorInput.className='name form-control form-control-lg'
    div2.innerHTML+='<br>'

    const semesterInput=document.createElement('input')
    div2.appendChild(semesterInput)
    semesterInput.type="text"
    semesterInput.placeholder="Semester"
    semesterInput.id='semester'
    semesterInput.className='name form-control form-control-lg'
    div2.innerHTML+='<br>'

    const submitBtn=document.createElement('input')
    div2.appendChild(submitBtn)
    submitBtn.type="submit"
    submitBtn.className="btn btn-primary btn-lg"
  }

  newAssignment(divContainer, courseIdVal){
    const div=document.createElement('div')
    divContainer.appendChild(div)
    div.className='col-sm-6 container'
    const inputBox=document.createElement('form')
    div.appendChild(inputBox)
    inputBox.className='assignment-form row justify-content-md-center'
    inputBox.innerHTML=`<h1 class="card-header">Add a New Assignment</h1>`
    const div2=document.createElement('div')
    div2.className="col-sm-8 center"
    inputBox.appendChild(div2)
    const div3=document.createElement('div')
    div3.className='errors'
    div2.appendChild(div3)
      //add a hidden input with the course id value
      const courseId=document.createElement('input')
      div2.appendChild(courseId)
      courseId.type="hidden"
      courseId.value=courseIdVal
      courseId.id="course-id"

      const nameInput=document.createElement('input')
      div2.appendChild(nameInput)
      nameInput.type="text"
      nameInput.placeholder="Name"
      nameInput.className='name form-control form-control-lg'
      div2.innerHTML+='<br>'

      const categoryInput=document.createElement('input')
      div2.appendChild(categoryInput)
      categoryInput.type="text"
      categoryInput.placeholder="Category"
      categoryInput.className='category form-control form-control-lg'
      div2.innerHTML+='<br>'

      const descriptionInput=document.createElement('textarea')
      div2.appendChild(descriptionInput)
      descriptionInput.placeholder="Description"
      descriptionInput.className='description form-control form-control-lg'
      div2.innerHTML+='<br>'

      const gradeInput=document.createElement('input')
      div2.appendChild(gradeInput)
      gradeInput.type="text"
      gradeInput.className='grade form-control form-control-lg'
      gradeInput.placeholder="Grade"
      div2.innerHTML+='<br>'

      const deadlineInput=document.createElement('input')
      div2.appendChild(deadlineInput)
      deadlineInput.type="date"
      deadlineInput.className='deadline form-control form-control-lg'
      div2.innerHTML+='<br>'

      const submitBtn=document.createElement('input')
      div2.appendChild(submitBtn)
      submitBtn.type="submit"
      submitBtn.className="btn btn-primary btn-lg"

  }
}
