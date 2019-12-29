class CountDown {
  constructor(date) {
    this.date=date
  }

  daysRemaining(){
    // Set the date we're counting down to
    const countDownDate = new Date(this.date).getTime();

    // Update the count down every 1 second
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));


  // Output the result in an element with id="demo"
  return days;

  // If the count down is over, write some text
  // if (distance < 0) {
  //   clearInterval(x);
  //   document.getElementById("demo").innerHTML = "EXPIRED";
  // }

  }
}
