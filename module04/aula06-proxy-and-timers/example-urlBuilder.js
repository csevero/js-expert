function urlBuilder(domain) {
  let parts = [];
  const proxy = new Proxy(
    function () {
      const returnValue = domain + '/' + parts.join('/');
      parts = [];
      return returnValue;
    },
    {
      //now our object it's our function that was set above, and our prop is the each item that is between dots on twenty third line.
      get: (object, prop) => {
        //after pass all arguments to get function, the function was called and return our url
        parts.push(prop);
        return proxy;
      },
    },
  );

  return proxy;
}

const google = urlBuilder('https://google.com');
console.log(google.search.products.bacon.and.eggs());
