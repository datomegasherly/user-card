import Joi from "joi";


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
const checkValidation = (data) => {
  let isValid = true;
  let err = '';
  const schema = Joi.object({
    id: Joi.number().optional().allow('', null).greater(-1).max(10).required(),
    username: Joi.string().min(3).max(40).pattern(new RegExp('^[a-zA-Z0-9]{3,40}$')).required(),
    name: Joi.string().min(3).max(40).pattern(new RegExp('^[a-zA-Z ]{3,40}$')).required(),
    phone: Joi.string().optional().allow('', null).min(3).max(45).pattern(new RegExp('^[0-9+\-]{5,45}$')),
    website: Joi.string().optional().allow('', null).min(5).max(60).pattern(new RegExp('^(http:\\|https:\\|)(www.|)[a-zA-Z0-9\-_\.]{5,40}\.[a-zA-Z]{2,5}$')),
    email: Joi.string().min(5).max(60).pattern(new RegExp('^[a-zA-Z0-9\-_\.]{2,40}@[a-zA-Z0-9\-_\.]{2,40}\.[a-zA-Z]{2,5}$')).required(),
    address: Joi.object({
       city: Joi.string().min(3).max(60).pattern(new RegExp('^[a-zA-Z ]{3,60}$')).required(),
       street: Joi.string().min(3).max(60).pattern(new RegExp('^[a-zA-Z0-9\-_. ]{3,90}$')).required(),
       suite: Joi.string().min(1).max(30).pattern(new RegExp('^[a-zA-Z0-9\-_. ]{1,30}$')),
       zipcode: Joi.string().min(2).max(10).pattern(new RegExp('^[0-9\-]{2,10}$'))
    }),
  });
  const { error, value } = schema.validate(data);
  if(error){
    err = error.details[0].message;
    isValid = false;
  }
  return { isValid, error: err };
}

export {
    userData,
    oneUserData,
    checkValidation
}