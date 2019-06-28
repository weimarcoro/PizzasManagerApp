export const login = (userInfo) => ({
    type: 'LOGIN',
    token: userInfo.token,
    isAdmin: userInfo.isAdmin,
    userName: userInfo.userName,
    profileImage: userInfo.profileImage
});

export const logout = () => ({
    type: 'LOGOUT',
    token: '',
    isAdmin: false,
    userName: '',
    profileImage: ''
});