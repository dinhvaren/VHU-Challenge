class HomeController {
  index(req, res, next) {
    res.render("auth/register-individual", { page: { title: "VHU InfoSec Lab" } });
  }
}

module.exports = new HomeController();
