export default function ({ $axios, redirect }) {
    $axios.onError(error => {
      if (error.response.status === 404) {
        // redirect('/sorry')
        alert('Http 請求發生錯誤: 來自 plugins/axios.js')
      }
    })
  }