export const getUser = () => {
  const user = localStorage.getItem('user');
  if (!user) {
    return;
  } else {
    const userObj = JSON.parse(user);
    const { token } = userObj;
    return token;
  }
};

export const getUserId = () => {
  const user = localStorage.getItem('user');
  let userObj;
  if (!user) {
    return;
  }
  userObj = JSON.parse(user);
  const userId = userObj._id;
  return userId;
};
