const userSchema = require("../models/user.model")


// const findByEmail = async (email,{ select ={
//     user_email:1, user_password:1,user_name:1,status:1
// }}) =>{
//     console.log(email);
//     return await userSchema.findOne({user_email:email}).select().lean()

// }

const findByEmail = async (user_email) => {
  return await userSchema.findOne({ user_email }).populate('user_address').select().lean()
}
const findById = async (userId) => {
  return await userSchema.findById({ _id: userId }).select().populate('user_address').lean();
}
const changePassword = async (userId, user_password) => {
  return await userSchema.findByIdAndUpdate(
    { _id: userId },
    { $set: { user_password } },
    { new: true })
}
const settingProfile = async (userId, user_avatar) => {
  return await userSchema.findByIdAndUpdate(
    { _id: userId },
    { $set: { user_avatar } },
    { new: true })
}
const searching = async (phone_number) => {
  return await userSchema.findOne(phone_number).lean();
}
const getImgProfiel = async (userId) => {
  const user = await userSchema.findById(userId).populate('user_address');
  return user.user_avatar.thumbNail;
}
const updateStatus = async (userId) => {
  try {
    // Đầu tiên, lấy thông tin người dùng hiện tại
    const user = await userSchema.findById(userId);
    if (!user) {
      // Người dùng không tồn tại
      throw new Error("User not found");
    }

    // Kiểm tra trạng thái hiện tại và thay đổi
    const newStatus = user.status === "active" ? "inactive" : "active";

    // Cập nhật trạng thái mới
    const updatedUser = await userSchema.findByIdAndUpdate(
      { _id: userId },
      { $set: { status: newStatus } },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

module.exports = {
  findByEmail,
  findById,
  changePassword,
  settingProfile,
  searching,
  getImgProfiel,
  updateStatus
}