import config from '../APIs/config'

export const apiAdminGetProducts = () => config.adminRequest.get('/product')
export const apiAdminGetSingleProduct = (product_id) => config.adminRequest.get(`/product/${product_id}`)
export const apiAdminUpdateProduct = (product_id, data) => config.adminRequest.patch(`/product/${product_id}/update`, data)
export const apiAdminStoreProduct = (data) => config.adminRequest.post(`/product/store`, data)
export const apiAdminAddProductVariation = (product_id, data) => config.adminRequest.post(`/product/${product_id}/variation/create`, data)
export const apiAdminDeleteProductVariation = (product_id, variation_id) => config.adminRequest.delete(`/product/${product_id}/variation/${variation_id}/delete`)
export const apiAdminUpdateProductVariationOption = (product_id, variation_id, data) => config.adminRequest.patch(`/product/${product_id}/variation/${variation_id}/update`, data)


export const apiAdminGetProductTags = () => config.adminRequest.get('/product/tag/getTags')
export const apiAdminGetProductTag = (tag_id) => config.adminRequest.get(`/product/tag/${tag_id}`)
export const apiAdminStoreProductTag = (data) => config.adminRequest.post('/product/tag/store', data)
export const apiAdminUpdateProductTag = (tag_id, data) => config.adminRequest.patch(`/product/tag/${tag_id}/update`, data)
export const apiAdminDeleteProductTag = (tag_id) => config.adminRequest.delete(`/product/tag/${tag_id}/delete`)