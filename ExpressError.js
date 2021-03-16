class ExpressError extends Error{
    constructor(message, error) {
        super();
        this.message = message;
        this.status = error;
        console.log(this.stack);
    }
}

module.exports = ExpressError;