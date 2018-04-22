//@ts-check

$(function() {

  // jQuery selectors
  const $primaryDisplay = $('.calc__display--primary');
  const $secondaryDisplay = $('.calc__display--secondary');
  


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
      const total = eval(formattedArr.join(''));
      if (total % 1 === 0) {
        return total;
      }
      else {
        return total.toFixed(2);
      }
    }
    return false;
  }


  // remove last entry made to CALC_ARRAY
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


  // find and return string of last CALC_ARRAY entry
  function getLastEntry() {

    let lastEntry = [];

    for(let i = CALC_ARR.length -1; i>=0; i--) {
      if (
        CALC_ARR[i] === '+'
        || CALC_ARR[i] === '-' 
        || CALC_ARR[i] === '×' 
        || CALC_ARR[i] === '÷' 
      ) {  
  
        if (lastEntry.length > 0) {
          return lastEntry.join('');  
        }
        else {
          return CALC_ARR[i];
        }
      } 
      lastEntry.unshift(CALC_ARR[i]);
    }
    return lastEntry.join('');
  }


  function clearInput(input) {

    input.text('0');
  }


  function clearAllInputs() {

    clearInput($primaryDisplay);
    clearInput($secondaryDisplay);
  }


  function setSecondaryDisplayEntries() {

    $secondaryDisplay.text(CALC_ARR.join('')); 
  }


  function ResetCalc() {

    CALC_ARR = [];
    clearAllInputs();
  }





  // handle all user inputs
  function handleInput(event) {

    const userInput = event.currentTarget.innerHTML;

    // clear max input error and start new
    if ($secondaryDisplay.text() === 'Digit Limit Met') {
      ResetCalc();
    }


    // clear calc
    if (userInput === 'AC') {
      ResetCalc();
    }

    
    // clear entry
    else if (userInput === 'CE') {

      // reset if calculation complete
      if ($secondaryDisplay.text().includes('=')) {
        ResetCalc();
      }
    
      // clear last entry if more than 1 entry exist
      else if (
        $secondaryDisplay.text().includes('+')
        || $secondaryDisplay.text().includes('-')
        || $secondaryDisplay.text().includes('×')
        || $secondaryDisplay.text().includes('÷')
      ) {	
        clearLastEntry();
        const currentLastEntry = getLastEntry();
     
        // set primaryInput based on lastEntry
        if (
          currentLastEntry === '+'
          || currentLastEntry === '-'
          || currentLastEntry === '×'
          || currentLastEntry === '÷'
        ) {
          clearInput($primaryDisplay);
          setSecondaryDisplayEntries();    
        }
        else {
          $primaryDisplay.text(currentLastEntry);
          setSecondaryDisplayEntries();
        }
      }

      else {
        ResetCalc();
      }
    }


    // decimal
    else if (userInput === '.') {

      // limit 1 decimal per entry 
      if (!($primaryDisplay.text().includes('.'))) { 

        // reset with decimal if calculation complete
        if ($secondaryDisplay.text().includes('=')) {
          $primaryDisplay.text('0' + userInput);
          $secondaryDisplay.text('0' + userInput);
          CALC_ARR = ['0' + userInput];
        }

        // starting next entry with decimal
        else if (	
          $primaryDisplay.text() === '+' 
          || $primaryDisplay.text() === '-'
          || $primaryDisplay.text() === '×' 
          || $primaryDisplay.text() === '÷'
        ) {
          $primaryDisplay.text('0' + userInput);
          $secondaryDisplay.append('0' + userInput);
          CALC_ARR.push('0' + userInput);
        }

        // add decimal to end of current input
        else {
          $primaryDisplay.append(userInput);
          $secondaryDisplay.append(userInput);
          CALC_ARR.push(userInput);
        }	
      }	
    }


    // calculate
    else if (userInput === '=') {

      // reject a 2nd calculation 
      if (
        $secondaryDisplay.text().includes('=') 
        || $primaryDisplay.text() === '+'
        || $primaryDisplay.text() === '-'
        || $primaryDisplay.text() === '×'
        || $primaryDisplay.text() === '÷'
      ) {	
        return false;
      }

      else {

        try {
          const total = calculate(CALC_ARR);
          $primaryDisplay.text(total);
          $secondaryDisplay.append(userInput+total);
          CALC_ARR = [total.toString()];
        }
        catch(error) {
          $primaryDisplay.text('error');
        }
      }
    }
    

    // operators
    else if (
      userInput === '+' 
      || userInput === '-' 
      || userInput === '×' 
      || userInput === '÷' 
    ) {

      // add operator to calculation result
      if ($secondaryDisplay.text().includes('=')) {
        $primaryDisplay.text(userInput);
        $secondaryDisplay.text((CALC_ARR).join('')).append(userInput);
        CALC_ARR.push(userInput);
      }
      
      // add operator if calc not reset and operator not in use
      else if (
        $secondaryDisplay.text() !== '0'
        && CALC_ARR[CALC_ARR.length-1] !== '+' 
        && CALC_ARR[CALC_ARR.length-1] !== '-'
        && CALC_ARR[CALC_ARR.length-1] !== '×'
        && CALC_ARR[CALC_ARR.length-1] !== '÷'
      ) {
        
        $primaryDisplay.text(userInput);
        $secondaryDisplay.append(userInput);
        CALC_ARR.push(userInput);
      } 
    } 
    
    
    // numbers
    else {

      // reset with user input after calculation
      if ($secondaryDisplay.text().includes('=')) {
        $primaryDisplay.text(userInput);
        $secondaryDisplay.text(userInput);
        CALC_ARR = [userInput];
      }

      // on startup or after CE
      else if ($primaryDisplay.text() === '0') {

        // replace default 0s with inputs
        if (
          $secondaryDisplay.text() === '0' 
          && userInput !== '0'
        ) { 
          $primaryDisplay.text(userInput);
          $secondaryDisplay.text(userInput);
          CALC_ARR.push(userInput);
        }
        
        // append to last entries after CE
        else if (
          $secondaryDisplay.text().includes('+')
          || $secondaryDisplay.text().includes('-')
          || $secondaryDisplay.text().includes('×')
          || $secondaryDisplay.text().includes('÷')
        ) {	
          if (userInput !== '0') {
            $primaryDisplay.text(userInput);
            $secondaryDisplay.append(userInput);
            CALC_ARR.push(userInput);
          } 
        }
      }

      // clear operator and display current input
      else if (
        $primaryDisplay.text() === '+' 
        || $primaryDisplay.text() === '-' 
        || $primaryDisplay.text() === '×' 
        || $primaryDisplay.text() === '÷'
      ) {

        // prevent starting zeros
        if (userInput !== '0') {
          $primaryDisplay.text(userInput);
          $secondaryDisplay.append(userInput);
          CALC_ARR.push(userInput);
        } 
      }
      
      else {
        $primaryDisplay.append(userInput);
        $secondaryDisplay.append(userInput);
        CALC_ARR.push(userInput);
      } 
    }

    // text overflown
    if (
      $primaryDisplay[0].scrollWidth >  $primaryDisplay.innerWidth() 
      || $secondaryDisplay[0].scrollWidth >  $secondaryDisplay.innerWidth() 
    ) {
      clearInput($primaryDisplay);
      $secondaryDisplay.text('Digit Limit Met');
    }

    console.log('CALC_ARR',CALC_ARR);
  }
  
  $('.calc__button').click('click', handleInput);

});