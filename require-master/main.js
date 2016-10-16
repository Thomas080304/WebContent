document.addEventListener('click', function(){
	Salut.require(['js/A'], function(e){
		console.log(e);
    //e.send('N');
	})
});