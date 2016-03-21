Ext.define('Arbela.view.common.TitleStyling', {
    extend:'Ext.form.field.Picker',
    alias: 'widget.titlestyling',
    xtype:'titlestyling',
    requires: ['Ext.form.field.Date', 'Ext.picker.Time', 'Ext.view.BoundListKeyNav', 'Ext.Date','Ext.ux.colorpick.Field'],
   

    /**
     * @cfg {String} [triggerCls='x-form-time-trigger']
     * An additional CSS class used to style the trigger button. The trigger will always get the {@link #triggerBaseCls}
     * by default and triggerCls will be **appended** if specified.
     */
    triggerCls: Ext.baseCSSPrefix + 'form-time-trigger',
    fieldLabel: 'Title Style',
    name: 'titleStyle',
    pickerData: '',
    /**
     * @private
     * Creates the {@link Ext.picker.Time}
     */
    createPicker: function() {
        var me = this,
            picker = new Ext.form.Panel({
                pickerField: me,
                floating: true,
                hidden: true,
                layout:'anchor',
                defaults: {anchor: '100%',padding:5},
                ownerCt: this.ownerCt,
                renderTo: document.body,
                pickerData:'',
                items:[{
                    xtype:'colorfield',
                    fieldLabel:'Title color:',
                    name:'color',
                    reference:'color'
                },{
                    xtype:'colorfield',
                    fieldLabel:'Background color :',
                    name:'background-color',
                    reference:'bgcolor'
                },{
                    xtype:'numberfield',
                    fieldLabel:'Title height :',
                    name:'height',
                    minValue:0,
                    reference:'height'
                },{
                    xtype:'numberfield',
                    fieldLabel:'Font size :',
                    name:'font-size',
                    minValue:0,
                    reference:'fontsize'
                },{
                    //xtype:'textfield',
                    xtype:'combo',
                    fieldLabel:'Font family :',
                    name:'font-family',
                    reference:'fontfamily',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'font',
                    forceSelection:true,
                    store:Ext.create('Ext.data.Store', {
                        fields: ['font', 'name'],
                        data : [
                            {"font":"sans-serif", "name":"Sans-Serif"},
                            {"font":"serif", "name":"Serif"},
                            {"font":"monospace", "name":"Monospace"}, 
                            {"font":"cursive", "name":"Cursive"},
                            {"font":"fantasy", "name":"Fantasy"}
                            //...
                        ]
                    })
                },{
                    xtype:'toolbar',
                    layout:{
                        type:'hbox',
                        pack:'center'
                    },
                    items:[{
                        xtype: 'button',
                        name: 'save',
                        text: 'Save',
                        ui: 'primary',
                        width: 60,
                       // formBind: true,
                       handler:function(btn){
                            var pickervalues = btn.up('form').getValues();
                            btn.up('form').pickerData = pickervalues;
                            var pickerString = '',
                            keyArr=[];

                            /***** setting form data to picker field as string ****/

                            Ext.Object.each(pickervalues, function(key, value, object) {
                                if(key== 'color' || key== 'background-color' && Ext.isDefined(value)){ 
                                    value = "#"+ value;
                                }
                                if(key== 'height' || key== 'font-size' && Ext.isDefined(value)){ 
                                    value = value+"px";
                                }
                                keyArr.push(key+":" + value +";");
                            });
                            for(var i=0;i<=keyArr.length-1;i++){pickerString+=keyArr[i]}
                            var titlestyleclass = Ext.ComponentQuery.query('[name=titleStyle]')[0];
                            titlestyleclass.setValue(pickerString);
                            titlestyleclass.pickerData = pickervalues;
                            btn.up('form').hide();
                       }
                    },{
                        xtype: 'button',
                        name: 'cancel',
                        text: 'Cancel',
                        width: 60,
                        handler:function(btn){
                            btn.up('form').hide();
                        }
                    }],

                }]
            });
            /**** setting data to style picker when user going to edit card ****/

            var fieldData = this.getValue();
            var key, value, temp;
            var fieldobject = {}, t;
            temp = fieldData.substr(0, fieldData.length - 1).split(';');
            for(var i = 0, len = temp.length; i < len; i = i + 1) {
                t = temp[i].split(':');
                fieldobject[t[0]] = t[1];
            }
            Ext.Object.each(fieldobject, function(key, value, object) {
                if(key== 'color'){
                    value.substr(1)
                    //picker.lookupReference('color').setValue(value);
                    Ext.ComponentQuery.query('[name=color]')[0].setValue(value);
                }else if(key== 'background-color'){
                    value.substr(1)
                    Ext.ComponentQuery.query('[name=background-color]')[0].setValue(value);
                    //picker.lookupReference('bgcolor').setValue(value);
                }else if(key== 'font-size'){
                    Ext.ComponentQuery.query('[name=font-size]')[0].setValue(value);
                    //picker.lookupReference('fontsize').setValue(value);
                }
                else if(key== 'height'){
                    Ext.ComponentQuery.query('[name=height]')[0].setValue(value);
                    //picker.lookupReference('height').setValue(value);
                }else if(key == 'font-family'){
                    Ext.ComponentQuery.query('[name=font-family]')[0].setValue(value);
                    //picker.lookupReference('fontfamily').setValue(value);
                }else{
                    console.log('Data unavailable');
                }
            });

            /********************end*******************************/
        return picker;
    }
});