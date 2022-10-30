(function () {

    $('#circle').click(()=>{
        console.log(1);
        window.open('./login.html','_self');

    })


    $('#Checkout').click(()=>{
        console.log(1);
        window.open('./checkout.html','_self');

    })
   const {user} = JSON.parse(localStorage.getItem('user')); 
   const {username} = user?user:{username:"Account"}
   $('#circle').html(username);
//    username?username:"Account"
   
   
})();