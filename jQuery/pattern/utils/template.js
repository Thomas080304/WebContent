/**
 * Created by Administrator on 2015/10/31.
 */
(function(window){
/*
var tpl = '<p>Hello, my name is <%name%>. I\'m <%age%> years old.</p>';
var re = /<%([^%>]+)?%>/g, match;
while(match = re.exec(tpl)) {
	console.log(match);
}

var fn = new Function('arg','return arg+1;');
fn(5);
var tpl = 'return "<p>Hello, my name is "+arg.name+". I\'m "+arg.profile.age+" years old.</p>"';
var data = {
	name:'thomas',
	profile:{
		age:10
	}
};
var fn = new Function('arg',tpl);
*/
fn(data);
	var TemplateEngine = function(tpl,data){
 		var re = /<%([^%>]+)?%>/g,
	 		reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
	 		code = 'var r = [];\n',
	 		cursor = 0,match;
 		var add = function(line,js){
 			js ?
 			code += (line.match(reExp) ? (line + '\n') :('r.push('+line+');\n')):
 			code += ('r.push("'+line.replace(/"/g, '\\"')+'");\n');
 		};
 		while(match = re.exec(tpl)){
 			add(tpl.slice(cursor,match.index));
 			add(match[1],true);
 			cursor = match.index+match[0].length;
 		}
 		add(tpl.substring(cursor,tpl.length));
 		code += ('return r.join("");');
 		console.log(code);
 		console.log(code.replace(/[\r\t\n]/g, ''));
 		return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
 	};
 	window.templateEngine = TemplateEngine;
 	/*
 	 * test
 	var template = 
				'My skills:' + 
				'<%if(this.showSkills) {%>' +
				    '<%for(var index in this.skills) {%>' + 
				    '<a href="#"><%this.skills[index]%></a>' +
				    '<%}%>' +
				'<%} else {%>' +
				    '<p>none</p>' +
				'<%}%>';
	alert(TemplateEngine(template, {
	    skills: ["js", "html", "css"],
	    showSkills: true
	}));
	*/
 })(window);