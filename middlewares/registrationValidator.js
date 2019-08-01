const registrationValidator = (req, res, next) => {
  
  const {
    firstname,
    lastname,
    email,
    password,
    address,
    occupation,
    phone,
    marital_status,
  } = req.body;

  const user = {
    firstname,
    lastname,
    email,
    password,
    address,
    occupation,
    phone,
    marital_status,
  };
  
  if (typeof user.firstname === 'undefined' || typeof user.lastname === 'undefined'
  || typeof user.email === 'undefined' || typeof user.password === 'undefined'
  || typeof user.address === 'undefined' || typeof user.occupation === 'undefined'
  || typeof user.phone === 'undefined' || typeof user.marital_status === 'undefined') {
    return res
      .status(401)
      .json({ errorMessage: 'Please provide the valid credentials for registration' });
  }
  if (user.firstname.trim() === '' || user.lastname.trim() === ''
    || user.email.trim() === '' || user.password.trim() === ''
    || user.address.trim() === '' || user.occupation.trim() === ''
    || user.phone.trim() === '' || user.marital_status.trim() === '') {
    return res
      .status(401)
      .json({ errorMessage: 'Please provide revelant credentials values' });
  }
  next();
};

export default registrationValidator;
