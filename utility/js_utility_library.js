// This is my own implementation of some of the functionality that the underscore.js 
// library offers.  I will be using this library to solve some of the Project Euler 
// problems and just for JS development in general.  This library is split up into 
// sections on collections, arrays, functions and objects.  I have not added all of the
// functions from the underscore.js library, just the ones I thought I would use.  i am 
// using module.exports so this can be used as a node.js module.

// Create a scope here for the library
(function() {
  // ==================  Collections  ===================

  /**
   * The each function will iterate over an array and call a function
   * on each element in the array.
   * @param {array}    inputObject    The array of elements we want to iterate over
   * @param {function} functionToCall The function we want to call on the current element
   */
  function each (inputObject, functionToCall) { 
    // We will loop through the input array and call the function each time thorugh
    for (var index in inputObject) {
      functionToCall.apply(inputObject[index], [inputObject[index], index]);
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
   * Return the sum of the numbers in an array.
   * @param  {array}  The array of numbers we want to sum.
   * @return {number} The sum of the numbers in the array.
   */
  function sum (arrayOfNumbers) {
    var sumFunction = function (currentSum, currentValue) {
          return (currentSum + currentValue);
        },
        returnSum = reduce(arrayOfNumbers, sumFunction, 0);
    return returnSum;
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
  	    plucker = function (currentObject) {
  	    	if (currentObject[attribute]) {
            arryOfPluckedAttributes.push(currentObject[attribute]);
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
    if (!isArray(objectToTest)) { 
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
  function isArray(objectToTest) {
  	return Array.isArray(objectToTest);
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
   * @param {object}   initialArgument The argument that will be applied to all full applications of the function.
   * @param {object}   context         The context we are going to bind the function to.
   * @return {function} function the the user can fill will all of the args it wants.
   */
   function partialApplication (functionToCall, context, inititalArguments) {
   	// Set the context to the context the user passed in or the function to call.
   	var context = context || functionToCall;
   	// Return a function so the user can fill it up with args and complete the full application
   	// of this function call.
   	return function (/* args */) {
   		var fullArgList = constructArgs(inititalArguments, arguments);
      return functionToCall.apply(context, fullArgList);
   	}
   }

   /**
    * Construct a list of arguments based on an initial argument and a second argument list.
    * @param {Object} initialArgument The initial argument.
    * @param {Object} secondArgumentList The second list of arguments.
    * @return {array} The array of all of the arguments.
    */
   function constructArgs (initialArguments, secondArgumentList) {
     // We will convert the second argument list into an array and add the initial arg to front.
     return initialArguments.concat(toArray(secondArgumentList));
   }

   /**
    * This will turn a list of arguments into a real array.
    * @param {object} The arguments to a function.
    * @return {array} The argumetns in array form.
    */
   function toArray(argumentsObject) {
   	return Array.prototype.slice.call(argumentsObject);
   }

   /**
    * This will turn a number that is in string form to a number.
    * @param  {string} A number that is in a string form.
    * @return {number} A number.
    */
   function toNumber(numberToConvert) {
    return parseInt(numberToConvert);
   }


   // ===============  Array Section ==================

   /**
    * The first function will return the first element from an array.
    * @param  {array}  The array we are processing.
    * @param  {int}    The number of elements we want to return
    * @return {object} If the user wants just one we return the object, if more than one we return
    *                  an array.
    */
   function first (arrayToProcess, numberToReturn) {
     // Check if we have a number to return, if not we will return just the first element.
     var numberWeWillReturn = numberToReturn || 1;
     returnArray = arrayToProcess.slice(0, numberWeWillReturn);
     return (numberWeWillReturn === 1) ? returnArray[0] : returnArray;
   }

   /**
    * Return the last element of the array, or an array of the last n elements.
    * @param  {array}  The array we are processing.
    * @param  {int}    The number of elements we want to return.
    * @return {object} The last element if the user wants to see the last one or an array
    *                  of the last n elements if the user wants to see more than 1.
    */
   function last (arrayToProcess, numberToReturn) {
   	var numberWeWillReturn = numberToReturn || 1;
   	returnArray = arrayToProcess.slice(numberWeWillReturn * -1);
   	return (numberWeWillReturn === 1) ? returnArray[0] : returnArray;
   }

   /**
    * Flatten an array, if there is not a second param or the second param is true
    * we will only flatten it one level.
    * @param  {array} arrayToFlatten The array we want to flatten.
    * @param  {bool}  isShallow      True if we only want to flatten the array one level, false if not.
    * @return {array} The flattened array.
    */
   function flatten (arrayToFlatten, isShallow) {
   	// The first time this is called we set this is false.
     var stopFlatening = stopFlatening || false,
         returnArray = [],
         flattener = function (value) {
         	 // If the value is an array and we need to keep flattening call each again.
           if (isArray(value) && !stopFlatening) {
           	  // If the user wants this to be a shallow flatten set stopFlatening to true.
           	  if (isShallow && !stopFlatening) {
           	  	stopFlatening = true;
           	  }
             each(value, flattener);
           } else {
           	// This value is not an array, just push it into the return array.
           	returnArray.push(value);
           }
         };
      // Make the call to flatten this thing.
      each(arrayToFlatten, flattener);
      return returnArray;
   }

   /**
    * Return just the unique values in an array.
    * @param  {array} The array we want to return the unique values from.
    * @param  {bool}  True if you want a sorted array, false if not.
    * @param  {bool}  True if the arrays are numbers, we will conver to numbers 
    *                 for the compare to make sure we are not comparing strings.
    * @return {array} A copy of the array passed in with only the unique values.
    */
   function unique (arrayToProcess, sort, areNumberArrays) {
    var returnArray = [];
    each(arrayToProcess, function (value) {
      if (returnArray.indexOf(value) === -1) {
        returnArray.push(value);
      }
    });
    if (areNumberArrays) {
      // Convert string to int here in this compare function.
      var strToIntCompareFunction = function (a, b) {
        var intA = parseInt(a),
            intB = parseInt(b);
        // Do the comparison here.
        if (intA < intB) {
          return -1;
        } else if (intA > intB) {
          return 1;
        } else {
          return 0;
        }
      }
      return (sort) ? returnArray.sort(strToIntCompareFunction): returnArray; 
    } else {
      return (sort) ? returnArray.sort(): returnArray;
    }
   }

   /**
    * This function will return an array without the values in the array contained in the second param.
    * @param {array} inputArray      The array we will look to take things out of.
    * @param {array} valuesToExclude The array of values we will look to exclude.
    * @return {array} The array of values from the input array minus the ones in the valuesToExcludeArray.
    */
   function without (inputArray, valuesToExclude) {
     var returnArray = [],
   	     exclusionFunction = function(value) {
   	 	     if (valuesToExclude.indexOf(value) === -1) {
   	 		     returnArray.push(value);
   	 	     }
   	     };
   	  each(inputArray, exclusionFunction);
   	  return returnArray;
   }

  /**
   * The range function will create an array of numbers, you can pass in a start, stop and step.
   * @param {int} stop The value we will stop the array at.
   * @param {int} start The value we will start the array at.
   * @param {int} step  The value we will increment each element in the array by.
   */
  function range (stop, start, step) {
  	var start = start || 0,
  	    step = step || 1,
        returnArray = [];
  	for (var i = start; i <= stop; i += step) {
  		returnArray.push(i);
  	}
  	return returnArray;
  }

  /**
   * This function will turn two arrays into one object.  The first array will be the keys,
   * the second array will be the values.
   * @param {array} keyArray   This array will have the keys of the final object.
   * @param {array} valueArray This array will have the values of the final object.
   * @return {object} The final object with the keys from the first array and values from second.
   */
  function arrayToObject (keyArray, valueArray) {
  	var returnObject = {},
        arraysToObjectFunction = function (index) {
          returnObject[keyArray[index]] = valueArray[index];
        };
    each(keyArray, arraysToObjectFunction);
    return returnObject;
  }


  //============= The Function Section! ===============

  /**
   * This function will bind the context of a function to an object.  It will also give this function
   * default args.
   * @param  {function} functionToBind The function we are going to apply the 'this' reference to.
   * @param  {object}   objectToBindTo The object we are going to set as the 'this' for.
   * @param  {args}     args*          The args we are going to set as the default for the function.
   * @return {function} The function we passed in as the first param with the context set as the object
   *                     we passed in and the args we passed in as defaults.
   */
  function bind (functionToBind, objectToBindTo /* args */) {
    // Get the addtional args the user has passed in as defaults for the fucntion.
    var defaultArgs = Array.prototype.slice.call(arguments, 2);
    // We will call the partial application function and pass it the function, the object to
    // bind to and the additional arguments.
    return partialApplication(functionToBind, objectToBindTo, defaultArgs);
  }

  /**
   * Only allow a function to be called every certain number of seconds.  For example if we have 
   * a button on the page and the user keeps pressing it, we will set a number of seconds between
   * executions of the action.
   * @param {object}    The function we want to throttle.
   * @param {number}    The number of miliseconds we want to wait in between invocations.
   * @return {function} A new throttled version of the function that will only be invoked once every
   *                    number of seconds the user specifies.
   */
  function throttle (functionToThrottle, delay /* args */) {
    // we will return a function that will keep track of the last time it was invoked
    // and if that difference is less than the delay it will not fire again.
    var startTimer,
        argumentsArray = toArray(arguments);
    return function () {
      // First we will turn the arguments into an array
      var functionToThrottleArguments = (argumentsArray.length > 2) ? argumentsArray.slice(2) : [];
      
      // Now we will see if the current date - startTimer > delay, if it is we will call the function
      // to throttle, if not we will not call it.
      var newTime = Date.now();
      // The first time the function is called startTimer will be undefined
      // so allow that to fire and if the delay has passed since the last invocation.
      if (!startTimer || (newTime - startTimer > delay)) {
        // Call the function
        functionToThrottle.apply(null, functionToThrottleArguments);
        // reset the timer
        startTimer = Date.now();
      }
        
    }
  }

  /**
   * Only call the function that is passed in once. Usefull for init functions.
   * @param  {function} The function we only want to call once.
   * @return {mixed}   The return value of the original function.
   */
  function once (functionToCallOnce /* args */) {
    // return a version of functionToCallOnce that can only be called once.
    var argsForFunctionToCallOnce = toArray(arguments).slice(1),
        hasBeenCalled = false;
    return function() {
      if (!hasBeenCalled) {
        // Call this function and then set hasBeenCalled to true.
        functionToCallOnce.apply(null, argsForFunctionToCallOnce);
        hasBeenCalled = true;
      }
    }
  }

  // ==================== The Object Section =========================

  /**
   * Return the names of all the keys in an object.
   * @param  {object} The object we want to return the keys for.
   * @return {array}  An array of keys.
   */
  function keys (objectToGrabKeysFrom) {
    // Make an array for the keys to be put into.
    var theKeyArray = [],
        keyGrabber = function (value, key) { theKeyArray.push(key) };
    each(objectToGrabKeysFrom, keyGrabber);
    return theKeyArray;
  }

  /**
   * Return the value for the values in an object.
   * @param  {object} The object we want to get the values for.
   * @return {array}  The array of the values in an object.
   */
  function values (objectToGrabValuesFrom) {
    // Make a value array
    var valueArray = [],
    valueGrabber = function (value) { theValueArray.push(value) };
    each(objectToGrabValuesFrom, valueGrabber);
    return theValueArray;
  }

  /**
   * Return an array of arrays, each inner array will be a key value pair.
   * @param  {object} The object we want to make the pairs from.
   * @return {array}  A 2d array of key value pairs => [['one', 1], ['two', 2]]
   */
  function pairs (objectToGrabPairsFrom) {
    // Make the outer array to hold each pair array
    var pairArrray = [],
        pairMaker = function (value, index) { pairArrray.push([index, value])};
    each(objectToGrabPairsFrom, pairMaker);
    return pairArrray;
  }

  /**
   * A function to extend the functionality of an object.
   * @param {object} The object we want to extend.
   * @param {object} The object whose attributes we are giving to the object we are extending.
   * @return {object} The extended object.
   */
  function extend (objectToExtend, objectToExtendFrom) {
    var extenderFunction = function (value, index) {
      objectToExtend[index] = value;
    }
    each(objectToExtendFrom, extenderFunction);
    return objectToExtend
  }

  /**
   * Return the key value pairs only for the keys we pass in.
   * @param  {object} The object we are picking key value pairs from.
   * @return {object} A copy of the object with just the key value pairs the user wants.
   */
  function pick (objectToPickFrom /* args */) {
    var keysToPick = toArray(arguments).slice(1),
        finalObject = {},
        pickerFunction = function (value, index) {
          if (keysToPick.indexOf(value) !== -1) {
            finalObject[index] = value;
          }
        }
    each(objectToPickFrom, pickerFunction);
    return finalObject;
  }

  /**
   * Omit the key value pairs the user specifies.
   * @param  {object} The object we are looking to omit key value pairs from.
   * @return {object} A copy of the object with the key value pairs omitted.
   */
  function omit (objectToOmitFrom) {
    var keysToOmit = toArray(arguments).slice(1),
        finalObject = {},
        omitterFunction = function (value, index) {
          if (keysToOmit.indexOf(value) === -1) {
            finalObject[index] = value;
          }
        }
    each(objectToOmitFrom, omitterFunction);
    return finalObject;
  }

  /**
   * Set the defaults on an object.  If there is a attribute on the original object it will not
   * be overwritten by the default attribute.
   * @param {object} The object we want to set the defaults on.
   * @param {object} An object with the defaults we want.
   * return {object} The object passed as the first param with the defaults added.
   */
  function addDefaults (objectToAddDefaultsTo, defaultsObject) {
    var defaultAdderFunction = function (value, index) {
      if (!objectToAddDefaultsTo[index]) {
        objectToAddDefaultsTo[index] = value;
      }
    }
    each(objectToAddDefaultsTo, defaultAdderFunction);
    return objectToAddDefaultsTo;
  }

  /**
   * Return true is the object has the key the user passes in, false otherwise.
   * @param  {object} The object we will check to see if it has the key.
   * @param  {string} The key we are checking for.
   * @return {bool}   True if the object has the key, false otherwise.
   */
  function hasKey (objectToCheck, key) {
    return (objectToCheck[key]) ? true : false;
  }

  /**
   * Return true if an object has no own properties, true otherwise.
   * @param {object} The object we are testing to see if it is empty.
   * @return {bool} True if the object has no own properties, false otherwise.
   */
  function isEmpty(objectToTest) {
    // First we can test if the object has no properties
    if (objectToTest.length === 0) {
      return true;
    } else {
      // Loop through the properties and see if it has own properties
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty(key)) {
          return false;
        }
      }
      // we made it though the loop without returning false so this is empty.
      return true;
    }
  }

  /** 
   * Return true if the object passed in is a function, false otherwise.
   * @param  {object} The object we are testing to see if it is a function.
   * @return {bool}   True if the object is a function, false otherwise.
   */
  function isFunction (objectToTest) {
    return (typeof objectToTest === 'function');
  }

  /**
   * Return true if the object is a string, false otherwise.
   * @param  {object} The object we will test to see if it is a string.
   * @return {bool}   True if the object is a string, false othewise.
   */
  function isString (objectToTest) {
    return (typeof objectToTest === 'string');
  }

  /**
   * Return true if the object is a boolean, false otherwise.
   * @param  {object} The object we want to test to see if it is a boolean.
   * @return {bool}   True if the object is a boolean, false otherwise.
   */
  function isBoolean(objectToTest) {
    return (typeof objectToTest === 'boolean');
  }

  /**
   * Return true if the object passed in is a date, false otherwise.
   * @param  {object} The object to test.
   * @return {bool}   True if the object is a date, false otherwise.
   */
  function isDate(objectToTest) {
    return (objectToTest instanceof Date);
  }

  /**
   * Return true if the object passed in is undefined, true otherwise.
   * @param  {object} The object we are testing to see if it is NaN.
   * @return {bool}   True if the object is undefined, false otherwise.
   */
  function isUndefined(objectToTest) {
    return (typeof objectToTest === 'undefined');
  }

  /**
   * Generate a random number within a range that the user specifies.
   * @param {number} The min value for the range.
   * @param {number} The max value for the range.
   * @return {number} A random number within the range the the user specifies.
   */
  function random(min, max) {
    return Math.random * (max - min) + min;
  }

  /**
   * This will allow you to mix in your own module into this library.
   * @param  {object} The object you want to mix in to the library. => {name : function}
   * @return {object} This library with your moldule mixed in.
   */
  function mixin(objectToMixin) {
    var mixinModuleFunction = function (value, index) {
      returnObject[index] = value;
    }
    each(objectToMixin, mixinModuleFunction);
    return returnObject;
  }

  // Set up the API here.
  var returnObject = {
    'each'               : each,
    'map'                : map,
    'reduce'             : reduce,
    'sum'                : sum,
    'where'              : where,
    'reject'             : reject,
    'pluck'              : pluck,
    'isArray'            : isArray,
    'times'              : times,
    'partialApplication' : partialApplication,
    'toArray'            : toArray,
    'toNumber'           : toNumber,
    'first'              : first,
    'last'               : last,
    'flatten'            : flatten,
    'unique'             : unique,
    'without'            : without,
    'range'              : range,
    'arrayToObject'      : arrayToObject,
    'bind'               : bind,
    'throttle'           : throttle,
    'once'               : once,
    'keys'               : keys,
    'values'             : values,
    'pairs'              : pairs,
    'extend'             : extend,
    'pick'               : pick,
    'omit'               : omit,
    'addDefaults'        : addDefaults,
    'hasKey'             : hasKey,
    'isEmpty'            : isEmpty,
    'isFunction'         : isFunction,
    'isString'           : isString,
    'isBoolean'          : isBoolean,
    'isDate'             : isDate,
    'isUndefined'        : isUndefined,
    'random'             : random,
    'mixin'              : mixin
  };

  // Return the API here so it can be required in as a node.js module.
  module.exports = returnObject;

}());