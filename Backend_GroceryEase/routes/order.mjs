import express from 'express';
const router = express.Router();
import entryController from '../controllers/order.mjs'


// seed route
// !!!!! to be taken out for deployment
router.get('/seed', entryController.seed);

// Index Router
// *****        get  /grocery/
// *****     returns all orders
// NOTE: if the number of entries gets too large,
//      this may be updated  to limit the number returned
router.get('/', entryController.getEntries);

// TODO: post new entry
// TODO: get individual order
// TODO: get based on category
// TODO: edit
// TODO: delete

export default router;