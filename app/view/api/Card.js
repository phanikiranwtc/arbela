Ext.define('Arbela.view.api.Card', {
    requires: [
        'Ext.Component'
    ],
    extend: 'Ext.dashboard.Part',
    alias: 'part.card',

    viewTemplate: {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
	cls : 'arbelaCard',
        items: [],
        tools: [{
            type: 'gear',
            tooltip: 'Change Settings',
            callback: 'handleChageSettings'
        }],
        listeners : {
            addmouseevents : function(card) {
                card.getEl().on('mouseover',this.onMouseOver,card);
                card.getEl().on('mouseout', this.onMouseOut,card);
            },
	    beforecollapse : function(card){
                var header = card.getHeader();
                card.getEl().suspendEvent( 'mouseover');
                card.getEl().suspendEvent( 'mouseout');
		if(!card.formvalues.showTitle || !card.formvalues.titleStyle){
			card.removeCls('arbelaCard');
		}
            },
            beforeexpand : function(card){
                var header = card.getHeader();
                card.getEl().resumeEvent( 'mouseover');
                card.getEl().resumeEvent( 'mouseout');
		card.addCls('arbelaCard');
                card.applyTitleStyles(card, card.formvalues);
            }
        },
	    onMouseOver : function() {
    		var header = this.getHeader();
    		var tools = header.getTools();
    		for(var i=0; i<tools.length; i++){
    			tools[i].show();
    		}
    	},
        onMouseOut : function() {
    		var header = this.getHeader();
    		var tools = header.getTools();
    		for(var i=0; i<tools.length; i++){
    			tools[i].hide();
    		}
    	},
        applyTitleStyles : function(card, values) {
        if(values.hideTitleBar || values.showTitle) {
            var header = card.getHeader();
            var titleStyle = values.titleStyle;
            Ext.util.CSS.removeStyleSheet('card'+header.getId());
            var stylesheeet = Ext.util.CSS.createStyleSheet('', 'card'+header.getId());
	    if(values.showTitle && titleStyle){
		changedStyles = titleStyle;
	    } else {
		changedStyles = '';
	    }
            Ext.util.CSS.createRule(stylesheeet, '#'+header.getId()+'-innerCt', changedStyles);
            if(header.down('title')){
                Ext.util.CSS.createRule(stylesheeet, '#'+header.down('title').getId()+'-textEl', changedStyles);
            }
            var tools = header.getTools();
            if(values.hideTitleBar) {
                for(var i = 0; i < tools.length; i++) {
                    tools[i].hide();
                }
                card.fireEvent('addmouseevents', card);
            } else {
                for(var i = 0; i < tools.length; i++) {
                    tools[i].show();
                }
                card.el.un('mouseover',card.onMouseOver,card);
                card.el.un('mouseout',card.onMouseOut,card);
            }
            
            
        } else {
            var header = card.getHeader();
            Ext.util.CSS.removeStyleSheet('card'+header.getId());
            card.el.un('mouseover',card.onMouseOver,card);
            card.el.un('mouseout',card.onMouseOut,card);
	    var tools = header.getTools();
	    for(var i=0; i<tools.length; i++) {
		tools[i].show();
	    }
        }
	card.updateLayout();
    }
    }
});
