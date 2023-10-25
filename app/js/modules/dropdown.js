const dropdown = (buttonSelector, menuSelector) => {
    const button = document.querySelector(buttonSelector);
    const menu = document.querySelector(menuSelector);

    button.addEventListener('click', menuControl);

    //turn on and off dropdown menu
    function menuControl(){
        menu.classList.toggle('navbar_active');
    }

    //close menu afer clicking outside
    window.addEventListener('click', (e) => {
        if(!e.target.matches(menuSelector) && !e.target.matches(buttonSelector)){
            menu.classList.remove('navbar_active');
        }
    })
}

export default dropdown;