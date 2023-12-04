var express = require('express');
const { FilterProductBySupplier,
    SortProductAToZ,
    SortProductZToA,
    SortProductPriceHToL,
    SortProductPriceLToH,
    SortCategoryAToZ,
    SortCategoryZToA,
    SortSupplierAToZ,
    SortSupplierZToA,
    getProductLimit,
    filterOrderByCustomerId
} = require('./controller');

var router = express.Router();

router.get('/filterPbyS', FilterProductBySupplier);
router.get('/sortPByAZ', SortProductAToZ);
router.get('/sortPByZA', SortProductZToA);
router.get('/sortCByAZ', SortCategoryAToZ);
router.get('/sortCByZA', SortCategoryZToA);
router.get('/sortSByAZ', SortSupplierAToZ);
router.get('/sortSByZA', SortSupplierZToA);
router.get('/sortProductPriceFromHtoL', SortProductPriceHToL);
router.get('/sortProductPriceFromLtoH', SortProductPriceLToH);
router.get('/getProductLimit', getProductLimit);
router.get('/filterOrderByCustomerId', filterOrderByCustomerId);

module.exports = router;
