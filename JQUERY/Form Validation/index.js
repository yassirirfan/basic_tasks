$(() => {

    var dob;

    $.validator.addMethod("strongePassword", (value) => {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[A-Z]/.test(value) && /\W|_/g.test(value);
    },"Must contain at least a number, a lower and upper case lettters and a special character"); 
    $.validator.addMethod("onlyLetters", (value) => {return /^[a-zA-Z]+$/.test(value)},"Name should only contain letters" )
    $.validator.addMethod("olderEnough", (value) => {return value >= 12},"Sorry you aren't older enough" )
    $.validator.addMethod("isEmail", (value) => {return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)},"Invalid Email")

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
    $('#dbox').change(() => { $('#ageBox').val(setDob())});
    
    $('#frm').validate({ 
        rules: {
            name: {
                required: true,
                minlength: 3,
                onlyLetters:true
            },
            email: {
                required: true,
                isEmail:true
            },
            password: {
                required:true,
                minlength: 8,
                strongePassword: true
            },
            password_confirm: {
                required: true,
                minlength: 8,
                equalTo : "#pas1"
            },
            address:{
                minlength:15,
                required:true
            },
            dob:{
                required:true
            },
            rad:{
                required:true
            },
            age:{
                olderEnough:true
            }
        },
        messages:{
               name:{required:'Name is mandatory'},
               email: {required:'Email is mandatory'},
               password:{required:'Password is mandatory'},
               password_confirm:{required:'Re-enter your password', equalTo:'Passwords do not match'},
               dob:{required:'Date of birth is mandatory'},
               rad:{required:'Gender is mandatory'},
               address:{required:'Address is mandatory', minlength:'Address is too short'}
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
            if (element.attr("name") == "password") {error.insertAfter($(".bi"));} 
            else if (element.attr("name") == "rad") {error.insertAfter($(".aftr"));}
            else {error.insertAfter(element);}
        },
        submitHandler: () => {    
            window.location = "https://www.cybrosys.com/";
        }    
    });
});