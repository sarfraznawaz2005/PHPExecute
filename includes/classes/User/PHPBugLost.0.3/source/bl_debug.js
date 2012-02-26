var bl_shortcuts = true
    bl_key_msg = '49',
    bl_key_sql = '50',
    bl_key_vars = '51',
    bl_key_profile = '52',
    bl_key_time = '53',
    bl_key_memory = '54',
    bl_key_ajax = '55',
    bl_key_php = '56',
    bl_key_jscss = '74',
    bl_key_opacity = '79',
    bl_key_info = '73',
    bl_key_plus = '77',
    bl_key_close = '88';

////////////////////////////////////
//// SOME STANDARD FUNCTIONS
var $bl = function (id) {
	return document.getElementById(id);
};
String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.ltrim = function () {
	return this.replace(/^\s+/, "");
};
String.prototype.rtrim = function () {
	return this.replace(/\s+$/, "");
};
Element.prototype.hasClass = function (class_name) {
	this.className = this.className.replace(/^\s+|\s+$/g, "");
	this.className = " " + this.className + " ";
	if (this.className.search(" " + class_name + " ") !== -1) {
		return true;
	}
	this.className = this.className.replace(/^\s+|\s+$/g, "");
	return false;
};
Element.prototype.removeClass = function (class_name) {
	this.className = this.className.replace(class_name, '');
	this.className = this.className.replace(/^\s+|\s+$/g, "");
};
Element.prototype.addClass = function (class_name) {
	this.className = this.className + ' ' + class_name;
	this.className = this.className.replace(/^\s+|\s+$/g, "");
};

function bl_toggle(obj, mode) {
	var el = document.getElementById(obj);
	if (mode === 'more') {
		document.getElementById("bl_debug_content").style.display = 'block';
		if (el.className === 'bl_full_panel') {
			el.className = 'bl_half_panel';
		} else {
			el.className = 'bl_full_panel';
		}
	} else {
		if (el.style.display !== 'none') {
			el.style.display = 'none';
		} else {
			el.style.display = '';
		}
	}
}

function randomString(length) {
    var str, i, chars = 'abcdefghiklmnopqrstuvwxyz'.split('');
	if (!length) {
		length = Math.floor(Math.random() * chars.length);
	}
	for (i = 0; i < length; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}


function time(ms) {
	var t = ms / 1000;
	return Math.round(t * 100) / 100;
}


function bl_listen(event, elem, func, id) {
    if (id) {
        elem = $bl(elem);
    }else {
        elem = document;
    }

    if (elem.addEventListener) {
        elem.addEventListener(event, func, false);
    } else if (elem.attachEvent) { // IE DOM
        var r = elem.attachEvent("on" + event, func);
        return r;
    } else {
        throw 'No es posible añadir evento';
    }
}
bl_listen('keyup', 'body', bl_keydown);


function bl_keydown(e) {

    if (!bl_shortcuts) {
        return;
    }

    if (navigator.appName == 'Microsoft Internet Explorer') {
        var e = window.event;
        var target = e.srcElement.nodeName.toLowerCase();
    }else {
        var target = e.target.localName;
    }

    console.log(e.keyCode);

    if (target == 'html' || target == 'body') {

        if (e.keyCode == bl_key_msg) {
            bl_debug_set_panel('msg');

        }else if (e.keyCode == bl_key_sql) {
            bl_debug_set_panel('sql');

        }else if (e.keyCode == bl_key_profile) {
            bl_debug_set_panel('profile');

        }else if (e.keyCode == bl_key_vars) {
            bl_debug_set_panel('vars');

        }else if (e.keyCode == bl_key_time) {
            bl_debug_set_panel('time');

        }else if (e.keyCode == bl_key_memory) {
            bl_debug_set_panel('memory');

        }else if (e.keyCode == bl_key_ajax) {
            bl_debug_set_panel('ajax');

        }else if (e.keyCode == bl_key_php) {
            bl_debug_set_panel('php');

        }else if (e.keyCode == bl_key_jscss) {
            bl_toggle('bl_tool_box');

        }else if (e.keyCode == bl_key_opacity) {
            bl_opacity();

        }else if (e.keyCode == bl_key_info) {
            bl_debug_set_panel('info');

        }else if (e.keyCode == bl_key_plus) {// + maximizar
            bl_setPanelSize('plus');

        }else if (e.keyCode == bl_key_close) {
            bl_setPanelSize('close');
        }
    }
}

////////////////////////////////////
//// TOGGLE VIEW HTML ON VARS PANEL

function bl_view_html(el) {
	var el1 = document.getElementById('bl_view_html_' + el),
		el2 = document.getElementById('bl_view_' + el),
		el3 = document.getElementById('bl_view_more_' + el);
	if (el1.style.display === 'block') {
		el1.style.display = 'none';
		el2.style.display = 'block';
		el3.style.display = 'none';
	} else {
		el1.style.display = 'block';
		el2.style.display = 'none';
		el3.style.display = 'none';
	}
}
////////////////////////////////////
//// TOP/RIGHT ALERT WHEN ERRORS

function bl_show_errors() {
	bl_toggle('bl_show_errors');
}

function bl_alert_errors() {
	var bl_interval = setInterval("bl_show_errors()", 500);
	setTimeout("clearInterval(" + bl_interval + ")", 3000);
}
////////////////////////////////////
//// SET OPACITY (BUTTON opacity)

function bl_opacity() {
	var el = $bl('bl_debug');
	if (el.hasClass('bl_opacity')) {
		el.removeClass('bl_opacity');
	} else {
		el.addClass('bl_opacity');
	}
}
/**
 * Change the panel size when press button M or X
 * @size string plus|close
 */
function bl_setPanelSize(size) {
    var panel_size = 'close';
	if (size === 'plus') {
		if ($bl('bl_debug_content').className === 'bl_half_panel') {
			$bl('bl_debug_content').className = 'bl_full_panel';
            panel_size = 'full';
		} else {
			$bl('bl_debug_content').className = 'bl_half_panel';
            panel_size = 'half';
		}
	} else if (size === 'close') {
		$bl('bl_debug_content').className = 'bl_close_panel';
	} else {
		$bl('bl_debug_content').className = 'bl_' + size + '_panel';
	}

    if (panel_size === 'close') {
        bl_setCookie('__bl_panel_active', 'none', 1);
    }

    bl_setCookie('panel_size_bl', panel_size, 1);

}
/**
 * Change the active panel
 * @panel string msg|sql|vars|time|memory|ajax|info...
 */

function bl_debug_set_panel(panel) {
	var c1 = "bl_debug_panel",
		c2 = "bl_debug_panel_active",
		c3 = "bl_debug_btn",
		c4 = "bl_debug_activo";
	if ($bl("bl_debug_" + panel).hasClass("bl_debug_panel_active")) {
		$bl("bl_debug_" + panel).className = c1;
		$bl("bl_debug_content").className = 'bl_close_panel';
		$bl(c3 + "_" + panel).className = c3;
	} else {
		// show panel
		$bl("bl_debug_msg").className = c1;
		$bl("bl_debug_sql").className = c1;
		$bl("bl_debug_vars").className = c1;
		$bl("bl_debug_time").className = c1;
		$bl("bl_debug_memory").className = c1;
		$bl("bl_debug_ajax").className = c1;
		$bl("bl_debug_info").className = c1;
		$bl("bl_debug_php").className = c1;
        $bl("bl_debug_profile").className = c1;
		$bl("bl_debug_" + panel).className = c1 + " " + c2;
		// set button active
		$bl("bl_debug_btn_msg").className = c3;
		$bl(c3 + "_sql").className = c3;
		$bl(c3 + "_vars").className = c3;
		$bl(c3 + "_time").className = c3;
		$bl(c3 + "_memory").className = c3;
		$bl(c3 + "_ajax").className = c3;
		$bl(c3 + "_php").className = c3;
        $bl(c3 + "_profile").className = c3;
		$bl(c3 + "_" + panel).className = c3 + " " + c4;
		if ($bl("bl_debug_content").hasClass('bl_close_panel')) {
			$bl("bl_debug_content").className = 'bl_half_panel';
		}
	}
    bl_setCookie('__bl_panel_active', panel, 1);
}


/**
 * Show or hidde messesages by type
 * @type string all|error|info|warn|user
 */
function bl_debug_set_msg(type) {
	// obtener todos los links del menu y eliminar la clase activo
	var i, bl_search, bl_search2, e,
        allHTMLTags = document.getElementsByTagName("tr");
	for (i = 0; i < allHTMLTags.length; (i++)) {
		if (allHTMLTags[i].className.search('bl_normal_tr') !== -1) {
			allHTMLTags[i].className = allHTMLTags[i].className.replace('bl_msg_activo', '');
			bl_search = allHTMLTags[i].className.search('bl_debug_msg_' + type);
            bl_search2 = allHTMLTags[i].className.search('bl_msg_activo');
			if (bl_search !== -1) {
				if (bl_search2 === -1) {
					allHTMLTags[i].className = allHTMLTags[i].className + ' bl_msg_activo';
				}
			} else {
				if (type === 'all') {
					if (bl_search2 === -1) {
						allHTMLTags[i].className = allHTMLTags[i].className + ' bl_msg_activo';
					}
				}
			}
		}
	}
    allHTMLTags = document.getElementsByTagName("a");
	for (i = 0; i < allHTMLTags.length; (i++)) {
		if (allHTMLTags[i].className.search('bl_debug_msg_btn') !== -1) {
			allHTMLTags[i].className = 'bl_debug_msg_btn';
		}
	}
	// añadir la clase al elemento actual
	e = document.getElementById('bl_debug_msg_btn_' + type);
	e.addClass('bl_debug_msg_btn_activo');
}


/**
 * Change the active vars panel
 * @size string A vars panel: vars|special|get|post... etc.
 */
function bl_debug_set_var(panel) {
	// obtener todos los links del menu y eliminar la clase activo
	var i, e, allHTMLTags = document.getElementsByTagName("div");
	for (i = 0; i < allHTMLTags.length; i++) {
		if (allHTMLTags[i].className.search('bl_debug_var_panel') !== -1) {
			allHTMLTags[i].className = 'bl_debug_var_panel';
		}
	}
    allHTMLTags = document.getElementsByTagName("a");
	for (i = 0; i < allHTMLTags.length; i++) {
		if (allHTMLTags[i].className.search('bl_debug_var_btn') !== -1) {
			allHTMLTags[i].className = 'bl_debug_var_btn';
		}
	}

	// añadir la clase al elemento actual
	e = document.getElementById('bl_debug_var_btn_' + panel);
	e.addClass('bl_debug_var_btn_activo');
	// activar el panel de elemento
	e = document.getElementById('bl_debug_var_' + panel);
	e.addClass('bl_debug_var_panel_activo');
}

/**
 * Change the active PHP panel
 * @size string ext|cpu|phpinfo
 */
function bl_debug_set_php(panel) {
	// obtener todos los links del menu y eliminar la clase activo
	var i, e, allHTMLTags = document.getElementsByTagName("a");
	for (i = 0; i < allHTMLTags.length; i++) {
		if (allHTMLTags[i].className.search('bl_debug_php_btn') !== -1) {
			allHTMLTags[i].className = 'bl_debug_php_btn';
		}
	}
    allHTMLTags = document.getElementsByTagName("div");
	for (i = 0; i < allHTMLTags.length; i++) {
		if (allHTMLTags[i].className.search('bl_debug_php_panel') !== -1) {
			allHTMLTags[i].className = 'bl_debug_php_panel';
		}
	}
	// añadir la clase al elemento actual
	e = document.getElementById('bl_debug_php_btn_' + panel);
	e.addClass('bl_debug_php_btn_activo');
	// activar el panel de elemento
	e = document.getElementById('bl_debug_php_' + panel);
	e.addClass('bl_debug_php_panel_activo');
}

/**
 * Change the active HTML panel
 * @size string ext|cpu|phpinfo
 */
function bl_debug_set_html(panel) {
	// obtener todos los links del menu y eliminar la clase activo
	var i, e, allHTMLTags = document.getElementsByTagName("*");
	for (i = 0; i < allHTMLTags.length; i++) {
		if (allHTMLTags[i].className.search('bl_debug_html_btn') !== -1) {
			allHTMLTags[i].className = 'bl_debug_html_btn';
		}
		if (allHTMLTags[i].className.search('bl_debug_html_panel') !== -1) {
			allHTMLTags[i].className = 'bl_debug_html_panel';
		}
	}
	// añadir la clase al elemento actual
	e = document.getElementById('bl_debug_html_btn_' + panel);
	e.addClass('bl_debug_html_btn_activo');
	// activar el panel de elemento
	e = document.getElementById('bl_debug_html_' + panel);
	e.addClass('bl_debug_html_panel_activo');
}


/**
 * Expand mehtods and properties on classes panel
 * @size string ext|cpu|phpinfo
 */
function bl_expand(count) {
	// obtener todos los links del menu y eliminar la clase activo
	var i, e, allHTMLTags = document.getElementsByTagName("span");
	for (i = 0; i < allHTMLTags.length; i++) {

		if (allHTMLTags[i].className.search('bl_class_' + count) !== -1) {
            if (allHTMLTags[i].style.display !== 'block') {
                allHTMLTags[i].style.display = 'block';
                $bl('bl_method_comments_expand_' + count).style.display = 'none';
                $bl('bl_method_comments_' + count).style.display = 'block';
            }else {
                allHTMLTags[i].style.display = 'inline';
                $bl('bl_method_comments_expand_' + count).style.display = 'block';
                $bl('bl_method_comments_' + count).style.display = 'none';
            }

		}
	}
}


////////////////////////////////////
//// ACTIONS FOR INPUT FILTER ON VARS PANEL

// filter function by vonloesch.de
function filter(phrase, id) {
	var words = $bl(phrase).value.toLowerCase().split(" "),
        table = document.getElementById(id),
        ele,
        r,
        i,
        displayStyle;

	for (r = 1; r < table.rows.length; r++) {
		ele = table.rows[r].innerHTML.replace(/<[^>]+>/g, "");
		displayStyle = "none";
		for (i = 0; i < words.length; i++) {
			if (ele.toLowerCase().indexOf(words[i]) >= 0) {
                displayStyle = "";
			} else {
				displayStyle = "none";
				break;
			}
		}
		table.rows[r].style.display = displayStyle;
	}
}

function filterUser() {
	filter('bl_filter_user', 'bl_table_user');
}

function filterSpecial() {
	filter('bl_filter_special', 'bl_table_special');
}

function filterFunctions() {
	filter('bl_filter_functions', 'bl_table_functions');
}

function filterUclasses() {
	filter('bl_filter_uclasses', 'bl_table_uclasses');
}

function filterIclasses() {
	filter('bl_filter_iclasses', 'bl_table_iclasses');
}

function filterConstants() {
	filter('bl_filter_constants', 'bl_table_constants');
}

function filterGet() {
	filter('bl_filter_get', 'bl_table_get');
}

function filterPost() {
	filter('bl_filter_post', 'bl_table_post');
}

function filterSession() {
	filter('bl_filter_session', 'bl_table_session');
}

function filterCookie() {
	filter('bl_filter_cookie', 'bl_table_cookie');
}

function filterFiles() {
	filter('bl_filter_files', 'bl_table_files');
}

function filterServer() {
	filter('bl_filter_server', 'bl_table_server');
}

bl_listen('keyup', 'bl_filter_user', filterUser, true);
bl_listen('keyup', 'bl_filter_special', filterSpecial, true);
bl_listen('keyup', 'bl_filter_functions', filterFunctions, true);
bl_listen('keyup', 'bl_filter_uclasses', filterUclasses, true);
bl_listen('keyup', 'bl_filter_iclasses', filterIclasses, true);
bl_listen('keyup', 'bl_filter_constants', filterConstants, true);
bl_listen('keyup', 'bl_filter_get', filterGet, true);
bl_listen('keyup', 'bl_filter_post', filterPost, true);
bl_listen('keyup', 'bl_filter_session', filterSession, true);
bl_listen('keyup', 'bl_filter_cookie', filterCookie, true);
bl_listen('keyup', 'bl_filter_files', filterFiles, true);
bl_listen('keyup', 'bl_filter_server', filterServer, true);


////////////////////////////////////
//// AJAX FOR DELTE SESSIONS AND COOKIES
function bl_ajax(){
    var xmlhttp=false;
    try{
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }catch(e){
        try{
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }catch(E){
            xmlhttp = false;
        }
    }

    if(!xmlhttp && typeof XMLHttpRequest!='undefined'){
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
function bl_del_var(var_name, url, type, key, tr_id) {

    var ajax, result = 'Error. No vars deleted!';
    url = url + '?del=1&var=' + var_name + '&type=' + type + '&key=' + key;

    ajax=bl_ajax();
    ajax.open("GET", url, true);
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 1){
            // loading
        }else if(ajax.readyState == 4){
            if (ajax.responseText === 'ok') {
                // delete table row
                var table = $bl('bl_table' + type.toLowerCase()),
                    tr = $bl(tr_id);
                tr.innerHTML = '<td colspan="5">var $' + type + '["' + var_name + '"]  deleted</td>';

            }else if (ajax.responseText === 'error-key') {
                alert('There\'re a problem with your secret key');

            }else if (ajax.responseText === 'error-cookie') {
                alert('Sorry, I can\t delete this cookie.');

            }else {
                alert('Error. No vars deleted!');
            }
        }
    };
    ajax.send(null);
}


////////////////////////////////////
//// HIGHLIGHT A TABLE ROW. FIRE WHEN MOUSEOVER (inline code on <tr>)

function bl_highlight_row(highlight, el) {
	if (highlight === true) {
		el.addClass('bl_highlight_row');
	} else {
		el.removeClass('bl_highlight_row');
	}
}
////////////////////////////////////
//// TOGGLE FOR VIEW ARRAY OPTION ON VARS PANEL

function view_array(id) {
	var div = document.getElementById(id),
		a = document.getElementById(id.replace('div_', 'a_'));
	if (div.style.display === 'block') {
		div.style.display = 'none';
		a.style.display = 'block';
	} else {
		div.style.display = 'block';
		a.style.display = 'none';
	}
}
////////////////////////////////////
//// LIKE PHP HTMLENTITES. USED FOR SHOW HTML ON VARS PANEL

function htmlentities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

////////////////////////////////////
//// GET JS AND CSS FILES
function bl_get_js() {

    var html = '', i, filename, viewSource = '',
        js = document.getElementsByTagName('script');

    if (js.length > 0) {
        // open with view-source:
        if (navigator.appName === 'Netscape') {
            viewSource = 'view-source:';
        }
        for (i = 0;i < js.length;i++) {
            if (js[i].src.length) {
                filename = js[i].src.substring(js[i].src.lastIndexOf('/')+1);
                html = html + '<li><a href="' + viewSource + js[i].src + '" target="_blank">' + filename + '</a></li>';
            }
        }
        $bl('bl_js').innerHTML = '<h3>Javascript Files</h3><ul>' + html + '</ul>';
    }
}
function bl_get_css() {

    var html = '', i, filename, viewSource = '',
        css = document.getElementsByTagName('link');

    if (css.length > 0) {
        $bl('bl_css').innerHTML = "";

        // open with view-source:
        if (navigator.appName === 'Netscape') {
            viewSource = 'view-source:';
        }
        for (i = 0;i < css.length;i++) {
            if (css[i].href.length && css[i].rel === 'stylesheet') {
                filename = css[i].href.substring(css[i].href.lastIndexOf('/')+1);
                html = html + '<li><a href="' + viewSource + css[i].href + '" target="_blank">' + filename + '</a></li>';
            }
        }
        $bl('bl_css').innerHTML = '<h3>CSS Files</h3><ul>' + html + '</ul>';
    }
}


bl_get_js();
bl_get_css();


function bl_setCookie(c_name,value,exdays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value + '; path=/';
}


////////////////////////////////////
//// AJAX PANEL

function bl_params_to_html(params, id) {
	if (params) {
		var param, i, j, p, ps;

		ps = params.split('&');
		param = '<table>';
		for (i in ps) {
			p = ps[i].split('=');
			param = param + '<tr><td><strong>' + p[0] + '</strong></td><td>' + p[1] + '</td>';
		}
		param = param + '</table>';
		return param;
	}
	//return document.getElementById('bl_p_'+id).innerHTML;
}

function bl_msg_ajax(data, el_id) {
	var params = data.params,
        e = document.getElementById('bl_debug_ajax_box');
	e.innerHTML = '<div id="bl_' + el_id + '" class="bl_ajax_msg"><div class="bl_ajax_header"><strong>' + data.method + '</strong> <a href="javascript:bl_ajax_response(\'' + el_id + '\');">' + data.url + '</a> <span id="bl_c_' + el_id + '" class="">[loading...]</span></div> <div class="bl_ajax_request" id="bl_ajax_resume_' + el_id + '" style="display:none;"><ul class="bl_ajax_menu"><li><a href="javascript:bl_set_ajax_view(\'' + el_id + '\',\'params\');">Params</a></li><li> <a href="javascript:bl_set_ajax_view(\'' + el_id + '\',\'response\');" class="bl_active">Response</a></li></ul><div id="bl_d_' + el_id + '" class="bl_ajax_response">  </div><div id="bl_p_' + el_id + '" style="display:none;" class="bl_ajax_response">' + bl_params_to_html(params, el_id) + '</div></div> </div>' + e.innerHTML;
}

function bl_msg_ajax_end(data, el_id) {
	var div, span = document.getElementById('bl_c_' + el_id);
	span.innerHTML = '<span id="bl_c_c_' + el_id + '">' + data.status + ' ' + data.statusText + '</span> ' + time(data.time) + 's';
	var span_error = document.getElementById('bl_c_c_' + el_id);
	if (data.status === '500' || data.status === '403' || data.status === '404' || data.status === '301') {
		// TODO: more status codes?
        span_error.addClass('bl_highlight_error');
	}
	// add params
	if (data.params !== null) {
		document.getElementById('bl_p_' + el_id).innerHTML = bl_params_to_html(data.params);
	}
	// add response
	// TODO: beautifier for json
	div = document.getElementById('bl_d_' + el_id);
	div.innerHTML = '<pre>' + htmlentities(data.response) + '</pre>';
}

function bl_set_ajax_view(el_id, type) {
	var params = document.getElementById('bl_p_' + el_id),
        response = document.getElementById('bl_d_' + el_id);
	if (type === 'params') {
		params.style.display = 'block';
		response.style.display = 'none';
	} else {
		params.style.display = 'none';
		response.style.display = 'block';
	}
}

function bl_ajax_response(el_id) {
	var e = document.getElementById('bl_ajax_resume_' + el_id);
	if (e.style.display === 'block') {
		e.style.display = 'none';
	} else {
		e.style.display = 'block';
	}
}

var random, el_id,
    s_ajaxListener = {};

s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;
s_ajaxListener.callback = function () {
	// this.method :the ajax method used
	// this.url    :the url of the requested script (including query string, if any) (urlencoded)
	// this.data   :the data sent, if any ex: foo=bar&a=b (urlencoded)
};


// XMLHttpRequest.js Copyright (C) 2011 Sergey Ilinsky (http://www.ilinsky.com)
//
// This work is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation; either version 2.1 of the License, or
// (at your option) any later version.
// This work is distributed in the hope that it will be useful,
// but without any warranty; without even the implied warranty of
// merchantability or fitness for a particular purpose. See the
// GNU Lesser General Public License for more details.
// You should have received a copy of the GNU Lesser General Public License
// along with this library; if not, write to the Free Software Foundation, Inc.,
// 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
(function () {

    // Helper function
	function fReadyStateChange(oRequest) {
		// Sniffing code
		if (cXMLHttpRequest.onreadystatechange) {
            cXMLHttpRequest.onreadystatechange.apply(oRequest);
		}
		// Fake event
		oRequest.dispatchEvent({
			'type': "readystatechange",
			'bubbles': false,
			'cancelable': false,
			'timeStamp': new Date() + 0
		});
	}

	function fGetDocument(oRequest) {
		var oDocument = oRequest.responseXML,
			sResponse = oRequest.responseText,
            bIE;
		// Try parsing responseText
		if (bIE && sResponse && oDocument && !oDocument.documentElement && oRequest.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)) {
			oDocument = new window.ActiveXObject("Microsoft.XMLDOM");
			oDocument.async = false;
			oDocument.validateOnParse = false;
			oDocument.loadXML(sResponse);
		}
		// Check if there is no error in document
		if (oDocument) {
            if ((bIE && oDocument.parseError !== 0) || !oDocument.documentElement || (oDocument.documentElement && oDocument.documentElement.tagName === "parsererror")) {
                return null;
            }
		}
		return oDocument;
	}

	function fSynchronizeValues(oRequest) {
		try {
			oRequest.responseText = oRequest._object.responseText;
		} catch (e) {}
		try {
			oRequest.responseXML = fGetDocument(oRequest._object);
		} catch (e) {}
		try {
			oRequest.status = oRequest._object.status;
		} catch (e) {}
		try {
			oRequest.statusText = oRequest._object.statusText;
		} catch (e) {}
	}

    function fCleanTransport(oRequest) {
		// BUGFIX: IE - memory leak (on-page leak)
		oRequest._object.onreadystatechange = new window.Function();
	}

	// Save reference to earlier defined object implementation (if any)
	var oXMLHttpRequest = window.XMLHttpRequest,
        bGecko = !!window.controllers, // Define on browser type
		bIE = window.document.all && !window.opera,
		bIE7 = bIE && window.navigator.userAgent.match(/MSIE 7.0/);
	// Enables "XMLHttpRequest()" call next to "new XMLHttpReques()"

	function fXMLHttpRequest() {
		this._object = oXMLHttpRequest && !bIE7 ? new oXMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
		this._listeners = [];
	}
	// Constructor
	function cXMLHttpRequest() {
		return new fXMLHttpRequest();
	}
	cXMLHttpRequest.prototype = fXMLHttpRequest.prototype;
	// BUGFIX: Firefox with Firebug installed would break pages if not executed
	if (bGecko && oXMLHttpRequest.wrapped) {
        cXMLHttpRequest.wrapped = oXMLHttpRequest.wrapped;
	}
	// Constants
	cXMLHttpRequest.UNSENT = 0;
	cXMLHttpRequest.OPENED = 1;
	cXMLHttpRequest.HEADERS_RECEIVED = 2;
	cXMLHttpRequest.LOADING = 3;
	cXMLHttpRequest.DONE = 4;
	// Public Properties
	cXMLHttpRequest.prototype.readyState = cXMLHttpRequest.UNSENT;
	cXMLHttpRequest.prototype.responseText = '';
	cXMLHttpRequest.prototype.responseXML = null;
	cXMLHttpRequest.prototype.status = 0;
	cXMLHttpRequest.prototype.statusText = '';
	// Priority proposal
	cXMLHttpRequest.prototype.priority = "NORMAL";
	// Instance-level Events Handlers
	cXMLHttpRequest.prototype.onreadystatechange = null;
	// Class-level Events Handlers
	cXMLHttpRequest.onreadystatechange = null;
	cXMLHttpRequest.onopen = null;
	cXMLHttpRequest.onsend = null;
	cXMLHttpRequest.onabort = null;
	// Public Methods
	cXMLHttpRequest.prototype.open = function (sMethod, sUrl, bAsync, sUser, sPassword) { /* PHP BUG LOST */
		var d1 = new Date(), // time mark
            el_id = randomString(12), // random id for handle toggle event
            data = {},
            bl_url_ex,
            oRequest,
            fOnUnload,
            nState,
            el_count,
            el_count_now,
            el_count_sum;

		el_count = document.getElementById('bl_num_request');
		el_count_now = parseInt(el_count.innerHTML, 10);
		if (el_count_now === 0) {
			document.getElementById('bl_debug_ajax_box').innerHTML = '';
		}
		el_count_sum = el_count_now + 1;
		el_count.innerHTML = el_count_sum;

		data.url = sUrl;
		data.method = sMethod;
		data.async = bAsync;
		data.params = '';
		// get params
		if (sMethod.toLowerCase() === 'get') {
			bl_url_ex = sUrl.split("?");
			if (bl_url_ex[1] !== 'undefined') {
				data.params = bl_url_ex[1];
				data.url = bl_url_ex[0];
			}
		}
		bl_msg_ajax(data, el_id); /* FIN PHP BUG LOST */
		// Delete headers, required when object is reused
		delete this._headers;
		// When bAsync parameter value is omitted, use true as default
		if (arguments.length < 3) {
            bAsync = true;
		}
		// Save async parameter for fixing Gecko bug with missing readystatechange in synchronous requests
		this._async = bAsync;
		// Set the onreadystatechange handler
		oRequest = this;
		nState = this.readyState;
		// BUGFIX: IE - memory leak on page unload (inter-page leak)
		if (bIE && bAsync) {
			fOnUnload = function () {
				if (nState !== cXMLHttpRequest.DONE) {
					fCleanTransport(oRequest);
					// Safe to abort here since onreadystatechange handler removed
					oRequest.abort();
				}
			};
			window.attachEvent("onunload", fOnUnload);
		}
		// Add method sniffer
		if (cXMLHttpRequest.onopen) {
            cXMLHttpRequest.onopen.apply(this, arguments);
		}
		if (arguments.length > 4) {
            this._object.open(sMethod, sUrl, bAsync, sUser, sPassword);
		} else if (arguments.length > 3) {
            this._object.open(sMethod, sUrl, bAsync, sUser);
		} else {
            this._object.open(sMethod, sUrl, bAsync);
		}
		this.readyState = cXMLHttpRequest.OPENED;
		fReadyStateChange(this);

		this._object.onreadystatechange = function (dd) { /* FIN TIEMPO */

			var d2 = new Date(),
                d3 = d2 - d1, // tiempo de la query en milisengundos
                params = '',
                data = {};

			if (oRequest._data !== 'undefined') {
                params = oRequest._data;
			}
			if (this.readyState === 4) {
				data.time = d3;
				data.response = this.response;
				data.status = this.status;
				data.statusText = this.statusText;
				data.params = params;
				bl_msg_ajax_end(data, el_id);
			}
			if (bGecko && !bAsync) {
                return;
			}
			// Synchronize state
			oRequest.readyState = oRequest._object.readyState;
			//
			fSynchronizeValues(oRequest);
			// BUGFIX: Firefox fires unnecessary DONE when aborting
			if (oRequest._aborted) {
				// Reset readyState to UNSENT
				oRequest.readyState = cXMLHttpRequest.UNSENT;
				// Return now
				return;
			}
			if (oRequest.readyState === cXMLHttpRequest.DONE) {
				// Free up queue
				delete oRequest._data;
				// BUGFIX: IE - memory leak in interrupted
				if (bIE && bAsync) {
				    window.detachEvent("onunload", fOnUnload);
				}
			}
			// BUGFIX: Some browsers (Internet Explorer, Gecko) fire OPEN readystate twice
			if (nState !== oRequest.readyState) {
                fReadyStateChange(oRequest);
			}
			nState = oRequest.readyState;
		};
	};

	function fXMLHttpRequest_send(oRequest) {
		oRequest._object.send(oRequest._data);
		// BUGFIX: Gecko - missing readystatechange calls in synchronous requests
		if (bGecko && !oRequest._async) {
			oRequest.readyState = cXMLHttpRequest.OPENED;
			// Synchronize state
			fSynchronizeValues(oRequest);
			// Simulate missing states
			while (oRequest.readyState < cXMLHttpRequest.DONE) {
				oRequest.readyState++;
				fReadyStateChange(oRequest);
				// Check if we are aborted
				if (oRequest._aborted) {
				    return;
				}
			}
		}
	}
	cXMLHttpRequest.prototype.send = function (vData) {
		// Add method sniffer
		if (cXMLHttpRequest.onsend) {
            cXMLHttpRequest.onsend.apply(this, arguments);
		}
		if (!arguments.length) {
            vData = null;
		}
		// BUGFIX: Safari - fails sending documents created/modified dynamically, so an explicit serialization required
		// BUGFIX: IE - rewrites any custom mime-type to "text/xml" in case an XMLNode is sent
		// BUGFIX: Gecko - fails sending Element (this is up to the implementation either to standard)
		if (vData && vData.nodeType) {
			vData = window.XMLSerializer ? new window.XMLSerializer().serializeToString(vData) : vData.xml;
			if (!oRequest._headers["Content-Type"]) {
                oRequest._object.setRequestHeader("Content-Type", "application/xml");
			}
		}
		this._data = vData;

		fXMLHttpRequest_send(this);
	};
	cXMLHttpRequest.prototype.abort = function () {
		// Add method sniffer
		if (cXMLHttpRequest.onabort) {
            cXMLHttpRequest.onabort.apply(this, arguments);
		}
		// BUGFIX: Gecko - unnecessary DONE when aborting
		if (this.readyState > cXMLHttpRequest.UNSENT) {
            this._aborted = true;
		}
		this._object.abort();
		// BUGFIX: IE - memory leak
		fCleanTransport(this);
		this.readyState = cXMLHttpRequest.UNSENT;
		delete this._data;
/* if (this._async)
fQueue_remove(this);*/
	};
	cXMLHttpRequest.prototype.getAllResponseHeaders = function () {
		return this._object.getAllResponseHeaders();
	};
	cXMLHttpRequest.prototype.getResponseHeader = function (sName) {
		return this._object.getResponseHeader(sName);
	};
	cXMLHttpRequest.prototype.setRequestHeader = function (sName, sValue) {
		// BUGFIX: IE - cache issue
		if (!this._headers) {
            this._headers = {};
		}
		this._headers[sName] = sValue;
		return this._object.setRequestHeader(sName, sValue);
	};
//	// EventTarget interface implementation
//	cXMLHttpRequest.prototype.addEventListener = function (sName, fHandler, bUseCapture) {
//        var nIndex;
//		for (nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++) {
//            if (oListener[0] === sName && oListener[1] === fHandler && oListener[2] === bUseCapture) {
//                return;
//            }
//		}
//		// Add listener
//		this._listeners.push([sName, fHandler, bUseCapture]);
//	};
//	cXMLHttpRequest.prototype.removeEventListener = function (sName, fHandler, bUseCapture) {
//        var nIndex;
//		for (nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++) {
//            if (oListener[0] === sName && oListener[1] === fHandler && oListener[2] === bUseCapture) {
//                break;
//    		}
//		}
//		// Remove listener
//		if (oListener) {
//            this._listeners.splice(nIndex, 1);
//		}
//	}
	cXMLHttpRequest.prototype.dispatchEvent = function (oEvent) {
		var nIndex = 0,
            oListener,
            oEventPseudo = {
                'type': oEvent.type,
                'target': this,
                'currentTarget': this,
                'eventPhase': 2,
                'bubbles': oEvent.bubbles,
                'cancelable': oEvent.cancelable,
                'timeStamp': oEvent.timeStamp,
                'stopPropagation': function () {},
                // There is no flow
                'preventDefault': function () {},
                // There is no default action
                'initEvent': function () {} // Original event object should be initialized
            };
		// Execute onreadystatechange
		if (oEventPseudo.type === "readystatechange" && this.onreadystatechange) {
            (this.onreadystatechange.handleEvent || this.onreadystatechange).apply(this, [oEventPseudo]);
		}
		// Execute listeners
		for (oListener; oListener = this._listeners[nIndex]; nIndex++) {
            if (oListener[0] === oEventPseudo.type && !oListener[2]) {
                (oListener[1].handleEvent || oListener[1]).apply(this, [oEventPseudo]);
            }
		}
	};
	//
	cXMLHttpRequest.prototype.toString = function () {
		return '[' + "object" + ' ' + "XMLHttpRequest" + ']';
	};
	cXMLHttpRequest.toString = function () {
		return '[' + "XMLHttpRequest" + ']';
	};

	// Register new object with window
	window.XMLHttpRequest = cXMLHttpRequest;
})();