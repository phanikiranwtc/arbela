Ext.define('Arbela.view.ws.JSEP', {
	extend: 'Ext.form.Panel',

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
				var parseTree = jsep(expr);
				console.log(parseTree);
			} catch (e) {
				console.log(e.message);
			}

			//let us parse the AST and calculate the value
			var str = btn.up('form').processNode(parseTree);
			console.log('STR: ' + str);
		}
	}],

	processNode: function(node) {
		var obj;
		var str = '';
		console.log('Processing....' + node.type);

		str = this['process' + node.type](node);

		return str;
	},

	processBinaryExpression: function(node) {

		//this will have left and right nodes
		var left = node.left,
			right = node.right;

		var lStr = this.processNode(left);
		var rStr = this.processNode(right);

		return lStr + node.operator + rStr;

	},

	processLiteral: function(node) {
		return node.value;
	},

	processMemberExpression: function(node) {
		var obj = node.object, prop = node.property;

		var str = '';

		if (node.computed) {
			str += this.processComputedMemberExpression(node);
		}

		if (!node.computed) {

			if (obj.type === 'MemberExpression') {
				str += this.processMemberExpression(obj);
			}

			if (prop.type === 'Identifier') {
				str += '.' + prop.name;	
			}

		}

		return str;
	},

	processComputedMemberExpression: function(node) {
		var obj = node.object, prop = node.property;

		var str = '';

		if (obj.type === 'Identifier') {
			str += obj.name;	
		}

		if (prop.type === 'Literal') {
			str += '[\'' + prop.value + '\']';
		}
		

		return str;
	}
});