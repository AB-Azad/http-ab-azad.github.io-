class Storage{
    constructor(){
        // Defaults
        this.city      = 'dhaka';
        this.country   = 'BD';
    }

    setLocation( name ){
        localStorage.setItem( 'sa_city', name );
    }

    getLocation(){
        var city = '';
        
        if( localStorage.getItem('sa_city') == null ){
            city = this.city;
        } else {
            city = localStorage.getItem('sa_city');
        }

        return city;
    }
}