class Input {


  newAssignment(divContainer){
    const inputBox=document.createElement('div')
    divContainer.appendChild(inputBox)
    inputBox.className='assignments-containers col-sm-6 '

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
