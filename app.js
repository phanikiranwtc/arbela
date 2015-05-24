// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({

    requires: [
        'Arbela.view.datasources.Dummy',
        'Arbela.view.datasources.Sales',
        'Arbela.view.common.CalculatedField',
        'Arbela.view.common.ExpressionField'
    ],
    views: [
        'MyViewport',
        'db.tb.Toolbar',
        'ws.Toolbar',
        'ws.Workspace',
        'db.main.Dashboard',
        'ds.List',
        'ds.new.NewWindow',
        'common.WindowToolbar',
        'db.card.NewCard',
        'api.Card',
        'blades.Dummy',
        'blades.TotalSales',
        'blades.WebsiteTraffics',
        'blades.SupportTickets',
        'blades.BooksList',
        'blades.InventoryChart'
    ],
    name: 'Arbela',

    launch: function() {
        Ext.create('Arbela.view.MyViewport');
    }

});
