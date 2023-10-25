const navbar = () => {
    const header = document.querySelector('.header');

    const threshold = window.innerHeight;

    function checkScrollHeader(){
        if(document.documentElement.scrollTop >= threshold ){
            header.classList.add('header_active');
        } else {
            header.classList.remove('header_active');
        }
    }

    checkScrollHeader();
    window.addEventListener('scroll', checkScrollHeader);
}

export default navbar;