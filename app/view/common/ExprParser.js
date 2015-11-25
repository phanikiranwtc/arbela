Ext.define('Arbela.view.common.ExprParser', {
	extend: 'Ext.Base',

	singleton: true,

	datasources: null,
	updateCallback: Ext.emptyFn,

	parse: function(exprStr, datasources,datavalue,updateCallback, clbkScope) {  
		if(datavalue){ 
			if(exprStr){
				var exp ="datasources["+"'"+datavalue+"'"+"]."+exprStr;  	
			}
			else{
				var exp ="datasources["+"'"+datavalue+"'"+"]";
			}
		}else{  
			var exp = exprStr;  
		} 
		try { 
			var parseTree = jsep(exp);
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

		processNode: function(node) {// 
			var obj;
			console.log('Processing....' + node.type);

			obj = this['process' + node.type](node);

			return obj;
		},

		processBinaryExpression: function(node) {// 

			//this will have left and right nodes
			var left = node.left,
				right = node.right;

			var lObj = this.processNode(left);
			var rObj = this.processNode(right);

			return this.math[node.operator](lObj*1, rObj*1);

		},

		processLiteral: function(node) {// 
			return node.value;
		},
		processIdentifier: function(node){// 
			return node.name;
		},
		processUnaryExpression: function(node){// 
			return node.value;
		},
		processCompound: function(node){// 

			var nodeLength = node.body.length;
			var identifier = [];
			var literal = [];

			for(var i=0;i<=nodeLength-1;i++){
				if(node.body[i].type == "Identifier"){
					identifier.push(node.body[i].name);
				}else if(node.body[i].type == "Literal"){
					literal.push(node.body[i].value)
				}
			}

			if(identifier.length>0){
				return identifier;
			}
			
			if(literal.length>0){
				return literal;
			}
		},
		processMemberExpression: function(node) {// 
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
