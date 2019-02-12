const apiUrl = 'http://localhost:5000/api'; 
 
const postFilesToAPI = (files) => {   
  return new Promise((resolve, reject) => {
    fetch(
      apiUrl + '/xmlFiles', { 
          method: 'POST',
          headers: new Headers({
          'Content-Type': 'application/json;'
        }),
        body: JSON.stringify(files)
    }).then(response => {
      if (response.ok) {
        resolve(response);
      } else {
        if (response.status === 400) {
          response.json().then(json => {
            let invalidFiles = json.map(name => `${name}`).join(', ');
            reject({message: `Invalid file(s): ${invalidFiles}.`})
          });
        }
        else {
          console.log(response);
          reject({message: response.statusText});
        }
      }
    }, error => {
      reject(new Error(error.message));
    });
  });
};

export default postFilesToAPI;
