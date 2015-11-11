/**
 * iframe - jQuery EasyUI
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2013 tavenli [ tavenli@qq.com ]
 * 基于Easy UI扩展实现的IFRAME弹出框
 *
 * Dependencies:
 * 	draggable
 * 	resizable
 * 	linkbutton
 * 	panel
 *  window
 */
(function($){

	$.iframe = {
		dialog: function(options) {
			var opts = $.extend({
				width: 300,
				height: 'auto',
				title: 'New IFrame dialog',
				url:'',
				maximizable:false,
				minimizable:false,
				resizable:false,
				modal: true,
                onClosed:function(){}
			}, options || {});

            $.iframe.data.onClosed = opts.onClosed;
			var upladoer = $('<iframe/>');
			upladoer.attr({'src':opts.url,width:'100%',height:'99.2%',frameborder:'0',scrolling:'no'});	
			var p=dialog({
                content:upladoer,
                title: opts.title,
				width: opts.width,
				height: opts.height,
				modal: opts.modal,
				collapsible: false,
				minimizable: opts.minimizable,
				maximizable: opts.maximizable,
				resizable: opts.resizable,
				onClose: function(){
					setTimeout(function(){
						p.dialog('close');
                        $.iframe.data.onClosed();
					}, 100);
				}
				});
			
			$.iframe.data.win = p;
            return p;
		},
        maximize:function(){
            var _win = $.iframe.data.win;
            _win.dialog("maximize");
            //
            this.resizeFresh();
        },
        minimize:function(){
            $.iframe.data.win.dialog("minimize");
            this.resizeFresh();
        },
        restore:function(){
            $.iframe.data.win.dialog("restore");
        },
        resizeFresh:function(){
            var _win = $.iframe.data.win;
            var iframe = _win.find("iframe");
            iframe.css({width:_win.css("width"),height:_win.css("height")});
        },
		close:function(){
			var win = $.iframe.data.win;
			if(win){
				win.dialog('close');
                $.iframe.data.onClosed();
			}
		}


	
	};
	
	$.iframe.data = {
		win:null,
        onClosed:function(){}
	};
	
})(jQuery);
