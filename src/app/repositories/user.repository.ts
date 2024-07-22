import IUser from "../interfaces/IUser";


const users : IUser[] = [{
    id:1,
    username:"user",
    password:"pass"
}]


export class UserRepository {
  
     findUsernameByNameAndPassword = (username: string, password:string): Promise<IUser> => {
        let user = new Promise<IUser>(function(resolve, reject) {
            users.find(user=>{
                if(user.username === username && user.password === password)
                {
                    resolve(user)
                }
            })
            reject()
          });
          return user
    }
  
  }

  

export default { UserRepository };