var cookieUtil = {
  init: function () {
    this.enabled = this.cookiesEnabled() ? 'Enabled' : 'Disabled';
  },
  createCookie: function (name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  },
  readCookie: function (name) {
    var search = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i += 1) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(search) == 0) {
        return c.substring(search.length, c.length);
      }
    }
    return null;
  },
  devareCookie: function (name) {
    this.createCookie(name, '', -1);
  },
  devareAllCookies: function () {
    if (document.cookie.length > 0) {
      var cs = document.cookie.split(';');
      for (var i = 0; i < cs.length; i += 1) {
        var c = cs[i].split('=');
        var cname = c[0];
        this.devareCookie(cname);
      }
    } else {
      return false;
    }
  },
  cookiesEnabled: function () {
    this.createCookie('test', 'test');
    var test = this.readCookie('test');
    if (test == 'test') {
      this.devareCookie('test');
      return true;
    }
    return false;
  },
};