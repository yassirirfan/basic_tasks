$(() => {

    let products = []

    $('#products').click((e) => { 
        e.preventDefault();
        $('.popup-product').css('display', 'flex');  
    });

    $('#add-to-list').click((e) => { 
        e.preventDefault();
        data = $('#add-form').serializeArray();
        temp = []
        data.map((i) => {
            temp.push(i.value)
        })
        console.log(data)
        products.push(temp)
        console.log(products)
    });
    $('.close').click((e) => {
        e.preventDefault();
        $('.popup-product').css('display', 'none');
    })
})
