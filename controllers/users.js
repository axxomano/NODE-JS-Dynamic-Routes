const User = require('../models/users');

exports.getUsers = (req, res, next) => {
  console.log('inside getusers',req)
  User.findAll()
  .then((users) => {
    console.log('users',users)
    res.json(users);
  }).catch(err=>console.log(err));
};

exports.postUser = (req, res, next) => {
  const userId = req.body.userId
  const name = req.body.name
  const email = req.body.email
  const phone = req.body.phone

  User.create({
    userId : userId,
    name: name,
    email: email,
    phone: phone
  }).then(result=> res.json(result))
  .catch(err=>console.log(err))

};

exports.postEditUser = (req, res, next) => {
  const userId = req.params.userId

  console.log('userId',userId)

  const name = req.body.name
  const email = req.body.email
  const phone = req.body.phone
  User.findByPk(userId).then( (user) => {
    //User.addUser(userId, user.price)
    user.name = name
    user.email = email
    user.phone = phone
    console.log('user in edit',user)
    return user.save() //this is from sequelize
  }).then((savedUser)=>res.json(savedUser)).catch(err=>console.log(err))
};

exports.postDeleteuser = (req,res,next) => {
  const userId = req.params.userId

  User.findByPk(userId).then((user)=>{
    console.log(userId)
    user.destroy()
  }).then(result => res.json(result))
  .catch(err=>console.log(err))
}


