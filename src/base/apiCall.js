const apiCall = (type, url, request = {}) => {

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return dispatch({
        'API_CALL': {
          type,
          url,
          request,
          handleSuccess(data){
            resolve(data)
          },
          handleError(err){
            reject(err)
          }
        }
      })
    })
  }
}

export default apiCall