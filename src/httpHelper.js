export const httpPost = data => {
  return fetch('http://localhost:9001', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    //mode: 'same-origin',
    body: JSON.stringify(data),
  }).then(handleResponse);
  // .catch(handleError);
};

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log(data);
    if (!response.ok) {
      if (response.status === 401) {
        console.log('Giriş başarısız');
      }
      //const error = (data && data.message) || data.error;
      const error = data;
      console.log(error);
      return Promise.reject(error);
    }
    return data;
  });
}
