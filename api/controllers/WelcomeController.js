'use strict';

var passport = require('passport');

var session = {
  init: function(req, row) {
    req.session.username = row.username;
    req.session.user_id = row.id;
    req.session.is_loggin = true;
  },

  destroy: function(req) {
    req.session.username = null;
    req.session.user_id = null;
    req.session.is_loggin = null;
  }
};

var data = function(data) {
  return _.assign({}, {
    error_text: null,
    success_text: null
  }, data);
};

module.exports = {
  index: function (req, res) {
    return res.view('homepage', data());
  },

  lists: function (req, res) {
    var start = req.allParams().start || null;
    var end = req.allParams().end || null;
    var where = {};

    if (!req.session.is_loggin) {
      return res.redirect('/login');
    }

    if (start && end) {
      where = {
         date: {
          '<=': end,
          '>=': start
        }
      };
    } else if (start) {
      where = {
         date: {
          '>=': start
        }
      };
    } else if (end) {
      where = {
         date: {
          '<=': end
        }
      };
    }

    Registeration.find(where)
      .populate('owner')
      .sort('date ASC')
      .exec(function findCB(err, rows){

        return res.view('lists', data({
          rows: rows
        }));
      });
  },

  records: function (req, res) {
    if (!req.session.is_loggin) {
      return res.redirect('/login');
    }

    Registeration.find({
      user_id: req.session.user_id
    })
    .sort('date ASC')
    .exec(function findCB(err, rows){

      return res.view('records', data({
        rows: rows
      }));
    });
  },

  removeRecord: function (req, res) {
    if (!req.session.is_loggin) {
      return res.redirect('/login');
    }

    Registeration.findOne({
      id: req.allParams().id,
      user_id: req.session.user_id
    }).exec(function findCB(err, row){
      if (row) {
        Registeration.destroy({
          id: req.allParams().id
        }).exec(function(err) {
          return res.redirect('/records');
        });
      } else {
        return res.redirect('/records');
      }
    });
  },

  loginForm: function (req, res) {
    if (req.session.is_loggin) {
      return res.redirect('/');
    }

    return res.view('login', data());
  },

  login: function (req, res) {
    var username = req.allParams().username;
    var password = req.allParams().password;

    passport.authenticate('ldapauth', function(err, user, info) {
      if(err || !user) {
        return res.redirect('/login');
      }

      User.findOne({
        username: username
      }).exec(function(err, row) {

        if (row) {
          session.init(req, row);

          return res.redirect('/register');
        }

        return User.create({
          username: username
        }).exec(function(err, row) {
          session.init(req, row);

          return res.redirect('/register');
        });
      });
    })(req, res);
  },

  registerForm: function (req, res) {
    if (!req.session.is_loggin) {
      return res.redirect('/login');
    }

    var date = req.allParams().date || null;

    return Registeration.find({date: date})
      .populate('owner')
      .exec(function findCB(err, rows){

        return res.view('register', data({
          date: date,
          rows: rows
        }));
      });
  },

  register: function (req, res) {

    var date = req.allParams().date || null;
    var time = req.allParams().time || null;

    if (_.isEmpty(date) || _.isEmpty(time) || time === '0') {
      return res.view('register', data({
        date: null,
        error_text: '欄位請勿空白'
      }));
    }

    Registeration.findOne({
      date: date,
      time: time
    }).exec(function(err, row) {

      if (row) {
        return res.view('register', data({
          date: null,
          error_text: '此時段已經有人申請過了'
        }));
      }

      return Registeration.create({
        user_id: req.session.user_id,
        date: date,
        time: time
      }).exec(function(err, created) {

        res.redirect('/records');
      });
    });
  },

  logout: function (req, res) {
    session.destroy(req);

    res.redirect('/');
  }
};
