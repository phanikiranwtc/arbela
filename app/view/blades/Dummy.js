Ext.define('Arbela.view.blades.Dummy', {
    extend: 'Arbela.view.api.Blade',

    settings: [{
        xtype: 'expressionfield',
        fieldLabel: 'Expression',
        name: 'value1'
    }],

    statics: {
	    niceName: 'Dummy',
	    desc: 'This is a dummy blade'
	},

    config: {
        height: 80,
        xtype: 'component',
        bind: {
            html: 'Hello {value1}!'
        }
    }
});