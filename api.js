new ClipboardJS('.btn'); // Copy to clipboard

const inputLink = $('#website');
const buttonSend = $('#shorten'); 
const error = $('.error');

buttonSend.click(function() {

    let website = inputLink.val();
    const url = 'https://api.shrtco.de/v2/shorten?url=' + website;

    inputLink.val('');
    
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(result){ 
            showLink(website, result.result.full_short_link);
        },
        error: function(error){
            switch (error.responseJSON.error_code) {
                case 1:
                        showError('Please add a link');
                    break;
                case 2:
                        showError('Invalid url');
                    break;
                case 3:
                        showError('Wait a second and try again');
                    break;
                case 10:
                        showError('Disallowed link');
                    break;
                default:
                    break;
            }
        },
        complete: function(){
            inputLink.val('');
        }
    })
    
});

function showLink(website, full_short)
{
    let message = 
    `
    <div class="shorten bg-gray-200 flex justify-between px-5 py-2 mb-3 rounded-lg items-center mobile:flex-col mobile:items-start">
        <div class="left mobile:p-2 mobile:border-b mobile:border-black mobile:border-opacity-10 mobile:w-full">
        <span>${website}</span>
        </div>
        <div class="right mobile:flex mobile:flex-col mobile:p-2 mobile:w-full">
        <span class="mr-3 text-blue-400 font-bold mobile:mb-2"><a href="${full_short}">${full_short}</a></span>
        <button class="btn bg-blue-400 text-gray-50 py-2 px-5 rounded-lg focus:outline-none hover:bg-blue-300" data-clipboard-text="${full_short}">Copy</button>
        </div>
    </div>
    `;
    $('.all-links').append(message);
}

function showError(message)
{
    $('.error-msg').remove();
    
    inputLink.removeClass('border-red-400');
    inputLink.removeClass('placeholder-red-400');

    inputLink.addClass('border-red-400');
    inputLink.addClass('placeholder-red-400');

    $('.error').append(`<span class="error-msg text-sm text-red-400 id="error">${message}</span>`);

    setTimeout(function(){ 
        inputLink.removeClass('border-red-400');
        inputLink.removeClass('placeholder-red-400');
        $('.error-msg').remove();
    }, 5000);
}
