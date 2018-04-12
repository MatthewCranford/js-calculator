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


  // holds numbers for calculation
  let calcArr = [];

  
  function calculate(calcArr) {
   
    for(let i=0; i<calcArr.length; i++) {
      // console.log(calcArr[i]);
      let input = calcArr[i];
      if (input === "×") {
        calcArr[i] = "*";
      }
      else if (input === "÷") {
        calcArr[i] = "/"
      }
      
      
    }
    let calculation = eval(calcArr.join(''));
    console.log(calculation);
    console.log(eval(calculation));
    return calculation;
    // let newCalc = calculation.split(re);
    // console.log(newCalc);
    
    
  
  }

  // removes last entries made to secondary input
  function clearEntry() {
    for(let i = calcArr.length -1; i>=0; i--) {
      if(calcArr[i] === "+" || calcArr[i] === "-" || calcArr[i] === "×" || calcArr[i] === "÷") {
        break;
      }
      calcArr.pop();
    }
  }

  function addInput(event) {

    const userVal = event.currentTarget.innerHTML
	
    // clear calc
    if (userVal === "AC") {
      $primaryInput.text("0");
      $secondaryInput.text("0")
      calcArr = [];
		}
    // clear primary input
    else if (userVal === "CE") {
      $primaryInput.text("0");
      clearEntry()
    }
    // operator inputs
    else if (userVal === "+" || userVal === "-" || userVal === "×" || userVal === "÷" || userVal === "=") {

			if ($secondaryInput.text().includes("=")) {

				if (userVal === "=") {
					return false;
				}
				$primaryInput.text(userVal);
				$secondaryInput.text(calcArr[-1]);
			}
			
			
      // check that number was passed first
      else if ($secondaryInput.text() !== "0") {

        // check that an operator isn't already active
        if ($primaryInput.text() !== "+" && $primaryInput.text() !== "-" && $primaryInput.text() !== "×" && $primaryInput.text() !== "÷") {
          if(userVal === "=") {
            let total = calculate(calcArr);
            $primaryInput.text(total);
						$secondaryInput.append(userVal+total);
						calcArr = [total.toString()];

          }
          else {
            $primaryInput.text(userVal);
            $secondaryInput.append(userVal);
            calcArr.push(userVal);
          }
         
        } 
      } 
		}
		
    // handle all number inputs
    else {

			if ($secondaryInput.text().includes("=")) {

				$primaryInput.text(userVal);
				$secondaryInput.text(userVal)
				calcArr = [userVal];

			}


      // if operator is being used
      else if ($primaryInput.text() === "+" || $primaryInput.text() === "-" || $primaryInput.text() === "×" || $primaryInput.text() === "÷") {
          $primaryInput.text(userVal);
          $secondaryInput.append(userVal);
          calcArr.push(userVal);
      }
      else if ($primaryInput.text() === "0") {

        // check if anything is stored in secondary input
        if ($secondaryInput.text() === "0") {
          $primaryInput.text(userVal);
          $secondaryInput.text(userVal);
          calcArr.push(userVal);
        }
        else {
          $primaryInput.text(userVal);
          $secondaryInput.append(userVal);
          calcArr.push(userVal);
        }
      }
      else {
        $primaryInput.append(userVal);
        $secondaryInput.append(userVal);
        calcArr.push(userVal);
      } 
    }
    console.log(calcArr)
 
  }

  
  $(".button").click("click", addInput);

});