function refreshRechargeOptions(t, e, a) {
    if (a = a || window.ReCharge)
        try {
            var n, i, r, o = e(t).find("#rc_container"), d = o.find("#rc_radio_options").find("input:checked");
            d && d.length && ((n = o.closest('[data-label="Product"]>.module').children("[data-productid]")) && n.length && (i = n.data("productid"),
                a && a.products && ((r = a.products.find(function (t) {
                    return t.id == i
                })) && (r.options.purchaseType = "__2fh3j89_fake_option_4rc5vum9__"))),
                d.trigger("click"))
        } catch (t) {
            console.log(t)
        }
};
function hasImageShopify(t) {
    return !!t && (-1 != t.indexOf("cdn.shopify.com/s/files/") || -1 != t.indexOf("apps.shopifycdn.com/"))
};
function hasImageUCare(t) {
    return !!t && -1 != t.indexOf("ucarecdn.com/")
};
function replaceImageToSize(t, e) {
    if (t && null != e && null != e) {
        var a = e;
        if (hasImageShopify(t)) {
            var n = ""
                , i = t.split("?");
            i && i.length && 2 <= i.length && (n = i[1]);
            var i = i[0].split("/").pop().split(".")
                , r = i.pop();
            if (-1 !== ["jfif"].indexOf(r))
                return t;
            for (var i = i.join("."), o = i.split("_"), d = (o && 2 <= o.length && (o = o.pop(),
                l = new RegExp(/(\d+)x(\d+)|(\d+)x|x(\d+)/, "gm"),
                o && l.test(o) && "" == o.replace(l, "") && ((i = i.split("_")).pop(),
                    i = i.join("_"))),
                t.split("?")[0].split("/")), c = "", s = 0; s < d.length - 1; s++)
                c += d[s] + "/";
            t = e ? c + i + "_" + e + "." + r : c + i + "." + r,
                n && (t = t + "?" + n)
        }
        if (hasImageUCare(t)) {
            o = t.split("/-");
            if (o && o.length) {
                var l = o.length
                    , e = o[0]
                    , i = e.replace("https://", "").replace("http://", "")
                    , u = (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i.test(i) && ((r = i.split("/")).pop(),
                        i = r.join("/")),
                        e.includes("https") ? e = "https://" + i : e.includes("http") && (e = "http://" + i),
                        o.slice(1, l));
                u.find(function (t) {
                    t.includes("preview")
                }) || u.unshift("/preview");
                for (var f = 0; f < u.length; f++) {
                    var g, h = u[f];
                    "/" == u[f][0] && (h = u[f].slice(1, h.length)),
                        (h = "/" == u[f][h.length - 1] ? u[f].slice(0, h.length - 1) : h).includes("preview") && (h = u[f],
                            a.includes("x") ? (g = a.split("x")) && g.length && 1 == (g = g.filter(function (t) {
                                t.trim().length
                            })).length && (a = g[0] + "x" + g[0]) : isNaN(parseInt(a)) || (a = a + "x" + a),
                            h = "/preview/" + a,
                            u && 1 == u.length && "/preview" == u[0] && (h += "/"),
                            u[f] = h)
                }
                t = e + "/-" + u.join("/-")
            }
        }
    }
    return t
};
(function (u) {
    u.mpZoon = function (t, e) {
        var i, r, o, d, c, a = {
            target: void 0,
            imageUrl: void 0,
            imageZoomUrl: void 0,
            magnify: 1
        }, s = (this.settings = {},
            u(t)), l = this;
        this.init = function () {
            return this.settings = u.extend({}, a, e),
                s.css({
                    position: "relative",
                    overflow: "hidden"
                }),
                i = null != l.settings.target ? l.settings.target : s,
                l.initZoom(),
                !1
        }
            ,
            this.destroy = function () {
                return s.off(".zoom"),
                    i.find(".zoomImg").remove(),
                    !1
            }
            ,
            this.initZoom = function (t, e) {
                l.destroy(),
                    r = document.createElement("img"),
                    o = u(r);
                var a = s.find("img[data-zoom]");
                return null != t && a.attr("src", t),
                    null != e ? a.attr("data-zoom", e) : e = a.attr("data-zoom"),
                    null != e && (r.onload = function () {
                        d = i.outerWidth(),
                            c = i.outerHeight();
                        var t, e, a = r.width, n = r.height, a = (t = a < d && 1 == l.settings.magnify ? d / a : l.settings.magnify,
                            o.addClass("zoomImg").css({
                                position: "absolute",
                                top: 0,
                                left: 0,
                                opacity: 0,
                                width: a * t,
                                height: n * t,
                                border: "none",
                                maxWidth: "none",
                                maxHeight: "none"
                            }).appendTo(i),
                            u("#prevew_builder").hasClass("editing") ? "dev" : "production");
                        a && "production" == a && 0 < (n = i.find("a[href]")).length && ((e = n.attr("href")) && "" != e && s.off("click.openLink").on("click.openLink", function (t) {
                            window.location.href = e
                        })),
                            s.on("mouseover.zoom", l.startZoom).on("mouseleave.zoom", l.stopZoom).on("mousemove.zoom", l.moveZoom)
                    }
                        ,
                        r.src = e),
                    !1
            }
            ,
            this.moveZoom = function (t) {
                var e = t.pageX - i.offset().left
                    , t = t.pageY - i.offset().top
                    , a = (r.width - d) / d
                    , n = (r.height - c) / c;
                o.css({
                    left: e * -a + "px",
                    top: t * -n + "px"
                })
            }
            ,
            this.startZoom = function (t) {
                d != i.outerWidth() && l.initZoom(),
                    l.moveZoom(t),
                    o.stop().fadeTo(300, 1)
            }
            ,
            this.stopZoom = function (t) {
                o.stop().fadeTo(300, 0)
            }
            ,
            this.init()
    }
        ,
        u.fn.mpZoon = function (e) {
            return this.each(function () {
                var t;
                null == u(this).data("mpzoom") && (t = new u.mpZoon(this, e),
                    u(this).data("mpzoom", t))
            })
        }
}(window.MinQuery || jQuery)),
    (Shopify = "undefined" == typeof Shopify ? {} : Shopify).formatMoney || (Shopify.formatMoney = function (t, e) {
        var a = ""
            , n = /\{\{\s*(\w+)\s*\}\}/
            , e = e || this.money_format;
        function i(t, e) {
            return void 0 === t ? e : t
        }
        function r(t, e, a, n) {
            return e = i(e, 2),
                a = i(a, ","),
                n = i(n, "."),
                isNaN(t) || null == t ? 0 : (e = (t = (t / 100).toFixed(e)).split("."))[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a) + (e[1] ? n + e[1] : "")
        }
        switch ("string" == typeof t && (t = t.replace(".", "")),
        e.match(n)[1]) {
            case "amount":
                a = r(t, 2);
                break;
            case "amount_no_decimals":
                a = r(t, 0);
                break;
            case "amount_with_comma_separator":
                a = r(t, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                a = r(t, 0, ".", ",")
        }
        return e.replace(n, a)
    }),
    function (f) {
        f.minV1Product = function (c, q) {
            var data = {
                click2cart: "0"
            },
                context = this,
                pid = '',
                section = (this.settings = {}, f(c)),
                variants = {};
            this.init = function () {
                this.settings = f.extend({}, data, q),
                    t = null != section.attr("data-variant") && "auto" != section.attr("data-variant") ? section.attr("data-variant") : 0;
                var t, pr = section.closest('[data-label="Product"]'), pr = (pr && pr.length && pr.attr("id") && (pid = pr.attr("id")),
                    section.closest('[data-label="Product"]')), pr = (0 < pr.length && ("default" != pr.attr("data-status") && "dynamic" != pr.attr("data-status") || (pr = context.getUrlParameter("variant"),
                        t = "" != context.getUrlParameter("variant") ? pr : 0)), context.getVariantById(t));
                return context.setVariant(pr, true),
                    context.onChangeVariant(),
                    context.onChangeVariantId(),
                    context.onChangeQuantity(),
                    context.subscribeMediaData(),
                    !1;
            },
                this.getVariantFromMedia = function (e) {
                    var t = context.findProductModule()
                        , a = {};
                    if (0 < t.find(".product-json").length)
                        try {
                            return (a = f.parseJSON(t.find(".product-json").html())).variants.find(function (t) {
                                return !(!t || !t.featured_image || t.featured_image.id != e) || t && t.featured_media && t.featured_media.id == e
                            })
                        } catch (t) {
                            console.warn(t.message)
                        }
                    else
                        try {
                            var n = section.closest("[data-pid]").attr("data-pid");
                            return (a = null != window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor") ? window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor").searchProductInList(n) : a).variants.find(function (t) {
                                return t.image_id == e
                            })
                        } catch (t) {
                            console.warn(t.message)
                        }
                },
                this.subscribeMediaData = function () {
                    window.MINSTORE && window.MINSTORE.subscribe("minActiveMediaData-" + pid, function (t) {
                        var e, t = context.getVariantFromMedia(t.id);
                        t && ((e = context.findProductModule().data("mpv1product")) ? e.setVariant(t, !1) : console.warn("couldn't find parent product module"))
                    })
                },
                this.findProductModule = function () {
                    var t = section.closest('[data-label="Product"]').children(".sg-module");
                    return t = 0 == t.length ? section.closest('[data-icon="mpicon-product"]').children(".sg-module") : t
                },
                this.getVariant = function () {
                    return variants
                },
                this.getQuantity = function () {
                    var t = section.find('[data-label="(P) Quantity"]>.sg-module');
                    if (t && t.length) {
                        t = t.find('input[name="quantity"]');
                        if (t && t.length)
                            return t.val() || 1
                    }
                    return 1
                },
                this.checkPassBlankOption = function () {
                    var a = !0;
                    return section.closest('[data-label="Product"]').children(".sg-module").find('[data-label="(P) Variants"]').each(function () {
                        f(this).find(".sg_variants").each(function () {
                            var t = f(this).find("option:selected")
                                , e = t.hasClass("sg_blank-option")
                                , t = "disabled" == t.attr("disabled");
                            (e || t) && (a = !1)
                        })
                    }),
                        a
                },
                this.setVariant = function (e, a) {
                    if (this.checkPassBlankOption(),
                        (a = null != a && a) || !e.id || !variants.id || variants.id != e.id) {
                        var t = null != e.id ? e.id : ""
                            , n = !1
                            , i = ((a || e.id && variants.id != t) && (n = !0),
                                section.attr("data-current-variant", t),
                                section.children("form").children('[name="id"]'));
                        if ((!(i && 0 < i.length) &&
                            0 < section.find("#rc_container, .rc_container").length ? section.children("form").children("[data-productid]")
                            : section.children("form").children('[name="id"]')).attr("data-value", t).val(t),
                            variants = e,
                            !a) {
                            i = window.location.href,
                                i = context.updateUrlParameter(i, "variant", t);
                            try {
                                window.history.replaceState({}, "", i)
                            } catch (t) { }
                        }
                        return section.find('[data-label="(P) Variants"]').each(function () {
                            var t = f(this);
                            null != t.children(".sg-module").data("mpv1productvariants") && t.children(".sg-module").data("mpv1productvariants").initWithVariant(e)
                        }),
                            section.find('[data-label="(P) Variants"]').each(function () {
                                var t = f(this);
                                null != t.children(".sg-module").data("mpv1productswatches") && t.children(".sg-module").data("mpv1productswatches").initWithVariant(e)
                            }),
                            section.find('[data-label="(P) Quantity"]').each(function () {
                                null != ($quantity = f(this)).children(".sg-module").data("mpv1productquantity") && $quantity.children(".sg-module").data("mpv1productquantity").initWithVariant(e)
                            }),
                            section.find('[data-label="(P) Price"]').each(function () {
                                var t = f(this);
                                null != t.children(".sg-module").data("mpv1productprice") && t.children(".sg-module").data("mpv1productprice").initWithVariant(e)
                            }),
                            section.find('[data-label="(P) Image"]').each(function () {
                                var t = f(this);
                                null != t.children(".sg-module").data("mpv1productimage") && t.children(".sg-module").data("mpv1productimage").initWithVariant(e, a)
                            }),
                            section.find('[data-label="(P) Cart Button"]').each(function () {
                                var t = f(this).children(".sg-module").data("mpv1productcartbutton");
                                null != t && t.initWithVariant(e)
                            }),
                            section.find('[data-label="(P) Image List"]').each(function () {
                                var t = f(this);
                                setTimeout(function () {
                                    null != t.children(".sg-module").data("mpv1productimagelist") && t.children(".sg-module").data("mpv1productimagelist").gotoThumb(e)
                                }, 0)
                            }),
                            // section.find('[data-label="(P) Stock Counter"]').each(function () {
                            //     var t = f(this);
                            //     setTimeout(function () {
                            //         null != t.children(".sg-module").data("gfv1stockcounter") && t.children(".sg-module").data("gfv1stockcounter").initWithVariant(e)
                            //     }, 0)
                            // }),
                            n && this.triggerChangeVariant(e),
                            !1
                    }
                },
                this.triggerChangeVariant = function (t) {
                    window.MINSTORE && window.MINSTORE.dispatch("product-" + pid + "-variant", t)
                },
                this.triggerAddedToCart = function (t, e) {
                    window.MINSTORE && (window.MINSTORE.dispatch("product-" + pid + "-addtocart-success", t, e),
                        f("#" + i).trigger("addToCartSuccess.gfaction"))
                },
                this.triggerErrorAddToCart = function (t, e) {
                    window.MINSTORE && (window.MINSTORE.dispatch("product-" + pid + "-addtocart-error", t, e),
                        f("#" + i).trigger("addToCartError.gfaction"))
                },
                this.onChangeVariant = function () {
                    window.MINSTORE && window.MINSTORE.subscribe("product-" + pid + "-variant", function (t) {
                        context.setVariant(t)
                    })
                },
                this.onChangeVariantId = function () {
                    window.MINSTORE && window.MINSTORE.subscribe("product-" + pid + "-variant-id", function (t) {
                        t = context.getVariantById(t);
                        context.setVariant(t)
                    })
                },
                this.onChangeQuantity = function () {
                    window.MINSTORE && window.MINSTORE.subscribe("product-" + pid + "-quantity", function (t) {
                        context.changeQuantityValue(t)
                    })
                },
                this.changeQuantityValue = function (t) {
                    var e = section.find('input[name="quantity"], .sg_pq_qty');
                    return e && e.length && e.each(function () {
                        f(this).val() != t && f(this).val(t).trigger("change")
                    }),
                        !1
                },
                this.getVariantById = function (t) {
                    var e = {}
                        , a = section.closest('[data-label="Product"]');
                    if (0 < a.find(".product-json").length)
                        try {
                            var n = section.find('.sg-module').find(">form").children('[name="id"]').attr("data-productid");
                            if (o = 0 < a.find("#product-json" + n).length ? f.parseJSON(a.find("#product-json" + n).html()) : f.parseJSON(a.find(".product-json").html()),
                                0 == t) {
                                for (var e = o.variants[0], i = 1; !e.available && i < o.variants.length;)
                                    e = o.variants[i],
                                        i++;
                                e.available || (e = o.variants[0])
                            } else {
                                for (var r = 0; r < o.variants.length; r++)
                                    if (o.variants[r].id.toString() == t.toString()) {
                                        e = o.variants[r];
                                        break
                                    }
                                if (f.isEmptyObject(e))
                                    try {
                                        e = o.variants[0]
                                    } catch (t) {
                                        console.log(t.message)
                                    }
                            }
                        } catch (t) {
                            console.log(t.message)
                        }
                    else
                        try {
                            n = section.attr("data-pid");
                            if (null != window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor")) {
                                var o = window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor").searchProductInList(n);
                                if (0 == t) {
                                    e = o.variants[0];
                                    for (i = 1; !e.available && i < o.variants.length;)
                                        e = o.variants[i],
                                            i++;
                                    e.available || (e = o.variants[0])
                                } else {
                                    for (r = 0; r < o.variants.length; r++)
                                        if (o.variants[r].id.toString() == t.toString()) {
                                            e = o.variants[r];
                                            break
                                        }
                                    if (f.isEmptyObject(e))
                                        try {
                                            e = o.variants[0]
                                        } catch (t) {
                                            console.log(t.message)
                                        }
                                }
                            }
                        } catch (t) {
                            console.log(t.message)
                        }
                    return e
                },
                this.getVariantByImage = function (t) {
                    var t = t.split("?")[0].split(".")
                        , e = t.pop()
                        , a = t.pop().replace(/_[a-zA-Z0-9@]+$/, "")
                        , n = t.join(".") + "." + a + "." + e
                        , i = {}
                        , r = 0;
                    if (0 < section.find(".product-json").length)
                        try {
                            for (var o = f.parseJSON(l.find(".product-json").html()), d = 0; d < o.variants.length; d++) {
                                var c = o.variants[d].featured_image;
                                if (-1 !== c.src.indexOf(n) && 0 < c.variant_ids.length) {
                                    r = c.variant_ids[0];
                                    break
                                }
                            }
                            if (0 < r)
                                for (d = 0; d < o.variants.length; d++)
                                    if (r == o.variants[d].id) {
                                        i = o.variants[d];
                                        break
                                    }
                        } catch (t) {
                            console.log(t.message)
                        }
                    else
                        try {
                            var s = section.attr("data-pid");
                            if (null != window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor")) {
                                for (o = window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor").searchProductInList(s),
                                    d = 0; d < o.images.length; d++)
                                    if (-1 !== o.images[d].src.indexOf(n) && 0 < o.images[d].variant_ids.length) {
                                        r = o.images[d].variant_ids[0];
                                        break
                                    }
                                if (0 < r)
                                    for (d = 0; d < o.variants.length; d++)
                                        if (r == o.variants[d].id) {
                                            i = o.variants[d];
                                            break
                                        }
                            }
                        } catch (t) {
                            console.log(t.message)
                        }
                    return i
                },
                this.getUrlParameter = function (t) {
                    t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    t = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(location.search);
                    return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
                },
                this.updateUrlParameter = function (t, a, n) {
                    var i, e = document.createElement("a"), t = (e.href = t,
                        e.pathname), t = (t && "/" != t.substr(0, 1) && (t = "/" + t),
                            e.protocol + "//" + e.host + t);
                    return e.search && -1 !== e.search.indexOf("?") ? -1 !== e.search.indexOf(a + "=") ? ((i = (i = e.search.replace("?", "")).split("&")).forEach(function (t, e) {
                        -1 !== t.indexOf(a + "=") && (null !== n ? i[e] = a + "=" + n : delete i[e])
                    }),
                        0 < i.length && (t += "?" + i.join("&"))) : t += null !== n ? e.search + "&" + a + "=" + n : e.search : null !== n && (t += "?" + a + "=" + n),
                        t += e.hash
                },
                this.addItemToCart = function (e, a) {
                    var n, t, i, r, o, d, c, s;
                    return window.MINSTORE && window.MINSTORE.checkKeyValid("bestWayAddToCart") ? (t = new FormData(section.children("form")[0]),
                        c = {},
                        t.forEach ? t.forEach(function (t, e) {
                            c[e] = t
                        }) : section.children("form").find("[name]").each(function () {
                            var t = f(this).attr("name")
                                , e = f(this).val();
                            t && (c[t] = e)
                        }),
                        f.ajax({
                            type: "POST",
                            url: "/cart/add.js",
                            dataType: "json",
                            data: t,
                            processData: !1,
                            contentType: !1,
                            success: function (t) {
                                e(t),
                                    context.triggerAddedToCart(t, c)
                            },
                            error: function (t) {
                                a(t),
                                    context.triggerErrorAddToCart(t, c)
                            }
                        })) : (n = 1,
                            t = (section.find('.module-wrap[data-label="(P) Quantity"]').each(function (t, e) {
                                e = f(e);
                                if ("none" != e.css("display"))
                                    return n = parseInt(e.find('input[name="quantity"]').val()),
                                        !1
                            }),
                                section.find('input[name="id"]').val()),
                            0 < section.find("#rc_container, .rc_container").length ? (s = section.find("#rc_container, .rc_container"),
                                (t = null == t ? s.find("#rc_duplicate_selector").val() : t) && "" != t || (t = s.find("#rc_duplicate_selector").children().val() || section.find("[name='id'][data-value]").attr("data-value") || section.find("[name=''][data-productid]").val()),
                                r = s.find('[id^="rc_shipping_interval_frequency"]'),
                                i = s.find('[name="purchase_type"]:checked').val(),
                                r = void 0 !== r.val() ? r.val() : "1",
                                o = s.find("#rc_shipping_interval_unit_type").val(),
                                d = s.find("#rc_subscription_id").val(),
                                s = parseInt(s.find('[name="selling_plan"]').val()),
                                c = {
                                    quantity: n,
                                    id: t
                                },
                                i && "" != i && "onetime" != ((c.purchase_type = i) || "").toLowerCase() && (c["properties[shipping_interval_frequency]"] = r,
                                    c["properties[shipping_interval_unit_type]"] = o,
                                    c["properties[subscription_id]"] = d)) : (c = {
                                        quantity: n,
                                        id: t
                                    },
                                        s = parseInt(section.find('[name="selling_plan"]').val())),
                            isNaN(s) || (c.selling_plan = s),
                            section.find('[name^="properties"]').each(function (t, e) {
                                var e = f(e)
                                    , a = e.attr("name")
                                    , e = e.val();
                                null != e && "" != e && null == c[a] && (c[a] = e)
                            }),
                            f.ajax({
                                type: "POST",
                                url: "/cart/add.js",
                                data: c,
                                dataType: "json",
                                success: function (t) {
                                    e(t),
                                        context.triggerAddedToCart(t, c)
                                },
                                error: function (t) {
                                    a(t),
                                        context.triggerErrorAddToCart(t, c)
                                }
                            })),
                        !1
                };
            this.init();
        }
        f.fn.minV1Product = function (e) {
            return this.each(function () {
                var t;
                null == f(this).data("mpv1product") && (t = new f.minV1Product(this, e),
                    f(this).data("mpv1product", t))
            })
        }
    }(window.MinQuery || jQuery),
    function (v) {
        v.minV1ProductVariants = function (t, e) {
            var data = {
                mode: "production",
                blankOption: void 0,
                blankOptionText: void 0,
                style: "default",
                onVariantSelected: function (t, e) { }
            }
                , section = (this.settings = {},
                    v(t))
                , context = this;
            this.init = function () {
                this.settings = v.extend({}, data, e);
                "production" == context.settings.mode && (1 == section.find(".sg_variants > option").length && -1 !== section.find(".sg_variants > option:first").val().indexOf("Default") ? section.find(".sg_variants").hide() : section.find(".sg_variants").show());
                var t = context.findParentProduct();
                return null != t.data("mpv1product") && (t = t.data("mpv1product").getVariant(),
                    context.initWithVariant(t)),
                    context.applyEvents(),
                    setTimeout(function () {
                        var t = context.settings.blankOption
                            , e = context.settings.blankOptionText;
                        null != t && ("1" == t ? section.find(".sg_variants").each(function () {
                            v(this).prepend('<option class="blank-option sg_blank-option" selected="selected" value="">' + e + "</option>"),
                                v(this).attr("required", "required")
                        }) : section.find(".sg_variants").each(function () {
                            v(this).find("option.blank-option").remove(),
                                v(this).removeAttr("required")
                        }))
                    }, 10),
                    !1
            }
                ,
                this.initWithVariant = function (t) {
                    if (!v.isEmptyObject(t))
                        if ("separately" == section.find(".sg_variants:first").attr("data-type")) {
                            if (t.options && 0 < t.options.length)
                                for (var e = [], a = 1; a <= t.options.length; a++)
                                    null != t["option" + a] && e.push(t["option" + a]);
                            else
                                e = t.title.split(" / ");
                            var n = 0;
                            section.find("select").each(function () {
                                var t = v.trim(e[n]);
                                v(this).val(t),
                                    n++
                            })
                        } else
                            section.find(".sg_variants").val(t.id);
                    return !1
                }
                ,
                this.applyEvents = function () {
                    return section.find(".sg_variants").off("change").on("change", function () {
                        var t = v(this)
                            , e = context.findParentProduct()
                            , a = v(this).closest("form")
                            , n = v(this).attr("data-type")
                            , i = {};
                        if ("together" == n) {
                            var r = v(this).val();
                            if (a.children('[name="id"]').attr("data-value", r).val(r),
                                0 < e.find(".product-json").length)
                                try {
                                    var o = a.children('[name="id"]').attr("data-productid");
                                    var c = 0 < e.find("#product-json" + o).length ? v.parseJSON(e.find("#product-json" + o).html()) : v.parseJSON(e.find(".product-json").html());
                                    for (var d = 0; d < c.variants.length; d++)
                                        if (c.variants[d].id == r) {
                                            i = c.variants[d];
                                            break
                                        }
                                } catch (t) {
                                    console.log(t.message)
                                }
                        } else {
                            var s = [];
                            if (section.find(".sg_variants").each(function () {
                                s.push(v(this).val())
                            }),
                                0 < e.find(".product-json").length)
                                try {
                                    var o = a.children('[name="id"]').attr("data-productid");
                                    var c = 0 < e.find("#product-json" + o).length ? v.parseJSON(e.find("#product-json" + o).html()) : v.parseJSON(e.find(".product-json").html());
                                    for (var d = 0; d < c.variants.length; d++)
                                        if (c.variants[d].options.join(",") === s.join(",")) {
                                            i = c.variants[d];
                                            break
                                        }
                                } catch (t) {
                                    console.log(t.message)
                                }

                        }
                        null != e.data("mpv1product") && e.data("mpv1product").setVariant(i);
                        null != context.settings.blankOption && (h = "",
                            p = !1,
                            section.find(".sg_variants").each(function () {
                                h += v(this).val(),
                                    v(this).find("option:selected").hasClass("sg_blank-option") && (p = !0)
                            }),
                            e.find('[data-label="(P) Cart Button"]').children(".sg-module").each(function () {
                                var t = v(this).data("mpv1productcartbutton");
                                h || p ? (p && null != t || 1 == i.available && null != t) && t.changeStatus(!0) : null != t && t.changeStatus(!1)
                            })),
                            context.settings.onVariantSelected(i, t);
                        var h, p, n = e.find('.sg-wrap[data-label="(P) Quantity"] .module').first(), a = n.data("mpv1productquantity");
                        if (0 < n.length && null != a) {
                            if (a && a.settings && "0" == a.settings.updatePrice)
                                return !1;
                            a.updatePrice()
                        }
                        return setTimeout(function () {
                            refreshRechargeOptions(context.findParentProduct(), v, window.ReCharge)
                        }, 10),
                            !1
                    }),
                        !1
                }
                ,
                this.findParentProduct = function () {
                    var t = section.closest('[data-label="Product"]').children(".sg-module");
                    return t = 0 == t.length ? section.closest('[data-icon="mpicon-product"]').children(".sg-module") : t
                }
                ,
                this.init()
        }
            ,
            v.fn.minV1ProductVariants = function (e) {
                return this.each(function () {
                    var t;
                    null == v(this).data("mpv1productvariants") && (t = new v.minV1ProductVariants(this, e),
                        v(this).data("mpv1productvariants", t))
                })
            }
    }(window.MinQuery || jQuery),
    function (C) {
        C.mpV1ProductSwatches = function (t, c) {
            var s, l, m, w, data = {
                swatchText: "1",
                onSwatchSelected: function (t, e) { }
            }, section = (this.settings = {},
                C(t)), context = this, b = [], u = [];
            this.init = function () {
                this.settings = C.extend({}, data, c);
                var t, u = context.findParentProduct();
                if (null != u.data("mpv1product") && (t = u.data("mpv1product").getVariant(),
                    context.initWithVariant(t)),
                    "1" == this.settings.swatchText)
                    section.find(".sg_swatch").children("span").css("visibility", "visible");
                else {
                    var e = section.attr("data-swatcher-hide");
                    if (e && "All" !== e) {
                        section.find(".sg_swatch").children("span").removeClass("sg_swatch-hide");
                        try {
                            for (var a in e = -1 !== (e = "Other" == e ? y.attr("data-swatcher-hideother") : e).indexOf(",") ? e.split(",") : [e]) {
                                var n = (n = e[a]).trim()
                                    , i = section.find('.sg_swatches-selector[data-name="' + n + '"]');
                                0 < i.length && i.find(".sg_swatch").children("span").addClass("sg_swatch-hide")
                            }
                        } catch (t) {
                            console.log(t),
                                section.find(".sg_swatch").children("span").css("visibility", "hidden")
                        }
                    } else
                        section.find(".sg_swatch").children("span").css("visibility", "hidden")
                }
                // if (null != section.attr("data-background"))
                //     try {
                //         var f = section.attr("data-background")
                //           , f = JSON.parse(decodeURIComponent(escape(window.atob(f))))
                //           , r = section.find(".sg_swatches-selector")
                //           , g = context.getSwatchValue(r.eq(0).find(".sg_swatch").first())
                //           , h = context.getSwatchValue(r.eq(1).find(".sg_swatch").first())
                //           , p = context.getSwatchValue(r.eq(2).find(".sg_swatch").first());
                //         r.each(function(s) {
                //             var t = C(this)
                //               , l = t.attr("data-name");
                //             f[l] && t.find(".sg_swatch").each(function() {
                //                 var t = C(this)
                //                   , e = context.getSwatchValue(t);
                //                 switch (f[l].type) {
                //                 case "image":
                //                     var a = ""
                //                       , n = "";
                //                     if (0 < u.find(".product-json").length)
                //                         try {
                //                             for (var i = C.parseJSON(u.find(".product-json").html()), r = 0; r < i.variants.length; r++)
                //                                 if (i.variants[r]["option" + (s + 1)] == e && i.variants[r].featured_image && i.variants[r].featured_image.src) {
                //                                     if (n = n || i.variants[r].featured_image.src,
                //                                     0 == s && i.variants[r].option2 == h && i.variants[r].option3 == p) {
                //                                         a = i.variants[r].featured_image.src;
                //                                         break
                //                                     }
                //                                     if (1 == s && i.variants[r].option1 == g && i.variants[r].option3 == p) {
                //                                         a = i.variants[r].featured_image.src;
                //                                         break
                //                                     }
                //                                     if (2 != s || i.variants[r].option1 != g || i.variants[r].option2 != h)
                //                                         break;
                //                                     a = i.variants[r].featured_image.src;
                //                                     break
                //                                 }
                //                         } catch (t) {
                //                             console.log(t.message)
                //                         }
                //                     else
                //                         try {
                //                             var o = u.attr("data-pid");
                //                             if (null != window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor"))
                //                                 for (i = window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor").searchProductInList(o),
                //                                 r = 0; r < i.variants.length; r++)
                //                                     if (i.variants[r]["option" + (s + 1)] == e && i.variants[r].image_id && i.images) {
                //                                         if (!n)
                //                                             for (var d = i.variants[r].image_id, c = 0; c < i.images.length; c++)
                //                                                 d == i.images[c].id && (n = i.images[c].src);
                //                                         if (0 == s && i.variants[r].option2 == h && i.variants[r].option3 == p) {
                //                                             for (d = i.variants[r].image_id,
                //                                             c = 0; c < i.images.length; c++)
                //                                                 if (d == i.images[c].id) {
                //                                                     a = i.images[c].src;
                //                                                     break
                //                                                 }
                //                                             break
                //                                         }
                //                                         if (1 == s && i.variants[r].option1 == g && i.variants[r].option3 == p) {
                //                                             for (d = i.variants[r].image_id,
                //                                             c = 0; c < i.images.length; c++)
                //                                                 if (d == i.images[c].id) {
                //                                                     a = i.images[c].src;
                //                                                     break
                //                                                 }
                //                                             break
                //                                         }
                //                                         if (2 == s && i.variants[r].option1 == g && i.variants[r].option2 == h) {
                //                                             for (d = i.variants[r].image_id,
                //                                             c = 0; c < i.images.length; c++)
                //                                                 if (d == i.images[c].id) {
                //                                                     a = i.images[c].src;
                //                                                     break
                //                                                 }
                //                                             break
                //                                         }
                //                                     }
                //                         } catch (t) {
                //                             console.log(t.message)
                //                         }
                //                     t.css("background-image", "url(" + context.resizeImage(a = a || n) + ")");
                //                     break;
                //                 case "color":
                //                     o = e.toLowerCase();
                //                     t.css("background-color", o);
                //                     break;
                //                 case "manual":
                //                     if (f[l].variants && f[l].variants[e])
                //                         switch (f[l].variants[e].type) {
                //                         case "image":
                //                             t.css("background-image", "url(" + context.resizeImage(f[l].variants[e].value) + ")");
                //                             break;
                //                         case "color":
                //                             t.css("background-color", f[l].variants[e].value)
                //                         }
                //                 }
                //             })
                //         })
                //     } catch (t) {
                //         console.log(t.message)
                //     }
                // else if (null != section.attr("data-swatcher"))
                //     try {
                //         o = (o = section.attr("data-swatcher")).replace(/'/gi, '"'),
                //         b = C.parseJSON(o),
                //         y.find(".sg_swatch").each(function() {
                //             var t = C(this)
                //               , e = context.getSwatchValue(t)
                //               , e = context.findSwatchinArray(e);
                //             C.isEmptyObject(e) || context.renderSwatchColor(e.color1, e.color2, e.image, t)
                //         })
                //     } catch (t) {
                //         console.log(t.message)
                //     }
                // else if (0 < section.find(".sg_swatches-data").length)
                //     try {
                //         var o = section.find(".sg_swatches-data").text()
                //           , d = void 0 !== section.parent().attr("data-ver") ? y.parent().attr("data-ver") : "1";
                //         parseInt(d) < 2 && (o = o.replace(/'/gi, '"')),
                //         b = C.parseJSON(o),
                //         section.find(".sg_swatch").each(function() {
                //             var t = C(this)
                //               , e = context.getSwatchValue(t)
                //               , e = context.findSwatchinArray(e);
                //             C.isEmptyObject(e) || context.renderSwatchColor(e.color1, e.color2, e.image, t)
                //         })
                //     } catch (t) {
                //         console.log(t.message)
                //     }
                return s = section.attr("data-soldout"),
                    l = section.attr("data-soldout-color"),
                    m = section.attr("data-soldout-style"),
                    w = section.attr("data-soldout-logic"),
                    null == m && (m = "default"),
                    null == w && (w = "1"),
                    "1" == s && (context.updateSwatchAvailableVariants()
                        // ,
                        // "1" == w ? context.addSoldOut() : "2" == w && context.addSoldOutLogic2()
                    ),
                    context.applyEvents(),
                    !1
            }
                ,
                this.getSwatchValue = function (t) {
                    var e;
                    return t && ((e = t.attr("data-value")) && e.trim() || (e = t.text()) && e.trim()) ? e.trim() : ""
                }
                ,
                this.updateSwatchAvailableVariants = function () {
                    var t = context.findParentProduct()
                        , e = {};
                    if (0 < t.find(".product-json").length)
                        try {
                            e = C.parseJSON(t.find(".product-json").html())
                        } catch (t) {
                            console.log(t.message)
                        }
                    // else
                    //     try {
                    //         var a = section.closest("[data-pid]").attr("data-pid");
                    //         null != window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor") && (e = window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor").searchProductInList(a))
                    //     } catch (t) {
                    //         console.log(t.message)
                    //     }
                    if (!C.isEmptyObject(e))
                        for (var n = 0; n < e.variants.length; n++) {
                            var i = e.variants[n];
                            null != i.available && i.available ? u.push(i) : (0 < i.inventory_quantity || "shopify" != i.inventory_management) && u.push(i)
                        }
                    return u
                }
                ,
                this.handleSwatchStyle = function (t, e) {
                    "default" == t ? 0 == e.children("svg").length && e.append('<svg height="100" width="100" preserveAspectRatio="none" class="sg_soldout"><line x1="0%" y1="0%" x2="100%" y2="100%" style="stroke:' + l + ';stroke-width:2" /><line x1="0%" y1="100%" x2="100%" y2="0%" style="stroke:' + l + ';stroke-width:2" /></svg>') : e.hasClass("sg_swatch-soldout") || e.addClass("sg_swatch-soldout")
                }
                ,
                this.initWithVariant = function (t) {
                    if (!C.isEmptyObject(t)) {
                        if (t.options && 0 < t.options.length)
                            for (var e = [], a = 1; a <= t.options.length; a++)
                                null != t["option" + a] && e.push(t["option" + a]);
                        else
                            e = t.title.split(" / ");
                        var n = 0;
                        section.find(".sg_swatch").removeClass("active"),
                            section.find(".sg-variant-item").each(function () {
                                C(this).find(".sg_swatch").each(function () {
                                    var t = C(this);
                                    context.getSwatchValue(t) == C.trim(e[n]) && t.addClass("active")
                                }),
                                    n++
                            })
                        // ,
                        // "1" == s && "2" == w && context.addSoldOutLogic2()
                    }
                    return !1
                }
                ,
                this.applyEvents = function () {
                    return section.find(".sg_swatch").off("click").on("click", function () {
                        var t = C(this)
                            , e = context.findParentProduct()
                            , a = t.closest(".sg_swatches")
                            , a = (t.closest("form"),
                                a.attr("data-type"))
                            , n = (t.closest(".sg-variant-item").find(".sg_swatch").removeClass("active"),
                                t.addClass("active"),
                                {});
                        if ("together" == a) {
                            var i = C(this).attr("data-vid");
                            if (0 < e.find(".product-json").length)
                                try {
                                    for (var r = C.parseJSON(e.find(".product-json").html()), o = 0; o < r.variants.length; o++) {
                                        var d = r.variants[o].options;
                                        if (r.variants[o].id == i) {
                                            n = r.variants[o];
                                            break
                                        }
                                    }
                                } catch (t) {
                                    console.log(t.message)
                                }
                            // else
                            //     try {
                            //         var c = section.closest("[data-pid]").attr("data-pid");
                            //         if (null != window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor"))
                            //             for (r = window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor").searchProductInList(c),
                            //             o = 0; o < r.variants.length; o++)
                            //                 if (r.variants[o].id == i) {
                            //                     n = r.variants[o];
                            //                     break
                            //                 }
                            //     } catch (t) {
                            //         console.log(t.message)
                            //     }
                        } else {
                            var s = [];
                            if (section.find(".sg_swatch.active").each(function () {
                                var t = context.getSwatchValue(C(this));
                                s.push(C.trim(t))
                            }),
                                0 < e.find(".product-json").length) {
                                try {
                                    console.log(e.find(".product-json"));
                                    for (r = C.parseJSON(e.find(".product-json").html()),
                                        o = 0; o < r.variants.length; o++) {
                                        if ((d = r.variants[o].options).join(",") === s.join(",")) {
                                            n = r.variants[o];
                                            break
                                        }
                                    }
                                } catch (t) {
                                    console.log(t.message)
                                }
                            } else {
                                try {
                                    var l = s.join(",")
                                        , c = section.closest("[data-pid]").attr("data-pid");
                                    if (null != window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor"))
                                        for (r = window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor").searchProductInList(c),
                                            o = 0; o < r.variants.length; o++) {
                                            for (var u = r.variants[o], d = [], f = 1; null != u["option" + f] && null != u["option" + f];)
                                                d.push(u["option" + f]),
                                                    f++;
                                            if ((d = 0 == d.length ? C.map(r.variants[o].title.split("/"), C.trim) : d).join(",") === l) {
                                                n = u;
                                                break
                                            }
                                        }
                                } catch (t) {
                                    console.log(t.message)
                                }
                            }
                        }
                        return null != e.data("mpv1product") && e.data("mpv1product").setVariant(n),
                            context.settings.onSwatchSelected(n, t),
                            setTimeout(function () {
                                refreshRechargeOptions(context.findParentProduct(), C, window.ReCharge)
                            }, 10),
                            !1
                    }),
                        !1
                }
                ,
                this.replaceBGColorImportant = function (t, e) {
                    var a, n;
                    return !e && "" == e || (a = (a = t.attr("style")) ? a.split(";") : [],
                        n = [],
                        a.map(function (t) {
                            "background-color" != t.split(":")[0] && n.push(t)
                        }),
                        n.push("background-color: " + e + " !important"),
                        t.attr("style", n.join(";"))),
                        !1
                }
                ,
                this.renderSwatchColor = function (t, e, a, n) {
                    return "" != a ? n.css("background-image", "url(" + a + ")") : "" != e && "transparent" != e ? (a = "",
                        n.css("background-image", a += "linear-gradient(180deg, " + t + " 50%, " + e + " 50%)")) : (n.css("background-image", "none"),
                            context.replaceBGColorImportant(n, t)),
                        !1
                }
                ,
                this.findSwatchinArray = function (t) {
                    for (var e = {}, a = 0; a < b.length; a++)
                        if (C.trim(t.toLowerCase()) == C.trim(b[a].label.toLowerCase())) {
                            e = b[a];
                            break
                        }
                    return e
                }
                ,
                this.findParentProduct = function () {
                    var t = section.closest('[data-label="Product"]').children(".sg-module");
                    return t = 0 == t.length ? section.closest('[data-icon="gpicon-product"]').children(".sg-module") : t
                }
                ,
                this.addSoldOut = function () {
                    return section.find(".sg_swatches").find(".sg_swatches-selector").each(function (i) {
                        C(this).find(".sg_swatch").each(function () {
                            for (var t = C(this), e = context.getSwatchValue(t), a = !1, n = 0; n < u.length; n++)
                                if (u[n]["option" + (parseInt(i) + 1)] == e) {
                                    a = !0;
                                    break
                                }
                            a || context.handleSwatchStyle(m, t)
                        })
                    }),
                        !1
                }
                ,
                this.addSoldOutLogic2 = function () {
                    var t = section.find(".sg_swatches").find(".sg_swatches-selector")
                        , o = t.length
                        , e = (t.find(".sg_swatch").find("svg").remove(),
                            t.find(".sg_swatch").removeClass("sg_swatch-soldout"),
                            t.eq(0).children(".sg_swatch.active"))
                        , d = context.getSwatchValue(e)
                        , e = t.eq(1).children(".sg_swatch.active")
                        , c = context.getSwatchValue(e)
                        , e = t.eq(2).children(".sg_swatch.active")
                        , s = context.getSwatchValue(e);
                    return t.each(function (r) {
                        C(this).find(".sg_swatch").each(function () {
                            for (var t = C(this), e = context.getSwatchValue(t), a = !1, n = 0; n < u.length; n++) {
                                var i = u[n];
                                if (2 == r && i.option1 == d && i.option2 == c && i.option3 == e) {
                                    a = !0;
                                    break
                                }
                                if (1 == r && i.option1 == d && i.option2 == e) {
                                    if (2 == o) {
                                        a = !0;
                                        break
                                    }
                                    if (3 == o && i.option3 == s) {
                                        a = !0;
                                        break
                                    }
                                } else if (0 == r && i.option1 == e) {
                                    if (1 == o) {
                                        a = !0;
                                        break
                                    }
                                    if (2 == o && i.option2 == c) {
                                        a = !0;
                                        break
                                    }
                                    if (3 == o && i.option2 == c && i.option3 == s) {
                                        a = !0;
                                        break
                                    }
                                }
                            }
                            a || context.handleSwatchStyle(m, t)
                        })
                    }),
                        !1
                }
                ,
                this.resizeImage = function (t) {
                    a = section.find(".sg_swatch"),
                        i = n = 30,
                        a && a.length && a.each(function () {
                            C(this);
                            var t = a.outerWidth() || 30
                                , e = a.outerHeight() || 30;
                            n < t && (n = t),
                                i < e && (i = e)
                        }),
                        e = Math.max(n, i);
                    var a, n, i, e = {
                        width: e *= 500 < e ? 1.2 : 250 < e ? 1.5 : 125 < e ? 2 : 3,
                        height: e
                    };
                    try {
                        var r = parseInt(e.width)
                            , o = parseInt(e.height)
                    } catch (t) {
                        r = 120,
                            o = 120
                    }
                    return replaceImageToSize(t, r + "x" + o)
                }
                ,
                this.init()
        }
            ,
            C.fn.mpV1ProductSwatches = function (e) {
                return this.each(function () {
                    var t;
                    null == C(this).data("mpv1productswatches") && (t = new C.mpV1ProductSwatches(this, e),
                        C(this).data("mpv1productswatches", t))
                })
            }
    }(window.MinQuery || jQuery),
    function (d) {
        d.minV1ProductQuantity = function (t, a) {
            var section = d(t)
                , data = {
                    minusClass: "sg-product-quantity-minus",
                    plusClass: "sg-product-quantity-plus",
                    style: "default",
                    updatePrice: "0"
                }
                , context = (this.settings = {},
                    this)
                , i = "";
            this.init = function () {
                this.settings = d.extend({}, data, a);
                var t = context.findParentProduct()
                    , e = section.closest('[data-label="Product"]');
                return e && e.length && e.attr("id") && (i = e.attr("id")),
                    null != t.data("mpv1product") && (e = t.data("mpv1product").getVariant(),
                        context.initWithVariant(e)),
                    context.applyEvents(),
                    !1
            }
                ,
                this.initWithVariant = function (t) {
                    return d.isEmptyObject(t) || context.changeStatus(t.available),
                        !1
                }
                ,
                this.changeStatus = function (t) {
                    return t ? section.fadeTo(300, 1).show() : 0 < context.findParentProduct().find(".product-json").length ? section.hide() : section.fadeTo(300, 1),
                        !1
                }
                ,
                this.applyEvents = function () {
                    var t = context.settings.minusClass
                        , e = context.settings.plusClass
                        , a = context.settings.style
                        , n = parseInt(context.settings.updatePrice)
                        , i = section.find('input[name="quantity"], .sg_pq_qty')
                        , t = section.find("." + t)
                        , e = section.find("." + e);


                    return !i.val() && i.val(1), setTimeout(function () {
                        1 == n ? context.updatePrice(i.val()) : context.updatePrice(1)
                    }, 1000),
                        "simple" == a ? (t.hide(),
                            e.hide()) : (t.show(),
                                e.show(),
                                t.off("click").on("click", function (t) {
                                    t.preventDefault();
                                    var t = parseInt(i.val() || 1)
                                        , e = (--t < 1 && (t = 1),
                                            context.findParentProduct().not(i).find('input[name="quantity"], .sg_pq_qty'));
                                    // context.triggerChangeQuantity(t)
                                    return e && e.length && e.val(t),
                                        i.val(t).trigger("change"),
                                        !1
                                }),
                                e.off("click").on("click", function (t) {
                                    t.preventDefault();
                                    var t = parseInt(i.val() || 1)
                                        , e = (t++,
                                            context.findParentProduct().not(i).find('input[name="quantity"], .sg_pq_qty'));
                                    // context.triggerChangeQuantity(t)
                                    return e && e.length && e.val(t),
                                        i.val(t).trigger("change"),
                                        !1
                                })),
                        i.off("change keyup paste").on("change keyup paste", function () {
                            var t = d(this).val()
                                , e = context.findParentProduct().not(i).find('input[name="quantity"], .sg_pq_qty');
                            return e && e.length && e.val(t),
                                1 == n && context.updatePrice(t),
                                context.triggerChangeQuantity(t),
                                refreshRechargeOptions(context.findParentProduct(), d, window.ReCharge),
                                !1
                        }),
                        !1
                }
                ,
                this.triggerChangeQuantity = function (t) {
                    window.MINSTORE && window.MINSTORE.dispatch("product-" + i + "-quantity", t)
                }
                ,
                this.updatePrice = function (e) {
                    return null == e && (e = section.find('input[name="quantity"]').val()),
                        context.findParentProduct().find('[data-label="(P) Price"]').each(function () {
                            var t = d(this);
                            null != t.children(".sg-module").data("mpv1productprice") && t.children(".sg-module").data("mpv1productprice").setPriceWithQuantity(e)
                        }),
                        !1
                }
                ,
                this.findParentProduct = function () {
                    var t = section.closest('[data-label="Product"]').children(".sg-module");
                    return t = 0 == t.length ? section.closest('[data-icon="mpicon-product"]').children(".sg-module") : t
                }
                ,
                this.init()
        }
            ,
            d.fn.minV1ProductQuantity = function (e) {
                return this.each(function () {
                    var t;
                    null == d(this).data("mpv1productquantity") && (t = new d.minV1ProductQuantity(this, e),
                        d(this).data("mpv1productquantity", t))
                })
            }
    }(window.MinQuery || jQuery),
    function (v) {
        v.minV1ProductPrice = function (t, s) {
            var mode, data = {
                displayCurrency: !0
            }, section = (this.settings = {},
                v(t)), context = this,
                h = ".sg_product-price",
                p = ".sg_product-compare-price",
                r = "", t = null != section.find(".sg_product-prices").attr("data-oldformat"),
                c = section.attr("data-round-decimals") || "0",
                m = section.attr("data-round-to") || "99",
                w = "";
            this.init = function () {
                this.settings = v.extend({}, data, s),
                    mode = v("#prevew_builder").hasClass("editing") ? "dev" : "dev";
                function setDefaultPrice() {
                    v('[data-label="Product"]').each(function (t, e) {
                        e = v(e);
                        e.find('.module-wrap[data-label="(P) Quantity"]').children(".sg-module").data("mpv1productquantity") ?
                            e.find('.module-wrap[data-label="(P) Quantity"]').children(".sg-module").data("mpv1productquantity").updatePrice() :
                            e.find('.module-wrap[data-label="(P) Price"]').children(".sg-module").data("mpv1productprice") && e.find('.module-wrap[data-label="(P) Price"]').children(".sg-module").data("mpv1productprice").setPriceWithQuantity(1)
                    })
                }
                var e = context.findParentProduct()
                    , a = section.closest('[data-label="Product"]')
                    , n = (a && a.length && a.attr("id") && (w = a.attr("id")),
                        null != e.data("mpv1product") && (a = e.data("mpv1product").getVariant(),
                            context.initWithVariant(a)),
                        this.subscribeChangeCurrency(),
                        0);
                // , i = (window.mpBCCSupportInterval || (window.mpBCCSupportInterval = setInterval(function () {
                //     n++,
                //         0 < v('select.currency-switcher[name="doubly-currencies"]').length && (v('select.currency-switcher[name="doubly-currencies"]').off("change.changeCurrency").on("change.changeCurrency", function () {
                //             window.MINSTORE && window.MINSTORE.checkKeyValid("doublyHotfix") ? setTimeout(function () {
                //                 e.find('.sg_module[data-label="(P) Quantity"]').children(".sg-module").data("mpv1productquantity") ? e.find('.sg_module[data-label="(P) Quantity"]').children(".sg-module").data("mpv1productquantity").updatePrice() : context.setPriceWithQuantity(1)
                //             }, 100) : e.find('.sg_module[data-label="(P) Quantity"]').children(".sg-module").data("mpv1productquantity") ? e.find('.sg_module[data-label="(P) Quantity"]').children(".sg-module").data("mpv1productquantity").updatePrice() : context.setPriceWithQuantity(1)
                //         }),
                //             n = 10),
                //         10 == n && (clearInterval(window.mpBCCSupportInterval),
                //             window.mpBCCSupportInterval = void 0)
                // }, 1000)),
                //     0)
                // , r = (window.mpSCASupportInterval || (window.mpSCASupportInterval = setInterval(function () {
                //     i++,
                //         0 < v(".sca-body-currency .cs-options").length && (v(".sca-body-currency .cs-options li").on("click.changeCurrency", function () {
                //             e.find('.sg_module[data-label="(P) Quantity"]').children(".sg-module").data("mpv1productquantity") ? e.find('.sg_module[data-label="(P) Quantity"]').children(".sg-module").data("mpv1productquantity").updatePrice() : context.setPriceWithQuantity(1)
                //         }),
                //             i = 10),
                //         10 == i && (clearInterval(window.mpSCASupportInterval),
                //             window.mpSCASupportInterval = void 0)
                // }, 1000)),
                //     0)
                // , o = (window.mpGTSupportInterval || (window.mpGTSupportInterval = setInterval(function () {
                //     r++,
                //         window.MinCurrency && window.store && window.store.get && window.store.change && (window.store.get("dataCurrency") && setDefaultPrice(),
                //             window.store.change("dataCurrency", function () {
                //                 setDefaultPrice()
                //             }),
                //             r = 10),
                //         10 == r && (clearInterval(window.mpGTSupportInterval),
                //             window.mpGTSupportInterval = void 0)
                // }, 1000)),
                //     0)
                // , d = (window.mpBearCCSupportInterval || (window.mpBearCCSupportInterval = setInterval(function () {
                //     o++,
                //         window.conversionBearAutoCurrencyConverter && (window.cbCurrencygemPagesOnLoadDelay = 1,
                //             window.conversionBearAutoCurrencyConverter.convertPricesOnPage(),
                //             o = 10),
                //         10 == o && (clearInterval(window.mpBearCCSupportInterval),
                //             window.mpBearCCSupportInterval = void 0)
                // }, 1000)),
                //     0)
                // , c = !1;
                return false;
                //  window.mpDynamicCCSupportInterval || ("object" == typeof pb_currency_converter && pb_currency_converter.getConvertedPrice && (context.dynamicCurrencySetup(),
                //     c = !0),
                //     c || (window.mpDynamicCCSupportInterval = setInterval(function () {
                //         d++,
                //             "object" == typeof pb_currency_converter && pb_currency_converter.getConvertedPrice && (context.dynamicCurrencySetup(),
                //                 c = !0,
                //                 d = 10),
                //             10 == d && (clearInterval(window.mpDynamicCCSupportInterval),
                //                 window.mpDynamicCCSupportInterval = void 0)
                //     }, 1000))),
                //     !1
            }
                ,
                t ? (this.initWithVariant = function (t) {
                    if (!v.isEmptyObject(t)) {
                        var e = context.findParentProduct()
                            , n = "${{ amount }}";
                        var i = e.find('.sg-wrap[data-label="(P) Quantity"]').first()
                            , r = 1
                            , i = ("1" == i.children(".sg-module").attr("data-updateprice") && (r = parseInt(i.find('input[name="quantity"]').val())),
                                e.closest(".sg-wrap[data-key='product']"))
                            , o = 3;
                        i = section.find(".sg_product-prices").attr("data-oldformat");

                        var c = context.convertNumberToPrice(t.price / ('dev' == mode ? 1 : 100), i),
                            s = context.convertNumberToPrice(t.compare_at_price / ('dev' == mode ? 1 : 100), i);
                        n = n.replace(/{{.*}}/g, "{{amount}}");
                        try {
                            window.parent.jQuery("#designEditor").attr("data-money", n)
                        } catch (t) { }
                        e = context.getUpdatePrice(c, r, n, h);
                        section.find(h).attr("data-price", c),
                            context.setPrice(e),
                            s && "" != s ? (o = context.getUpdatePrice(s, r, n, p),
                                section.find(p).show(),
                                section.find(p).attr("data-price", s),
                                context.setComparePrice(o)) : section.find(p).hide(),
                            context.setPercentDiscount(c, s),
                            null != window.conversionBearAutoCurrencyConverter && window.conversionBearAutoCurrencyConverter.convertPricesOnPage()
                    }
                    return !1
                }
                    ,
                    this.setPercentDiscount = function (t, e) {
                        var a, n, i = section.find(".sg_pq-discount-selector");
                        if (t == e)
                            section.find(p).hide(),
                                i.hide();
                        else if (e && t && 0 < i.length)
                            try {
                                t = (t = t.match(/\d/g)).join(""),
                                    t = parseFloat(t),
                                    e = (e = e.match(/\d/g)).join(""),
                                    (e = parseFloat(e)) && 0 < e ? (a = (a = (a = e - t) / e * 100).toFixed(0),
                                        n = i.find(".sg_pq-percent"),
                                        i.show(),
                                        n.html(a + "%")) : i.hide()
                            } catch (t) {
                                i.hide()
                            }
                        else
                            0 < i.length && i.hide()
                    }
                    ,
                    this.setPrice = function (t) {
                        return t = v("<div>" + t + "</div>").text(),
                            (section.find(h).children("span").hasClass("money") ? section.find(h).children("span") : section.find(h)).html(t),
                            !1
                    }
                    ,
                    this.setComparePrice = function (t) {
                        return t = v("<div>" + t + "</div>").text(),
                            (section.find(p).children("span").hasClass("money") ? section.find(p).children("span") : section.find(p)).html(t),
                            !1
                    }
                    ,
                    this.convertPriceToNumber = function (t, e) {
                        t = (t = t).replace(/\s/g, "");
                        t = -1 != e.indexOf("amount_with_apostrophe_separator") ? t.replace(/'/g, "") : -1 != e.indexOf("amount_with_comma_separator") ? t.replace(/\./g, "").replace(",", ".") : -1 != e.indexOf("amount_no_decimals_with_comma_separator") ? t.replace(/\./g, "") : (e.indexOf("amount_no_decimals"),
                            t.replace(/,/g, ""));
                        try {
                            return parseFloat(t)
                        } catch (t) {
                            return null
                        }
                    }
                    ,
                    this.convertNumberToPrice = function (t, e) {
                        for (var a = ".", n = ",", i = (t = -1 != e.indexOf("amount_no_decimals_with_comma_separator") || -1 != e.indexOf("amount_no_decimals") ? t.toFixed(0) : t.toFixed(2)).split(".")[0], t = "1" == c ? m : t.split(".")[1], r = (-1 != e.indexOf("amount_with_apostrophe_separator") ? n = "'" : -1 != e.indexOf("amount_with_comma_separator") ? (a = ",",
                            n = ".") : -1 != e.indexOf("amount_no_decimals_with_comma_separator") ? (a = "",
                                n = ".") : -1 != e.indexOf("amount_no_decimals") && (a = ""),
                            0), o = "", d = i.length - 1; 0 <= d; d--)
                            o = i[d] + o,
                                ++r % 3 == 0 && 0 != d && (o = n + o);
                        return "" == a ? o : o + a + t
                    }
                    ,
                    this.calculatePriceByQuantity = function (t, e, a, n) {
                        var a = section.find(".sg_product-prices").attr("data-oldformat") || a || "{{ amount }}"
                            , i = t;
                        "number" == typeof t && (i = "" + t);
                        t = a.replace(/{{.*}}/g, "{{gem}}").split("{{gem}}"),
                            t[0] && (i = i.replace(t[0], "")),
                            i = (i = t[1] ? i.replace(new RegExp(t[1] + "$"), "") : i).replace(/\s/g, ""),
                            t = /(\d|,|\.|')+/g.exec(i);
                        if (0 < t.length) {
                            var t = t[0]
                                , r = context.convertPriceToNumber(t, a);
                            if (!r)
                                return i;
                            var o = section.find(".sg_product-prices").attr("data-oldcurrency")
                                , d = section.find(h).attr("data-currency");
                            if (null == (d = null == (d = null == (d = null == d ? section.find(h).find(".money").attr("data-currency") : d) && window.MinCurrency && window.MinCurrency.currentCurrency ? window.MinCurrency.currentCurrency : d) && null != window.DoublyGlobalCurrency ? window.DoublyGlobalCurrency.currentCurrency : d) && null != window.Currency && (d = window.Currency.currentCurrency),
                                n && null != window.conversionBearAutoCurrencyConverter && f.find(n + " .conversion-bear-money").attr("data-amount", r * e),
                                null != o && null != d)
                                if (null != window.MinCurrency && window.MinCurrency.convert)
                                    (c = window.MinCurrency.convert(r, o, d)) && (r = c),
                                        null != window.MinCurrency.moneyFormats && null != window.MinCurrency.moneyFormats[d] && null != window.MinCurrency.moneyFormats[d].money_with_currency_format && (a = window.MinCurrency.moneyFormats[d].money_with_currency_format);
                                else if (null != window.DoublyGlobalCurrency && window.DoublyGlobalCurrency.convert)
                                    (c = window.DoublyGlobalCurrency.convert(r, o, d)) && (r = c),
                                        null != window.DoublyGlobalCurrency.moneyFormats && null != window.DoublyGlobalCurrency.moneyFormats[d] && null != window.DoublyGlobalCurrency.moneyFormats[d].money_with_currency_format && (a = window.DoublyGlobalCurrency.moneyFormats[d].money_with_currency_format);
                                else if (null != window.Currency && window.Currency.convert) {
                                    if (window.pb_currency_converter)
                                        return window.pb_currency_converter.getConvertedPrice(r * e * 100);
                                    (c = window.Currency.convert(r, o, d)) && (r = c),
                                        null != window.Currency.moneyFormats && null != window.Currency.moneyFormats[d] && null != window.Currency.moneyFormats[d].money_with_currency_format && (a = window.Currency.moneyFormats[d].money_with_currency_format)
                                }
                            var c, n = context.convertNumberToPrice(r * e, a);
                            return n ? null != window.MinCurrency && null != window.MinCurrency.moneyFormats && null != window.MinCurrency.moneyFormats[d] && null != window.MinCurrency.moneyFormats[d].money_with_currency_format && null != o && null != d ? window.MinCurrency.moneyFormats[d].money_with_currency_format.replace(/{{.*}}/g, n) : null != window.DoublyGlobalCurrency && null != window.DoublyGlobalCurrency.moneyFormats && null != window.DoublyGlobalCurrency.moneyFormats[d] && null != window.DoublyGlobalCurrency.moneyFormats[d].money_with_currency_format && null != o && null != d ? window.DoublyGlobalCurrency.moneyFormats[d].money_with_currency_format.replace(/{{.*}}/g, n) : context.checkHasMlvedaCurrency() ? (d = window.ACSCurrency.currentCurrency,
                                c = window.ACSCurrency.format,
                                window.ACSCurrency.moneyFormats[d][c].replace(/{{.*}}/g, n)) : i.replace(t, n) : i
                        }
                        return i
                    }
                    ,
                    this.setPriceWithQuantity = function (t) {
                        (null == t || parseFloat(t) < 1) && (t = 1);
                        var e, a = context.findParentProduct(), n = a.attr("data-current-variant"), a = a.find("#sg-hidden-variant" + n), n = void 0;
                        try {
                            window.parent.jQuery("#designEditor").attr("data-money") && (n = window.parent.jQuery("#designEditor").attr("data-money"))
                        } catch (t) { }
                        a = null != a && 0 < a.length ? (e = a.attr("data-price"),
                            a.attr("data-compare-price")) : (e = section.find(h).attr("data-price"),
                                "none" != section.find(p).css("display") ? section.find(p).attr("data-price") : "");
                        var i = context.getUpdatePrice(e, t, n, h);
                        return context.setPrice(i),
                            a && "" != a ? (i = context.getUpdatePrice(a, t, n, p),
                                section.find(p).show(),
                                context.setComparePrice(i)) : section.find(p).hide(),
                            context.setPercentDiscount(e, a),
                            null != window.conversionBearAutoCurrencyConverter && window.conversionBearAutoCurrencyConverter.convertPricesOnPage(),
                            !1
                    }
                    ,
                    this.appendCurrency = function (t, e) {
                        var e = section.find(".sg_product-prices").attr("data-oldformat") || e
                            , a = /{{.+}}/i;
                        if (!e || !a.test(e))
                            return t;
                        t = t.replace(/&#\d+;/g, "");
                        var n = /(\d|\.|,|')+/i
                            , n = (n.test(t) && (t = n.exec(t)[0]),
                                section.find(h).attr("data-currency"));
                        if (null != (n = null == (n = null == (n = null == (n = null == n ? section.find(h).find(".money").attr("data-currency") : n) && null != window.MinCurrency ? window.MinCurrency.currentCurrency : n) && null != window.DoublyGlobalCurrency ? window.DoublyGlobalCurrency.currentCurrency : n) && null != window.Currency ? window.Currency.currentCurrency : n))
                            if (g.settings.displayCurrency) {
                                if (window.MinCurrency && window.MinCurrency.moneyFormats && window.MinCurrency.moneyFormats[n] && window.MinCurrency.moneyFormats[n].money_with_currency_format)
                                    return window.MinCurrency.moneyFormats[n].money_with_currency_format.replace(a, t);
                                if (window.DoublyGlobalCurrency && window.DoublyGlobalCurrency.moneyFormats && window.DoublyGlobalCurrency.moneyFormats[n] && window.DoublyGlobalCurrency.moneyFormats[n].money_with_currency_format)
                                    return window.DoublyGlobalCurrency.moneyFormats[n].money_with_currency_format.replace(a, t);
                                if (window.Currency && window.Currency.moneyFormats && window.Currency.moneyFormats[n] && window.Currency.moneyFormats[n].money_with_currency_format)
                                    return window.Currency.moneyFormats[n].money_with_currency_format.replace(a, t)
                            } else {
                                if (window.MinCurrency && window.MinCurrency.moneyFormats && window.MinCurrency.moneyFormats[n] && window.MinCurrency.moneyFormats[n].money_format)
                                    return window.MinCurrency.moneyFormats[n].money_format.replace(a, t);
                                if (window.DoublyGlobalCurrency && window.DoublyGlobalCurrency.moneyFormats && window.DoublyGlobalCurrency.moneyFormats[n] && window.DoublyGlobalCurrency.moneyFormats[n].money_format)
                                    return window.DoublyGlobalCurrency.moneyFormats[n].money_format.replace(a, t);
                                if (window.Currency && window.Currency.moneyFormats && window.Currency.moneyFormats[n] && window.Currency.moneyFormats[n].money_format)
                                    return window.Currency.moneyFormats[n].money_format.replace(a, t)
                            }
                        return e.replace(a, t)
                    }
                ) : (this.initWithVariant = function (t) {
                    if (!v.isEmptyObject(t) && !v.isEmptyObject(t)) {
                        var n, e = void 0;
                        try {
                            window.parent.jQuery("#designEditor").attr("data-money") && (e = window.parent.jQuery("#designEditor").attr("data-money"))
                        } catch (t) { }
                        null != e && (a = Shopify.formatMoney(t.price, e),
                            context.setPrice(a),
                            (n = Shopify.formatMoney(t.compare_at_price, e)) ? (section.find(p).show(),
                                context.setComparePrice(n)) : section.find(p).hide(),
                            context.setPercentDiscount(a, n))
                    }
                    return !1
                }
                    ,
                    this.setPercentDiscount = function (t, e) {
                        var a, n, i = section.find(".sg_pq-discount-selector");
                        if (t == e)
                            section.find(p).hide(),
                                i.hide();
                        else if (e && t && 0 < i.length)
                            try {
                                t = (t = t.match(/\d/g)).join(""),
                                    t = parseFloat(t),
                                    e = (e = e.match(/\d/g)).join(""),
                                    (e = parseFloat(e)) && 0 < e ? (a = (a = (a = e - t) / e * 100).toFixed(0),
                                        n = i.find(".sg_pq-percent"),
                                        i.show(),
                                        n.html(a + "%")) : i.hide()
                            } catch (t) {
                                i.hide()
                            }
                        else
                            0 < i.length && i.hide()
                    }
                    ,
                    this.setPrice = function (t) {
                        e = section.find(h).children("span").hasClass("money") ? "<span class=money>" + t + "</span>" : t;
                        var e, a, n, i, r, o = section.find(h);
                        return null == window.Currency || null == o.attr("data-currency") || "" == o.attr("data-currency") || (a = o.attr("data-oldcurrency"),
                            null == (n = null == (n = null == (n = null == (n = section.find(h).attr("data-currency")) ? section.find(h).find(".money").attr("data-currency") : n) && null != window.MinCurrency ? window.MinCurrency.currentCurrency : n) && null != window.DoublyGlobalCurrency ? window.DoublyGlobalCurrency.currentCurrency : n) && null != window.Currency && (n = window.Currency.currentCurrency),
                            i = o.attr("data-oldformat"),
                            null == a || null == n || null == i) ? o.attr("data-price", t).html(e) : (t = window.Currency.moneyFormats[a][i || window.Currency.format] || "{{amount}}",
                                i = window.Currency.moneyFormats[n][i || window.Currency.format] || "{{amount}}",
                                r = 0,
                                null != window.Currency.convert && (r = -1 !== t.indexOf("amount_no_decimals") ? window.Currency.convert(100 * parseInt(e.replace(/[^0-9]/g, ""), 10), a, n) : "JOD" === a || "KWD" == a || "BHD" == a ? window.Currency.convert(parseInt(e.replace(/[^0-9]/g, ""), 10) / 10, a, n) : window.Currency.convert(parseInt(e.replace(/[^0-9]/g, ""), 10), a, n)),
                                t = window.Currency.formatMoney(r, i),
                                o.attr("data-currency-" + n, t).attr("data-price", t).html(t)),
                            !1
                    }
                    ,
                    this.setComparePrice = function (t) {
                        var e = (e = t.match(/\.|\d/g)).join("");
                        return (e = parseFloat(e)) && 0 < e ? (e = section.find(p).children("span").hasClass("money") ? "<span class=money>" + t + "</span>" : t,
                            section.find(p).show(),
                            section.find(p).attr("data-price", t).html(e).show()) : section.find(p).hide(),
                            !1
                    }
                    ,
                    this.setPriceWithQuantity = function (n) {
                        (null == n || parseFloat(n) < 1) && (n = 1);
                        var i, e, t, a = void 0;
                        try {
                            window.parent.jQuery("#designEditor").attr("data-money") && (a = window.parent.jQuery("#designEditor").attr("data-money"))
                        } catch (t) { }
                        return null != a ? null != (t = section.find(h).attr("data-price")) && (t = Number(t.replace(/[^0-9\.-]+/g, "")),
                            (t *= parseFloat(n)) % 1 != 0 && (t = t.toFixed(2)),
                            t = Shopify.formatMoney(t.toString(), a),
                            section.find(h).html(t)) : (0 < (i = section.find(h).find(".money")).length && "" == r && (r = i.text()),
                                e = function (t) {
                                    var e = Number(t.replace(/[^0-9\.-]+/g, ""))
                                        , a = (a = (e = e.toFixed(2)) * parseFloat(n)).toFixed(2).toString()
                                        , e = (t = t.replace(e, a)).split(".");
                                    3 <= e.length && (e.pop(),
                                        t = e.join(".")),
                                        0 < i.length ? i.text(t) : section.find(h).html(t)
                                }
                                ,
                                0 < i.length ? e(r) : (t = section.find(h).attr("data-price"),
                                    e(t)),
                                0 < v(".doubly-wrapper").length && v(".doubly-wrapper").find("li").off("click.currency").on("click.currency", function () {
                                    setTimeout(function () {
                                        var t = section.find(h).find(".money");
                                        0 < t.length ? (r = t.text(),
                                            e(r)) : (t = section.find(h).attr("data-price"),
                                                e(t))
                                    }, 100)
                                }),
                                null != window.Currency && null != (a = section.find(h).attr("data-currency")) && null != (t = section.find(h).attr("data-currency-" + a.toLowerCase())) && "" != t && e(t)),
                            !1
                    }
                ),
                this.findParentProduct = function () {
                    var t = section.closest('[data-label="Product"]').children(".sg-module");
                    return t = 0 == t.length ? section.closest('[data-icon="mpicon-product"]').children(".sg-module") : t
                }
                ,
                this.getUpdatePrice = function (t, e, a, n) {
                    if (window.MINSTORE) {
                        var i = window.MINSTORE.getState("product-" + w + "updatePrice");
                        if (i)
                            return r = i(t, e, a, n)
                    }
                    var r = context.calculatePriceByQuantity(t, e, a, n);
                    return context.checkHasMlvedaCurrency() ? r : context.appendCurrency(r, a)
                }
                ,
                this.getPriceNumber = function (t, e) {
                    var e = section.find(".sg_product-prices").attr("data-oldformat") || e || "{{ amount }}"
                        , t = (t = t.replace(/\s/g, ""),
                            /(\d|,|\.|')+/g.exec(t));
                    return t && t.length && (t = t[0],
                        context.convertPriceToNumber(t, e)) || !1
                }
                ,
                this.checkHasMlvedaCurrency = function () {
                    return !(!window.ACSCurrency || !window.ACSCurrency.currentCurrency)
                }
                ,
                this.dynamicCurrencyUpdatePrice = function (t, e, a, n) {
                    var i = ""
                        , r = context.findParentProduct();
                    return null != r.data("mpv1product") && void 0 !== (r = r.data("mpv1product").getVariant()).price && void 0 !== r.compare_at_price && (n == h && (i = r.price),
                        n == p && (i = r.compare_at_price),
                        "dev" == l && (i *= 100)),
                        "" === i && !1 !== (i = context.getPriceNumber(t, a)) && (i *= 100),
                        "" !== i ? (r = pb_currency_converter.getConvertedPrice(i * e),
                            n && (t = section.find(n + " .pb_converted_currency")).length && (a = t.attr("pb-currency"),
                                t.attr("pb-amount-original", i * e),
                                t.attr("pb-currency-" + a, r)),
                            r) : ""
                }
                ,
                this.dynamicCurrencySetup = function () {
                    window.MINSTORE && pbQuery && (window.MINSTORE.dispatch("product-" + w + "updatePrice", context.dynamicCurrencyUpdatePrice),
                        pbQuery("body").on("change", '[name="PB_Currency_select"]', function () {
                            var t = pbQuery(this).val();
                            1 === currencyConfig.multiCurrency && -1 != window.shopifyMultiCurrencies.indexOf(t) ? pb_currency_converter.multiCurrency(t, !0) : window.MINSTORE.dispatch("changeCurrency")
                        }));
                    var t = g.findParentProduct();
                    t.find('.sg_module[data-label="(P) Quantity"]').children(".sg-module").data("mpv1productquantity") ? t.find('.sg_module[data-label="(P) Quantity"]').children(".sg-module").data("mpv1productquantity").updatePrice() : context.setPriceWithQuantity(1)
                }
                ,
                this.subscribeChangeCurrency = function () {
                    window.MINSTORE && window.MINSTORE.subscribe("changeCurrency", function () {
                        var t = context.findParentProduct();
                        null != t.data("mpv1product") && (t = t.data("mpv1product").getVariant(),
                            context.initWithVariant(t))
                    })
                }
                ,
                this.init()
        }
            ,
            v.fn.minV1ProductPrice = function (e) {
                return this.each(function () {
                    var t;
                    null == v(this).data("mpv1productprice") && (t = new v.minV1ProductPrice(this, e),
                        v(this).data("mpv1productprice", t))
                })
            }
    }(window.MinQuery || jQuery),
    function (o) {
        o.minV1ProductImage = function (t, e) {
            var s, data = {
                zoom: "0",
                displayType: "percentage",
                magnify: 1
            }, section = (this.settings = {},
                o(t)), context = this, n = "";
            this.init = function () {
                this.settings = o.extend({}, data, e),
                    window._gpProductImageIndex || (window._gpProductImageIndex = 0),
                    context.applyZoom();
                section.append('<div class="sg_image-loading-wrap"><div class="sg_image-loading"><div></div><div></div><div></div><div></div></div></div>'),
                    s = section.find(".sg_image-loading-wrap");
                var t = context.findParentProduct();
                return context.setFirstVideo(),
                    null != t.data("mpv1product") && (t = t.data("mpv1product").getVariant(),
                        context.initWithVariant(t, !0),
                        context.listenVariantChange()),
                    "1" == section.attr("data-badgemod") && context.subscribeSettingBadgeChange(),
                    n = this.findWrapProductId(),
                    this.subscribeMediaData(),
                    !1
            }
                ,
                this.listenVariantChange = function () {
                    var t = context.findWrapProductId();
                    window.MINSTORE && window.MINSTORE.subscribe("product-" + t + "-variant", context.changeVariantFunction)
                }
                ,
                this.changeVariantFunction = function (t) {
                    var e, a = context.findParentProduct(), n = context.findWrapProductTitle();
                    t && t.id && (e = "",
                        (t = t.featured_image) ? !(e = t.alt) && null == e || a.find("img.sg_product-image").attr("alt", e) : a.find("img.sg_product-image").attr("alt", n))
                }
                ,
                this.findPImageModule = function () {
                    var t = section.closest('[data-label="(P) Image"]');
                    return t = 0 == t.length ? section.closest('[data-icon="mpicon-product-image"]') : t
                }
                ,
                this.findPpriceModule = function () {
                    var t = this.findParentProduct()
                        , e = t.find('[data-label="(P) Price"]');
                    return e = 0 == e.length ? t.find('[data-icon="mpicon-product-price"]') : e
                }
                ,
                this.subscribeSettingBadgeChange = function () {
                    var t = context.findParentProduct()
                        , t = (null != t.data("mpv1product") && (t = t.data("mpv1product").getVariant(),
                            context.changeBadgeSettingsFunction(t)),
                            this.findWrapProductId());
                    window.MINSTORE && 0 < context.findPImageModule().length && window.MINSTORE.subscribe("product-" + t + "-variant", context.changeBadgeSettingsFunction)
                }
                ,
                this.changeBadgeSettingsFunction = function (t) {
                    if (t && t.id) {
                        var e = parseFloat(t.price)
                            , a = parseFloat(t.compare_at_price)
                            , n = context.findPImageModule()
                            , i = n.find(".sg_badge-text-wrap").find(".data-saleoffvalue")
                            , r = n.find(".sg_badge-text-wrap").find(".data-saleoffunit")
                            , o = "";
                        if (a && 0 < a) {
                            var d = (d = a - e) / a * 100;
                            switch (d = (d = Math.abs(d)).toFixed(0),
                            context.settings.displayType) {
                                case "percentage":
                                    o = d,
                                        r.html("%"),
                                        i.html(o);
                                    break;
                                case "number":
                                    var c = context.findPpriceModule().find(".sg_product-prices").attr("data-oldformat") || "{{ amount }}"
                                        , s = context.findParentProduct().find("#sg-hidden-variant" + t.id)
                                        , s = (null != s && 0 < s.length ? (e = s.attr("data-price"),
                                            null != s.attr("data-compare-price") && "" != s.attr("data-compare-price") && (a = s.attr("data-compare-price"))) : (e = t.price / 100,
                                                a = t.compare_at_price / 100),
                                            a = context.convertPriceToNumber(a, c),
                                            e = context.convertPriceToNumber(e, c),
                                            Math.abs(a - e))
                                        , o = context.convertNumberToPrice(s, c);
                                    isNaN(s) || i.html(o)
                            }
                            i.show()
                        } else
                            i.hide()
                    }
                }
                ,
                this.convertPriceToNumber = function (t, e) {
                    t = (t = t).replace(/\s/g, "");
                    t = -1 != e.indexOf("amount_with_apostrophe_separator") ? t.replace(/'/g, "") : -1 != e.indexOf("amount_with_comma_separator") ? t.replace(/\./g, "").replace(",", ".") : -1 != e.indexOf("amount_no_decimals_with_comma_separator") ? t.replace(/\./g, "") : (e.indexOf("amount_no_decimals"),
                        t.replace(/,/g, ""));
                    try {
                        return parseFloat(t)
                    } catch (t) {
                        return null
                    }
                }
                ,
                this.convertNumberToPrice = function (t, e) {
                    for (var a = section.attr("data-round-decimals") || "0", n = ".", i = ",", r = (t = -1 != e.indexOf("amount_no_decimals_with_comma_separator") || -1 != e.indexOf("amount_no_decimals") ? t.toFixed(0) : t.toFixed(2)).split(".")[0], a = "1" == a ? _roundTo : t.split(".")[1], o = (-1 != e.indexOf("amount_with_apostrophe_separator") ? i = "'" : -1 != e.indexOf("amount_with_comma_separator") ? (n = ",",
                        i = ".") : -1 != e.indexOf("amount_no_decimals_with_comma_separator") ? (n = "",
                            i = ".") : -1 != e.indexOf("amount_no_decimals") && (n = ""),
                        0), d = "", c = r.length - 1; 0 <= c; c--)
                        d = r[c] + d,
                            ++o % 3 == 0 && 0 != c && (d = i + d);
                    return "" == n ? d : d + n + a
                }
                ,
                this.initWithVariant = function (t, e) {
                    var a, n;
                    return "first" == section.attr("data-image-type") && e || null != (t = context.getVariantImage(t)) && "" != t && (a = t.split("?")[0].split(".").pop(),
                        n = replaceImageToSize(t, "2048x2048"),
                        e && -1 == t.indexOf("_120x120." + a) && section.find(".sg_product-image").hasClass("sg_lazyload") && (t = replaceImageToSize(t, "120x120")),
                        context.setImage(t, n, "", e)),
                        !1
                }
                ,
                this.getVariantImage = function (t) {
                    var e = ""
                        , a = context.findParentProduct();
                    if (0 < a.find(".product-json").length)
                        null != t.featured_image && null != t.featured_image.src && (e = t.featured_image.src);
                    else
                        try {
                            var n = a.attr("data-pid");
                            if (null != window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor")) {
                                var i = window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor").searchProductInList(n);
                                null != i.images[0] && (e = i.images[0].src);
                                for (var r = 0; r < i.images.length; r++)
                                    if (-1 !== o.inArray(t.id, i.images[r].variant_ids)) {
                                        null != i.images[r] && (e = i.images[r].src);
                                        break
                                    }
                            }
                        } catch (t) {
                            console.log(t.message)
                        }
                    return e
                }
                ,
                this.setFirstVideo = function () {
                    var t = section.find(".sg_first_video");
                    if (t.length) {
                        for (var e = "sg_image-item-" + window._gpProductImageIndex, a = t.find("video"), n = (window._gpProductImageIndex++,
                            window.gfCurrentVideoPlayer = e,
                            window.gfListVideoPlayer && (window.gfListVideoPlayer[e] = a),
                            t.attr("id", e),
                            a.attr("id", e + "-video"),
                            t.find("source")), a = t.attr("data-source") || "", i = n.length, r = new Array(i), o = 0; o < i; o++) {
                            var d = n[o];
                            r[o] = {
                                src: d.getAttribute("src"),
                                type: d.getAttribute("type")
                            }
                        }
                        context.showVideo(a, "video", {
                            sources: r
                        })
                    }
                }
                ,
                this.setImage = function (t, e, a, n) {
                    var i = ""
                        , i = a || ""
                        , a = (window.MINMEDIA && window.MINMEDIA.pauseCurrentVideo(),
                            s.addClass("active"),
                            section.attr("data-ori-size"))
                        , r = (null == a || "" == a || -1 == t.indexOf("ucarecdn.com/") && -1 == t.indexOf("cdn.shopify.com/s/files/") && -1 == t.indexOf("apps.shopifycdn.com/") || (r = (r = (r = (-1 != t.indexOf("cdn.shopify.com/") || -1 != t.indexOf("apps.shopifycdn.com") ? /_\d+x\d*\.(png|jpg|jpe|bmp|gif|web|bpg)/i : /preview\/\d+x?\d*/i).exec(t)) && (-1 != t.indexOf("cdn.shopify.com/") || -1 != t.indexOf("apps.shopifycdn.com") ? r[0].slice(1, -4) : r[0].slice(8))) || "0x0",
                            t = 0 != parseInt(r.split("x")) ? t.replace(r, a) : replaceImageToSize(t, a)),
                            null != section.data("mpzoom") ? section.data("mpzoom").initZoom(t, e) : (section.find('img.sg_product-image:not(".sg_product-image-hover")').attr("src", t).attr("data-zoom", e),
                                i && section.find('.sg_product-image:not(".sg_product-image-hover")').attr("alt", i)),
                            n || (section.find("model-viewer").remove(),
                                section.find("video.sg_video-only").remove()),
                            section.find(".sg_image-item"));
                    return r.hasClass("sg_first_video") && n || (r.addClass("sg_hidden-important"),
                        r.css("opacity", 0)),
                        n || ((a = section.find(".sg_featured-image")).removeClass("sg_hidden-important"),
                            a.css("opacity", 1),
                            s.removeClass("active")),
                        !1
                }
                ,
                this.showVideo = function (t, e, a) {
                    if ("image" != e) {
                        a = a || {};
                        var n, i = section, r = (section.find("model-viewer").length && section.find("model-viewer").remove(),
                            i.find('[data-src="' + t + '"]'));
                        if (a.host && a.videoId && (r = i.find('[data-video-id="' + a.videoId + '"]')),
                            (r = a.sources && a.sources[0] && a.sources[0].src ? i.find('[data-source="' + a.sources[0].src + '"]') : r).length ? n = r.attr("id") : (n = "sg_image-item-" + window._gpProductImageIndex,
                                window._gpProductImageIndex++,
                                d = '<div id="' + n + '" class="sg_image-item ' + (o = "sg_image-video") + '" data-src="' + t + '"></div>',
                                a.host && a.videoId && (d = '<div id="' + n + '" class="sg_image-item ' + o + '" data-video-id="' + a.videoId + '"></div>'),
                                a.sources && a.sources[0] && a.sources[0].src && (d = '<div id="' + n + '" class="sg_image-item ' + o + '" data-source="' + a.sources[0].src + '"></div>'),
                                i.append(d),
                                r = i.find("#" + n)),
                            window.MINMEDIA && window.MINMEDIA.pauseCurrentVideo(),
                            i && 0 < i.length)
                            if (s.addClass("active"),
                                r.css({
                                    position: "absolute",
                                    top: "0",
                                    left: "0"
                                }),
                                r.attr("data-loaded"))
                                this.showWhenVideoLoaded(n),
                                    window.gfCurrentVideoPlayer = n,
                                    window.MINMEDIA && window.MINMEDIA.playCurrentVideo();
                            else {
                                if (r.attr("data-loading"))
                                    return;
                                r.attr("data-loading", 1);
                                var o = t;
                                if (o && -1 != o.indexOf("vimeo.com/"))
                                    return void window.MINMEDIA.loadVimeo(n, o, function () {
                                        context.showWhenVideoLoaded(n)
                                    });
                                if (o && (-1 != o.indexOf("youtu.be") || -1 != o.indexOf("youtube.com")))
                                    return c = "",
                                        void ((c = (c = -1 != o.indexOf("youtu.be/") ? o.split("youtu.be/") : o.split(/watch\?v=/)) && null != c[1] ? c[1].split(/&/)[0] : c) && window.MINMEDIA.loadYoutube(n, c, function () {
                                            context.showWhenVideoLoaded(n)
                                        }));
                                var d = a.host
                                    , c = a.videoId;
                                if (!o && "youtube" == d && c)
                                    return void window.MINMEDIA.loadYoutube(n, c, function () {
                                        context.showWhenVideoLoaded(n)
                                    });
                                if (!o && "vimeo" == d && c)
                                    return void window.MINMEDIA.loadVimeo(n, c, function () {
                                        context.showWhenVideoLoaded(n)
                                    });
                                if (!o && "video" == e)
                                    return void window.MINMEDIA.newHtml5Video(n, a.sources, function () {
                                        context.showWhenVideoLoaded(n)
                                    })
                            }
                        return !1
                    }
                }
                ,
                this.show3dImage = function (t, e) {
                    var a = section.find(".sg_product-3DImage")
                        , e = "<model-viewer class='sg_product-image sg_featured-image sg_product-3DImage' poster='" + e + "' src='" + t + "' auto-rotate camera-controls ar-status='not-presenting'></model-viewer>";
                    a.length ? a.replaceWith(e) : section.find(".sg_product-image:not('.sg_product-image-hover')").before(e),
                        $gfProductImageElement = section.find("img.sg_product-image"),
                        section.find(".sg_product-3DImage").css({
                            height: $gfProductImageElement.height(),
                            width: $gfProductImageElement.width()
                        }),
                        section.find("img.sg_product-image, .sg_image-item").addClass("sg_hidden-important")
                }
                ,
                this.subscribeMediaData = function () {
                    window.MINSTORE && window.MINSTORE.subscribe("gemActiveMediaData-" + n, function (t) {
                        t.type && "image" != t.type ? "model" == t.type ? section.find('.sg_product-3DImage[src="' + t.url + '"]').length || (u.setImage(t.data.imageUrl, "", ""),
                            context.show3dImage(t.url, t.data.imageUrl)) : context.showVideo(t.url, t.type, t.data) : context.setImage(t.url, t.data.imageZoomUrl, t.data.imageAlt)
                    })
                }
                ,
                this.onChangeVariant = function () {
                    _isDynamic && window.MINSTORE && window.MINSTORE.subscribe("minProductVariant", function (t) {
                        context.setVariant(t)
                    })
                }
                ,
                this.showWhenVideoLoaded = function (t) {
                    var e = section.find(".sg_image-item, .sg_product-image")
                        , a = $("#" + t);
                    a.attr("data-loaded", 1),
                        a.removeAttr("data-loading"),
                        e.addClass("sg_hidden-important"),
                        a.removeClass("sg_hidden-important"),
                        e.css("opacity", 0),
                        a.css({
                            opacity: 1,
                            position: "static"
                        }),
                        s.removeClass("active"),
                        null != section.data("mpzoom") && l.data("mpzoom").destroy(),
                        window.mpCurrentVideoPlayer = t,
                        window.MINMEDIA && window.MINMEDIA.playCurrentVideo()
                }
                ,
                this.applyZoom = function (t) {
                    var e = context.settings.zoom
                        , a = context.settings.magnify
                        , n = context.settings.effect;
                    return "1" != e && "zoom" != n || l.mpZoom({
                        magnify: a
                    }),
                        !1
                }
                ,
                this.findWrapProductId = function () {
                    var t = section.closest('[data-label="Product"]');
                    return (t = 0 == t.length ? section.closest('[data-icon="mpicon-product"]') : t).attr("id") || ""
                }
                ,
                this.findParentProduct = function () {
                    var t = section.closest('[data-label="Product"]').children(".sg-module");
                    return t = 0 == t.length ? section.closest('[data-icon="mpicon-product"]').children(".sg-module") : t
                }
                ,
                this.findWrapProductTitle = function () {
                    var t = section.closest('[data-label="Product"]')
                        , e = "";
                    return 0 < t.length && (0 < (t = t.find('[data-label="(P) Title"]')).length && (e = t.text())),
                        e
                }
                ,
                this.init();
        }
            ,
            o.fn.minV1ProductImage = function (e) {
                return this.each(function () {
                    var t;
                    null == o(this).data("mpv1productimage") && (t = new o.minV1ProductImage(this, e),
                        o(this).data("mpv1productimage", t))
                })
            }
    }(window.MinQuery || jQuery),
    function (p) {
        p.minV1ProductCartButton = function (t, d) {
            var c, data = {
                onItemAdded: function (t) { }
            }, section = (this.settings = {},
                p(t)), context = this, l = "";
            this.init = function () {
                this.settings = p.extend({}, data, d);
                var a, t, e, n, i, r, f = context.findParentProduct(), o = section.closest('[data-label="Product"]');
                return o && o.length && o.attr("id") && (l = o.attr("id")),
                    null != f.data("mpv1product") && (o = f.data("mpv1product").getVariant(),
                        context.initWithVariant(o)),
                    (a = 0 < section.find(".sg_add-to-cart").length ? section.find(".sg_add-to-cart") : section.find('button[type="submit"]')) && 0 < a.length &&
                    (o = "click.cart",
                        window.MINSTORE && window.MINSTORE.checkKeyValid("clickAddToCart") && (o = "click.cart touchend.cart"),
                        a.on(o, function () {
                            context.triggerAddToCartClick();
                            var o, d, c, s, t, l, u, e = section.find(".sg_add-to-cart");
                            if (0 < e.length) {
                                if (e.hasClass("sg_button-soldout"))
                                    return !1
                            } else if (section.attr("data-soldouttext") == a.text())
                                return !1;
                            if ("1" == section.attr("data-ajaxCart"))
                                return 0 < (e = f.children("form")).length && !e.get(0).reportValidity() && 0 < e.find(".sg_textfield[required], .sg_textarea[required], .sg_checkbox[required], .sg_file-upload input[required]").length || (o = null != section.attr("data-cbTo") ? section.attr("data-cbTo").toLowerCase() : "",
                                    d = null != section.attr("data-editLink") ? p.trim(section.attr("data-editLink")) : "",
                                    e = p.trim(section.attr("data-ajaxText")),
                                    c = p.trim(section.attr("data-thankyouText")),
                                    s = "",
                                    null != section.attr("data-successMessage") && (s = (s = p.trim(section.attr("data-successMessage"))).replace(/\[+([^\][]+)]+/g, function (t, e, a) {
                                        var n;
                                        if (e.match("="))
                                            return n = (e = e.split("="))[0],
                                                e = e[1],
                                                "cart" == p.trim(n.replace("label", "")).toLowerCase() ? '<a href="/cart">' + e + "</a>" : "continue" == p.trim(n.replace("label", "")).toLowerCase() ? "" != (n = null != section.attr("data-continue") ? section.attr("data-continue") : "") ? '<a href="' + n + '">' + e + "</a>" : '<a href="/collections/all">' + e + "</a>" : void 0
                                    })),
                                    t = !1,
                                    (t = null != f.data("mpv1product") ? f.data("mpv1product").checkPassBlankOption() : t) && (l = p(this),
                                        u = l.text(),
                                        null != e && l.text(e),
                                        null != f.data("mpv1product") && f.data("mpv1product").addItemToCart(function (t) {
                                            if ("404" == t.status)
                                                setTimeout(function () {
                                                    l.text(t.message),
                                                        setTimeout(function () {
                                                            l.text(u)
                                                        }, 1000)
                                                }, 300);
                                            else {
                                                switch (o) {
                                                    case "checkout":
                                                        d = "/checkout";
                                                        break;
                                                    case "cart":
                                                        d = "/cart"
                                                }
                                                if (null != d && "" != d)
                                                    if (window.SOLID && window.SOLID.store && window.SOLID.cart)
                                                        switch (o) {
                                                            case "checkout":
                                                                return void gfEcomSolid.goToCheckoutWithDiscount();
                                                            case "cart":
                                                                gfEcomSolid.checkCartDrawer() ? gfEcomSolid.openCartDrawer(t) : window.location.href = d;
                                                                break;
                                                            default:
                                                                window.location.href = d
                                                        }
                                                    else
                                                        window.location.href = d;
                                                if (setTimeout(function () {
                                                    null != c && l.text(c),
                                                        setTimeout(function () {
                                                            l.text(u),
                                                                "" != s && (0 < l.next(".ajaxified-cart-feedback").length ? l.next(".ajaxified-cart-feedback").removeClass("error").addClass("success").children("span").html(s) : l.after('<p class="ajaxified-cart-feedback success"><i class="fa fa-check"></i><span>' + s + "</span></p>"))
                                                        }, 1e3)
                                                }, 300),
                                                    l.hasClass("sg_pcartbutton-nocartdrawer"))
                                                    ;
                                                else {
                                                    function e(e) {
                                                        p.ajax({
                                                            method: "GET",
                                                            url: "/cart.js",
                                                            dataType: "json"
                                                        }).then(function (t) {
                                                            e(t)
                                                        })
                                                    }
                                                    try {
                                                        window.store && void 0 !== window.store.update && e(function (t) {
                                                            window.store.update("cart.item_count", t.item_count)
                                                        }),
                                                            gfEcomSolid.openCartDrawer(t)
                                                    } catch (t) {
                                                        console.log(t)
                                                    }
                                                    try {
                                                        if (0 < p(i = 'header a[href="/cart"] .site-header__cart-bubble').length) {
                                                            p(i).addClass("site-header__cart-bubble--visible");
                                                            try {
                                                                yc && e(function (t) {
                                                                    yc._triggerChangeEvent(t)
                                                                })
                                                            } catch (t) {
                                                                console.log(t)
                                                            }
                                                        }
                                                    } catch (t) {
                                                        console.log(t)
                                                    }
                                                    try {
                                                        0 < p(".header__cart-count").length && e(function (t) {
                                                            null != p(".mini-cart").data("plugin_trademarkMiniCart") ? p(document).trigger("theme:cart:updated", [t, !0, !0]) : p(".header__cart-count").text(t.item_count)
                                                        })
                                                    } catch (t) {
                                                        console.log(t)
                                                    }
                                                    try {
                                                        0 < p(".site-header a.site-header__cart .icon__fallback-text").length && e(function (t) {
                                                            0 < p(".site-header a.site-header__cart #CartCount").length ? p(".site-header a.site-header__cart #CartCount > span:first").html(t.item_count) : (t = '<div id="CartCount" class="site-header__cart-count"><span>' + t.item_count + '</span><span class="icon__fallback-text medium-up--hide">item</span></div>',
                                                                p(".site-header a.site-header__cart .icon__fallback-text").after(t))
                                                        })
                                                    } catch (t) {
                                                        console.log(t)
                                                    }
                                                    try {
                                                        0 < p("header a#CartButton #CartCount").length && 0 < p("header a#CartButton #CartCost").length && e(function (t) {
                                                            p("header a#CartButton #CartCount").html(t.item_count),
                                                                StyleHatch && StyleHatch.currencyFormat && (t = Shopify.formatMoney(t.total_price, StyleHatch.currencyFormat),
                                                                    p("header a#CartButton #CartCost").html(t))
                                                        })
                                                    } catch (t) {
                                                        console.log(t)
                                                    }
                                                    try {
                                                        if (0 < p(i = 'header.site-header .cart-link[aria-controls="CartDrawer"]').length && 0 < p("#CartDrawer").length)
                                                            try {
                                                                window.ajaxCart.load()
                                                            } catch (t) { }
                                                    } catch (t) {
                                                        console.log(t)
                                                    }
                                                    try {
                                                        var a, n = (i = "#shopify-section-header .Header__Wrapper .Header__SecondaryNav") + ' a[href="/cart"] .Header__CartCount';
                                                        0 < p(a = i + ' a[data-action="open-drawer"] .Header__CartCount').length ? (e(function (t) {
                                                            p(a).html(t.item_count)
                                                        }),
                                                            p.ajax({
                                                                method: "GET",
                                                                url: "/cart?view=drawer&timestamp=" + Date.now(),
                                                                dataType: "html"
                                                            }).then(function (t) {
                                                                var t = p(t)
                                                                    , e = p("#sidebar-cart");
                                                                e.html(t.html()),
                                                                    e.attr("aria-hidden", "false"),
                                                                    e.find(".Drawer__Close.Icon-Wrapper--clickable").on("click", function () {
                                                                        return e.attr("aria-hidden", "true"),
                                                                            !1
                                                                    })
                                                            })) : 0 < p(n).length && e(function (t) {
                                                                p(n).html(t.item_count)
                                                            })
                                                    } catch (t) {
                                                        console.log(t)
                                                    }
                                                    try {
                                                        0 < p('header a[href="/cart"].topBar__cart.mini_cart span.topBar__cartCount.cart_count').length && e(function (t) {
                                                            Theme.cart.refreshMiniCart(t)
                                                        })
                                                    } catch (t) {
                                                        console.log(t)
                                                    }
                                                    try {
                                                        0 < p('header.site-header .site-nav a[aria-controls="CartDrawer"] > .cart-link > .cart-link__bubble').length && p("body").trigger("added.ajaxProduct")
                                                    } catch (t) {
                                                        console.log(t)
                                                    }
                                                    try {
                                                        var i, r = "header.site-header .site-header__cart-toggle";
                                                        0 < p(i = r + " > .header--supporting-text > .cart-item-count-header").length && (p(r).trigger("click"),
                                                            e(function (t) {
                                                                p(i).html(t.item_count)
                                                            }))
                                                    } catch (t) {
                                                        console.log(t)
                                                    }
                                                    "1" == (a = g.attr("data-sideCart")) && (0 < p(".site-header li.cart-text-link > a.CartToggle").length && p(".site-header li.cart-text-link > a.CartToggle").trigger("click"),
                                                        0 < p('header a[href="/cart"].ajax-cart__toggle').length && p('header a[href="/cart"].ajax-cart__toggle').click())
                                                }
                                                h.settings.onItemAdded(t)
                                            }
                                        }, function (t) {
                                            t && t.responseJSON && t.responseJSON.description && (t = t.responseJSON.description,
                                                0 < l.next(".ajaxified-cart-feedback").length ? l.next(".ajaxified-cart-feedback").removeClass("success").addClass("error").children("span").html(t) : l.after('<p class="ajaxified-cart-feedback error"><i class="fa fa-check"></i><span>' + t + "</span></p>")),
                                                setTimeout(function () {
                                                    l.text(u)
                                                }, 1e3)
                                        }))),
                                    !1
                        }),
                        null != (t = section.parent(".module-wrap")).data("timer") && clearTimeout(t.data("timer")),
                        e = p.trim(section.attr("data-effect")),
                        n = p.trim(section.attr("data-ani")),
                        null != e && "" != e && "default" != e ? (i = p.trim(section.attr("data-interval")),
                            (r = function () {
                                a.addClass(e),
                                    a.addClass(n),
                                    setTimeout(function () {
                                        a.removeClass(e),
                                            a.removeClass(n)
                                    }, 820),
                                    c = setTimeout(r, i),
                                    t.data("timer", c)
                            }
                            )()) : (a.removeClass(e),
                                a.removeClass(n))),
                    !1
            }
                ,
                this.triggerAddToCartClick = function () {
                    window.MINSTORE && window.MINSTORE.dispatch("product-" + l + "-addtocart-click", t)
                }
                ,
                this.initWithVariant = function (t) {
                    return p.isEmptyObject(t) ? context.changeStatus(!1) : context.changeStatus(t.available),
                        !1
                }
                ,
                this.changeStatus = function (t) {
                    var e = 0 < g.find(".sg_add-to-cart").length ? section.find(".sg_add-to-cart") : section.find('button[type="submit"]')
                        , a = section.attr("data-text")
                        , n = section.attr("data-soldouttext");
                    return t ? (section.find("button .AddToCartText").text(a),
                        section.css("opacity", 1),
                        e.removeClass("sg_button-soldout")) : (0 < section.find("button .AddToCartText").length ? section.find("button .AddToCartText").text(n) : section.find("button").html('<span class="AddToCartText">' + n + "</span>"),
                            section.css("opacity", .5),
                            section.addClass("sg_button-soldout")),
                        !1
                }
                ,
                this.findParentProduct = function () {
                    var t = section.closest('[data-label="Product"]').children(".sg-module");
                    return t = 0 == t.length ? section.closest('[data-icon="mpicon-product"]').children(".sg-module") : t
                }
                ,
                this.init()
        }
            ,
            p.fn.minV1ProductCartButton = function (e) {
                return this.each(function () {
                    var t;
                    null == p(this).data("mpv1productcartbutton") && (t = new p.minV1ProductCartButton(this, e),
                        p(this).data("mpv1productcartbutton", t))
                })
            }
    }(window.MinQuery || jQuery),
    function (f) {
        f.minV1ProductImageList = function (t, e) {
            var data = {
                onImageClicked: function (t, e, id) {
                    var ct, a = context.findParentProduct();
                    var variant = (ct = a.data("mpv1product")) ? ct.getVariantFromMedia(id) : false;
                    variant && (ct ? ct.setVariant(variant, !1) : console.warn("couldn't find parent product module"))
                }
            }
                , section = (this.settings = {},
                    f(t))
                , context = this
                , s = "0"
                , l = 1
                , u = 0;
            this.init = function () {
                return this.settings = f.extend({}, data, e),
                    1 == parseInt(section.attr("data-support-video")) && context.initVideo(),
                    context.applyEvents(),
                    s = void 0 !== section.attr("data-borderactive") ? section.attr("data-borderactive") : "0",
                    context.initActiveImage(),
                    l = parseInt(section.attr("data-sync-il")) || 1,
                    u = parseInt(section.attr("data-sync-il-xs")) || 1,
                    setTimeout(function () {
                        context.preload(),
                            section.minV1Lightbox()
                    }, 100),
                    !1
            }
                ,
                this.gotoIndex = function (t) {
                    var e;
                    return 1 == section.data("loop") && 0 < (e = t - section.find(".owl-item.cloned").length / 2) && (t = e),
                        section.find(".sg_product-images-list").trigger("to.owl.carousel", [t, 250, !0]),
                        !1
                }
                ,
                this.gotoThumb = function (t) {
                    if (null != (e = context.getVariantImage(t)) && "" != e) {
                        for (var t = e.split("?")[0].split("."), e = (t.pop(),
                            t.pop()), a = 0, n = 0; n < section.find(".owl-item:not(.cloned) .sg_product-image-thumb").length; n++)
                            if (-1 != section.find(".owl-item:not(.cloned) .sg_product-image-thumb").eq(n).attr("src").indexOf(e)) {
                                a = n;
                                break
                            }
                        section.find(".sg_product-images-list").trigger("to.owl.carousel", [a, 250, !0])
                    }
                    return !1
                }
                ,
                this.getVariantImage = function (t) {
                    var e = ""
                        , a = context.findParentProduct();
                    if (0 < a.find(".product-json").length)
                        null != t.featured_image && null != t.featured_image.src && (e = t.featured_image.src);
                    else
                        try {
                            var n = a.attr("data-pid");
                            if (null != window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor")) {
                                var i = window.parent.jQuery("#designEditor").contents().find("#prevew_builder").data("mpeditor").searchProductInList(n);
                                null != i.images[0] && (e = i.images[0].src);
                                for (var r = 0; r < i.images.length; r++)
                                    if (-1 !== f.inArray(t.id, i.images[r].variant_ids)) {
                                        null != i.images[r] && (e = i.images[r].src);
                                        break
                                    }
                            }
                        } catch (t) {
                            console.log(t.message)
                        }
                    return e
                }
                ,
                this.preload = function () {
                    var e = []
                        , a = 0;
                    return section.find(".sg_product-image-thumb").each(function () {
                        var t = f(this).attr("data-zoom");
                        null != t && (e[a] = new Image,
                            e[a].src = t,
                            a++)
                    }),
                        !1
                }
                ,
                this.initVideo = function () {
                    section.find(".sg_product-video-thumb").each(function () {
                        var t, e, a, n, i, r = f(this), o = r.attr("id"), d = r.attr("data-video");
                        -1 != d.indexOf("vimeo.com/") ? (t = function () {
                            new Vimeo.Player(o, {
                                url: d,
                                loop: !1,
                                autoplay: !1,
                                title: !1,
                                byline: !1
                            })
                        }
                            ,
                            a = "https://player.vimeo.com/api/player.js",
                            0 == f(document).find("script[src^='" + a + "']").length ? ((n = document.createElement("script")).onload = function () {
                                t()
                            }
                                ,
                                (i = document.getElementsByTagName("script")[0]).parentNode.insertBefore(n, i),
                                n.src = a) : t()) : (e = function () {
                                    new YT.Player(o, {
                                        videoId: video_id,
                                        playerVars: {
                                            autoplay: 0,
                                            autohide: 1,
                                            modestbranding: 1,
                                            rel: 0,
                                            showinfo: 0,
                                            controls: 1,
                                            disablekb: 1,
                                            enablejsapi: 0,
                                            iv_load_policy: 3,
                                            hd: 1
                                        },
                                        events: {}
                                    })
                                }
                                    ,
                                    (video_id = -1 != d.indexOf("youtu.be/") ? d.split("youtu.be/") : d.split(/watch\?v=/)) && null != video_id[1] && (video_id = video_id[1].split(/&/)[0]),
                                    a = "https://www.youtube.com/iframe_api",
                                    0 == f(document).find("script[src^='" + a + "']").length ? ((n = document.createElement("script")).onload = function () {
                                        e()
                                    }
                                        ,
                                        (i = document.getElementsByTagName("script")[0]).parentNode.insertBefore(n, i),
                                        n.src = a) : e())
                    })
                }
                ,
                this.initActiveImage = function () {
                    var t, a;
                    "1" != s && 1 != s || null != (t = context.findParentProduct()).data("mpv1product") && (t = t.data("mpv1product").getVariant(),
                        a = context.getVariantImage(t),
                        section.find(".sg_product-image-thumb").each(function () {
                            var t = f(this)
                                , e = t.attr("src");
                            (e = (e = (e = (e = (e = e.replace("_100x100", "")).replace("_240x240", "")).replace("_480x480", "")).replace("_1024x1024", "")).replace("_2048x2048", "")) == a && t.closest("a").addClass("sg_product-image-thumbactive")
                        }))
                }
                ,
                this.applyEvents = function () {
                    return section.find(".sg_product-image-thumb").closest("a").off("click").on("click", function () {
                        var id = f(this).find(".sg_product-image-thumb").attr("data-id");
                        var t, e, a = f(this), n = (section.find(".sg_product-image-thumb").closest("a").removeClass("sg_product-image-thumbactive"),
                            "1" != s && 1 != s || a.addClass("sg_product-image-thumbactive"),
                            a.find(".sg_product-image-thumb")), a = (t = (0 < a.closest(".owl-item").length ? a.closest(".owl-item") : a).index(),
                                window.outerWidth), a = a < 768 ? "xs" : 768 <= a && a < 992 ? "sm" : 992 <= a && a < 1200 ? "md" : "lg", i = (1 < (section.attr("data-col" + a) || 1) && 1 < t && (t -= 1),
                                    e = null != n.attr("data-image") ? n.attr("data-image") : n.attr("src"),
                                    n.attr("data-zoom")), r = n.attr("alt") || n.find("img").attr("alt") || "", o = context.findParentProduct();

                        return 0 < o.find('[data-label="(P) Image"]').length && o.find('[data-label="(P) Image"]').each(function () {
                            null != f(this).children(".sg-module").data("mpv1productimage") ? f(this).children(".sg-module").data("mpv1productimage").setImage(e, i, r) : o.find("img.sg_product-image").attr("src", e).attr("data-zoom", i).attr("alt", r)
                        }),
                            0 < o.find('[data-label="(P) Image List"]').length && 1 == l && (767 < f(window).width() && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 1 == u) ? o.find('[data-label="(P) Image List"]').each(function () {
                                null != f(this).children(".sg-module").data("mpv1productimagelist") && f(this).children(".sg-module").data("mpv1productimagelist").gotoIndex(t)
                            }) : context.gotoIndex(t),
                            context.settings.onImageClicked(e, i, id),
                            !1
                    }),
                        !1
                }
                ,
                this.findParentProduct = function () {
                    var t = section.closest('[data-label="Product"]').children(".sg-module");
                    return t = 0 == t.length ? section.closest('[data-icon="mpicon-product"]').children(".sg-module") : t
                }
                ,
                this.init()
        }
            ,
            f.fn.minV1ProductImageList = function (e) {
                return this.each(function () {
                    var t;
                    null == f(this).data("mpv1productimagelist") && (t = new f.minV1ProductImageList(this, e),
                        f(this).data("mpv1productimagelist", t))
                })
            }
    }(window.MinQuery || jQuery),
    function (f) {
        f.minV1Lightbox = function (t, e) {
            var modal, section = f(t), data = {}, context = (this.settings = {},
                this);
            this.init = function () {
                this.settings = f.extend({}, data, e);
                var r = void 0 !== section.attr("data-gallery") ? section.attr("data-gallery") : "0"
                    , t = void 0 !== section.attr("data-galleryicon") ? section.attr("data-galleryicon") : "0"
                    , o = void 0 !== section.attr("data-spacing") ? section.attr("data-spacing") : "5px";
                var imagelist = [];
                section.find(".sg_product-image-thumb").each(function (index) {
                    var url_image = $(this).attr("data-image");
                    imagelist.push(url_image);
                })
                return section.find(".sg_product-image-hover-zoom").remove(),
                    r && "1" == r && (context.initLightbox(),
                        section.find(".sg_product-image-thumb").off("click.gallery").on("click.gallery", function () {
                            var current_url = $(this).attr('data-image');
                            modal.children(".sg_featherlight-content").children("div[id^='sg_featherlight-item']").remove();
                            imagelist.forEach((element, index) => {
                                var style = current_url == element ? "opacity: 1; display: block; overflow:hidden" : "opacity: 1; display: none;overflow:hidden";
                                modal.children(".sg_featherlight-content").append($('<div></div>')
                                    .attr({
                                        "id": "sg_featherlight-item-" + index,
                                        "data-src": $(this).attr("data-image"),
                                        "style": style,
                                        "data-loaded": "1",
                                        "data-width": "800",
                                        "data-height": "800"
                                    }).addClass("sg_featherlight-item")
                                    .addClass("sg_featherlight-image").append($('<img/>').attr({
                                        "src": element
                                    }))
                                );
                            });
                            modal.show();
                        }),
                        modal && 0 < modal.length && (modal.off("click.hide").on("click.hide", function (t) {
                            0 == f(t.target).closest(".sg_featherlight-content").length && context.hideLightbox()
                        }),
                            modal.find(".sg_featherlight-close").off("click.close").on("click.close", function (t) {
                                t.preventDefault(),
                                    context.hideLightbox()
                            }),
                            modal.find('[data-action="next"]').off("click.next").on("click.next", function (t) {
                                t.preventDefault();
                                var visible = 0;
                                var size = modal.children(".sg_featherlight-content").children("div[id^='sg_featherlight-item']").length;
                                $("div[id^='sg_featherlight-item']").each(function (i, el) {
                                    var display = $(this).css("display");
                                    if (display != 'none' || !display) {
                                        $(this).hide();
                                        if (i == size - 1) {
                                            visible = 0;
                                        } else {
                                            visible = i + 1;
                                        }
                                    }
                                });
                                $("div[id^='sg_featherlight-item']").each(function (i, el) {
                                    if (i == visible) {
                                        $(this).show();
                                    }
                                });
                            }),
                            modal.find('[data-action="previous"]').off("click.next").on("click.next", function (t) {
                                t.preventDefault();
                                let visible = 0;
                                let size = modal.children(".sg_featherlight-content").children("div[id^='sg_featherlight-item']").length;
                                $("div[id^='sg_featherlight-item']").each(function (i, el) {
                                    var display = $(this).css("display");
                                    if (display != 'none' || !display) {
                                        $(this).hide();
                                        if (i == 0) {
                                            visible = size - 1;
                                        } else {
                                            visible = i - 1;
                                        }
                                    }
                                });
                                $("div[id^='sg_featherlight-item']").each(function (i, el) {
                                    if (i == visible) {
                                        $(this).show();
                                    }
                                });
                            }))),
                    !1
            }
                ,
                this.resize = function (t, e, a) {
                    var n;
                    e && a && (t.css("width", "").css("height", ""),
                        1 < (n = Math.max(e / (t.parent().width() - 1), a / (t.parent().height() - 1))) && (n = a / Math.floor(a / n),
                            t.css("width", e / n + "px").css("height", a / n + "px")))
                },
                this.hideLightbox = function () {
                    modal.children(".sg_featherlight-content").children("div[id^='sg_featherlight-item']").remove();
                    modal.hide();
                }
                ,
                this.initLightbox = function () {
                    return 0 == f("body").children(".sg_featherlight").length &&
                        f("body").append('<div class="sg_featherlight"><div class="sg_featherlight-content"><button class="sg_featherlight-close-icon sg_featherlight-close" aria-label="Close">✕</button><img src="" alt="" class="sg_featherlight-image sg_featherlight-inner"><div id="sg_featherlight-video" class="sg_featherlight-inner" /><span class="sg_featherlight-previous"><span title="previous" data-action="previous"><svg viewBox="0 0 448 512" ><path d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z" class=""></path></svg></span></span><span class="sg_featherlight-next"><span title="next" data-action="next"><svg viewBox="0 0 448 512"><path d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z" class=""></path></svg></span></span><div class="sg_featherlight-loading"><div></div><div></div><div></div><div></div></div></div></div>'),
                        modal = f("body").children(".sg_featherlight"),
                        !1
                }
                ,
                this.init()
        }
            ,
            f.fn.minV1Lightbox = function (e) {
                return this.each(function () {
                    var t;
                    null == f(this).data("mpv1lightbox") && (t = new f.minV1Lightbox(this, e),
                        f(this).data("mpv1lightbox", t))
                })
            }
    }(window.MinQuery || jQuery);