Ext.define('Arbela.view.blades.chart.SeriesSet', {
	extend : 'Ext.form.FieldSet',
	xtype: 'seriesset',
	cartesianFlag : null,
	polarFlag : null,
	seriesIndex:0,
	layout:'anchor',
	border:false,
    defaults: {anchor: '100%'},
    
	initComponent: function(config){
		var me = this;
		var needle = me.needlecolor;
		var sector = me.sectorscolor;
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
			forceSelection :true,
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
			forceSelection :true,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'type',
			name:'polartype'+appseries,
			hidden: me.polarFlag,
			
			listeners: {
				change: function(combo, newValue, oldValue, eOpts){ 

					var itemsLen = this.up().up().items.length-1;
					for(var i=0;i<=itemsLen-1;i++){
						var polarType = this.up().up().items.items[0].items.items[1].getValue();
						if(newValue == 'gauge' && polarType !='gauge'){
							Ext.Msg.show({
		                        title: 'Selection Failed',
		                        message: 'Error: cannot load gauge with other series',
		                        buttons: Ext.Msg.OK,
		                        icon: Ext.Msg.ERROR
		                    });
							combo.setValue(null);
						}
						if(polarType == "pie3d" || polarType == 'gauge' || newValue == 'pie3d' || newValue =='gauge'){
							this.up().up().up('fieldset').down('fieldset[title=Legend]').setHidden(true);
						}
						else{
							this.up().up().up('fieldset').down('fieldset[title=Legend]').setHidden(false);
						}
						
						if(polarType == "gauge" || newValue == "gauge"){
							this.up().items.getAt(7).setHidden(true);
							this.up().up().up('fieldset').down('fieldset[title=X-Axis]').setHidden(false);
							this.up().up().up('fieldset').down('fieldset[title=X-Axis]').items.getAt(2).setHidden(true);
							this.up().up().up('fieldset').down('fieldset[title=X-Axis]').items.getAt(3).setHidden(true);
							this.up().items.getAt(5).setHidden(false);
							this.up().items.getAt(6).setHidden(false);
							
						}else{
							this.up().items.getAt(7).setHidden(false);
							this.up().down('textfield[fieldLabel =Style]').setHidden(false);
							this.up().up().up('fieldset').down('fieldset[title=X-Axis]').setHidden(true);
							this.up().up().up('fieldset').down('fieldset[title=X-Axis]').items.getAt(2).setHidden(false);
							this.up().up().up('fieldset').down('fieldset[title=X-Axis]').items.getAt(3).setHidden(false);
							this.up().items.getAt(5).setHidden(true);
							this.up().items.getAt(6).setHidden(true);
						}
						if(polarType == "radar" || newValue == "radar"){
							this.up().up().up('fieldset').down('fieldset[title=X-Axis]').setHidden(false);
							this.up().up().up('fieldset').down('fieldset[title=Y-Axis]').setHidden(false);
							this.up().items.getAt(3).setHidden(false);
							this.up().items.getAt(4).setHidden(true);
							//this.up().up().up('fieldset').down('fieldset[title=Legend]').setHidden(false);
						}else{
							this.up().up().up('fieldset').down('fieldset[title=Y-Axis]').setHidden(true);
							//this.up().up().up('fieldset').down('fieldset[title=Legend]').setHidden(true);
						}
						if((newValue == 'pie')||(newValue == 'pie3d')||(newValue == 'gauge')){
							this.up().items.getAt(8).setHidden(true);
							this.up().items.getAt(4).setHidden(false);
							this.up().items.getAt(3).setHidden(true);
						}else{
							this.up().items.getAt(8).setHidden(false);
							this.up().items.getAt(4).setHidden(true);
							this.up().items.getAt(3).setHidden(false);
						}
						if(polarType == "pie" || newValue == "pie" || newValue == "radar"){
							this.up().up().up('fieldset').down('fieldset[title=Legend]').setHidden(false);
						}else{
							this.up().up().up('fieldset').down('fieldset[title=Legend]').setHidden(true);
						}
					}
					if(newValue == 'pie3d' || newValue == 'gauge'){

						this.up().items.getAt(7).setHidden(true);
					}else{
						this.up().items.getAt(7).setHidden(false);
					}
					if (newValue == 'pie') {

						this.up().items.getAt(4).setHidden(false)
					}else{
						this.up().items.getAt(4).setHidden(true)
					}
				}
			}
		},{
			xtype: 'textfield',
			fieldLabel: 'xField',
			name:'xfield'+appseries
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
			xtype:'textfield',
			fieldLabel: 'Needle color',
			name:'needlecolor'+appseries,
			hidden: me.polarFlag
		},{
		 	xtype:'textfield',
			fieldLabel: 'Sectors color',
		 	name:'sectorscolor'+appseries,
		 	hidden: me.polarFlag
		},{
			xtype: 'textareafield',
			fieldLabel: 'Style',
			emptyText :'fill:#388FAD;fillOpacity:0.1;stroke:#388FAD;strokeOpacity:0.8;lineWidth:1',
			name:'style'+appseries
		},{
			xtype: 'checkbox',
			fieldLabel: 'Show Marker',
			name:'marker'+appseries
		},{		
			xtype: 'button',		
            text: 'Delete Series',		
            cls: 'add-blade-btn',		
            icon: 'resources/images/delete-16.svg',		
            charttype : '',		
            ui: 'plain',		
            name : 'deleteSeries',		
            margin: '0 0 5 0',		
            disabled: true,		
            handler: function(){	
            	var currFieldset = this.up('fieldset'),		
            		parentFieldset = currFieldset.up();	
				this.up('bladeform').seriesIndex = parentFieldset.items.length - 3;	
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



