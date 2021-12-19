import config from '../APIs/config'

//------------------------------------------- 商品相關的 API -------------------------------------------//
    //* 撈取所有產品
export const apiGetProducts = () => config.productRequest.get('/'); // ! 暫時不使用
    //* 網站首頁的產品
export const apiGetIndexPageProducts = () => config.productRequest.get('/indexPage');
    //* 圖片輪播產品
export const apiGetCarouselProducts = () => config.productRequest.get('/carousel');
    //* 撈取單一產品
export const apiGetProduct = (id) => config.productRequest.get(`/${id}`);
    //* 撈取商品標籤
export const apiGetProductTags = () => config.productRequest.get(`/tags/getTags`);
    //* 商品換頁(Pagination) 
export const apiGetProductsWithPagination = (orderBy, sortBy, page) => config.productRequest.get(`/pagination/orderBy/${orderBy}/sortBy/${sortBy}?page=${page}`);
    //!  搜尋商品(名稱) 暫時未用到 
export const apiSearchByTitle = (title) => config.productRequest.get(`/search/${title}`);
    //* 搜尋商品(含分頁)
export const apiSearchByTitleWithPagination = (title, page) => config.productRequest.get(`/search/${title}/pagination?page=${page}`);
    //* 搜尋商品(自動補全)
export const apiSearchAutoComplete = (title) => config.productRequest.get(`/search/${title}/autocomplete`);
    //! 搜尋商品(標籤)  暫時未用到
export const apiSearchByTag = (id) => config.productRequest.get(`/tags/${id}`);
//------------------------------------------- 商品相關的 API -------------------------------------------//