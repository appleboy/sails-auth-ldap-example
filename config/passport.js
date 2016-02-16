var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;
var dotenv = require('dotenv');
dotenv.load();

var OPTS = {
  server: {
    url: process.env.LDAP_URL || 'ldap://localhost:389',
    bindDn: process.env.LDAP_BINDDN || 'cn=root',
    bindCredentials: process.env.LDAP_PASSWORD || 'secret',
    searchBase: process.env.LDAP_BASE || 'ou=passport-ldapauth',
    searchFilter: process.env.LDAP_FILTER || '(uid={{username}})'
  }
};

passport.use(
  new LdapStrategy(OPTS)
);

module.exports.http = {
  customMiddleware: function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
  }
};
