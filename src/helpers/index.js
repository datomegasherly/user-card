/**
 * use test data for moxios
 */
const userData = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
];

const oneUserData = {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
    "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
};

/**
 * will check validation of create and edit forms
 * @param {object} data 
 */
const checkValidation = (data, type, users=[]) => {
  let error = '';
  let isValid = true;
  if(data.id == -1){
    error = 'ID'
    isValid = false;
  }
  if(isValid && type == 'create' && data.username == ''){
    error = 'UserName'
    isValid = false;
  }
  if(isValid && data.name == ''){
    error = 'Name'
    isValid = false;
  }
  if(isValid && data.website == ''){
    error = 'WebSite'
    isValid = false;
  }
  if(isValid && data.phone == ''){
    error = 'Phone'
    isValid = false;
  }
  if(isValid && data.email == ''){
    error = 'Email'
    isValid = false;
  }
  if(isValid && data.address.city == ''){
    error = 'City'
    isValid = false;
  }
  if(isValid && data.address.street == ''){
    error = 'Street'
    isValid = false;
  }
  if(isValid && data.address.suite == ''){
    error = 'Suite'
    isValid = false;
  }
  if(isValid && data.address.zipcode == ''){
    error = 'ZipCode'
    isValid = false;
  }
  /**
   * check user id to exists , if user is in edit mode
   */
  if(isValid && type == 'edit' && !users.find(user => user.id == data.id)){
    error = 'User';
    isValid = false;
  }
  /**
   * check username exist in create mode to users and if exist , it will return false
   */
  if(isValid && type == 'create' && users.find(user => user.username.toString().toLowerCase() == data.username.toString().toLowerCase())){
    error = 'User';
    isValid = false;
  }
  return { isValid, error };
}

export {
    userData,
    oneUserData,
    checkValidation
}