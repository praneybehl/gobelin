module.exports = { 
  enableMultiViews : function () {
    // Monkey-patch express to accept multiple paths for looking up views.
    // this path may change depending on your setup.
    var View = require("express/lib/view"),
      lookup_proxy = View.prototype.lookup

    View.prototype.lookup = function(viewName) {
      var context, match
      if (this.root instanceof Array) {
        for (var i = 0; i < this.root.length; i++) {
          context = {root: this.root[i]}
          match = lookup_proxy.call(context, viewName)
          if (match) {
            return match
          }
        }
        return null
      }
      return lookup_proxy.call(this, viewName)
    }
  }
}