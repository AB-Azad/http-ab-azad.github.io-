/**
 * azHTTPLibrary Library
 * Library for making HTTP requests usng Fetch & Aysync Await
 *
 * @version 3.0.0
 **/

class azHTTPLibrary{
    // Make an HTTP GET reuest
    async get( url ){
        let response = await fetch(url);
        let resData  = await response.json();

        return resData;
    }

    // Make an HTTP POST reuest
    async post( url, user ){
        let response = await fetch( url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        let resData  = await response.json();

        return resData;
    }

    // Make an HTTP PUT reuest
    async put( url, user ){
        let response = await fetch( url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        let resData = await response.json();

        return resData;
    }

    // Make an HTTP DELETE reuest
    async delete( url, user ){
        await fetch( url, {
            method: 'DELETE'
        });
        
        let resData  = await 'Resouce Deleted!';

        return resData;
    }
}

export const http = new azHTTPLibrary();