(function() {
    var expandScript = function($div, data) {
        if ($div.attr('box-all') == 'true') {
            $div.css({padding: '15px', border: 'solid 1px #aaa', borderRadius: '5px'});
        }
        var page_url = $div.attr('data-url');
        if (page_url == 'this') {
            appendPage($div, data, true, page_url);
            return;
        }
        $.get(page_url, function(data) {
            appendPage($div, data, false, page_url);
        });
    };
    var appendPage = function($div, data, self, page_url) {
        if (self) {
            appendChildPages($div, data);
        } else {
            var $data = $(data);
            var $content = $data.find('div#main-content');
            if ($div.attr('edit') == "true") {
                var edit_icon = $('<a></a>', {
                    href: page_url.replace(/viewpage/, 'editpage'),
                    text: '編集',
                });
                edit_icon.addClass('aui-button aui-button-primary');
                $content.prepend(edit_icon);
            }
            if ($div.attr('box') == 'true') {
                $content.css({padding: '15px', border: 'solid 1px #aaa', borderRadius: '5px'});
            }
//            $div.append($data.find('h1#title-text'));
            $div.append($content);
            expandScripts($content, data);
        }
        if (window.SyntaxHighlighter) {
            window.SyntaxHighlighter.highlight();
        }
    };
    var expandScripts = function($div, data) {
        $div.find('div.w-child-pages').each(function(){
            expandScript($(this), data);
        });
    };
    var appendChildPages = function($div, data) {
        $(data).find('ul.childpages-macro').find('li').each(function() {
            var page_url = $(this).find('a').attr('href');
            $.get(page_url, function(data) {
                appendPage($div, data, false, page_url);
            });
        });
    };
    var scriptTags = document.getElementsByTagName('script');
    var $div = $(scriptTags[scriptTags.length - 1]).prev();
    $(function(){
        if (location.pathname != '/confluence/pages/viewpage.action') {
            return;
        }
        expandScript($div, $('html')[0].outerHTML);
    });
})();
