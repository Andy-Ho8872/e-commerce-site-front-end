import axios from 'axios'
let url = 'https://my-json-server.typicode.com/Andy-Ho8872/FakeJsonData/products'


export const state = () => ({
    carouselItem : []
})

export const mutations =  {
    // url = 10筆資料
    ADD_Carousel (state, urls) {
        state.carouselItem.push(urls)
    }
}

export const actions = {
    async SetCarousel (state) {
        let results = await axios.get(url)
        console.log(results.data);
        state.commit('ADD_Carousel', results.data)
    }
}

export const getters = {
    GetCarousel (state) {
        return state.carouselItem
    }
}