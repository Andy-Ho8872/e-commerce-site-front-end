export default async function({ store, route, redirect }) {
    // // 未驗證導向登入頁面
    let user = store.state.auth.userAccount
        if (!user) {
            console.log(user);
            return redirect({ name: 'auth-login' })
        }


        // if (process.server) {
        //     if()
        // }
    

    // const user = store.state.auth.userAccount

    // if (user) {
    //     // alert("你已經登入囉")
    //     console.log(user)
    //     return redirect({ name: 'index' })
    // }

    // if(!user) {
    //     return redirect({ name: 'auth-login' })
    // }
}

// middleware 觸發流程
// 1. 在整個 page 渲染(render) 之前就會執行(Server Side)
// 2. 但是使用 localStorage 抓取使用者資料的話，就要在 mounted() 中觸發並接收。
// 如何解決?
// 1.使用 API 撈資料
// 2.想辦法讓 Middleware 在 mounted() 中觸發?
// 3.在 Vuex 中寫入 AUTH，但重新整理後就會消失..
