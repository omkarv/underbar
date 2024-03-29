/*jshint eqnull:true, expr:true*/

var _ = { };

(function()   {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
             if(n > array.length){
              n = array.length;
             }
    return n === undefined ? array[array.length-1] : array.slice(array.length-n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection))
      {
        for(var i = 0; i < collection.length; i++) //
        {
          iterator(collection[i], i, collection);
        }
      }
    else if (typeof(collection) === "object")
     {
      for (var j in collection)
      {
        if (collection.hasOwnProperty(j))
          iterator(collection[j], j, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var output = [];
    _.each(collection, function(item){
      if (test(item)){
        output.push(item);
      }
    });
    return output;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(input){return !test(input);});
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var output = [];
    var occurred = {};
    _.each(array, function(item){
      if(!(item in occurred)){
        output.push(item);
        occurred[item] = item;
      }
    });
    return output;
  };
//use an object instead 

  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var output = [];
    _.each(array, function(item) {
       output.push(iterator(item));
    });
    return output;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(item){
    return typeof functionOrKey === "function" ? functionOrKey.apply(item, args): item[functionOrKey].apply(item, args);
  });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    var initial = arguments.length > 2;
    _.each(collection, function(item) {
    //if (accumulator === undefined)
    if (!initial) {
      accumulator = item;
      initial = true;
    }
    if (iterator === undefined)
      return item;
    else
      accumulator = iterator(accumulator, item);
    });
    return accumulator;
  }; // accumlator or 0 ... test is wrong  - does it initizlisze  argument.length === ..  set accumlator to item when no accumulator

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
        return wasFound ? true : item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(result, item){
      iterator || (iterator = _.identity);
      return !iterator(item) ? false : result;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.  
    //deMorgans theorem - A'||B' === !(A&B&C)  (since A&B&C === !(A'||B'||C')) 
    return !_.every(collection, function(item) {
      iterator || (iterator = _.identity);
      return !iterator(item);
    });
  };

  //return !every return opposite return  


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    //use arguments object
    //ignore first argument
    //for each object loop through and add object manually 
   // console.log(arguments.length);
      var args = Array.prototype.slice.call(arguments,1);
      _.each(args, function(item) {
        _.each(item, function(value ,key){
        if (item.hasOwnProperty(key))
          obj[key] = item[key];
        });
      });
    return obj;
  };// refactor using each

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments, 1);
    _.each(args, function(item) {
      _.each(item, function(property, key){
       if (!(key in obj))
        obj[key] = item[key];
      });
    });
    return obj;
  };
  //refactor using each


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var arg = Array.prototype.slice.call(arguments, 1);
    var store = {arg : func(arg)};
    return function(newArg) {
      return newArg in store ? store[newArg] : func.call(this, newArg);
    };
  }; //simpler way is to create a serialization / JSON.stringified memoize

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args =  Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var output = [ ];
    var used = {};
    for (var i = 0; i < array.length; i++) {
        var write = false;
        while (!write) {
        var randomVar = Math.round((array.length-1)*Math.random());
        if (!(randomVar in used))
        {
          used[randomVar] = 1;
          output.push(array[randomVar]);
          write = true;
        }
      }
      }
    return output;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var iterIOMap = {};
    var mappedCollection = _.map(collection, function(element){

      if(typeof iterator === 'function') {
        
        if (!iterIOMap[iterator(element)]) {
         iterIOMap[iterator(element)] =  [element];
        }else {
         iterIOMap[iterator(element)].push(element);
        }
        return iterator(element);
      } else if(typeof iterator === 'string') {
        if(!iterIOMap[element[iterator]]) {
          iterIOMap[element[iterator]] = [element];
        }else {
          iterIOMap[element[iterator]].push(element);
        }
        return element[iterator];
      }
    });
    var counter = 0;
    var lastItem;
    mappedCollection = mappedCollection.sort();
    return _.map(mappedCollection, function(item){
      if (iterIOMap[item].length > 1) {
         if(item === lastItem) {
          counter += 1;
         }else {
          counter = 0;
         }
         lastItem = item;
         return iterIOMap[item][counter];
      }else {
         return iterIOMap[item][0];
      }
     });

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    // go through all arrays and find the longest - set all output arrays to be this long
    var noArrays = arguments.length;
    var largestArrayLength = _.reduce(arguments, function(memo, arr) {
        return arr.length > memo ? arr.length : memo;
        }, 0);
    var output = [];
    _.each(arguments, function(subArray) {
        for(var i = 0; i < largestArrayLength; i++) {
           !output[i] ? output.push([subArray[i]]) : output[i].push(subArray[i]);
        }
    });
    return output;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var output = (result === undefined) ? [ ] : result;
    _.map(nestedArray, function(element) {
      Array.isArray(element) ? _.flatten(element, output) : output.push(element);
    });
    return output;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var lookup = { };
    var intersection = [ ];
    _.each(arguments, function(subArray){
        _.each(subArray, function(element){
          if(lookup[element]){
            lookup[element] > 1 ? 0 : intersection.push(element);
            lookup[element] += 1;
          }else {
            lookup[element] = 1;
          }
        });
    });
    return intersection;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var intersection = _.intersection.apply(null, arguments);
    return _.filter(array, function(element){
        return intersection.indexOf(element) === -1;
    });
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, thatwhen invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {

    var runRecently = false;
    var result;

    return function() {
      if (!runRecently) {
        result = func.apply(this, arguments);
        console.log(this);
        runRecently = true;
        setTimeout(function() { 
           runRecently = false;
        }, wait);
      }
      return result;
    };
  };

}).call(this);
