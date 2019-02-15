const apiUrl = 'http://localhost:5000/api'; 
 
const postFileToAPI = (file) => {   
  return new Promise((resolve, reject) => {
    fetch(
      apiUrl + '/files', { 
          method: 'POST',
          headers: new Headers({
          'Content-Type': 'application/json;'
        }),
        body: JSON.stringify(file)
    }).then(response => {
      if (response.ok) {
        resolve({...file});
      } else {
        if (response.status === 400) {
          reject({isInvalid: true, file: file})
        }
        else {
          reject({isInvalid: false, file: file});
        }
      }
    }, () => {
      reject({isInvalid: false, file: file});
    });
  });
};

export default postFileToAPI;
