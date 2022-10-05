import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../db/schemas/user.schema';
import { IAddUserDto } from '@real-time-chat/util-api/features/users/abstractions/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  public getUser(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  public async create(addUserRequest: IAddUserDto): Promise<string> {
    const result: UserDocument = await this.userModel.create({
      _id: addUserRequest.userId
    });

    return result._id;
  }
}
