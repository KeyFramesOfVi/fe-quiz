var cookieUtil = {
  init() {
    this.enabled = this.cookiesEnabled() ? 'Enabled' : 'Disabled';
  },
  createCookie(name, value, days) {
    var expires;
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toGMTString()}`;
    } else {
      expires = '';
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  },
  readCookie(name) {
    const search = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(search) == 0) {
        return c.substring(search.length, c.length);
      }
    }
    return null;
  },
  deleteCookie(name) {
    this.createCookie(name, '', -1);
  },
  deleteAllCookies() {
    if (document.cookie.length > 0) {
      const cs = document.cookie.split(';');
      for (let i = 0; i < cs.length; i += 1) {
        const c = cs[i].split('=');
        const cname = c[0];
        this.deleteCookie(cname);
      }
    } else {
      return false;
    }
  },
  cookiesEnabled() {
    this.createCookie('test', 'test');
    const test = this.readCookie('test');
    if (test == 'test') {
      this.deleteCookie('test');
      return true;
    }
    return false;
  },
};