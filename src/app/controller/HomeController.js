class HomeController {
  index(req, res, next) {
    res.render("admin/teams", { page: { title: "VHU InfoSec Lab" } });
  }
}

module.exports = new HomeController();
