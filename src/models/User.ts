interface User {
  id: number,
  name: string,
  online?: boolean,
  socketId?: string,
  token?: string,
  backgroundColor: string,
  textColor: string,
}

export default User