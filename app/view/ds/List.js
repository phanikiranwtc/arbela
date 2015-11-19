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
    cls:'dslist',
    collapsed: false,
    collapsible: false,
    title: 'Data Sources',
    titleCollapse: false,
    header: false,
    // data: [],
    bind: {
        store: '{datasources}'
    },
    viewConfig: {
        markDirty: false
    },
    emptyText: 'No Datasource found. Click on Add to start adding datasources!',
    forceFit: true,

    rowLines: false,
    disableSelection: true,
    ui: 'list',

    columns: [{
        text: 'Name',
        dataIndex: 'name',
        menuDisabled: true,
        //sortable: false,
        resizable: false,
        flex: 1,
        renderer: function(value, metaData, record) {
            return '<a href="javascript:void(0);" class="editable-link"><xmp class="editable-link">' + value + '</xmp></a>';
        }        
    }, {
        text: 'Last Updated',
        dataIndex: 'updatedOn',
        menuDisabled: true,
        //sortable: false,
        resizable: false,
        width: 120
    }, {
        xtype: 'actioncolumn',
        width: 20,
        menuDisabled: true,
        sortable: false,
        resizable: false,
        items: [{
            icon: 'resources/images/sync.png',
            tooltip: 'Refresh',
            handler: 'onRefreshDatasource'
        }]
    }, {
        xtype: 'actioncolumn',
        width: 20,
        menuDisabled: true,
        sortable: false,
        resizable: false,
        items: [{
            icon: 'resources/images/delete.png',
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
                    ui: 'plain',
                    icon: 'resources/images/add-16.png',
                    text: 'Add Datasource',
                    tooltip: 'Add Datasource',
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