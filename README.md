# [簡易電商網站(DEMO連結)](https://e-commerce-frontend-74fop.ondigitalocean.app)

## 作者介紹
您好，我叫何昊恩，今年 24 歲，2021 年 2 月畢業於健行科技大學-應用空間資訊系，畢業後因考慮兵役問題，故在收到兵單前從事關於餐飲、賣場、物流等臨時性質工作，並於 2022 年 6 月服完兵役，目前正在待業並積極求職中，希望的職位是前端工程師，若貴公司有人才需求，歡迎聯絡我。
- 我的電話: 0955551354
- E-Mail: h880702520@gmail.com

## 專案介紹
- 背景: 
    - 在大學就讀期間自學前端技術三個月後，就有想獨立開發大型 WEB APP 的想法，在深思熟慮後決定製作前、後端分離的電商網站，但之後發現若是只懂得前端技術，是無法完全自主開發的，便在開發過程中邊學邊做，從最剛開始的純前端，到後來慢慢加上後端語言、資料庫、以及框架的應用，使這個專案更加完整。
- 說明: 
    - 本專案為一前後、端分離之簡易電商網站，網站中包含 RWD (響應式網頁) 設計，可以讓使用者在不同的裝置(畫面寬度)上瀏覽，其主要功能包含: 會員、通知、後台、搜尋、購物車等系統，但不包含金流系統。
- 注意事項: 
    - 本站僅做為學習、交流、作品展示用途，並無任何營利之行為。
    - 網站內之所有資訊均為虛構，包括商品圖片、名稱、價格等。
    - 在註冊本站帳號時，為了安全起見，建議不要使用您在現實世界中常用的帳號密碼。

## 功能介紹
- 會員系統: 含有基本的註冊、登入(包含第三方登入)功能，使用者可至個人頁面修改基本資料。
- 通知系統: 在使用者註冊成功或是建立商品訂單時，則會發送通知。
- 後台系統: 後台管理者可以上架、修改商品資訊。
    - 管理者帳號: SuperUser@admin.com
    - 管理者密碼: 123456
- 搜尋系統: 使用者可以使用搜尋欄輸入商品名稱找尋所需要的商品。
- 購物車系統: 使用者可將商品新增至購物車，並可以進行查看、修改、刪除。

## 使用技術
- 前端
    - [Nuxt.js(Vue)](https://nuxtjs.org/)
    - [Vuex](https://vuex.vuejs.org/)
    - [VueRouter](https://router.vuejs.org/)
    - [Vuetify.js(UI Framework)](https://vuetifyjs.com/en/)
    - [Jest (Testing Framework)](https://jestjs.io/)
- 後端
    - [Laravel](https://laravel.com/)
    - [Laravel-Sanctum(API Token 驗證套件)](https://laravel.com/docs/9.x/sanctum)
    - [Laravel-Socialite(第三方登入套件)](https://laravel.com/docs/9.x/socialite)
- 資料庫
    - MySQL
- 部署平台
    - [Digital Ocean](https://www.digitalocean.com/)

## 將專案下載到您的電腦裡(前端)
```bash
# 下載程式碼
$ git init
$ git clone https://github.com/Andy-Ho8872/e-commerce-site-front-end.git

# 下載所需套件
$ npm install

# 使用開發環境進行瀏覽
$ npm run dev

# 進行單元測試
$ npm run test

# 使用正式環境進行瀏覽
$ npm run build
$ npm run start
```

## 將專案下載到您的電腦裡(後端)
```bash
# 下載程式碼
$ git init
$ git clone https://github.com/Andy-Ho8872/e-commerce-site-front-end.git

# 下載所需套件
$ composer install

# 請將.env檔案中的以下欄位更改為您本機中的資料，以建立資料庫連線
 DB_CONNECTION=mysql
 DB_HOST=您本地DB的HOST
 DB_PORT=您本地DB的PORT號碼
 DB_DATABASE=您本地DB的名稱
 DB_USERNAME=您本地DB使用者的名稱
 DB_PASSWORD=您本地DB的密碼

# 將資料庫表格遷移
$ php artisan migrate
```
### [下載假資料(all.sql)](https://drive.google.com/file/d/1DAijrLs1yGDqO10v17XxXot5zlSNKqA2/view?usp=sharing)

### 填入假資料(all.sql) 以 MySqlWorkbench為例
![步驟1](https://i.imgur.com/dtRuFHP.png)
![步驟2](https://i.imgur.com/u9AwX50.png)

### 使用指令運行API伺服器
![](https://i.imgur.com/hyzmoS9.png)

``` bash
# 運行API伺服器
$ php artisan serve
```

### 輸入API資料位置
![](https://i.imgur.com/8Kx5RsN.png)
### 測試完成 API 正常運作
![](https://i.imgur.com/p8f0to3.png)