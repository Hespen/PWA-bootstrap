import fetch from 'isomorphic-fetch';

export default {
  Query: {
    id: (obj, args, {req}) => new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/posts').then(result => {
              return result.json().then(res => resolve(res));
            });
          },
    ).then(result => {
      return result;
    }),
  },
};
