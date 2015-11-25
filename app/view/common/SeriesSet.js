Ext.define('Arbela.view.common.SeriesSet', {
	extend : 'Ext.form.FieldSet',
	xtype: 'seriesset',
	cartesianFlag : null,
	polarFlag : null,
	seriesIndex:0,
	initComponent: function(config){
		var me = this;
		var appseries = me.seriesIndex;
		me.items = [{
			xtype: 'combo',
			fieldLabel: 'Type',
			store:Ext.create('Ext.data.Store', {
			fields: ['name','type'],
			data : [
			{name:"Bar",type:"bar"},
			{name:"Bar3D",type:"bar3d"},
			{name:"Scatter",type:"scatter"},
			{name:"Area",type:"area"},
			{name:"Line",type:"line"}
			]
			}),
			queryMode: 'local',
			displayField: 'name',
			valueField: 'type',
			name:'cartesiantype'+appseries,
			hidden: me.cartesianFlag
		},{
			xtype: 'combo',
			fieldLabel: 'Type',
			store:Ext.create('Ext.data.Store', {
			fields: ['name','type'],
			data : [
			{name:"Pie",type:"pie"},
			{name:"Pie3D",type:"pie3d"},
			{name:"Gauge",type:"gauge"},
			{name:"Radar", type:"radar"}
			]
			}),
			queryMode: 'local',
			displayField: 'name',
			valueField: 'type',
			name:'polartype'+appseries,
			hidden: me.polarFlag,
			listeners: {
				change: function(combo, newValue, oldValue, eOpts){ 
					if(newValue == 'gauge'){
					this.up().items.getAt(4).setHidden(true);
					this.up().items.getAt(3).setHidden(true);
					}else{
					this.up().items.getAt(4).setHidden(false);
					this.up().items.getAt(3).setHidden(true);
					}
					if(newValue=='radar'){
					this.up().up().up('fieldset').down('fieldset[title=X-Axis]').setHidden(false);
					this.up().up().up('fieldset').down('fieldset[title=Y-Axis]').setHidden(false);
					this.up().items.getAt(3).setHidden(false);
					this.up().items.getAt(4).setHidden(true);
					}else{
					this.up().up().up('fieldset').down('fieldset[title=X-Axis]').setHidden(true);
					this.up().up().up('fieldset').down('fieldset[title=Y-Axis]').setHidden(true);
					}
				}
			},
		},{
			xtype: 'textfield',
			fieldLabel: 'xField',
			name:'xfield'+appseries,
		},{
			xtype: 'textfield',
			fieldLabel: 'yField',
			name:'yfield'+appseries,
			hidden: me.cartesianFlag
		},{
			xtype: 'textfield',
			fieldLabel: 'Field Label',
			name:'fieldlabel'+appseries,
			hidden: me.polarFlag
		},{
			xtype: 'textfield',
			fieldLabel: 'Legend Title',
			name:'legendtitle'+appseries
		},{
			xtype: 'textfield',
			fieldLabel: 'Style',
			name:'style'+appseries
		},{
			xtype: 'checkbox',
			fieldLabel: 'Show Marker',
			name:'marker'+appseries
		},{		
			xtype: 'button',		
            text: 'Delete Series',		
            cls: 'add-blade-btn',		
            icon: 'resources/images/delete-16.png',		
            charttype : '',		
            ui: 'plain',		
            name : 'deleteSeries',		
            margin: '0 0 5 0',		
            disabled: true,		
            handler: function(){		
            	// 		
            	var currFieldset = this.up('fieldset'),		
            		parentFieldset = currFieldset.up();		
            	parentFieldset.remove(currFieldset);		
            	var parentFieldsetLen = parentFieldset.items.length;		
            	if(parentFieldsetLen == 2){		
            		parentFieldset.down('fieldset').down('button[text="Delete Series"]').disable();		
            	}	
            }	
        }],
		me.callParent(arguments);
	}
});



