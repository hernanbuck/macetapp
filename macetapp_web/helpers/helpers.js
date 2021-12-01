export const getFormattedDate = (actualDate) => {
    const date = new Date(actualDate)
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const day = date.getDate()
    const hour = date.getHours()
    const mins = date.getMinutes()
    const min = mins.toString().length === 1 ? date.getMinutes() + "0" : date.getMinutes()

    return `${day}/${month}/${year} ${hour}:${min}`
}

export const Logger = (type = "log", text, err = "", loggear = true) => {
    loggear = true;
    if (loggear) {
        switch (type) {
            case 'error':
                console.error(text, err)
                break;
            default:
                console.log(text, err)
        }

    }
}

export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}