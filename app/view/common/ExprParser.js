Ext.define('Arbela.view.common.ExprParser', {
	extend: 'Ext.Base',

	singleton: true,

	datasources: null,
	updateCallback: Ext.emptyFn,

	parse: function(exprStr, datasources, updateCallback, clbkScope) {
		try {
			var parseTree = jsep(exprStr);
			console.log(parseTree);
		} catch (e) {
			console.log(e.message);
			return;
		}

		this.datasources = datasources;
		this.updateCallback = updateCallback;
		this.clbkScope = clbkScope;

		//let us parse the AST and calculate the value
		var str = this.processNode(parseTree);
		return str;
	},

	privates: {
		math: {
			'+': function(x, y) { return x + y},
			'-': function(x, y) { return x - y},
			'*': function(x, y) { return x * y},
			'/': function(x, y) { return x / y}
		},

		processNode: function(node) {
			var obj;
			console.log('Processing....' + node.type);

			obj = this['process' + node.type](node);

			return obj;
		},

		processBinaryExpression: function(node) {

			//this will have left and right nodes
			var left = node.left,
				right = node.right;

			var lObj = this.processNode(left);
			var rObj = this.processNode(right);

			return this.math[node.operator](lObj*1, rObj*1);

		},

		processLiteral: function(node) {
			return node.value;
		},

		processMemberExpression: function(node) {
			var obj = node.object, prop = node.property;

			var mObj = null;

			if (node.computed) {
				mObj = this.processComputedMemberExpression(node);
			}

			if (!node.computed) {

				if (obj.type === 'MemberExpression') {
					mObj = this.processMemberExpression(obj);
				}

				if (prop.type === 'Identifier') {
					mObj =  mObj[prop.name];	
				}

			}

			return mObj;
		},

		processComputedMemberExpression: function(node) {
			var obj = node.object, prop = node.property;

			var mObj = null;

			if (obj.type === 'Identifier') {
				// str += obj.name;	
				mObj = this[obj.name];
			}

			if (prop.type === 'Literal') {
				// mObj[prop.value].typeObj.on('dataupdated', this.updateCallback, this.clbkScope);
				if (this.updateCallback) {
					mObj[prop.value].typeObj.on('dataupdated', this.updateCallback, this.clbkScope);
				}

				// str += '[\'' + prop.value + '\']';
				mObj = mObj[prop.value].typeObj.getData();
			}
			

			return mObj;
		}
	}
});