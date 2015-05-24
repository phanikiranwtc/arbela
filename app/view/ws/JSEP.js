Ext.define('Arbela.view.ws.JSEP', {
	extend: 'Ext.form.Panel',

	requires: ['Arbela.view.common.ExprParser'],

	xtype: 'jsep',

	items: [{
		xtype: 'textarea',
		fieldLabel: 'Expression',
		name: 'expr'
	}],

	datasources: {
		'Sales Order': {
			amt: 2343.45
		}
	},

	str: '',

	buttons: [{
		text: 'Evaluate',
		handler: function(btn) {
			var expr = btn.up('form').getValues().expr;
			console.log(expr);

			try {
				var obj = Arbela.view.common.ExprParser.parse(expr);
				console.log('STR: ' + obj);
			} catch (e) {
				console.log(e.message);
			}
		}
	}]
});