import { Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import * as jwt from 'jsonwebtoken';


export class UserController {

  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }
  login = async(req: Request, res: Response) => {
    try {
      const { username,password } = req.body
      const user = await this.repository.findUsernameByNameAndPassword(username,password)
      const token = jwt.sign({ _id: user?.id, username: user?.username },process.env.JWT_KEY as string,{ expiresIn: "1d",});
      res.json({"token":token});
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Authentication error' })
    }
  }

  teste = async(req: Request, res: Response) => {
    res.json({"ok":"ok"});
  }

}
