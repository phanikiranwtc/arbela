Ext.define('Arbela.view.ds.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dslist',

    requires: [
        'Arbela.view.ds.ListViewModel',
        'Arbela.view.ds.ListViewController',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    controller: 'dslist',
    viewModel: {
        type: 'dslist'
    },
    width: 350,
    collapsed: false,
    collapsible: false,
    title: 'Data Sources',
    titleCollapse: false,
    // data: [],
    bind: {
        store: '{datasources}'
    },
    emptyText: 'No Datasource found. Click on Add to start adding datasources!',
    forceFit: true,

    columns: [{
        text: 'Name',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, metaData, record) {
            return '<a href="" class="editable-link">' + value + '</a>';
        }        
    }, {
        text: 'Last Updated',
        dataIndex: 'updatedOn',
        width: 100
    }, {
        xtype: 'actioncolumn',
        width: 20,
        items: [{
            icon: 'https://cdn3.iconfinder.com/data/icons/faticons/32/sync-01-32.png',
            tooltip: 'Refresh',
            handler: 'onRefreshDatasource'
        }]
    }, {
        xtype: 'actioncolumn',
        width: 20,
        items: [{
            icon: 'https://cdn4.iconfinder.com/data/icons/linecon/512/delete-32.png',
            tooltip: 'Remove',
            handler: 'onRemoveDatasource'
        }]
    }],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    listeners: {
                        click: 'onAddBtnClick'
                    }
                }
            ]
        }
    ],

    listeners: {
        cellclick: 'onEdtiableCellClick'  
    }

});