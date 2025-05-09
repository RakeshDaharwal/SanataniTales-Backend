const User = require('../Model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });

  }catch (err) {
    if (err.code === 11000) {
     
      return res.status(401).json({ message: 'Email already registered' });
    }
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!userExist.isVerified) {
        return res.status(403).json({ message: 'email is not verified' });
      }


    const token = jwt.sign(
      { userId: userExist._id },
      process.env.JWT_TOKEN,
      { expiresIn: '3h' }
    );

console.log('token', token)


    return res.status(201).json({
      message: 'Login successful',
      token,
    });

  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const verifyEmail = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.isVerified = true;
      await user.save();
  
      return res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };

const getDashboard = (req, res) => {
  return res.status(201).json({ message: 'Welcome to your dashboard' });
};

module.exports = {
  signUp,
  signIn,
  verifyEmail,
  getDashboard
};
