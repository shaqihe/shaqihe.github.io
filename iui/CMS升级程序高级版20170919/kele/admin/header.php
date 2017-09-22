<?php //decode by ?>
<?php require 'protect.php';?>
<html class="no-js fixed-layout">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>源码网站大淘客CMS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta name="apple-mobile-web-app-title" content="源码网站大淘客CMS"/>
    <link rel="stylesheet" href="../assets/css/nnhong.css"/>
    <link rel="stylesheet" href="../assets/css/admin.css">
       <link rel="stylesheet" href="../assets/css/admin.style.css">
       <script src="//cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
       <script src="//cdn.amazeui.org/amazeui/2.7.2/js/amazeui.min.js"></script>
      <script src="//cdn.bootcss.com/vue/2.2.6/vue.min.js"></script>

</head>
<body>
<!--[if lte IE 9]>
<p class="browsehappy">你正在使用<strong>过时</strong>的浏览器，Amaze UI 暂不支持。 请 <a href="http://browsehappy.com/" target="_blank">升级浏览器</a>
    以获得更好的体验！</p>
<![endif]-->
<div class="am-modal am-modal-alert" tabindex="-1" id="kele_alert">
  <div class="am-modal-dialog">
    <div class="am-modal-hd" id="kele_alert_title"></div>
    <div class="am-modal-bd" id="kele_alert_info">
    </div>
    <div class="am-modal-footer">
      <span class="am-modal-btn">确定</span>
    </div>
  </div>
</div>
<div class="am-modal am-modal-confirm" tabindex="-1" id="kele_confirm">
  <div class="am-modal-dialog">
    <div class="am-modal-hd" id="kele_confirm_title"></div>
    <div class="am-modal-bd" id="kele_confirm_info"></div>
    <div class="am-modal-footer">
      <span class="am-modal-btn" data-am-modal-confirm="">确定</span>
    </div>
  </div>
</div>
<div class="am-modal am-modal-confirm" tabindex="-1" id="kele_true_confirm">
  <div class="am-modal-dialog">
    <div class="am-modal-hd" id="kele_true_confirm_title"></div>
    <div class="am-modal-bd" id="kele_true_confirm_info"></div>
    <div class="am-modal-footer">
		<span class="am-modal-btn" data-am-modal-confirm="">确定</span>
		<span class="am-modal-btn" data-am-modal-cancel="">取消</span>
    </div>
  </div>
</div>


<header class="am-topbar am-topbar-inverse admin-header">
    <div class="am-topbar-brand">
<!--        <img src="../assets/images/logo.jpg" style="width: 48px;top: -2px;position: relative;">
-->        <strong>源码网站大淘客CMS</strong>
        <small>后台管理</small>
    </div>

    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only"
            data-am-collapse="{target: '#topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span
                class="am-icon-bars"></span></button>

    <div class="am-collapse am-topbar-collapse" id="topbar-collapse">

        <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list">
            
            <li><a href="?v=active/index" style="color: #FFFF00;"><span class="am-icon-arrow-up"></span> 永久激活</a></li>
                 <li><a href="../../index.php?clean=true" target="_blank"  ><span class="am-icon-recycle"></span> 清除缓存</a></li>
          

        </ul>
    </div>
</header>

<div class="am-cf admin-main">
    <!-- sidebar start -->
    <div class="admin-sidebar am-offcanvas" id="admin-offcanvas">
        <div class="am-offcanvas-bar admin-offcanvas-bar">
            <ul class="am-list admin-sidebar-list">
                <li><a href="?v=index"><span class="am-icon-home"></span> 首页</a></li>

   <li><a href="?v=setting/index"><span class="am-icon-gear"></span> 基础设置</a></li>
       <!--<li class="admin-parent">
          <a class="am-cf" data-am-collapse="{target: '#collapse-setting'}"><span class="am-icon-gear"></span> 基础设置 <span class="am-icon-angle-right am-fr am-margin-right"></span></a>
          <ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-setting">
            <li><a href="?v=setting/index" ><span class="am-icon-check"></span> 系统设置</span></a></li>
            <li><a href="?v=setting/tpwd"><span class="am-icon-puzzle-piece"></span> 淘口令设置</a></li>
             <li><a href="?v=setting/tpwd"><span class="am-icon-puzzle-piece"></span> API参数</a></li>
          </ul>
        </li>-->

                <li><a href="index.php?logout=1"><span class="am-icon-sign-out"></span> 注销</a></li>
            </ul>

            <div class="am-panel am-panel-default admin-sidebar-panel">
                <div class="am-panel-bd">
                    <p><span class="am-icon-bookmark"></span> 源码网站的想法</p>
                    <p>源码网站大淘客CMS很棒，作为使用者，感觉她可以更好，于是就有这套系统。
                        扩展大淘客CMS，让她更加强大，更好的服务淘客，。
						
						
                </div>
            </div>


        </div>
    </div>
    <!-- sidebar end -->
    <!-- content start -->
    <div class="admin-content">
        <div class="admin-content-body">
