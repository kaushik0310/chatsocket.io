// "use strict";
// module.exports = {
//   success: (res, body = { message: "action completed", data: {} }) => {
//     return res.status(200).send({
//       status: true,
//       message: body.message,
//       result: body.data,
//     });
//   },

//   error: (res, body = { message: "failed to process request" }) => {
//     return res.status(403).send({
//       status: false,
//       message: body.message,
//     });
//   },

//   unauthorized: (res, body = { message: "unauthorized request" }) => {
//     return res.status(401).send({
//       status: false,
//       message: body.message,
//     });
//   },
// };
