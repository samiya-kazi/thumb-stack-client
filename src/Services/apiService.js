
export function saveThumbnail (thumbnailElements, backgroundColor, userId, imageSrc, version) {
  const body = {
    userId,
    elements: thumbnailElements,
    background: backgroundColor,
    imageSrc: process.env.REACT_APP_CLOUD_IMAGE_BASE_URL + '/v' + version + '/' + imageSrc + ".png",
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    },
    credentials: 'include',
  }

  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail`, options)
    .then(response => response.json())
    .catch(err => console.log(err));
}


export function getThumbnails (userId) {
  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${userId}`, { credentials: 'include'})
    .then(response => response.json())
    .catch(err => console.log(err));
}


export function updateThumbnail (id, thumbnailElements, backgroundColor, imageSrc, version) {
  const body = {
    elements: thumbnailElements,
    background: backgroundColor,
    imageSrc: process.env.REACT_APP_CLOUD_IMAGE_BASE_URL + '/v' + version + '/' + imageSrc + ".png",
  }

  const options = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    },
    credentials: 'include',
  }

  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail?tid=${id}`, options)
    .then(response => response.json())
    .catch(err => console.log(err));
}




export function deleteThumbnail (id) {
  const options = {
    method: 'DELETE',
    credentials: 'include'
  }

  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail?tid=${id}`, options)
    .then(response => response.json())
    .catch(err => console.log(err));
}





export function getUserInfo () {
  const accessToken = localStorage.getItem('accessToken');
  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user`,{
     method: 'GET',
     credentials: 'include',
     headers: {
      "Authorization": accessToken
    }
   })
   .then(response => response.json())
   .catch(err => console.error(err));
};


export function logout () {
  const token = localStorage.getItem('accessToken');
  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/logout`, {
     method: 'GET',
     credentials: 'include',
     headers: {
      "Authorization": token
    }
   })
   .then(response =>{ 
      if (response.ok) {
        localStorage.removeItem('accessToken');
        return response.json();
      }
    })
   .catch(err => console.error(err));
};


export function login (user) {
  const options = {
   method: 'POST',
   body: JSON.stringify(user),
   headers: {
     "Content-type": "application/json"
   },
   credentials: 'include'
 };



  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, options)
    .then(response => {
      if(response.ok) {
        localStorage.setItem('accessToken', response.headers.get('Authorization'));
        return response.json();
      }
    })
    .catch(err => console.error(err));
};


export function register (registerInfo) {
  const user = {
    email: registerInfo.email,
    password: registerInfo.password,
    firstName: registerInfo.firstName,
    lastName: registerInfo.lastName,
  }

  const options = {
		method: 'POST',
    body: JSON.stringify(user),
		headers: {
      "Content-type": "application/json"
    },
    credentials: 'include'
	};

  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/register`, options)
    .then(response => {
      if(response.ok) {
        localStorage.setItem('accessToken', response.headers.get('Authorization'));
        return response.json();
      }
    })
    .catch(err => console.error(err));
};