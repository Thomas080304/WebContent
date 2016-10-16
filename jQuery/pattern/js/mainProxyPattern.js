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

    var Library = new Interface('Library',['addBook','findBook','checkoutBook','returnBook']);

    var PublicLibrary = function(books){
        this.catalog = {};
        for(var i = 0,len = books.length; i < len; i++){
            this.catalog[book[i].getIsbn()] = {book:books[1],avaliable:true};
        }
    };
    PublicLibrary.prototype = {
        addBook:function(){
            
        },
        findBooks:function(searchString){
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

    var PublicLibraryVirtualProxy = function(catalog){
        this.library = null;
        this.catalog = catalog;
    };
    PublicLibraryVirtualProxy.prototype = {
        _initializeLibrary = function(){
            if(this.library === null){
                this.library = new PublicLibrary(this.catalog);
            }
        },
        findBooks:function(searchString){
            this._initializeLibrary();
            return this.library.findBooks(searchString);
        },
        checkoutBook:function(book){
            this._initializeLibrary();
            return this.library.checkoutBook(book);
        },
        returnBook:function(book){
            this._initializeLibrary();
            return this.library.returnBook(book);
        }
    };









 });