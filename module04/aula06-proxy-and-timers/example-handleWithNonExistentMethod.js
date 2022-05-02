function Foo() {
  return new Proxy(this, {
    get: (object, property) => {
      if(Reflect.has(object, property)) {
        return Reflect.get(object,property)
      } else {
        return function methodMissing() {
          console.log(`you called ${property} but it doesn't exists!`)
        }
      }
    }
  })
}

Foo.prototype.bar = function() {
  console.log('you called bar. Good job!')
}

const foo = new Foo()

foo.bar()
foo.newMethod()
