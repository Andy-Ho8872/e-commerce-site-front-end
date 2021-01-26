export default function ({ store, redirect }) {
    // 若在瀏覽器端處理 (使用 localStorage 抓取資料)
    if(process.browser) {
        // 未驗證導向登入頁面
        if(!store.state.auth.userAccount) {
            alert('請先登入');
            return redirect ('/auth/login');
        }
    }
}