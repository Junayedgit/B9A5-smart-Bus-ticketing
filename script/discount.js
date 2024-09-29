
const applyBtn = document.getElementById('apply-button');
applyBtn.addEventListener('click', function () {
    const discountInput = document.getElementById('couponInput');
    const discount = discountInput.value;
    console.log(discount);

    if (discount === 'NEW15') {

        console.log('Valid Code')


    }
    else {
        console.log('invalid code')
    }
})

