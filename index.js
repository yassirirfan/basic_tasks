$(() => {

    var products_arr = [["Benz","Mercedes","50","2500"],["Polo","Volkwagon","70","5000"]]
    var customers_arr = [["Yassir","8156961606","21","Kerala"],["Faiz","8156961556","20","Kerala"]]
    var k = 13
    var unit_price = 0 

    $('#products').click( (e) => {
        e.preventDefault();
        $('.product').fadeIn('fast');
    });

    $('#invoices').click((e) => {
        e.preventDefault();

        for(let c = 0; c < customers_arr.length; c++){ 
            $('#invoice-select-customer').append($("<option></option>").text(customers_arr[c][0])); 
        }

        for(let p = 0; p < products_arr.length; p++){ 
            $('#invoice-select-product').append($("<option></option>").text(products_arr[p][0])); 
        }


        $('.invoice').fadeIn('fast');

        $('.invoice-customer').change(function (e) { 
            let customer_name = $('.invoice-customer').val()
            console.log(customer_name)
            e.preventDefault();
            for (let i = 0; i< customers_arr.length; i++){
                if (customers_arr[i][0] == customer_name){
                    $('#cust-phone').val(customers_arr[i][1])
                    break;
                }
            }
        }); 


       $('.invoice-product').change(function (e) { 
            let product_name = $('.invoice-product').val()
            console.log(product_name)
            for (let i = 0; i< products_arr.length; i++){
                if (products_arr[i][0] == product_name){
                    $('td')[13]['children'][0].value = products_arr[i][3]
                    break;
                }
            }
        }); 


        


    });


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
        data = $('#product-form').serializeArray();
        temp = []
        data.map((i) => {temp.push(i.value)})
        products_arr.push(temp)

        $('.product-message').text(temp[0] + ' Successfully added to Products')
        $('.product-message').fadeIn('slow')

    });

    $('#add-to-customers').click((e) => {
        e.preventDefault();
        data = $('#customer-form').serializeArray();
        temp = []
        data.map((i) => {temp.push(i.value)})

        customers_arr.push(temp)
        $('.customer-message').text('Added ' + temp[0] + ' to customers successfully')
        $('.customer-message').fadeIn('slow')

    });

    $('.close').click((e) => {
        e.preventDefault();
        $('.popup-container').css('display', 'none');
    })


    $('.btn-add-row').on('click', () => {
        const $lastRow = $('.item:last');
        const $newRow = $lastRow.clone();
        //element.attr('id', 'unit-price2');
        
      
        $newRow.find('input').val('');
        $newRow.find('td:last').text('0');
        $newRow.insertAfter($lastRow);

             
        var newOne = $newRow.find('input:first').focus();
        
        $(newOne).change(() => { 
            let product_name = $(newOne).val()
            for (let i = 0; i< products_arr.length; i++){
                if ( products_arr[i][0] == product_name){
                    unit_price = products_arr[i][3]
                    break;
                }
            }
            console.log($('td'))
            $('td')[k]['children'][0].value = unit_price
          });
        k += 4

      });



      
   
})