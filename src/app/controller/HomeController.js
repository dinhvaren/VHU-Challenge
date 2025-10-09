class HomeController {
  index(req, res, next) {
    res.render("error/500", { page: { title: "VHU InfoSec Lab" } });
  }
}

module.exports = new HomeController();
