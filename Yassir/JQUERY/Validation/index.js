$(() => {

    var dob;

    $.validator.addMethod("strongePassword", (value) => {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[A-Z]/.test(value) && /\W|_/g.test(value);
    },"The password must contain at least 1 number, at least 1 lower case and upper case letters"); 

    $("#togglePassword").click(() => {
        if($("#pas1").attr("type") === "password" )$('#pas1').attr('type','text') 
        else $('#pas1').attr('type','password');
    });

    function setDob() {
        dob = $('#dbox').val()
        dobDate = new Date(dob).getFullYear();
        nowDate = new Date().getFullYear();
        var diff = nowDate - dobDate;
        return diff
    }

    $('#dbox').blur(() => { 
        $('#ageBox').val(setDob());
    });

    $('#frm').validate({ 
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email:true
            },
            password: {
                required:true,
                minlength: 8,
                strongePassword: true
            },
            password_confirm: {
                required: true,
                minlength: 8,
                equalTo: "#pas1"
            },
            address:{
                minlength:15,
                required:true
            },
            dob:{
                required:true,
            }
        },
        messages:{
               name:{required: 'Please enter your name'},
               email: {required: 'Please enter correct email'},
               password:{required: 'Please enter your Password'},
               password_confirm:{equalTo:'Passwords donot match'},
               dob:{required:"Please Provide your DOB"},
               address:{minlength:"Please Enter valid Address"}
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
            if (element.attr("name") == "password") {error.insertAfter($(".bi"));} 
            else {error.insertAfter(element);}
        },
        submitHandler: () => {    
            window.location = "https://www.cybrosys.com/";
        }    
    });
});