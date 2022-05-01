'use strcit';

const Event = require('events');

//creating a new event with name  'counter
const event = new Event();
const eventName = 'counter';

//when this events is called, it will return a console with 'counter update' and the msg that is the argument that was called with event
event.on(eventName, msg => console.log('counter updated', msg));

const myCounter = {
  counter: 0,
};

//creating a Proxy, the Proxy is used to monitoring some data, also it can be access and change it.
const proxy = new Proxy(myCounter, {
  //the get method, will called when our proxy is used, always, in this case we show in console, the object (our myCounter)  and the prop that we called
  get: (object, prop) => {
    console.log('chamou!', { object, prop });
    return object[prop];
  },
  //the set method, will called when we change some property of our object, it use the return of get method, so it's very important return data like above. It receives three properties, target (is our object (myCounter)), propertyKey(name of property that will be change), and new value (that was passed when we call the proxy)
  set: (target, propertyKey, newValue) => {
    //console.log(target,propertyKey,newValue)
    // {counter: 6 }(target) counter(propertyKey) 7(newValue)
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;
    return true;
  },
});

//setInterval, we use function instead of arrow function when we need to use this to get the context, in this case we use function to get context to clear interval when our counter is equal ten
setInterval(function () {
  //when we call the proxy.counter, first will called the get method, and after the set method of our proxy
  proxy.counter += 1;

  console.log('[0]: setInterval')
  //when our proxy.counter reached ten, we use clearInterval to stop the execution, in this case we use this, that allow us to get setInterval context and clear it
  if (proxy.counter === 10) clearInterval(this);
}, 200);

//we can use the setTimeout with time 0 do execute something once the code is started, but the nextTick has priority and it will execute first that setTImeout, but it's a bad practice use setTimeout with time 0, to do this we can use the setImmediate
setTimeout(() => {
  proxy.counter = 4;
  console.log('[2]: timeout');
}, 100);

//we can use the setImmediate to run something once the code is started
setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter);
});

//we can use nextTick to execute something NOW, but it end the Node lifecycle, nextTick will be called on the initiation of server, it's a bad practice use it in this way
process.nextTick(() => {
  proxy.counter = 2;
  console.log('[0]: nextTick');
});
