// Problem 1
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.

// first we will require the js_utility_library I wrote, it has most of the functionality of underscore.js.
u = require('./utility/js_utility_library.js');

// I will pass the max into node from the command line and grab them
// through process.argv.  In this case it will be 999.
var max = u.toNumber(process.argv[2]);

// Now we will increment through the range of multiples of 3 and
// add them to the arrayOfMultiples.
var arrayOfMultiplesOfThree = u.range(max, 3, 3);

// Now we will do the same for the multiples of 5.
var arrayOfMultiplesOfFive = u.range(max, 5, 5);

// We will combine the two arrays and grab just the unique values.
// We will want these sorted for debugging and these are numbers.
var uniqueMultiples = u.unique(arrayOfMultiplesOfThree.concat(arrayOfMultiplesOfFive), true, true);

// Now we will reduce this down to one number.
var answer = u.sum(uniqueMultiples);

// Got it, show the user!  The answer is 233168 if you were wondering.
console.log('And the answer is .... ' + answer);