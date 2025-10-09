class HomeController {
  index(req, res, next) {
    res.render("admin/leaderboard", { page: { title: "VHU InfoSec Lab" } });
  }
}

module.exports = new HomeController();
