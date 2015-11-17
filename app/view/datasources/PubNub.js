Ext.define('Arbela.view.datasources.PubNub', {
    extend: 'Arbela.view.api.DataSource',

    requires: ['Arbela.protocols.PubNub'],

    statics: {
        niceName: 'PubNub',
        desc: 'Connect using <a href="http://www.pubnub.com/">PubNub</a>'
    },

    settings: [{
        xtype: 'textfield',
        fieldLabel: 'Publish Key',
        name: 'pubkey'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Subscribe Key',
        name: 'subkey'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Channel',
        name: 'channel'
    }],

    loadData: function() {
        var me = this;

        var params = me.getParams();
        var pubKey = params.pubkey;
        var subKey = params.subkey;
        var channel = params.channel;

        Arbela.protocols.PubNub.init(pubKey, subKey);

        Arbela.protocols.PubNub.subscribe(channel, function(data) {
            me.setData(data);
        });

        return me.data;
    }
});