import axios from 'axios'

export const state = () => ({
    carouselItem : []
})

export const mutaions =  {
    ADD_Carousel (state, payload) {
        state.carouselItem.push(payload)
    }
}

export const getters = {
    GetCarousel () {
        return state.carouselItem
    }
}

export const acitons = {
    // async SetCarousel (state) {
    //     let results = await axios.get('https://jsonplaceholder.typicode.com/photos/1')
    //     console.log(results.data);
    //     state.commit('ADD_Carousel', results.data)
    // }
}