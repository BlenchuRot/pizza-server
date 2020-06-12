async function login(){

    const response = await fetch('http://localhost:3005/api/login',{
        
        method:'POST',
        headers: {

            'content-type':'application/json'
        },
        body: JSON.stringify({


            email:'test@test.com',
            password:'123qwe'
        })



    });
    if(response.status === 401){
        throw response;

    }
    const body = await response.json();
    return body;

}