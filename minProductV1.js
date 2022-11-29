(function (m) {
    f.gfV3Product = function (c, q) {
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
}(minQuery || jQuery));