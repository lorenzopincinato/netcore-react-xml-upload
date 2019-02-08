const apiUrl = 'http://localhost:5000/api'; 
 
 const postContentToAPI = (content) => {   
    return new Promise((resolve, reject) => {
      fetch(
        apiUrl + '/xmlContent', { 
            method: 'POST',
            headers: new Headers({
            'Content-Type': 'application/xml; charset=utf-8',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'Keep-alive',
            'Content-Length': content.length                
          }),
          body: content
      }).then(response => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(new Error(response.statusText));
        }
      }, error => {
        reject(new Error(error.message));
      });
    });
  };
  

  export default postContentToAPI;