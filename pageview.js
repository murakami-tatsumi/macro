(function() {
    var expandScript = function($div, data) {
        var page_id = $div.attr('id');
        var edit = $div.attr('edit');
        var box  = $div.attr('box');
        var page_url = '/confluence/pages/viewpage.action?pageId=' + page_id;
        $.get(page_url, function(data) {
            appendPage($div, data, page_url, edit, box);
        });
    };
    var appendPage = function($div, data, page_url, edit, box) {
        var $data = $(data.replace(/inline\-comment\-marker/g, 'inline-comment-marker valid'));
        var $content = $data.find('div#main-content');
        if (edit == "true") {
            var edit_icon = $('<a></a>', {
                href: page_url.replace(/viewpage/, 'editpage'),
                text: '編集',
            });
            edit_icon.addClass('aui-button aui-button-primary');
        }
        $content.prepend(edit_icon);
        if (box == "true") {
            $content.css({padding: '15px', border: 'solid 1px #aaa', borderRadius: '5px'});
        }
//        $div.append($data.find('h1#title-text'));
        $div.append($content);
        if (window.SyntaxHighlighter) {
            window.SyntaxHighlighter.highlight();
        }
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
