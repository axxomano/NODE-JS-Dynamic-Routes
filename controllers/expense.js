const Expense = require('../models/expense');

exports.getExpenses = (req, res, next) => {
  console.log('inside getExpense',req)
  Expense.findAll()
  .then((expense) => {
    console.log('expense',expense)
    res.json(expense);
  }).catch(err=>console.log(err));
};

exports.postExpense= (req, res, next) => {
  //const userId = req.body.userId
  const exptype = req.body.exptype
  const expdesc = req.body.expdesc
  const expamount = req.body.expamount

  Expense.create({
    exptype : exptype,
    expdesc : expdesc,
    expamount : expamount
  }).then(result=> res.json(result))
  .catch(err=>console.log(err))
};

exports.postEditExpense = (req, res, next) => {
  const expId = req.params.expId

  //console.log('userId',userId)

  const exptype = req.body.exptype
  const expdesc = req.body.expdesc
  const expamount = req.body.expamount

  Expense.findByPk(expId).then( (expense) => {
    //Expense.addUser(userId, expense.price)
    expense.exptype = exptype
    expense.expdesc = expdesc
    expense.expamount = expamount

    return expense.save() //this is from sequelize
  }).then((savedExpense)=>res.json(savedExpense)).catch(err=>console.log(err))
};

exports.postDeleteExpense = (req,res,next) => {
  const expId = req.params.expId

  Expense.findByPk(expId).then((expense)=>{
    console.log(expId)
    expense.destroy()
  }).then(result => res.json(result))
  .catch(err=>console.log(err))
}


