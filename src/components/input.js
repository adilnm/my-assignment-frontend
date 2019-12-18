class Input {

  newCourse(divContainer){
    const courseBox=document.createElement('div')
    divContainer.appendChild(courseBox)
    courseBox.className='courses-containers col-sm-5 '

    const nameInput=document.createElement('input')
    courseBox.appendChild(nameInput)
    nameInput.type="text"
    nameInput.placeholder="Name"
    nameInput.id='course-name'
    courseBox.innerHTML+='<br>'

    const profrssorInput=document.createElement('input')
    courseBox.appendChild(profrssorInput)
    profrssorInput.type="text"
    profrssorInput.placeholder="Professor"
    profrssorInput.id='professor'
    courseBox.innerHTML+='<br>'

    const semesterInput=document.createElement('input')
    courseBox.appendChild(semesterInput)
    semesterInput.type="text"
    semesterInput.placeholder="Semester"
    semesterInput.id='semester'
    courseBox.innerHTML+='<br>'
  }
  newAssignment(divContainer){
    const inputBox=document.createElement('div')
    divContainer.appendChild(inputBox)
    inputBox.className='assignments-containers col-sm-5 '
      inputBox.innerHTML=`<h1>Add a new assignment</h1>`
      const nameInput=document.createElement('input')
      inputBox.appendChild(nameInput)
      nameInput.type="text"
      nameInput.placeholder="Name"
      nameInput.id='name'
      inputBox.innerHTML+='<br>'

      const categoryInput=document.createElement('input')
      inputBox.appendChild(categoryInput)
      categoryInput.type="text"
      categoryInput.placeholder="Category"
      categoryInput.id='category'
      inputBox.innerHTML+='<br>'

      const descriptionInput=document.createElement('textarea')
      inputBox.appendChild(descriptionInput)
      descriptionInput.placeholder="Description"
      descriptionInput.id='description'
      inputBox.innerHTML+='<br>'

      const gradeInput=document.createElement('input')
      inputBox.appendChild(gradeInput)
      gradeInput.type="text"
      gradeInput.id='grade'
      gradeInput.placeholder="Grade"





  }
}
