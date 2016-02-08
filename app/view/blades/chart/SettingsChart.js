Ext.define('Arbela.view.blades.chart.SettingsChart',{
extend:'Ext.form.Panel',
  requires:[
    'Arbela.view.blades.chart.ChartController',
    'Ext.form.Panel',
    'Ext.button.Button',
    'Ext.form.FieldSet'
  ],
  controller: 'chartcontroller',
  xtype: 'settingschart',
  layout:'anchor',
  defaults: {anchor: '100%'},
    items:[{
        xtype:'fieldset',
        title: 'Chart Series',
        name : 'chartSeries',
        collapsible: true,
        hidden:true,
        defaults: {anchor: '100%'},
        items: [{
            xtype: 'button',
            text: 'Add Series',
            cls: 'add-blade-btn',
            icon: 'resources/images/add1.png',
            charttype : '',
            ui: 'plain',
            name : 'addSeries',
            margin: '0 0 5 0',
            listeners:{
                click:'onAddSeriesBtnClick'
            }
            
        }]
    },{
        xtype:'fieldset',
        title: 'X-Axis',
        hidden:true,
        layout:'anchor',
        defaults: {anchor: '100%'},
        collapsible: true,
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Type',
            forceSelection :true,
            store: Ext.create('Ext.data.Store', {
                fields: ['name','type'],
                data : [
                    {name:"Category",type:"category"},
                    {name:"Category3d",type:"category3d"},
                    {name:"Numeric",type:"numeric"},
                    {name:"Numeric3d",type:"numeric3d"},
                    {name:"Time",type:"time"},
                    {name:"Time3d",type:"time3d"}
                ]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            name:'xaxistype'
        },{
            xtype:"textfield",
            fieldLabel: "Title",
            name:'xaxistitle',
            emptyText: "Enter the title for X-Axis"
        },{
            xtype: 'textfield',
            fieldLabel: 'Field',
            name:'xaxisfield'
        },{
            xtype: 'checkbox',
            fieldLabel: 'Show Grid',
            name:'xaxisgrid'
        }]
    },{
        xtype:'fieldset',
        title: 'Y-Axis',
        collapsible: true,
        hidden:true,
        layout:'anchor',
        defaults: {anchor: '100%'},
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Type',
            forceSelection :true,
            store: Ext.create('Ext.data.Store', {
                fields: ['name','type'],
                data : [
                    {name:"Category",type:"category"},
                    {name:"Category3d",type:"category3d"},
                    {name:"Numeric",type:"numeric"},
                    {name:"Numeric3d",type:"numeric3d"},
                    {name:"Time",type:"time"},
                    {name:"Time3d",type:"time3d"}
                ]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            name:'yaxisType'
        },{
            xtype:"textfield",
            fieldLabel: "Title",
            name:'yaxistitle',
            emptyText: "Enter the title for Y-Axis"
        },{
            xtype: 'textfield',
            fieldLabel: 'Field',
            name:'yaxisfield'
        },{
            xtype: 'checkbox',
            fieldLabel: 'Show Grid',
            name:'yaxisgrid'
        }]
    },{
        xtype:'fieldset',
        title: 'Interactions',
        hidden:true,
        layout:'anchor',
        defaults: {anchor: '100%'},
        items: [{
            xtype: 'checkbox',
            reference : 'interactionscheck',
            fieldLabel: 'show Interactions',
            name : 'showinteractions',
            listeners : {
                change : function( field, newValue, oldValue, eOpts ) {
                    var fieldset = field.up('fieldset[title=Interactions]');
                    var settings = fieldset.up('fieldset[title=Settings]');
                    var value = settings.down('combobox[name=charttype]').value;
                    if(field.checked){
                        if(value == "Cartesian") {
                            fieldset.down('combobox[name=cartesianinteractions]').setHidden(false);
                        } else {
                            fieldset.down('combobox[name=polarinteractions]').setHidden(false);
                        }
                    } else {
                        fieldset.down('combobox[name=cartesianinteractions]').setHidden(true);
                        fieldset.down('combobox[name=polarinteractions]').setHidden(true);
                    }
                }
            }
        },{
            xtype: 'combobox',
            fieldLabel: 'Type',
            hidden: true,
            store: Ext.create('Ext.data.Store', {
            fields: ['name','type'],
            data : [
                {name:"Crosshair",type:"crosshair"},
                {name:"Crosszoom",type:"crosszoom"},
                {name:"Panzoom",type:"panzoom"}
            ]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            forceSelection :true,
            name : 'cartesianinteractions'
        },{
            xtype: 'combobox',
            fieldLabel: 'Type',
            hidden: true,
            store: Ext.create('Ext.data.Store', {
                fields: ['name','type'],
                data : [
                   //{name:"Item-Highlight",type:"itemhighlight"},
                    {name:"Rotate",type:"rotate"},
                    {name:"RotatePie3d",type:"rotatePie3d"}
                ]
            }),
            forceSelection :true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            name : 'polarinteractions'
        }]
    },{
        xtype:'fieldset',
        title: 'Legend',
        hidden:true,
        layout:'anchor',
        defaults: {anchor: '100%'},
        items : [{
            xtype: 'checkbox',
            fieldLabel: 'show Legend',
            reference : 'legendcheck',
            name : 'showlegend'
        },{
            xtype: 'combobox',
            fieldLabel: 'Legend Position',
            bind : {
                hidden : '{!legendcheck.checked}'
            },
            store: Ext.create('Ext.data.Store', {
            fields: ['name','type'],
            data : [
                {name:"Bottom",type:"bottom"},
                {name:"Top",type:"top"},
                {name:"Right",type:"right"},
                {name:"Left",type:"left"}
            ]
            }),
            forceSelection :true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            name : 'chartLegend'
        }]
    }]
});