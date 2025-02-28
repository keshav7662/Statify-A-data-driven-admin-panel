import User from '../models/PlatformUser.js';
import multer from 'multer';
import { uploadImage } from '../utils/cloudinary.js';
import { generateToken } from '../utils/tokenUtils.js';
import { StatusCodes } from 'http-status-codes';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('userProfileImage');

export const registerUser = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }
    try {
      const { userName, email, password, country, continent, postalCode } = req.body;
      let imageUrl = '';

      if (req.file) {
        imageUrl = await uploadImage(req.file.buffer);
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = new User({
        userName,
        email,
        password,
        country,
        continent,
        postalCode,
        userProfileImage: imageUrl
      });

      await newUser.save();
      res.status(201).json({
        token: await generateToken(newUser._id, newUser.role),
        user: {
          id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          country: newUser.country,
          role: newUser.role,
          userProfileImage: newUser.userProfileImage
        }
      });
      
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
    }

    // Validate the password
    const isMatch = await user.matchedPassword(password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials!" });
    }

    // Validate the role
    if (user.role !== role) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: `Unauthorized for ${role} login!` });
    }

    // Generate token
    const token = await generateToken(user._id, user.role);

    res.status(StatusCodes.OK).json({
      message: "Login successful!",
      token,
      id: user._id,
      role: user.role,
      userName: user.userName
    });
  } catch (error) {
    console.error("Error during login:", error);
    next({
      message: "Error logging in",
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
};


