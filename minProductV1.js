(function (m) {
    m.minV1Product = function (c, q) {
        var n = {
            click2cart: "0"
        },
            context = this,
            pid = '',
            section = (this.settings = {}, m(c)),
            variants = {};
        this.init = function () {
            this.settings = m.extend({}, n, q),
            t = null != section.attr("data-variant") && "auto" != section.attr("data-variant") ? section.attr("data-variant") : 0;
            console.log(t,'t');
            var t, pr = section.closest('[data-label="Product"]'), pr = (pr && pr.length && pr.attr("id") && (pid = pr.attr("id")),
            section.closest('[data-label="Product"]')), pr = (0 < pr.length && ("default" != pr.attr("data-status") && "dynamic" != pr.attr("data-status") || (pr = context.getUrlParameter("variant"),
            t = "" != context.getUrlParameter("variant") ? pr : 0)));
            console.log(section, 'section');
            console.log(this.settings, 'setting');
            console.log(t, 't2');
            return {

            }
        },
        this.getVariant = function() {
            return variants
        },
        this.getQuantity = function() {
            var t = section.find('[data-label="(P) Quantity"]>.sg-module');
            if (t && t.length) {
                t = t.find('input[name="quantity"]');
                if (t && t.length)
                    return t.val() || 1
            }
            return 1
        },
        this.checkPassBlankOption = function() {
            var a = !0;
            return section.closest('[data-label="Product"]').children(".sg-module").find('[data-label="(P) Variants"]').each(function() {
                f(this).find(".sg_variants").each(function() {
                    var t = m(this).find("option:selected")
                      , e = t.hasClass("sg_blank-option")
                      , t = "disabled" == t.attr("disabled");
                    (e || t) && (a = !1)
                })
            }),
            a
        },
        this.getUrlParameter = function(t) {
            t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            t = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(location.search);
            return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
        };
        this.init();
    }
    m.fn.minV1Product = function (e) {
        return this.each(function () {
            var t;
            null == m(this).data("minv1product") && (t = new m.minV1Product(this, e),
                m(this).data("minv1product", t))
        })
    }
}(window.MinQuery || jQuery));