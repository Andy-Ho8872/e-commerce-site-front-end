export default async function({ store, redirect }) {
    // // 未驗證導向登入頁面
    if (!store.state.auth.user) {
        return redirect({ name: 'auth-login' })
    } else {
        return redirect({ name: 'index' })
    }
}