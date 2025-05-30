import { BaseService } from "./base.service.js";
import User from "../models/user.model.js";

class AuthService extends BaseService {
  constructor() {
    super(User);
  }

  async findOrCreateGoogleUser(profile) {
    const existingUser = await this.model.find({ googleId: profile.id });
    if (existingUser.length > 0) {
      return existingUser[0];
    }

    const user = await this.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      picture: profile.photos[0].value,
    });
    return user;
  }
}

export default new AuthService();