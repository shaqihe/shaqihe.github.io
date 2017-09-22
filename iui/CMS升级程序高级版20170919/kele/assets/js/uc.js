(function($) {
    var base = {
        init: function() {
            var _this = this;
        },
        query_order: function() {
            $.getJSON(cms_config.login_url, {
                app_id: cms_config.app_id,
                url_sign: cms_config.url_sign,
                time: cms_config.time,
                action: 'member',
            }, function(data) {
                if (data !== undefined && data.result !== undefined) {
                    data = data.result.map;
                }
                $("#member_money").html(data.user_data.money);
                $("#member_money_available,#member_money_available_span").html(data.user_data.money_available);
                $("#member_points").html(data.user_data.points);
                var html_list = '';
                if (data.items) {
                    $.each(data.items, function(i, item) {
                        html_list = html_list + "<li>" +
                            "<div>" +
                            "<span class='list_item list_create_date'>时间：" + item.create_date + "</span>" +
                            "<span class='list_item'>佣金:" + item.money + "元</span>" +
                            "<span class='list_item'>积分：" + item.points + "</span>" +
                            "<span class='list_item list_status'>状态：" + item.status_name + "</span>" +
                            "<span class='list_item list_memo'>备注：" + item.memo + "</span>" +
                            "</div>" +
                            "</li>";
                    });
                }
                $("#member_list").html(html_list);
            })
        },
        query_point: function() {
            $.getJSON(cms_config.login_url, {
                app_id: cms_config.app_id,
                url_sign: cms_config.url_sign,
                time: cms_config.time,
                action: 'point',
            }, function(data) {
                if (data !== undefined && data.result !== undefined) {
                    data = data.result.map;
                }
                $("#member_points").html(data.user_data.points);
                $("#member_points_available").html(data.user_data.points_available);
                var html_list = '';
                if (data.items) {
                    $.each(data.items, function(i, item) {
                        html_list = html_list + "<li>" +
                            "<div>" +
                            "<span class='list_item'>时间：" + item.create_date + "</span>" +
                            "<span class='list_item'>积分：" + item.points + "</span>" +
                            "<span class='list_item'>状态：" + item.status_name + "</span>" +
                            "<span class='list_item'>备注：" + item.pay_memo + "</span>" +
                            "</div>" +
                            "</li>";
                    });
                }
                $("#member_list").html(html_list);
            })
        },
        query_cash: function() {
            $.getJSON(cms_config.login_url, {
                app_id: cms_config.app_id,
                url_sign: cms_config.url_sign,
                time: cms_config.time,
                action: 'cash',
            }, function(data) {
                if (data !== undefined && data.result !== undefined) {
                    data = data.result.map;
                }
                $("#member_money").html(data.user_data.money);
                $("#member_money_available").html(data.user_data.money_available);
                var html_list = '';
                if (data.items) {
                    $.each(data.items, function(i, item) {
                        html_list = html_list + "<li>" +
                            "<div>" +
                            "<span class='list_item'>时间：" + item.create_date + "</span>" +
                            "<span class='list_item'>金额：" + item.money + "元</span>" +
                            "<span class='list_item'>状态：" + item.status_name + "</span>" +
                            "<span class='list_item'>备注：" + item.pay_memo + "</span>" +
                            "</div>" +
                            "</li>";
                    });
                }
                $("#member_list").html(html_list);
            })
        },
        query_setting: function() {
            $.getJSON(cms_config.login_url, {
                app_id: cms_config.app_id,
                url_sign: cms_config.url_sign,
                time: cms_config.time,
                action: 'setting',
            }, function(data) {
                if (data !== undefined && data.result !== undefined) {
                    data = data.result.map;
                }
                $("#member-qq").val(data.user.qq);
                $("#member-email").val(data.user.email);
                $("#member-mobile").val(data.user.mobile);
                $("#member-alipay").val(data.user.alipay);
            })
        },
        query_click: function() {
            $(".mall-click").each(function(i, o) {
                $this = $(o);
                $click_item = cms_config.click_url;
                $click_item = $click_item + "?url=" + encodeURIComponent($this.data("url"));
                $click_item = $click_item + "&mall_id=" + $this.data("mallid");
                $click_item = $click_item + "&u_id=" + $this.data("uid");
                $click_item = $click_item + "&p_id=" + $this.data("pid");
                if (cms_config.agent_id && cms_config.agent_id != '') {
                    $click_item = $click_item + "&a_id=" + cms_config.agent_id;
                } else {
                    $click_item = $click_item + "&a_id=" + $this.data("aid");
                }
                $click_item = $click_item + "&m_id=" + cms_config.m_id;
                $this.attr("href", $click_item);
            });
        },
    }
    window.HPT_MEMBER = base;
    window.HPT_MEMBER.init();
})(jQuery);


$(function() {

    $.getJSON(cms_config.login_url, {
        app_id: cms_config.app_id,
        url_sign: cms_config.url_sign,
        time: cms_config.time,
        ag_id: $("#member_agent_id").val(),
        action: 'info'
    }, function(data) {
        if (data.result.map.status == 1) {
            $("#member_menu").append($("#member_toolbar_member")).removeClass("am-avg-sm-4").addClass("am-avg-sm-5");
            //		   $(".user",$("#toolbar_member")).html(data.result.map.user.user_name);
            cms_config.m_id = data.result.map.user.user_id;
            $("#member_toolbar_member").show();
        } else {
            $("#member_menu").append($("#member_toolbar")).removeClass("am-avg-sm-4").addClass("am-avg-sm-5");
            $("#member_toolbar").show();
        }
        if (data.result.map.ag_id && data.result.map.ag_id != '') {
            cms_config.agent_id = data.result.map.ag_id;
        }
        HPT_MEMBER.query_click();
    });

});


$(function() {
    $('#btn-register').click(function() {
        $.getJSON(cms_config.login_url, {
            app_id: cms_config.app_id,
            url_sign: cms_config.url_sign,
            time: cms_config.time,
            action: 'register',
            user_name: $('#user_name').val(),
            passwd: $('#password').val(),
            qq: $('#qq').val(),
            mobile: $('#mobile').val(),
            email: $('#email').val(),
        }, function(data) {
            if (data.result.map.status == 1) {
                window.location.href = cms_config.base_url;
            } else {
                $('#user_name_warn').html('<strong class="error "></strong><p class="msg_error">' + data.result.map.status_err + '</p>');
            }
        });
    });

    $('#btn-login').click(function() {
        $.getJSON(cms_config.login_url, {
            app_id: cms_config.app_id,
            url_sign: cms_config.url_sign,
            time: cms_config.time,
            action: 'login',
            user_name: $('#user_name').val(),
            passwd: $('#password').val(),
        }, function(data) {
            if (data.result.map.status == 1) {
                window.location.href = cms_config.base_url;
            } else {
                $('#user_name_warn').html('<strong class="error "></strong><p class="msg_error">' + data.result.map.status_err + '</p>');
            }
        });
    });

    $('#btn_logout').click(function() {
        $.getJSON(cms_config.login_url, {
            app_id: cms_config.app_id,
            url_sign: cms_config.url_sign,
            time: cms_config.time,
            action: 'logout',
        }, function(data) {
            if (data.result.map.status == 1) {
                window.location.href = cms_config.base_url;
            } else {
                window.location.href = cms_config.base_url;
            }
        });
    });

    $('.tb-btn').click(function() {
        $.getJSON(cms_config.login_url, {
            app_id: cms_config.app_id,
            url_sign: cms_config.url_sign,
            time: cms_config.time,
            action: 'input_taobao_order',
            order_no: $('#activate-code').val(),
        }, function(data) {
            if (data.result.map.status == 1) {
                $('.coupon-active>.err').html(data.result.map.status_err).css("color", "#5eb95e").show();
                $('#activate-code').val('');
                HPT_MEMBER.query_order();
            } else {
                $('.coupon-active>.err').html(data.result.map.status_err).css("color", "#ff464e").show();
            }
        });
    });

    $('.payment-btn').click(function() {
        $.getJSON(cms_config.login_url, {
            app_id: cms_config.app_id,
            url_sign: cms_config.url_sign,
            time: cms_config.time,
            action: 'input_payment_money',
            input_payment_money: $('#money-code').val(),
        }, function(data) {
            if (data.result.map.status == 1) {
                $('.coupon-active>.err').html(data.result.map.status_err).css("color", "#5eb95e").show();
                $('#money-code').val('');
                HPT_MEMBER.query_cash();
            } else {
                $('.coupon-active>.err').html(data.result.map.status_err).css("color", "#ff464e").show();
            }
        });
    });

    $('.exchange-btn').click(function() {
        $.getJSON(cms_config.login_url, {
            app_id: cms_config.app_id,
            url_sign: cms_config.url_sign,
            time: cms_config.time,
            action: 'input_exchange_points',
            input_exchange_points: $('#point-code').val(),
        }, function(data) {
            if (data.result.map.status == 1) {
                $('.coupon-active>.err').html(data.result.map.status_err).css("color", "#5eb95e").show();
                $('#point-code').val('');
                HPT_MEMBER.query_point();
            } else {
                $('.coupon-active>.err').html(data.result.map.status_err).css("color", "#ff464e").show();
            }
        });
    });

    $('.setting-btn').click(function() {
        $.getJSON(cms_config.login_url, {
            app_id: cms_config.app_id,
            url_sign: cms_config.url_sign,
            time: cms_config.time,
            action: 'input_setting',
            email: $('#member-email').val(),
            qq: $('#member-qq').val(),
            mobile: $('#member-mobile').val(),
            alipay: $('#member-alipay').val(),
            passwd: $('#member-passwd').val(),
        }, function(data) {
            if (data.result.map.status == 1) {
                $('#err').html(data.result.map.status_err).css("color", "#5eb95e").show();
                $('#point-passwd').val('');
                //			   HPT_MEMBER.query_setting();
            } else {
                $('#err').html(data.result.map.status_err).css("color", "#ff464e").show();
            }
        });
    });


    if ($("#member_home").length > 0) {
        HPT_MEMBER.query_order();
    }
    if ($("#member_point").length > 0) {
        HPT_MEMBER.query_point();
    }
    if ($("#member_cash").length > 0) {
        HPT_MEMBER.query_cash();
    }
    if ($("#member_setting").length > 0) {
        HPT_MEMBER.query_setting();
    }

});