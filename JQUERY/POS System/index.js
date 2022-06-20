$(() => {
    let products_obj = {}
    let customers_obj = {}
    let generated = false
    let temp = {}
    let invoice = []
    let item_id = 1

    function calcTotal() {
        let total = 0;
        invoice.map( (prod) => { total += prod[1] } )
        return total
    }
    function messenger(msgClass,errorText){
        msgClass.text(errorText)
        msgClass.fadeIn('slow')
        msgClass.delay(1000).fadeOut('slow')
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
        if ($('#product-name').val().length == 0 || $('#unit-price').val().length == 0){ messenger($('.product-fail-message'),'Fields must not be empty') }
        else{
            data = $('#product-form').serializeArray();
            if (products_obj.hasOwnProperty(data[0].value)){ messenger($('.product-fail-message'),'Product already exists') }
            else {
                products_obj[data[0].value] = parseInt(data[1].value)  
                messenger($('.product-message'),'Product Added Successfully')   
                $('#product-form')[0].reset()            
            }
        }
    });

    $('#add-to-customers').click((e) => {
        e.preventDefault();
        if ($('#cust-name').val().length == 0 || $('#phone').val().length == 0){ messenger($('.customer-fail-message'),'Name or Phone is empty') }
        else{
            data = $('#customer-form').serializeArray();
            if (customers_obj.hasOwnProperty(data[0].value)){ messenger($('.customer-fail-message'),'Customer Already Exists') }
            else{
                customers_obj[data[0].value] = parseInt(data[1].value)
                messenger($('.customer-message'),'Customer Added Successfully')
                $('#customer-form')[0].reset()
            }
        }
    });

    $('#add-to-invoice').click((e) => {
        e.preventDefault()
        let product = $('#invoice-new-product').val()
        let customer = $('#invoice-new-customer').val()
        if(customer == null){messenger($('.invoice-fail-message'),"Please Select a Customer")}
        else if(product == null){messenger($('.invoice-fail-message'),"Please Select a Product")}
        else if($('#qty').val() == ''  || $('#qty').val() == '0' ){  messenger($('.invoice-fail-message'),"Quantity cannot be null or zero") }
        else{
            let sub_total = parseInt($('#qty').val()) * products_obj[product]
            let bill = [product, sub_total ]
            
            if(!temp[product]){
                invoice.push(bill)
                let content =`<td>${item_id}</td><td>${product}</td><td>${products_obj[product]}</td><td class="qty" >${$('#qty').val()}</td><td>${sub_total}</td>`
                $('#bill').append(`<tr class='list'> ${content} </tr>`);
                item_id += 1
                $('#total-price').text(calcTotal())
            } else{  messenger($('.invoice-fail-message'),"No Item Selected or Item Already Selected") }
            temp[product] = products_obj[product]
        }
    })

    $('#rem-invoice').click( (e) => { 
        e.preventDefault();
        let id = parseInt($('#remove-id').val())
        if(id > invoice.length){  messenger($('.invoice-fail-message'),"Invalid Id") }
        else if(id != invoice.length && id > 0){
            $(`#bill tr:eq(${id})`).remove()
            delete temp[invoice[id-1][0]]
            item_id--;
            invoice = invoice.filter((a,i) => i != id-1 )
            for( let i = id; i<=invoice.length; i++){ $(`#bill tr:eq(${i})`).children('td:first').text(i) }
            $('#total-price').text(calcTotal());
        }
        else if (invoice.length > 0){
            $('#bill tr:last').remove()
            delete temp[invoice[invoice.length-1][0]]
            invoice.pop();
            item_id--;
            $('#total-price').text(calcTotal())
        }
        else{  messenger($('.invoice-fail-message'),"Invoice is Empty") }
    });

    $('#gen-invoice').click( (e) => { 
        e.preventDefault();
        var datetime = new Date().toLocaleString();
        if(invoice.length == 0){ messenger($('.invoice-fail-message'),"You haven't selected any product") }
        else{
            $('#total-price').text(calcTotal())
            $('#date-time').text(datetime)
        }
        generated = true
    });

    $('#new-invoice').click( () => { 
        invoice = []
        let rowCount = $('#bill >tbody >tr').length;
        if(rowCount > 1){
            for(let i = rowCount; i > 1; i--){ $("table tr:last").remove();}
            $('#total-price').text(0)
            $('#cust').text('')
            $('#date-time').text('')
            item_id = 1
            generated = false
        }
        else{ messenger($('.invoice-fail-message'),"Invoice is Empty") }
    });

    $(document).on('click','.qty', function () { 
        if(!generated){
            let val = $(this).text()
            $(this).replaceWith(function () {
                return `<input type="number" id="modify"  value="${val}" />`;
            });
        }
        else{messenger($('.invoice-fail-message'),"Sorry, you can't edit confirmed invoice")}
    })

    $(document).on('blur','#modify', function () {
        let changed = $(this).val()
        let current = $(this).closest('tr')[0]
        if(changed == '' || changed == '0'){ 
            $('#gen-invoice').attr('disabled','disabled')
            messenger($('.invoice-fail-message'),"Quantity should not be Zero or Null")
            $(current['children'][4]).text(0)
            $('#date-time').text(' ')
        }else{
            $(this).replaceWith(function () {
                $('#gen-invoice').removeAttr('disabled');
                let index = parseInt($(current['children'][0]).text()) - 1 
                invoice[index][1] = parseInt($(this).val()) * products_obj[invoice[index][0]]
                $(current['children'][4]).text(parseInt($(this).val()) * products_obj[invoice[index][0]])
                $('#total-price').text(calcTotal())
                return `<td class="qty" >${$(this).val()}</td`;
            });
        }
    })  
})