'use strict';

const {
  watch,
  promises: { readFile },
} = require('fs');

class File {
  watch(event, filename) {
    //access the context of class
    // console.log(this);
    //access the arguments that is passed to class
    // console.log(arguments);
    //transform the arguments to an array
    // console.log(Array.prototype.slice.call(arguments))
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();

//calling the function from default way, the "this" inside of function inherits the "this" of watch lib and our code broke
// watch(__filename, file.watch);

//to resolve the problem above, has 2 ways

//this way work but is doesn't pretty
// watch(__filename, (event, filename) => file.watch(event, filename));

//using the .bind we set which context the class need to follow, in this case our context needs to be our class
//the bind return a function with "this" that keeps our file class, ignoring the watch
// watch(__filename, file.watch.bind(file));

//first argument is the context of class, so how can be see on the code below we in the first argument we replace the default function showContent to return a console.log, and the next arguments are the props of the method, in this case, the null is the event and the __filename is the filename
//the difference between the .call and .apply are just the way of the arguments is passed on end, with .call we pass all arguments separated by , and with .apply our arguments is passed inside of an array
file.watch.call({ showContent: () => console.log('call: hey sinon') }, null, __filename);
file.watch.apply({ showContent: () => console.log('apply: hey sinon') }, [null, __filename]);
