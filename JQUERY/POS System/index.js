$(() => {

    let products = []

    $('#products').click( (e) => {
        e.preventDefault();
        $('.product').fadeIn('fast');
    });

    $('#invoices').click((e) => {
        e.preventDefault();
        $('.invoice').fadeIn('fast');
    });

    $('.close').click((e) => { 
        e.preventDefault();
        $('.popup').css('display','none')
    });

    $('#add-to-list').click((e) => {
        e.preventDefault();
        data = $('#add-form').serializeArray();
        temp = []
        data.map((i) => {temp.push(i.value)})

        products.push(temp)
        console.log(products)
    });

    $('.close').click((e) => {
        e.preventDefault();
        $('.popup-container').css('display', 'none');
    })
})