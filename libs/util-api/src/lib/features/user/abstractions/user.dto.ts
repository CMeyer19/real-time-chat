interface IAddUserDto {
  userId: string;
  email: string;
  username: string;
}

interface IUser {
  _id: string;
  username: string;
  email: string;
}

export {
  IAddUserDto,
  IUser
};
