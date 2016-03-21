Ext.define('Arbela.view.common.TitleStyling', {
    extend:'Ext.form.field.Picker',
    alias: 'widget.titlestyling',
    xtype:'titlestyling',
    requires: ['Ext.form.field.Date','Ext.picker.Time', 'Ext.view.BoundListKeyNav', 'Ext.Date','Ext.ux.colorpick.Field'],

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
     * @method
     * Creates and returns the component to be used as this field's picker. Must be implemented by subclasses of Picker.
     */
    createPicker: function() {
        var me = this,
            picker = new Ext.form.Panel({
                pickerField: me,
                floating: true,
                hidden: true,
                layout:'anchor',
                defaults: {anchor: '100%',padding:5,labelSeparator:':'},
                ownerCt: this.ownerCt,
                pickerData:'',
                items:[{
                    xtype:'colorfield',
                    fieldLabel:'Title color',
                    name:'color',
                    reference:'color'
                },{
                    xtype:'colorfield',
                    fieldLabel:'Background color',
                    name:'background-color',
                    reference:'bgcolor'
                },{
                    xtype:'numberfield',
                    fieldLabel:'Title height',
                    name:'height',
                    minValue:0,
                    reference:'height'
                },{
                    xtype:'numberfield',
                    fieldLabel:'Font size',
                    name:'font-size',
                    minValue:0,
                    reference:'fontsize'
                },{
                    xtype:'combo',
                    fieldLabel:'Font family',
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
                        handler:'onSavePickerDataBtnClick'
                    },{
                        xtype: 'button',
                        name: 'cancel',
                        text: 'Cancel',
                        width: 60,
                        handler:'onCancelPickerBtnClick'
                    }],

                }]
            });
            this.forEditingCardPickerDataSetting();
        return picker;
    },
    forEditingCardPickerDataSetting:function(){
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
                Ext.ComponentQuery.query('[name=color]')[0].setValue(value);
            }else if(key== 'background-color'){
                value.substr(1)
                Ext.ComponentQuery.query('[name=background-color]')[0].setValue(value);
            }else if(key== 'font-size'){
                Ext.ComponentQuery.query('[name=font-size]')[0].setValue(value);
            }
            else if(key== 'height'){
                Ext.ComponentQuery.query('[name=height]')[0].setValue(value);
            }else if(key == 'font-family'){
                Ext.ComponentQuery.query('[name=font-family]')[0].setValue(value);
            }else{
                console.log('Data unavailable');
            }
        });
    }
});