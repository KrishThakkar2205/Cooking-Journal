const User = require('../models/userModel')
async function getUser(id){
    const user = await User.findOne({sessionId:id})
    console.log("GetUser "+ user)
    return user
}
module.exports = {
    getUser,
}