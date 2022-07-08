"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var base_response_class_1 = require("../../../utils/classes/base-response.class");
var business_error_1 = require("../../../utils/errors/business.error");
function errorHandler(err, req, res, next) {
    if (err instanceof business_error_1.BusinessError) {
        res.status(400).send(new base_response_class_1.BaseResponse(false, "Bad request: ".concat(err.message)));
    }
    else {
        res.status(500).send(new base_response_class_1.BaseResponse(false, "Something went wrong: ".concat(err.message)));
    }
    next(err);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.middleware.js.map