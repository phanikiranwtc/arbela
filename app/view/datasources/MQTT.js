Ext.define('Arbela.view.datasources.MQTT', {
    extend: 'Arbela.view.api.DataSource',

    statics: {
        niceName: 'PubSub (MQTT)',
        desc: 'Connect using MQTT'
    },

    settings: [{
        xtype: 'textfield',
        fieldLabel: 'MQTT Broker Host',
        name: 'brokerhost'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Port',
        name: 'port',
        value: 1883
    }, {
        xtype: 'textfield',
        fieldLabel: 'Client ID',
        name: 'clientid'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Topic',
        name: 'topic'
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Data refresh frequency',
        name: 'refreshfrequency',
        value: 5  //in seconds
    }],

    loadData: function() {
        var me = this;

        var params = me.getParams();
        var host = params.brokerhost;
        var port = params.port;
        var clientid = params.clientid;
        var topic = params.topic;

        Arbela.protocols.MQTT.connect(host, port, clientid, topic, function(data) {
            me.setData(data);
        });

        return me.data;
    }
});