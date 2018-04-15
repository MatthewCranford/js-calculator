$(function() {

	// jQuery selectors
  const $primaryInput = $('#primary-input');
  const $secondaryInput = $('#secondary-input');
  const $ac = $('#ac');
  const $ce = $('#ce');
  const $divide = $('#divide');
  const $multiply = $('#multiply');
  const $minus = $('#minus');
  const $plus = $('#plus');
  const $equal = $('#equal');
  const $decimal = $('#decimal');
  const $zero = $('#zero');
  const $one = $('#one');
  const $two = $('#two');
  const $three = $('#three');
  const $four = $('#four');
  const $five = $('#five');
  const $six = $('#six');
  const $seven = $('#seven');
  const $eight = $('#eight');
  const $nine = $('#nine');


  // global holds numbers for calculation
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
			console.log(formattedArr[formattedArr.length-1])
			console.log(eval(formattedArr.join('')));
			return eval(formattedArr.join(''));
		 }
		 return false;
    
  }


  // removes last entries made to secondary input
  function clearEntry(valToClear) {
		
    for(let i = CALC_ARR.length -1; i>=0; i--) {
      if (CALC_ARR[i] === valToClear) { 
				CALC_ARR.pop();   
				break;
      } 
    }           
	}
	

	function clearLastEntry() {
		
    for(let i = CALC_ARR.length -1; i>=0; i--) {
      if (
				CALC_ARR[i] === '+'
				|| CALC_ARR[i] === '-' 
				|| CALC_ARR[i] === '×' 
				|| CALC_ARR[i] === '÷' 
			) {  
				break;	
			} 
			CALC_ARR.pop();
    } 
	}


  // handle all user inputs
  function addInput(event) {

    const userVal = event.currentTarget.innerHTML
	
    // clear calc
    if (userVal === 'AC') {
      $primaryInput.text('0');
      $secondaryInput.text('0')
      CALC_ARR = [];
		}

    // clear last entry
    else if (userVal === 'CE') {

			if (
				$primaryInput.text() === '+' 
				|| $primaryInput.text() === '-' 
				|| $primaryInput.text() === '×' 
				|| $primaryInput.text() === '÷'
			) {
				CALC_ARR.pop();
				$primaryInput.text('0');
				$secondaryInput.text(CALC_ARR.join(''));
			}

			else if ( $secondaryInput.text().includes('=') ) {
				clearEntry($primaryInput.text())
				$primaryInput.text('0');
				$secondaryInput.text('0');
			}
		
			else if (
				$secondaryInput.text().includes('+')
				|| $secondaryInput.text().includes('-')
				|| $secondaryInput.text().includes('×')
				|| $secondaryInput.text().includes('÷')
			) {	
				console.log('HEY!')
				clearLastEntry();
				$primaryInput.text('0');
				$secondaryInput.text(CALC_ARR.join(''));
			}

			else {
				clearEntry($primaryInput.text())
				$primaryInput.text('0');
				$secondaryInput.text('0');
			}
		}

		else if ( userVal === '.') {
			$primaryInput.prepend(userVal);
			CALC_ARR.splice(-1,1, $primaryInput.text());
		}
		
    // operator inputs
    else if (
			userVal === '+' 
			|| userVal === '-' 
			|| userVal === '×' 
			|| userVal === '÷' 
			|| userVal === '=' 
		) {

			if ($secondaryInput.text().includes('=')) {
				if (userVal === '=') {
					return false;
				}
				$primaryInput.text(userVal);
				$secondaryInput.text(CALC_ARR).append(userVal);
				CALC_ARR.push(userVal);
			}
			
      // check that number was passed first
      else if ($secondaryInput.text() !== '0') {

        // check that an operator isn't already active
        if (
					$primaryInput.text() !== '+' 
					&& $primaryInput.text() !== '-'
					&& $primaryInput.text() !== '×' 
					&& $primaryInput.text() !== '÷'
				) {
					console.log(CALC_ARR[CALC_ARR.length-1])
          if(userVal === '=') {

						const total = calculate(CALC_ARR)
						console.log('total',total);
						if (total) {
							$primaryInput.text(total);
							$secondaryInput.append(userVal+total);
							CALC_ARR = [total.toString()];
						}
						else {
							console.log('false');
						}
					
          }
          else if (
						CALC_ARR[CALC_ARR.length-1] !== '+' 
						&& CALC_ARR[CALC_ARR.length-1] !== '-'
						&& CALC_ARR[CALC_ARR.length-1] !== '×' 
						&& CALC_ARR[CALC_ARR.length-1] !== '÷'
					) {
            $primaryInput.text(userVal);
            $secondaryInput.append(userVal);
            CALC_ARR.push(userVal);
          }
        } 
      } 
		}
		
    // number inputs
    else {

			if ($secondaryInput.text().includes('=')) {
				$primaryInput.text(userVal);
				$secondaryInput.text(userVal)
				CALC_ARR = [userVal];
			}

      // if operator is being used
      else if (
				$primaryInput.text() === '+' 
				|| $primaryInput.text() === '-' 
				|| $primaryInput.text() === '×' 
				|| $primaryInput.text() === '÷'
			) {
          $primaryInput.text(userVal);
          $secondaryInput.append(userVal);
          CALC_ARR.push(userVal);
			}
			
      else if ($primaryInput.text() === '0') {

        // reset
        if ($secondaryInput.text() === '0') {
          $primaryInput.text(userVal);
          $secondaryInput.text(userVal);
          CALC_ARR.push(userVal);
				}
				
				// update primary input after CE"ing" operator
        else if (
					$secondaryInput.text().includes('+')
					|| $secondaryInput.text().includes('-')
					|| $secondaryInput.text().includes('×')
					|| $secondaryInput.text().includes('÷')
				) {	
					$primaryInput.text(userVal);
					CALC_ARR.push(userVal);
				}
				
        else {
					$primaryInput.text($secondaryInput.text()).append(userVal);
					$secondaryInput.append(userVal)
          CALC_ARR.push(userVal);
        }
			}
			
      else {
        $primaryInput.append(userVal);
				$secondaryInput.append(userVal)
        CALC_ARR.push(userVal);
      } 
		}
		
    console.log(CALC_ARR)
	}
	
  $('.button').click('click', addInput);
});