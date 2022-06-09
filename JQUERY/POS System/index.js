$(() => {

    var products_obj = {
        'Apple Iphone X': 75000,
        'Oneplus Nord 2 5G' : 29000,
        'Samsung Galaxy S21' : 68000,
        'Redmi Note 10 Pro' : 35000,
        'Asus ROG 4' : 43000
    }
    var customers_obj = {
        'Suhail M': '8156961606',
        'Jafar K' :'81965695585',
        'Manoj Mundasseri' : '946585120',
        'Midhun K' : '8653959612'
    }

    var invoice = []

    $('#products').click( () => {$('.product').fadeIn('fast');});

    $('#invoices').click(() => {
        for (let key in products_obj){
            $('#invoice-new-product').append($("<option></option>").text(key));
        }
        for (let key in customers_obj){
            $('#invoice-new-customer').append($("<option></option>").text(key));
        }
        $('.invoice').fadeIn('fast');

    })

    $('#invoice-new-customer').change( (e) => { 
        $('#cust').text($('#invoice-new-customer').val())
        
    });



    $('#add-to-invoice').click((e) => {
        e.preventDefault()
        if($('#qty').val() == ''  || $('#qty').val() == '0' ){
            alert("Quantity Cannot be Null or Zero")
        }
        else{
            let product = $('#invoice-new-product').val()
            let sub_total = parseInt($('#qty').val()) * products_obj[product]
            //delete products_objproduct;
            let bill = [product, sub_total ]
    
            if(products_obj[product]){
                invoice.push(bill)
                let content ='<td>' + product + '</td>' + '<td>'+ products_obj[product] + '</td>' + '<td>' + $('#qty').val()+ '</td>' + '<td>' + sub_total + '</td>'
                $('#bill').append("<tr class='list'>" + content  + "</tr>");
            }
            else{
                alert("No Item Selected or Item Already Selected")
            }
    
            delete products_obj[product]
        }

    })



    $('#customers').click((e) => {
        e.preventDefault();
        $('.customer').fadeIn('fast');
    });

    $('.close').click((e) => { 
        e.preventDefault();
        $('.popup').css('display','none')
        $('.message').css('display','none')
    });

    $('#add-another').click((e) => {
        $('.message').css('display','none')
    })

    $('#add-to-products').click((e) => {
        e.preventDefault();
        if ($('#product-name').val().length == 0 || $('#unit-price').val().length == 0){
            alert('Fields Cannot be empty')
        }
        data = $('#product-form').serializeArray();
        if (products_obj.hasOwnProperty(data[0].value)){alert("Product already Exists")}
        else {
            products_obj[data[0].value] = parseInt(data[1].value)
            
        }
    });

    $('#add-to-customers').click((e) => {
        e.preventDefault();
        console.log()
        if ($('#cust-name').val().length == 0 || $('#phone').val().length == 0){
            alert('Fields Cannot be empty')
        }
        else{
            data = $('#customer-form').serializeArray();
            if (customers_obj.hasOwnProperty(data[0].value)){alert("Customer already Exists")}
            else {
                customers_obj[data[0].value] = parseInt(data[1].value)
                $('.customer-message').text('Customer Added Successfully')
                $('.customer-message').fadeIn('slow')
            }
        }


    });

    $('#gen-invoice').click( (e) => { 
        e.preventDefault();
        var datetime = new Date().toLocaleString();
        let total = 0;
        if(invoice.length == 0){
            alert("You haven't selected any product")
        }
        else{
            invoice.map((prod) => {
                total += prod[1]
            })
            $('#total-price').text(total)
            $('#date-time').text(datetime)
        }
        
    });

    $('.close').click((e) => {
        e.preventDefault();
        $('.popup-container').css('display', 'none');
    })


 
})