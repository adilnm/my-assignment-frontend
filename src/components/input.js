class Input {


  newAssignment(divContainer){
    const inputBox=document.createElement('div')
    divContainer.appendChild(inputBox)
    inputBox.className='assignments-containers col-sm-6 '

      const nameInput=document.createElement('input')
      inputBox.appendChild(nameInput)
      nameInput.type="text"
      nameInput.placeholder="Name"

      const categoryInput=document.createElement('input')
      inputBox.appendChild(categoryInput)
      categoryInput.type="text"
      categoryInput.placeholder="Category"

      const descriptionInput=document.createElement('textarea')
      inputBox.appendChild(descriptionInput)
      descriptionInput.placeholder="Description"

      // const nameInput=document.createElement('input')
      // inputBox.appendChild(nameInput)
      // nameInput.type="text"
      // nameInput.placeholder="Name"





  }
}
