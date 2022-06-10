$(() => {

    let products_obj = {
        'Apple Iphone X': 75000,
        'Oneplus Nord 2 5G' : 29000,
        'Samsung Galaxy S21' : 68000,
        'Redmi Note 10 Pro' : 35000,
        'Asus ROG 4' : 43000
    }
    let customers_obj = {
        'Suhail M': '8156961606',
        'Jafar K' :'81965695585',
        'Manoj Mundasseri' : '946585120',
        'Midhun K' : '8653959612'
    }

    let temp = {}
    let invoice = []

    function calcTotal() {
        let total = 0;
        invoice.map( (prod) => { total += prod[1] } )
        return total
    }

    $('#customers').click(() => { $('.customer').fadeIn('fast'); });
    $('#products').click( () => { $('.product').fadeIn('fast');} );
    $('.close').click(() => { $('.popup-container').css('display', 'none'); })
    $('#invoice-new-customer').change( (e) => {  $('#cust').text($('#invoice-new-customer').val())});
    $('#add-another').click( () => { $('.message').css('display','none') } )

    $('#invoices').click(() => {
        for (let key in products_obj){ $('#invoice-new-product').append($("<option></option>").text(key)); }
        for (let key in customers_obj){ $('#invoice-new-customer').append($("<option></option>").text(key)); }
        $('.invoice').fadeIn('fast');
    });

    $('.close').click(() => { 
        $('.popup').css('display','none')
        $('.message').css('display','none')
        invoice = []
    });

    $('#add-to-products').click((e) => {
        e.preventDefault();
        if ($('#product-name').val().length == 0 || $('#unit-price').val().length == 0){
            alert('Fields Cannot be empty')
        }
        data = $('#product-form').serializeArray();
        if (products_obj.hasOwnProperty(data[0].value)){alert("Product already Exists")}
        else {
            products_obj[data[0].value] = parseInt(data[1].value)                
            $('.product-message').text('Product Added Successfully')
            $('.product-message').fadeIn('slow')    
        }
    });

    $('#add-to-customers').click((e) => {
        e.preventDefault();
        if ($('#cust-name').val().length == 0 || $('#phone').val().length == 0){
            alert('Fields Cannot be empty')
        }else{
            data = $('#customer-form').serializeArray();
            if (customers_obj.hasOwnProperty(data[0].value)){alert("Customer already Exists")}
            else {
                customers_obj[data[0].value] = parseInt(data[1].value)
                $('.customer-message').text('Customer Added Successfully')
                $('.customer-message').fadeIn('slow')
            }
        }
    });

    $('#add-to-invoice').click((e) => {
        e.preventDefault()
        if($('#qty').val() == ''  || $('#qty').val() == '0' ){ alert("Quantity Cannot be Null or Zero") }
        else{
            let product = $('#invoice-new-product').val()
            let sub_total = parseInt($('#qty').val()) * products_obj[product]
            let bill = [product, sub_total ]
            
            if(!temp[product]){
                invoice.push(bill)
                let content =`<td>${product}</td><td>${products_obj[product]}</td><td>${$('#qty').val()}</td><td>${sub_total}</td>`
                $('#bill').append("<tr class='list'>" + content  + "</tr>");
            } else{ alert("No Item Selected or Item Already Selected") }
            temp[product] = products_obj[product]
        }
    })

    $('#rem-invoice').click(function (e) { 
        e.preventDefault();
        if (invoice.length > 0){
            $('#bill tr:last').remove()
            delete temp[invoice[invoice.length-1][0]]
            invoice.pop()
            $('#total-price').text(calcTotal())
        }else{ alert('No Items in Invoice') }
    });

    $('#gen-invoice').click( (e) => { 
        e.preventDefault();
        var datetime = new Date().toLocaleString();
        if(invoice.length == 0){ alert("You haven't selected any product") }
        else{
            $('#total-price').text(calcTotal())
            $('#date-time').text(datetime)
        }
        
    });

    $('#new-invoice').click( () => { 
        invoice = []
        let rowCount = $('#bill >tbody >tr').length;
        if(rowCount > 1){
            for(let i = rowCount; i > 1; i--){ $("table tr:last").remove();}
            $('#total-price').text(0)
            $('#cust').text('')
            $('#date-time').text('')
        }else{ alert("invoice is Empty") }
    });
})