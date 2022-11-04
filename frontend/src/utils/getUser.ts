export function getUserId() {
  const user = localStorage.getItem('user');
  if (!user) return;

  const userObj = JSON.parse(user);
  const { _id } = userObj;
  return _id;
}
