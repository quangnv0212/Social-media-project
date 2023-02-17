class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
    // Đánh đấu đây là lỗi Operation
    this.isOperational = true;
    // Khi 1 new object được tạo ra và hàm constructor được chạy, Stack trace không bị pollute
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
