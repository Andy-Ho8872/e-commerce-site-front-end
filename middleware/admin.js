export default async function({ store, redirect }) {
    //* 必須是管理員才能進入
    if (store.state.auth.user.is_admin != 1) {
        return redirect({ name: 'index' })
    }
}