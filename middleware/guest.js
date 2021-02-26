export default function ({ store, redirect }) {
    // 若在瀏覽器端處理 (使用 localStorage 抓取資料)
    if(process.browser) {
        // 若使用者已經登入
        if(store.state.auth.userAccount) {
            alert('您已經登入了，若要註冊請先登出。');
            return redirect ({ name: 'index' });
        }
    }
}