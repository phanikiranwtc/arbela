Ext.define('Arbela.view.blades.BooksList', {
    requires: [

        'Ext.view.View',
        'Ext.XTemplate',
        'Ext.scroll.Scroller'
    ],
    extend: 'Arbela.view.api.Blade',

    statics: {
        niceName: 'Books List',
        desc: 'Shows the list of books based on the specified URL'
    },

    settings: [{
        xtype: 'textfield',
        fieldLabel: 'URL',
        name: 'url',
        allowBlank:false
    }],

    config: {
        height: 350,
        xtype: 'container',
        scrollable: true,
        bodyPadding: 5,
        items: {
            xtype: 'dataview',
            bodyPadding: 5,
           itemTpl: [
            '<div class="thumb-wrap">',
            '<img src="{imgurl}" height="80">',
            '<div class="detail">',
            '<span class="title">{title}</span></br>',
            '<span class="desc">{desc}</span><a class="readmore" href="{readmore}" target="_blank">Read more...</a></div>',
            '</div>'
           ],
            store: {
                storeId: 'books',
                autoLoad: false,
                fields: ['id', 'title', 'imgurl', 'desc'],
                proxy: {
                    type: 'ajax',
                    url: '', //'resources/data/senchabooks.json',
                    reader: {
                        rootProperty: 'books'
                    }
                }
            },
            itemSelector: 'div.thumb-wrap'
        }
    },
    setBladeData: function(dataCfg) {
        this.down('dataview').getStore().getProxy().setUrl(dataCfg.url);
        this.down('dataview').getStore().load();
    }
});