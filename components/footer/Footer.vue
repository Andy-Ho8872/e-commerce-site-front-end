<template>
    <div class="footer_container d-md-flex justify-space-around blue-grey darken-4 blue-grey--text text--lighten-3 py-8">
        <ul class="about">
            <h2>關於本站</h2>
            <p class="about_paragraph">
                本站主要作為求職作品以及練習用途，所有商品的圖片均非本人所持有，著作、或拍攝，商品之資訊包含名稱、價格、評級均為虛構，並不代表商品在現實世界中的資訊。
            </p>
        </ul>
        <ul class="social_links">
            <h2>社群連結</h2>
            <div class="links_container d-md-flex">
                <li>
                    <a href="https://github.com/Andy-Ho8872"><i class="fab fa-github"></i></a>
                </li>
                <li>
                    <a href="https://twitter.com/home?lang=zh-tw"><i class="fab fa-twitter"></i></a>
                </li>
                <li>
                    <a href="https://www.facebook.com/"><i class="fab fa-facebook"></i></a>
                </li>
                <li>
                    <a href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a>
                </li>
            </div>
        </ul>
        <ul class="account_links">
            <h2>會員中心</h2>
            <li>
                <nuxt-link :to="{ name: 'user-account' }">個人資料</nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'user-order' }">查看訂單</nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{ name: 'user-notification' }"
                    >通知總覽</nuxt-link
                >
            </li>
        </ul>
        <ul class="author_links">
            <h2>聯繫作者</h2>
            <li>
                <v-icon small color="white" class="mr-2">fa-envelope</v-icon>
                <span>h880702520@gmail.com</span>
            </li>
            <li>
                <v-icon small color="white" class="mr-2">fa-phone</v-icon>
                <span>0955551354 (何先生)</span>
            </li>
        </ul>
        <div class="copy_right_claim text-center">
            <h3>Copyright © 2021 AndyHo8872.</h3>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$blue-gray-text-lighten-3: #b0bec5;
$blue-gray-text-lighten-4: #cfd8dc;
li {
    list-style: none;
    text-decoration: none;
    margin: 12px 0;
    &:hover {
        color: white;
    }
}
h2 {
    margin-bottom: 12px;
    color: $blue-gray-text-lighten-4;
}
a {
    text-decoration: none;
    color: $blue-gray-text-lighten-3;
    &:hover {
        color: white;
    }
}
.about {
    p {
        font-weight: 500;
        width: 250px;
    }
}
.social_links {
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background: #37474f;
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        font-size: 1.5em;
        border-radius: 4px;
        &:hover {
            background: #fb8c00;
            transition: background ease-in 0.2s;
        }
    }
    .links_container {
        li {
            margin-right: 12px;
        }
    }
}
.copy_right_claim {
    position: absolute;
    bottom: 0;
    padding: 20px;
}
@media (max-width: 768px) {
    ul {
        margin-bottom: 24px;
    }
    .copy_right_claim {
        width: 100%;
    }
}
</style>
