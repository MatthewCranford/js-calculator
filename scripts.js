//@ts-check

$(function() {

  // jQuery selectors
  const $primaryInput = $('#primary-input');
  const $secondaryInput = $('#secondary-input');
  


  // GLOBAL holds numbers for calculation
  let CALC_ARR = [];

  
  // calculate contents of global CALC_ARR
  function calculate(CALC_ARR) {
   
    const formattedArr = CALC_ARR.map( (input) => {
      if (input === '×') {
        return '*';
      }
      else if (input === '÷') {
        return '/';
      } 
      else {
        return input;
      }
    });
    
    if (
      formattedArr[formattedArr.length-1] !== '+'
      && formattedArr[formattedArr.length-1] !== '-'
      && formattedArr[formattedArr.length-1] !== '*'
      && formattedArr[formattedArr.length-1] !== '/'
    ) {
      console.log(formattedArr[formattedArr.length-1]);
      console.log(eval(formattedArr.join('')));
      return eval(formattedArr.join(''));
    }
    return false;
  }


  // removes last entries made to secondary input
  function clearLastEntry() {
    
    let entryCleared = false;

    for(let i = CALC_ARR.length -1; i>=0; i--) {
      if (
        CALC_ARR[i] === '+'
        || CALC_ARR[i] === '-' 
        || CALC_ARR[i] === '×' 
        || CALC_ARR[i] === '÷' 
      ) {  
        if (entryCleared) {
          break;	
        } 
        else {
          CALC_ARR.pop();
          break;
        } 
      }
      CALC_ARR.pop();
      entryCleared = true;
    } 
  }


  function clearInput(input) {
    input.text('0');
  }


  function clearAllInputs() {
    clearInput($primaryInput);
    clearInput($secondaryInput);
  }


  function setInputText(input, inputText) {
    input.text(inputText);
  }


  function ResetCalc() {
    CALC_ARR = [];
    clearAllInputs();
  }


  // handle all user inputs
  function handleInput(event) {

    const userVal = event.currentTarget.innerHTML;
  
    // clear max input error and start new
    if ($secondaryInput.text() === 'Digit Limit Met') {
      ResetCalc();
    }

    // max input limit reached
    if ($primaryInput.text().length === 10) {
      clearInput($primaryInput);
      setInputText($secondaryInput, 'Digit Limit Met');
      return false;
    }

    // clear calc
    if (userVal === 'AC') {
      ResetCalc();
    }


    // clear entry
    else if (userVal === 'CE') {

      // reset if calculation complete
      if ($secondaryInput.text().includes('=')) {
        ResetCalc();
      }
    
      // clear last entry
      else if (
        $secondaryInput.text().includes('+')
        || $secondaryInput.text().includes('-')
        || $secondaryInput.text().includes('×')
        || $secondaryInput.text().includes('÷')
      ) {	
        clearLastEntry();
        clearInput($primaryInput);
        setInputText($secondaryInput, CALC_ARR.join(''));
      }

      else {
        ResetCalc();
      }
    }


    // decimal
    else if (userVal === '.') {

      // 1 decimal per calculation limit
      if (!($primaryInput.text().includes('.'))) { 

        // reset with decimal if calculation complete
        if ($secondaryInput.text().includes('=')) {
          $primaryInput.text('0' + userVal);
          $secondaryInput.text('0' + userVal);
          CALC_ARR = ['0' + userVal];
        }

        // starting next entry with decimal
        else if (	
          $primaryInput.text() === '+' 
          || $primaryInput.text() === '-'
          || $primaryInput.text() === '×' 
          || $primaryInput.text() === '÷'
        ) {
          $primaryInput.text('0' + userVal);
          $secondaryInput.append('0' + userVal);
          CALC_ARR.push('0' + userVal);
        }

        // add decimal to end of current input
        else {
          $primaryInput.append(userVal);
          $secondaryInput.append(userVal);
          CALC_ARR.push(userVal);
        }	
      }	
    }

    // calculate
    else if (userVal === '=') {

      // reject a 2nd calculation 
      if (
        $secondaryInput.text().includes('=') 
        || $primaryInput.text() === '+'
        || $primaryInput.text() === '-'
        || $primaryInput.text() === '×'
        || $primaryInput.text() === '÷'
      ) {	
        return false;
      }

      else {

        try {
          const total = calculate(CALC_ARR);
          $primaryInput.text(total);
          $secondaryInput.append(userVal+total);
          CALC_ARR = [total.toString()];
        }
        catch(error) {
          $primaryInput.text(error);
        }
      }
    }
    

    // operators
    else if (
      userVal === '+' 
      || userVal === '-' 
      || userVal === '×' 
      || userVal === '÷' 
    ) {

      // add operator to calculation result
      if ($secondaryInput.text().includes('=')) {
        $primaryInput.text(userVal);
        $secondaryInput.text((CALC_ARR).join('')).append(userVal);
        CALC_ARR.push(userVal);
      }
      
      // add operator
      else if (
        $secondaryInput.text() !== '0'
        && $primaryInput.text() !== '+' 
        && $primaryInput.text() !== '-'
        && $primaryInput.text() !== '×'
        && $primaryInput.text() !== '÷'
      ) {
        $primaryInput.text(userVal);
        $secondaryInput.append(userVal);
        CALC_ARR.push(userVal);
      } 
    } 
    
    

    // numbers
    else {

      if ($secondaryInput.text().includes('=')) {
        $primaryInput.text(userVal);
        $secondaryInput.text(userVal);
        CALC_ARR = [userVal];
      }

      else if (
        $primaryInput.text() === '+' 
        || $primaryInput.text() === '-' 
        || $primaryInput.text() === '×' 
        || $primaryInput.text() === '÷'
      ) {
        if (userVal !== '0') {
          $primaryInput.text(userVal);
          $secondaryInput.append(userVal);
          CALC_ARR.push(userVal);
        }
         
      }
      
      else if ($primaryInput.text() === '0') {

        if ($secondaryInput.text() === '0') { 
          $primaryInput.text(userVal);
          $secondaryInput.text(userVal);
          CALC_ARR.push(userVal);
        }
        
        else if (
          $secondaryInput.text().includes('+')
          || $secondaryInput.text().includes('-')
          || $secondaryInput.text().includes('×')
          || $secondaryInput.text().includes('÷')
        ) {	
          $primaryInput.text(userVal);
          $secondaryInput.append(userVal);

          CALC_ARR.push(userVal);
        }
        
        else {
          $primaryInput.text($secondaryInput.text()).append(userVal);
          $secondaryInput.append(userVal);
          CALC_ARR.push(userVal);
        }
      }
      
      else {
        $primaryInput.append(userVal);
        $secondaryInput.append(userVal);
        CALC_ARR.push(userVal);
      } 
    }
    console.log(CALC_ARR);
  }
  
  $('.calc__button').click('click', handleInput);
});