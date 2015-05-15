Ext.define('Arbela.view.api.Card', {
    requires: [
        'Ext.Component'
    ],
    extend: 'Ext.dashboard.Part',
    alias: 'part.card',

    viewModel: {
        data: {
            title: 'New Card'
        }
    },

    title: '{title}',

    viewTemplate: {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        title: '{title}',
        items: [],
        tools: [{
            type: 'gear',
            tooltip: 'Change Settings'
        }]
    }
});