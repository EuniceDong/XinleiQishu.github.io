
(function () {
  const baseurl = 'http://localhost:3001'

  let xhr = new XMLHttpRequest();
  xhr.open('get', 'http://localhost:3001/api/user');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          // localStorage.setItem('user',xhr.response);
          console.log(xhr.response);
    }else{
      console.log(1);
    }
  }
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();

  
  $(".info-item .btn").click(function () {
    console.log('login');
    $(".container").toggleClass("log-in");
  });
  $(".container-form .btn").click(function () {
    // $(".container").addClass("active");
  });

  $(".log-in  .btn").click(() => {
    let username = $(".log-in input")[0].value;
    let password = $(".log-in input")[1].value;
    let str = Qs.stringify({
      username,
      password
    });
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3001/api/login');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            localStorage.setItem('user',xhr.response);
             alert('Login successful');
             $(".log-in input")[0].value = '';
             $(".log-in input")[1].value = '';
             window.open('./index.html','_self');
      }else{
        console.log(1);
      }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);
  })


  $(".sign-up  .btn").click(() => {
    let username = $(".sign-up input")[0].value;
    let password = $(".sign-up  input")[1].value;
    let str = Qs.stringify({
      username,
      password
    });
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3001/api/register');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        alert('Registered successfully');
        $(".sign-up  input")[1].value = '';
        $(".sign-up  input")[0].value = '';
        $(".container").toggleClass("log-in");
      }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);

  })
})()