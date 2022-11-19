import Http from 'http'

async function InjectHttpInterceptor() {

  //getting the emit function to replace the default behavior
  const oldEmit = Http.Server.prototype.emit;

  //replacing the default behavior of emit function from http server 
  Http.Server.prototype.emit = function (...args) {
    const [type, req, res] = args

    if (type === 'request') {
      res.setHeader('X-Instrumented-By', 'Csevero')
    }

    return oldEmit.apply(this, args)
  }
}

export { InjectHttpInterceptor }