class Main {
  static async homepage(req, res) {
    try {
      res.render('homepage');
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Main;