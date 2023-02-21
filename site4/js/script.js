
function validation(form) {

    function createError(input, text) {
        const parent = input.parentNode;
        input.classList.add('error');
        parent.classList.add('error-i');

        const textElement = document.createElement('label');
        parent.append(textElement);
        parent.querySelector('label').classList.add('error-label');
        textElement.textContent = text

        // const addMark = document.createElement('i');
        // parent.append(addMark);
        // const mark = parent.querySelector('i');
        // mark.classList.add('fa-solid');
        // mark.classList.add('fa-exclamation')
        // parent.classList.add('error-mark');
    }

    function removeError(input) {
        input.classList.remove('error');
        input.parentNode.classList.remove('error-i');
        if (input.parentNode.querySelector('label')) {
            input.parentNode.querySelector('label').remove()

        }
        // input.parentNode.remove('label')
        // const parent = input.parentNode;
        // const mark = parent.querySelector('i')
        // mark.remove()
    }


    let result = true;

    const allInputs = document.querySelectorAll('input');

    for (const input of allInputs) {
        
        
        removeError(input);

        if (input.dataset.maxLength) {
            if (input.value.length > input.dataset.maxLength) {
                removeError(input);
                createError(input, `max ${input.dataset.maxLength}`);
                result = false
            }
        }

        if (input.dataset.minLength) {
            // removeError(input)
            if (input.value.length < input.dataset.minLength) {
                removeError(input);
                createError(input, `min ${input.dataset.minLength}`);
                result = false
            }
        }
        
        if (input.dataset.required == 'true') {    
            // removeError(input);
            if (input.value == '') {
                removeError(input);
                createError(input);
                result = false
            } else if (input.value.includes(' ')) {
                const letters = /^[A-Za-z]+$/;
                createError(input);
                result = false
                for (let i = 0; i < input.value.length; i++) {
                    console.log(input.value[i]);
                    if (input.value[i].match(letters)) {
                        removeError(input);
                        result = true
                    } else {
                        result = false
                    }
                }
            }
        }
    };

    return result;

}

document.getElementById('form-id').addEventListener('submit', function (event) {
    
    event.preventDefault()

    if (validation(this)) {
        alert('form validated successfully')
    }

})