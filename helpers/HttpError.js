const messageList = {
  400: "Bad Request",
  401: "Unathorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *         message:
 *           type: string
 */

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
