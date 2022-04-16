//this example will list all repository commits, the list of commits are paginate, so with the generator function we can easily list all pages .
import axios from 'axios';

async function* fetchCommits(repo) {
  //base url
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    //get data and headers of github request
    const { data, headers } = await axios.get(url, {
      headers: { 'User-Agent': 'Our Script' },
    });

    //here we can get the next page link, that github api show on the headers
    let nextPage = headers.link.match(/<(.*?)>; rel="next"/);
    //here we're check if have a next page, if no, the nextPage will be undefined
    nextPage = nextPage?.[1];

    url = nextPage;

    //iterate for each commit and show it
    for (let commit of data) {
      yield commit;
    }
  }
}

(async () => {
  let count = 0;

  //using for await to execute an async generate function
  for await (let item of fetchCommits(
    'javascript-tutorial/en.javascript.info',
  )) {
    //here we can get just item that will list all information about commit, or we can just show the author login
    console.log(item.author.login);

    //we want list just 100 first items
    if (++count === 100) {
      break;
    }
  }
})();