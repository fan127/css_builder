(function (m) {
    m.minV1Product = function (c, q) {
        var n = {
            click2cart: "0"
        }, 
        context = this,
        pid = '',
        section = (this.settings = {}, m(c));
        this.init = function() {
            this.settings = m.extend({}, n, q);
            console.log(section,'section');
            console.log(this.settings,'setting');
            return {

            }
        }
        this.init();
    }
    m.fn.minV1Product = function(e) {
        return this.each(function() {
            var t;
            null == m(this).data("minv1product") && (t = new m.minV1Product(this,e),
            m(this).data("minv1product", t))
        })
    }
}(jQuery));