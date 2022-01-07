class NewsController {
    // GET/ news
    main(req, res) {
        res.render('news')
    }
    // GET/news/:slug(params)
    showDetail(req, res) {
        res.send("Detail about news!!");
    }
}

module.exports = new NewsController;