$(function() {

  const $primaryInput = $("#primary-input");
  const $secondaryInput = $("#secondary-input");
  const $ac = $("#ac");
  const $ce = $("#ce");
  const $divide = $("#divide");
  const $multiply = $("#multiply");
  const $minus = $("#minus");
  const $plus = $("#plus");
  const $equal = $("#equal");
  const $decimal = $("#decimal");
  const $zero = $("#zero");
  const $one = $("#one");
  const $two = $("#two");
  const $three = $("#three");
  const $four = $("#four");
  const $five = $("#five");
  const $six = $("#six");
  const $seven = $("#seven");
  const $eight = $("#eight");
  const $nine = $("#nine");

  function addInput(event) {
    const val = event.currentTarget.innerHTML
    // console.log(event);
    // console.log(event.currentTarget.id)
    if (val === "AC") {
      $primaryInput.text("0");
      $secondaryInput.text("0");
    }
    else if (val === "CE") {
      $primaryInput.text("0");
    }
    else {
      $primaryInput.append(val);
      $secondaryInput.append(val);
    }
    
 
  }

//   $ac.click("click", function() {
//      $primaryInput.text("Ø");
//      $secondaryInput.text("Ø");
//   });

//   $ce.click("click", function() {
//     $primaryInput.text("Ø");
//  });

  $(".button").click("click", addInput);

  
 

 






});