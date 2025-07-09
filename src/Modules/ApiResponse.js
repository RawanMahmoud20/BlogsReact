class ApiResponse {
  message;
  status;
  token;
  constructor(message, status, token) {
    this.message = message;
    this.status = status;
    this.token = token;
  }
}
export default ApiResponse;
