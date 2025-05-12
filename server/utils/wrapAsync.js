function WrapAsync(fn) {
    return function(err, req, res, next) {
        fn(req, res, next).catch(next);
    }
}

export default WrapAsync;