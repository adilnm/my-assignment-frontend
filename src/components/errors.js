class Error {
  constructor() {

  }

  displayErrors(errors,container){
    const arr=[]
    for (let error in errors) {
      arr.push(errors[error].map((item)=>`${error} ${item}`));
    }

    container.className+=' alert alert-danger'
    const ul=document.createElement('ul')
    container.appendChild(ul)
    arr.flat().forEach((error)=>{
      ul.innerHTML+=`<li>${error}</li>`
    })

  }
}
