"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    static ErrorResponse(res, statusCode, status, message = '') {
        return res.status(statusCode).json({ message, status });
    }
    static JoiErrorResponse(res, statusCode, status, error, message) {
        return res.status(statusCode).json({ status, message, error });
    }
    static SuccessResponse(res, statusCode, status, message = '', data) {
        return res.status(statusCode).json({ message, status, data });
    }
    static ServerErrorResponse(res) {
        return res
            .status(500)
            .json({ message: 'Internal Server Error', status: false });
    }
}
exports.default = ResponseHandler;
//# sourceMappingURL=responseHandler.js.map