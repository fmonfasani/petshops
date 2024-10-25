import User from "../models/User"; // Si usas algún ORM

export async function findOrCreateUser(email: string) {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email });
  }
  return user;
}

export async function mergeUserData(existingUser, newUser) {
  existingUser.name = existingUser.name || newUser.name;
  existingUser.image = existingUser.image || newUser.image;
  return await existingUser.save();
}
