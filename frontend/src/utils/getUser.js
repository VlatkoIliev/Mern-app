// get user from localStorage
// user = { _id, email, token}

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
