var roy6App = (function($) {
    return {
        init: function() {
            this.setUserAgentInfo();
            this.bindBtnTop();
            this.bindParallaxEffect();
            this.bindGnb();
            this.bindChangeLang();
            this.bindPhotoSlick();
        },
        setUserAgentInfo: function() {
            var b = document.documentElement;
            b.setAttribute('data-useragent', navigator.userAgent.toLowerCase());
            b.setAttribute('data-platform', navigator.platform.toLowerCase());
            b.className += ((!!('ontouchstart' in window) || !!('onmsgesturechange' in window))?' touch':'');
        },
        bindBtnTop: function() {
            var $btnMoveTop = $('#btn_move_top');
            
            if ($btnMoveTop.size() === 0) {
                return;
            }
            
            $(window).on('scroll.page_scroll', function(event) {
                if ($(this).scrollTop() >= 100) {
                    if ($btnMoveTop.hasClass('ani_effect')) {
                        return;
                    }

                    $btnMoveTop.removeClass('ani_effect_2').addClass('ani_effect');
                } else if ($(this).scrollTop() < 100) {
                    if (parseInt($btnMoveTop.css('opacity'), 10) === 0) {
                        return;
                    }

                    $btnMoveTop.removeClass('ani_effect').addClass('ani_effect_2');
                }
            });

            $btnMoveTop.on('click', function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 200);
            });
        },
        bindParallaxEffect: function() {
            var $roy6Gnb = $('.roy6_gnb');
            var $minicloudV1 = $('.minicloud.v1');
            var $minicloudV2 = $('.minicloud.v2');
            var $minicloudV3 = $('.minicloud.v3');
            var $royan = $('li.royan');
            var $eddy = $('li.eddy');
            var $longlong = $('li.longlong');
            var $loudy = $('li.loudy');
            var $t2000 = $('li.t2000');
            var $titleWrap = $('.title_wrap');
            var $treeThumb = $('.tree_thumb');
            
            // 메인
            setTimeout(function() {
                $('.img_character').addClass('ani_effect_top2');
            }, 0);
            setTimeout(function() {
                $('.roy6_logo').addClass('ani_effect_top');
            }, 300);    
            setTimeout(function() {
                $('.top_ground').addClass('ani_effect_top3');
            }, 1000);    
            setTimeout(function() {
                $('.roy_text').addClass('ani_effect_toptext');
            }, 1200);          
            setTimeout(function() {
                $('.img_cloud.left').addClass('ani_effect_cloudleft');
            }, 1200);    
            setTimeout(function() {
                $('.img_cloud.right').addClass('ani_effect_cloudright');
            }, 1200);
            
            // 구름/캐릭터
            $(window).scroll(function(){
                var scroll = $(window).scrollTop();
                
                if (scroll >= 400) {
                    $roy6Gnb.addClass('v2');
                } else if ($(this).scrollTop() < 300) {
                    $roy6Gnb.removeClass('v2');
                }
                if (scroll >= 500) {
                    $minicloudV1.addClass('ani_minicloud');
                    setTimeout(function() {
                        $minicloudV3.addClass('ani_minicloud3');
                    }, 100);          
                    setTimeout(function() {
                        $minicloudV2.addClass('ani_minicloud2');
                    }, 150);  
                }  
                if (scroll >= 1600) {
                    $royan.addClass('ani_character');
                }  
                if (scroll >= 2400){
                    $eddy.addClass('ani_character');
                } 
                if (scroll >= 2900){
                    $longlong.addClass('ani_character');
                }
                if (scroll >= 3400){
                    $loudy.addClass('ani_character');
                }  
                if (scroll >= 3800){
                    $t2000.addClass('ani_character');
                } 
                if (scroll >= 4500){
                    $titleWrap.addClass('ani_effect_top');
                    setTimeout(function() {
                        $treeThumb.addClass('ani_effect_top');
                    }, 150);            
                }        
            });
        },
        bindGnb: function() {
            var didScroll = false;
            var lastScrollTop = 0;
            var delta = 5;
            var $header = $('.roy6_gnb');
            var headerHeight = $header.outerHeight();
            var hasScrolled = function() {
                var scrollTop = $(this).scrollTop();

                if (Math.abs(lastScrollTop - scrollTop) <= delta) {
                    return;
                }

                if (scrollTop === 0) {
                    $header.addClass('top')
                           .removeClass('wait up down');
                }  else if (scrollTop > lastScrollTop && scrollTop < headerHeight) {
                    $header.addClass('wait')
                            .removeClass('top up down');
                } else if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                    $header.addClass('down')
                            .removeClass('top wait up');
                } else if(scrollTop + $(window).height() < $(document).height()) {
                    $header.addClass('up')
                            .removeClass('top wait down');
                }

                lastScrollTop = scrollTop;
            };

            $(window).scroll(function(event) {
                didScroll = true;
            });

            setInterval(function() {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 250);
            
            var $menuList = $('#menu_list');
            var $body = $('body');
            
            $('#btn_gnb').on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                if ($body.hasClass('scroll')) {
                    $body.removeClass('scroll');
                } else {
                    $body.addClass('scroll');
                }
            });
            
            $('#btn_gnb_close, .dimd').on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                $body.removeClass('scroll');
            });
            
            var $menuListLi = $('#menu_list li');
            $('#menu_list a.btn_link').on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                var $this = $(this);
                var href = $this.attr('href');
                var $target = $(href);
                
                if ($target.size() === 0) {
                    return false;
                }
                
                $menuListLi.removeClass('on');
                $this.closest('li').addClass('on');
                
                $('html, body').animate({
                    scrollTop: $target.offset().top
                }, 400);
                
                return false;
            });
        },
        bindChangeLang: function() {
            $('#laguage_select_bx').on('change', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                location.href = $(this).val();
            });
        },
        bindPhotoSlick: function() {
            $('.fade').slick({
                dots: true,
                infinite: true,
                speed: 500,
                fade: true,
                arrows:false,
                cssEase: 'linear'
            });
        }
    };
})(jQuery);

$(function() {
    roy6App.init();
});