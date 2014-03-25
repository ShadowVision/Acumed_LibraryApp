
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('../www/index', { title: 'SLIC' });
};

exports.title = function(req, res){
    res.render('title',{ title: 'SLIC' });
};