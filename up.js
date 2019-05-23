var Up = {
  body: '',
  template: $('<div class="popup"><div class="navbar"><div class="title"></div><div class="min"></div><div class="close-popup"></div></div><div class="page-content"></div></div>'),
  tabTemplate: $('<div class="popup-tab-bar"><div class="tab"></div></div>'),

  /*
   options = {
    size: string (small/medium/large/content-driven),
    title: string (title of popup),
    multiTab: Bool (true/false),
    dragable: Bool (true/false),
    overlay: Bool (true/false)
  }
  */

  open: function( content, options, callBack ) {
    Up.body = $(document.body);
    Up.body.find('#up-popups').length || Up.body.append('<div id="up-popups"></div>');
    var popup = Up.template.clone().appendTo( Up.body.find('#up-popups') );
    options.size && popup.addClass( options.size );
    Up.initEvents( popup, options );
    Up.createTab( popup );
    Up.addOverlay( options );
    Up.multiTab( popup, options );
    Up.processContent( popup, content );
    options.title && Up.setTitle( popup, options.title );
    Up.updateActiveWindow( popup );
    callBack && callBack( popup );
    return popup;
  },

  processContent: function( popup, content ){
    var temp = $('<div>').append(content);
    Up.setTitle(  popup, temp.find('.header').text() );
    temp.find('.header').remove();
    if( temp.find('.footer').length ){
      popup.addClass('has-footer');
      popup.append( temp.find('.footer') );
    }
    popup.find('.page-content').append( temp );
  },

  addOverlay: function( options ){
    if( options.overlay && Up.body.find('#up-overlay').length < 1 ){
      $('<div id="up-overlay"></div>').appendTo( Up.body ).on('click', function(){
        Up.closeAll();
      });
    }
  },

  multiTab: function( popup, options ){
    if( !options.multiTab ){
      Up.body.find('#up-popup-nav').addClass('hidden');
      popup.find('.min').addClass('hidden');
    }
    else{
      Up.body.find('#up-popup-nav').removeClass('hidden');
      popup.find('.min').removeClass('hidden');
    }
  },

  setTitle: function(popup, title) {
    popup.find('.title').text(title);
    popup.data('tabIndex').text(title);
  },

  createTab: function(popup) {
    if (!Up.tabBar) {
      Up.body.find('#up-popup-nav').length || Up.body.append('<div id="up-popup-nav"></div>');
      Up.tabBar = Up.tabTemplate.clone().appendTo(Up.body.find('#up-popup-nav'));
      Up.tabBar.find('.tab').remove();
    }
    var tab = Up.tabTemplate.find('.tab').first().clone().appendTo(Up.tabBar);
    popup.data('tabIndex', tab);
    tab.on('click', function() {
      Up.openWindow(popup);
    });
  },

  openWindow: function(popup) {
    var activePopup = Up.body.find('#up-popups').find('.popup.active');
    if (activePopup.get(0) !== popup.get(0)) {
      activePopup.removeClass('active');
      popup.removeClass('removeing hidden').addClass('active');
    }
    activePopup = Up.body.find('#up-popups').find('.popup.active').detach();
    Up.body.find('#up-popups').append(activePopup);
  },

  close: function(popup) {
    popup.data('tabIndex').remove();
    popup.siblings().length < 1 && Up.body.find('#up-overlay').remove();
    popup.addClass('removeing');
    setTimeout(function() {
      popup.remove();
    }, 300);
  },

  closeAll: function(){
    var popupContainer = Up.body.find('#up-popups');//THIS IS WHERE I LEFT OFF
    var activePopup = popupContainer.find('.popup.active');
    popupContainer.find('.popup:not(.active)').remove();
    Up.body.find('#up-overlay').remove();
    Up.body.find('#up-popup-nav .popup-tab-bar').empty();
    activePopup.addClass('removeing');
    setTimeout(function() {
      activePopup.remove();
    }, 300);
  },

  updateActiveWindow: function(popup) {
    var activePopup = Up.body.find('#up-popups').find('.popup.active');
    if (activePopup.get(0) !== popup.get(0)) {
      activePopup.removeClass('active');
      popup.addClass('active');
    }
  },

  min: function(popup) {
    popup.addClass('removeing');
    setTimeout(function() {
      popup.addClass('hidden').removeClass('active');
    }, 300);
  },

  initEvents: function(popup, options) {
    var $elem;
    if( options.dragable ){
      var pressed = false;
      var xoffset = 0;
      var yoffset = 0;
      var x, y;
      var startPointx = 0;
      var startPointy = 0;
      popup.find('.navbar .title').on('mousedown', function(e) {
        e.stopPropagation();
        e.preventDefault();
        Up.updateActiveWindow(popup);
        $elem = $(this).closest('.popup');
        pressed = true;
        xoffset = e.pageX;
        yoffset = e.pageY;
        $elem.removeClass('leftJustify').removeClass('rightJustify');
        Up.body.addClass('no-select');
        Up.body.on('mousemove', function(j) {
          if (pressed) {
            x = (j.pageX - xoffset + startPointx);
            y = (j.pageY - yoffset + startPointy);
            $elem.css('transform', 'translate3d( ' + x + 'px, ' + y + 'px,0 )');
          }
        });
        Up.body.one('mouseup', function() {
          Up.body.off('mousemove');
          startPointx = x;
          startPointy = y;
          pressed = false;
          Up.body.removeClass('no-select');
          if ($elem.offset().left < 0) {
            $elem.removeClass('rightJustify').addClass('leftJustify');
            startPointx = 0;
            startPointy = 0;
          } else if ($elem.offset().left > $(this).width() - $elem.width()) {
            $elem.removeClass('leftJustify').addClass('rightJustify');
            startPoinx = $(this).width() - $elem.width();
            startPointy = 0;
          }
        });
      });
    }
    popup.find('.close-popup').one('click', function(e) {
      Up.close(popup);
      e.stopPropagation();
      e.preventDefault();
    });
    popup.on('click', function() {
      if( options.multiTab )
        Up.updateActiveWindow(popup);
    });
    popup.find('.min').on('click', function(e) {
      Up.min(popup);
      e.stopPropagation();
      e.preventDefault();
    });
  }

};
