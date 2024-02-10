class apiResponse {
    constructor(statusCode , data , message , error = null) {
        this.statusCode = statusCode,
        this.data = data,
        this.message = message,
        this.error = error,
        this.status = statusCode < 400
    }
}

module.exports = apiResponse