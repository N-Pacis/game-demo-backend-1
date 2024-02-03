import { compare ,genSalt, hash} from 'bcrypt';
import UserModel from '../models/user.model.js';
import {
  createSuccessResponse,
  errorResponse,
  serverErrorResponse,
  successResponse,
} from './../utils/api.response.js';
import { signToken } from '../utils/jwt.utils.js';

export const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    let findByEmail = await UserModel.findOne({
      where: {
        email
      }
    });
    if (!findByEmail) return errorResponse("Invalid email or password!", res)

    const validPassword = await compare(password, findByEmail.password);
    if (!validPassword) return errorResponse('Invalid email or password!', res);

    const token = signToken({ id: findByEmail.id });

    return successResponse("Login successful!",{access_token: token},res);

  } catch (error) {
    return serverErrorResponse(error, res);
  }
};

export const register = async(req,res)=>{
  try{
    let {
      names,
      email,
      password
    } = req.body;

    let findByEmail = await UserModel.findOne({
      where: {
        email
      }
    });
    if (findByEmail) return errorResponse(`User with email ${email} already exists!`, res)

    const salt = await genSalt(10);
    password = await hash(password, salt);

    let createdUser = await UserModel.create({
      names,
      email,
      password
    })

    const returnResponse ={
      id: createdUser.get('id'),
      names: createdUser.get('names'),
      email: createdUser.get('email')
    }

    return createSuccessResponse("User registered successfully. You can now login", returnResponse, res);

  }
  catch(error){
    return serverErrorResponse(error, res);
  }
}

export const getProfile = async(req,res)=>{
  try{
      let user = await UserModel.findByPk(req.user.id,{attributes: ['names','email','id']});
      if (!user) return errorResponse("User not found!",res);

      return successResponse("Profile",user,res)
  }
  catch (ex) {
      return serverErrorResponse(ex,res)
  }
}

