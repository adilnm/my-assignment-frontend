class CountDown {
  constructor(date) {
    this.date=date
  }

  daysRemaining(){
    // Set the date we're counting down to
    const countDownDate = new Date(this.date).getTime();

  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))+1;


  // Output the result in an element with id="demo"
  const span=document.createElement('span')

  if (days>3) {
    span.className="badge badge-pill badge-primary"
    span.innerText=days+" days remaining"
  }
  else if (days<=3 && days>1) {
    span.className="badge badge-pill badge-warning"
    span.innerText=days+" days remaining"
  }
  else if (days<=1 && days>0) {
    span.className="badge badge-pill badge-danger"
    span.innerText=days+" day remaining"
  }

  else if (days==0) {
    span.className="badge badge-pill badge-danger"
    span.innerText="Less than one day remaining"
  }
  else{
    span.className="badge badge-pill badge-secondary"
    span.innerText="Past due date"
  }

  return span;
  }
}
