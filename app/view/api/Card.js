Ext.define('Arbela.view.api.Card', {
    requires: [
        'Ext.Component'
    ],
    extend: 'Ext.dashboard.Part',
    alias: 'part.card',

    viewTemplate: {
        // header: false,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [],
        tools: [{
            type: 'gear',
            tooltip: 'Change Settings'
        }]
    }
});