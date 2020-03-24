export const isEnglish = value => {
    const english = /^[A-Za-z0-9.,\- ]*$/
    if(english.test(value)){
        return true
    }
    return false
}