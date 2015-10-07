var oldIE = false;


// device detector
function testDevice() {
	var _doc_element, _find, _user_agent;
	window.device={};
	_doc_element=window.document.documentElement;
	_user_agent=window.navigator.userAgent.toLowerCase();
	device.ios=function(){return device.iphone() || device.ipod() || device.ipad();};
	device.iphone=function(){return _find('iphone');};
	device.ipod=function(){return _find('ipod');};
	device.ipad=function(){return _find('ipad');};
	device.android=function(){return _find('android');};
	device.androidPhone=function(){return device.android() && _find('mobile');};
	device.androidTablet=function(){return device.android() && !_find('mobile');};
	device.blackberry=function(){return _find('blackberry') || _find('bb10') || _find('rim');};
	device.blackberryPhone=function(){return device.blackberry() && !_find('tablet');};
	device.blackberryTablet=function(){return device.blackberry() && _find('tablet');};
	device.windows=function(){return _find('windows');};
	device.windowsPhone=function(){return device.windows() && _find('phone');};
	device.windowsTablet=function(){return device.windows() && _find('touch');};
	device.fxos=function(){return (_find('(mobile;') || _find('(tablet;')) && _find('; rv:');};
	device.fxosPhone=function(){return device.fxos() && _find('mobile');};
	device.fxosTablet=function(){return device.fxos() && _find('tablet');};
	device.meego=function(){return _find('meego');};
	device.mobile=function(){return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();};
	device.tablet=function(){return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();};
	device.portrait=function(){return Math.abs(window.orientation)!==90;};
	device.landscape=function(){return Math.abs(window.orientation)===90;};
	_find = function(needle){return _user_agent.indexOf(needle) !== -1;};

	var HTM = document.getElementsByTagName('html')[0];
	var className = '';

}
testDevice();




var doc, scrollPos = 0;

var scrollDelay = 0;
var wnd;

$(document).ready(function() {
	var T;
	wnd = $(window);
	$('.js-scroll').mCustomScrollbar({
				live:true,
				axis:"y",
				advanced:{
					updateOnContentResize: true
				}
			});
	$('.js-horisontal-scroll').mCustomScrollbar({
				live:true,
				axis:"x",
				advanced:{
					updateOnContentResize: true
				}
			});
	oldIE = $('html').hasClass('lt-ie10');

	doc = $(document); 
	
	doc.on('click','.editBtn',function() {
		var item = $(this).parents('.p-item');
		$(this).find('.iconBtn').toggleClass('icon-write icon-delete');
		item.toggleClass('edit').find('.wysiwigHead').toggle();
		if(item.hasClass('edit')) {
			item.find('.wysiwigBody').attr('contenteditable', 'true').focus();
			item.find('.switch').removeClass('hidden');
			item.find('.deleteBtn').removeClass('hidden');
			item.find('.disclamer').removeClass('hidden');
		} else {
			item.find('.wysiwigBody').attr('contenteditable', 'false').blur();
			item.find('.switch').addClass('hidden');
			item.find('.deleteBtn').addClass('hidden');
			item.find('.disclamer').addClass('hidden');
		}
	});
	doc.on('click','.saveBtn',function() {
		$(this).parents('.p-item').find('.editBtn').click();
	});
	doc.on('click','.uploadBtn',function() {
		$('input[name="program-photo"]').click();
	});
}); //  document ready
