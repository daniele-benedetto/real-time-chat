interface User {
  id: number,
  name: string,
  online?: boolean,
  socketId?: string,
  password?: string,
  token?: string,
  backgroundColor: string,
  textColor: string,
}

export default User