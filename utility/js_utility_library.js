// This is my own implementation of some of the functionality that the underscore.js 
// library offers.  I will be using this library to solve some of the Project Euler 
// problems and just for JS development in general.  This library is split up into 
// sections on collections, arrays, functions and objects.

// ==================  Collections  ===================

/**
 * The each function will iterate over an array and call a function
 * on each element in the array.
 * @param {array}    inputObject    The array of elements we want to iterate over
 * @param {function} functionToCall The function we want to call on the current element
 **/
function each (inputObject, functionToCall) { 
  // We will loop through the input array and call the function each time thorugh
  for (var index in inputObject) {
    functionToCall.apply(inputObject[index], [inputObject[index]]);
  }
}

/**
 * This is a function that will take in an array and an iterator and apply that iterator
 * to each element in the array.  The results will be added to a new array and it will
 * be returned.
 * @param {object}   originalObject   The array of which we want to call the iterator on each of its elements.
 * @param {function} iteratorFunction The function we want to apply to each element of the array.
 * @return {array} A replica of the original array with the iterator applied to each element.
 */
function map (originalObject, iteratorFunction) {
	// Create the array we are going to fill up.
	var returnArray = [],
	    mapper = function(value) {
        returnArray.push(iteratorFunction.apply(iteratorFunction, [value]));
	    };
	each(originalObject, mapper);
	return returnArray;
}

/**
 * This is a function that will take an array and boil it down into one value.  It will
 * call the iterator on each member of the array until we have one value.
 * @param {object}   originalObject   The object we will be boiling down.
 * @param {function} iteratorFunction The function we are going to apply in order to boil down.
 * @param {object}   initialValue     The initial value for the value we are boiling down.
 * @return {object} The boiled down value after applying the iterator function.
 */
function reduce (originalObject, iteratorFunction, initialValue) {
  // We will loop though the originalObject and apply the iterator function.
  var returnValue = initialValue;
  for (var index in originalObject) {
    returnValue = iteratorFunction.apply(iteratorFunction, [returnValue, originalObject[index]]);
  }
  return returnValue;
}

/**
 * The where function will take in an array of objects and return the ones that match
 * match the properties the user passes in.
 * @param {Array} arrayOfObjects The objects we are going to be looking through.
 * @param {Object} properties    The properties the user wants to match on
 * @return {Array} The array of objects that match the properties the user has specified.
 */
function where (arrayOfObjects, properties) {
	// The return array we are going to pass back to the user with the objects that
	// matched the properties.
	var returnArray = [],
	    matcher = function (object) {
	    	for (var index in properties) {
	    		// If we find that the value on the object we are testing does
	    		// not equal the property the user wanted we will return.
	    		if (object[index] !== properties[index]) {
            return;
	    		}
	    	}
	    	// If we got to here all of the values have matched so we will push it it.
	    	returnArray.push(object);
	    }
	each(arrayOfObjects, matcher);
	return returnArray;
}

/**
 * This function will exclude items based on a predicate function.  The function should return
 * true or false. If it returns true the value will be included in the return array and if it 
 * returns false it will not be included.
 * @param {object}   inputObject This will be an array or object that we will be examining.
 * @param {function} predicateFunction The function that will determine if things should be 
 *                                     included in the result set or not.
 * @return {array} This will be an array of the values that made the predicate return true.
 */
function reject (inputObject, predicateFunction) {
	// The return array which will be filled with the values that make the predicate function return true.
	var returnArray = [];
	    evaluator = function (value) {
	    	if (predicateFunction.apply(predicateFunction, [value])) {
	    		returnArray.push(value);
	    	}
	    };
	each(inputObject, evaluator);
	return returnArray;
}

/**
 * The pluck function will take in an array of objects and an attribute we want to grab
 * from each one.  The function will grab the attribute from each one and return an array
 * of all of the attributes.
 * @param {array}  arrayOfObjects The array of objects we want to pluck things from.
 * @param {string} attribute      The attribute we want to pluck from our objects.
 * @return {array} An array of all of the values for the attribute we are looking for.
 */
function pluck (arrayOfObjects, attribute) {
	// Make sure the user has passed in an array as the first param.
	validateInputWasArray(arrayOfObjects);
	//array to store all of the plucked attributes
	var arryOfPluckedAttributes = [];
	    // Function to be passed to each, that will pluck the attribute we want from the objects.
	    plucker = function () {
	    	if (this[attribute]) {
          arryOfPluckedAttributes.push(this[attribute]);
	    	}
 	    }
	each(arrayOfObjects, plucker);
	return arryOfPluckedAttributes;
}

/**
 * This function will validate that an object is an array and if not it will throw
 * an exception with reference to the function that called it.
 * @param {object} objectToTest The argument to validate.
 */
function validateInputWasArray (objectToTest) {
  if (!isObjectArray(objectToTest)) { 
		throw {
			name: 'Invalid input',
			message: 'First argument into ' + arguments.callee.caller.name + ' function must be array.',
			toString: function() {return this.name + ': ' + this.message;}
		};
	}
}

/**
 * This is a helper function so we can call .isArray on anything and get true or false.
 * @param {object} objectToTest The object we want to test is an array or not.
 * @return {bool} True if the object is an array and false if it is not.
 */
function isObjectArray(objectToTest) {
	var result = Array.isArray(objectToTest) ? true : false;
	return result;
}

/**
 * This function will allow you to call a function with a specified number of times.
 * You could call this like => _.times(5, function(){console.log('Jake Dean')});
 * @param {int}      numberOfTimes     This will be the number of times we will call the function.
 * @param {function} functionToCall    The function we will call.
 * @param {array}    arrayOfArguments  The array of arguments we want to pass to functionToCall.
 */
function times (numberOfTimes, functionToCall, arrayOfArguments) {
	validateInputWasArray(arrayOfArguments);
  for (var i = 0; i < numberOfTimes; i++) {
    functionToCall.apply(functionToCall, [arrayOfArguments]);
  }
}

/**
 * The partial application function will take in a param and apply that param to every call of the 
 * function after that.  For example if you had a function that you wanted to add 5 to
 * every subsequent call of the function after that, you could partially apply the function
 * with the argument of 5.
 * @param {function} functionToCall  The function that the user wants to partially apply arguments to.
 * @param {Object}   initialArgument The argument that will be applied to all full applications of the function.
 * @return {function} function the the user can fill will all of the args it wants.
 */
 function partialApplication (functionToCall, inititalArgument) {
 	// Return a function so the user can fill it up with args and complete the full application
 	// of this function call.
 	return function (/* args */) {
 		var fullArgList = constructArgs(inititalArgument, arguments);
    return functionToCall.apply(functionToCall, fullArgList);
 	}
 }

 /**
  * Construct a list of arguments based on an initial argument and a second argument list.
  * @param {Object} initialArgument The initial argument.
  * @param {Object} secondArgumentList The second list of arguments.
  * @return {array} The array of all of the arguments.
  */
 function constructArgs (initialArgument, secondArgumentList) {
   // We will convert the second argument list into an array and add the initial arg to front.
   var secondArgumentArray = toArray(secondArgumentArray);
   secondArgumentArray.unshift(initialArgument);
   return secondArgumentArray;
 }

 /**
  * This will turn a list of arguments into a real array.
  * @param {object} The arguments to a function.
  * @return {array} The argumetns in array form.
  */
 function toArray(argumentsObject) {
 	return Array.prototype.slice.call(argumentsObject);
 }


 // ===============  Array Section ==================

 