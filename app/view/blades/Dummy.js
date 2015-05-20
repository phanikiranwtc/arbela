Ext.define('Arbela.view.blades.Dummy', {
    extend: 'Arbela.view.api.Blade',

    settings: [],

    statics: {
	    niceName: 'Dummy',
	    desc: 'This is a dummy blade'
	},

    config: {
        height: 80,
        xtype: 'component',
        html: 'Hello World!!'
    }
});