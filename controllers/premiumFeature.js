const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports. getUserLeaderBoard = async (req,res) =>{
    try{
       const users = await User.findAll();
       const expenses = await Expense.findAll();
       const userAggregatedExpenses = {};

     //  console.log(expenses);
       expenses.forEach((expense)=>{
       
      //  const newId = expense.UserId;
       // console.log(userAggregatedExpenses.newId);
        if(userAggregatedExpenses[expense.UserId]){
            userAggregatedExpenses[expense.UserId] =   userAggregatedExpenses[expense.UserId] +Number(expense.amount);
        }else{
            userAggregatedExpenses[expense.UserId] = Number(expense.amount);
        }
       })
      
       let userLeaderBoardDetails = [];
       users.forEach((user)=>{
        userLeaderBoardDetails.push({name:user.name, total_cost:userAggregatedExpenses[user.id]||0});
       })
      // console.log(userAggregatedExpenses);
      userLeaderBoardDetails.sort((a,b)=> b.total_cost-a.total_cost)
       res.status(200).json(userLeaderBoardDetails);
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
}

