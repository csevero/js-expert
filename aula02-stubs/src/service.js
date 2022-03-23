const https = require('https');

class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        const items = [];
        //in some cases the https.get function can be cut data depending of data size, with the code below we resolve this problem, resolving just when the end event is called
        response
          .on('data', data => items.push(data))
          .on('end', () => resolve(JSON.parse(items.join(''))));
        response.on('error', reject);
      });
    });
  }
  async getPlanets(url) {
    const result = await this.makeRequest(url);

    return {
      name: result.name,
      surfaceWater: result.surface_water,
      appearedIn: result.films.length,
    };
  }
}

(async () => {
  const teste = await new Service().makeRequest(
    'https://swapi.dev/api/planets/1/',
  );

  console.log(teste);
})();
// module.exports = Service;
