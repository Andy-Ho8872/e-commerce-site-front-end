export default function ({ store, redirect }) {
    // 未驗證導向登入頁面
    if(!store.state.auth.userAccount) {
        alert('請先登入');
        return redirect ('/auth/login');
    }
}