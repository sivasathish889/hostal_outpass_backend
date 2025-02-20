const wardenModel = require( "../../Model/Schema/wardenModel");




const wardenLoginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    await wardenModel
      .find({ userName: userName, password: password })
      .then((user) => {
        if (user.length > 0) {
          console.log()
          return res.json({ message: "Login Successfull",user: user[0]._id.toString(), success: true });
        } else {
          return res.json({ message: "UnAuthorized", success: false });
        }
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
}

module.exports = { wardenLoginController }