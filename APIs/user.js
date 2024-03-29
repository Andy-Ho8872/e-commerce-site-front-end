import config from '../APIs/config'

//------------------------------------------- 使用者相關 API -------------------------------------------//
    //* 註冊 
export const apiUserRegister = data => config.userRequest.post('/register', data);
    //* 登入 (取得 Token)
export const apiUserLogin = data => config.userRequest.post('/login', data);
    //* 第三方登入(取得 Token) 
export const apiUserSocialiteLogin = (provider) => {
    return `${process.env.apiUrl}/user/socialiteLogin/${provider}/redirect`;
}
    //----------------------------------- 以下操作必須包含Token -------------------------------------//
    //* 登出 
export const apiUserLogout = () => config.authRequest.get('/logout');
    //* 取得使用者
export const apiGetUserInfo = () => config.authRequest.get('/getUser');
    //* 更新使用者個人檔案
export const apiUpdateUserProfile = (data) => config.authRequest.patch('updateProfile', data);
    //* 清空使用者個人檔案 
export const apiClearUserProfile = () => config.authRequest.patch('clearProfile');
    //* 新增信用卡 
export const apiAddCreditCard = (data) => config.authRequest.post('addCreditCard', data);
//* 刪除信用卡
export const apiDeleteCreditCard = (card_id) => config.authRequest.delete(`creditCards/${card_id}/delete`);
//------------------------------------------- 使用者相關 API -------------------------------------------//