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


  let calcArr = [];
  function calculate(arr) {
    
   console.log(arr);
  }

  function addInput(event) {
    const userVal = event.currentTarget.innerHTML
   
    // console.log(event);
    // console.log(event.currentTarget.id)
    if (userVal === "AC") {
      $primaryInput.text("0");
      $secondaryInput.text("0");
    }
    else if (userVal === "CE") {
      $primaryInput.text("0");
    }
    else if (userVal === "=") {
      console.log("true");
      calculate(calcArr);
    }
    else if (userVal === "+" || userVal === "-" || userVal === "×" || userVal === "÷") {
      if ($primaryInput.text() !== "+" && $primaryInput.text() !== "-" && $primaryInput.text() !== "×" && $primaryInput.text() !== "÷") {
        if ($primaryInput.text() !== "0") {
          calcArr.push($primaryInput.text());
        }
        $primaryInput.text(userVal);
        console.log(calcArr);
      }
      
    }
    else {
      if ($primaryInput.text() === "0" || $primaryInput.text() === "+" || $primaryInput.text() === "-" || $primaryInput.text() === "×" || $primaryInput.text() === "÷") {
        if ($primaryInput.text() !== "0") {
          calcArr.push($primaryInput.text());
        }
        $primaryInput.text(userVal);
        $secondaryInput.text(userVal);
        console.log(calcArr);
      }
      else {
        $primaryInput.append(userVal);
        $secondaryInput.append(userVal);
      }
    
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