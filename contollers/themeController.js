// import Board from '../models/board.js';

import { controlWrapper } from '../decorators/index.js';

// import { HttpError } from '../helpers/index.js';

const sayHallo = async (req, res) => {
  res.json('Hallo from Theme');
};

export default {
  sayHallo: controlWrapper(sayHallo),
};
