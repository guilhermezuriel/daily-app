export interface UserCreate {
  name: string,
  email: string,
  password: string
}

export interface UserProfile{
  id:string,
  name:string
  email:string,
  password:string,
  accept_rate:number
}