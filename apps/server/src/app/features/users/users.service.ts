import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../db/schemas/user.schema';
import { IAddUserDto } from '../../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  public async create(addUserRequest: IAddUserDto): Promise<string> {
    const result: UserDocument = await this.userModel.create({
      userId: addUserRequest.userId
    });

    return result._id;
  }
}
