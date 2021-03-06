 require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "InterfaceUtil":"jQuery/pattern/utils/InterfaceUtil",
        "ExtendUtil":"jQuery/pattern/utils/ExtendUtil",
        "XHRUtil":"jQuery/pattern/utils/XHRUtil",
        "EventUtil":"jQuery/pattern/utils/EventUtil"
    },
    shim:{}
});

 define([
    'jquery',
    'InterfaceUtil',
    'ExtendUtil',
    'XHRUtil',
    'EventUtil'
 ],function($,Interface,extend,XHRUtil,EventUtil){
    var Publication = new Interface('Publication',[
        'getIsbn',
        'setIsbn',
        'getTitle',
        'setTitle',
        'getAuthor',
        'setAuthor',
        'display',
        'getGenres',
        'setGenres']);
    var Book = function(isbn,title,author){

    };
    //implement publication
    Book.prototype = {
        constructor:Book,
        getIsbn:function(){},
        setIsbn:function(){},
        getTitle:function(){},
        setTitle:function(){},
        getAuthor:function(){},
        setAuthor:function(){},
        display:function(){},
        getGenres:function(){},
        setGenres:function(){}
    };

    //图书馆对象
    var Library = new Interface('Library',['addBook','findBook','checkoutBook','returnBook']);

    var PublicLibrary = function(books,firstGenreCatalog){
        this.catalog = {};
        this.firstGenreCatalog = firstGenreCatalog;
        for(var i = 0,len = books.length; i < len; i++){
            //this.catalog[book[i].getIsbn()] = {book:books[1],avaliable:true};
            this.addBook(books[i]);
        }
    };
    PublicLibrary.prototype = {
        addBook:function(newBook){
            this.catalog[newBook.getIsbn()] = {book:newBook,avaliable:true};
            this.firstGenreCatalog.handleFilingRequest();
        },
        findBooks:function(searchString,genres){
            //pass request
            if(typeof genres === 'object' && genres.length > 0){
                var requiestObject = {
                    searchString:searchString,
                    genres:genres,
                    results:[]
                };
                var responseObject = this.firstGenreCatalog.findBooks(requiestObject);
                return responseObject.results;
            }else{
                var results = [];
                for(var isbn in this.catalog){
                    if(!this.catalog.hasOwnProperty(isbn)){
                        continue;
                    }
                    if(searchString.match(this.catalog[isbn].getTitle())||
                       searchString.match(this.catalog[isbn].Author())){
                        results.push(this.catalog[isbn]);
                    }
                }
                return results;
            }
        },
        checkoutBook:function(book){
            var isbn = book.getIsbn();
            if(this.catalog[isbn]){
                if(this.catalog[isbn].avaliable){
                    this.catalog[isbn].avaliable = false;
                    return this.catalog[isbn];
                }else{
                    throw new Error('not avaliable');
                }
            }else{
                throw new Error('not fonud');
            }
        },
        returnBook:function(book){
            var isbn = book.getIsbn();
            if(this.catalog[isbn]){
                this.catalog[isbn].avaliable = true;
            }
            else{
                throw new Error('not fonud');
            }
        }
    };

    var biographyCatalog = new BiographyCatalog();
    var fantasyCatalog = new FantasyCatalog();
    var mysteryCatalog = new MysteryCatalog();
    var nonFictionCatalog = new NonFictionCatalog();
    var sciFiCatalog = new SciFiCatalog();

    biographyCatalog.setSuccessor(fantasyCatalog);
    fantasyCatalog.setSuccessor(mysteryCatalog);
    mysteryCatalog.setSuccessor(nonFictionCatalog);
    nonFictionCatalog.setSuccessor(sciFiCatalog);

    //类别对象 抽象类
    var Catalog = new Interface('Catalog',[
        'handleFilingRequest',
        'findBooks',
        'setSuccessor']);

    var GenreCatalog = function(){
        this.successor = null;
        this.catalog = [];
    };
    GenreCatalog.prototype = {
        _bookMatchesCritera:function(book){
            return false;
        },
        handleFilingRequest:function(book){
            if(this._bookMatchesCritera(book)){
                this.catalog.push(book);
            }
            if(this.successor){
                this.successor.handleFilingRequest(book);
            }
        },
        findBooks:function(request){
            var found = false;
            for(var i = 0,len = request.len; i < len && !found; i++){
                for(var j = 0,nameLen = this.genreNames.length; j < nameLen; j++){
                    if(this.genreNames[j] == request.getnres[i]){
                        found = true;
                        break;
                    }
                }
            }
            if(found){
                outerLoop:for(var i = 0,len = this.catalog.length; i < len; i++){
                    var book = this.catalog[i];
                    for(var j = 0,requestLen = request.results.length; j < requestLen; j++){
                        if(request.results[j].getIsbn() == book.getIsbn()){
                            continue outerLoop;
                        }
                    }
                    require.results.push(book);
                }
            }


            if(this.successor){
                return this.successor.findBooks(request);
            }else{
                return request;
            }
        },
        setSuccessor:function(successor){
            if(Interface.ensureImplements(successor,Catalog)){
                this.successor = successor;
            }
        }

    };

    //类别的实现类
    var SciFiCatalog = function(){
        //
        this.genreNames = ['sci-fi','scifi','science finction'];
    }
    extend(SciFiCatalog,GenreCatalog);
    SciFiCatalog.prototype._bookMatchesCritera = functon(book){
        var getnres = book.getGenres();
        if(book.getTitle().match(/space/i)){
            return true;
        }
        for(var i = 0,len = getnres.length; i < len; i++){
            var genre = getnres[i].toLowerCase();
            if(genre === 'sci-fi' || genre === 'scifi' || 'science finction'){
                return true;
            }
        }
        return false;
    }















 });