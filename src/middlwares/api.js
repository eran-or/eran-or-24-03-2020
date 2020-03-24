export default store => next => action => {
    const apiCall = action['API_CALL']
    if (!apiCall) {
        return next(action);
    }

    const {type, url, request, handleSuccess, handleError} = apiCall
    next({type: `REQUEST_STARTED_${type}`, request, url})
    const { 
        method = 'GET', 
        mode = 'cors', 
        cache = 'no-cache', 
        credentials = 'same-origin', 
        headers = {}, 
        redirect = 'follow', 
        referrerPolicy = 'no-referrer',
        contentType = '',
        data } = request
    return (async () => {
        let response = await fetch(url, 
            {
                method,
                mode,
                cache,
                credentials,
                headers: {
                    ...(contentType && {'Content-Type': contentType}),
                    'Accept': '*',
                    ...headers
                },
                redirect,
                referrerPolicy,
                ...(data && { body: JSON.stringify(data) })
        }
        );
        
        try {
            let json = await response.json()
            next({type: `REQUEST_SUCCESSED_${type}`, payload: json})
            handleSuccess(json)
        } catch (e){
            next({type: `REQUEST_FAILED_${type}`, error: e})
            handleError(e)
        }
    })()

}