$(document).ready(function(){
    
    $("#linkRegister").on('click',()=>{
        animateCSS('.login-container', 'fadeOut', function() {

            $(".login-container").addClass("hide-me");
            $(".register-container").removeClass("hide-me");

            animateCSS('.register-container', 'fadeIn');
        });
    })

    $("#register-btn-cancel").on('click',()=>{
        animateCSS('.register-container', 'fadeOut', function() {

            $(".register-container").addClass("hide-me");
            $(".login-container").removeClass("hide-me");

            animateCSS('.login-container', 'fadeIn');
        });
    })

    function animateCSS(element, animationName, callback) {
        const node = document.querySelector(element)
        node.classList.add('animated', animationName)
    
        function handleAnimationEnd() {
            node.classList.remove('animated', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)
    
            if (typeof callback === 'function') callback()
        }
    
        node.addEventListener('animationend', handleAnimationEnd)
    }

});