const ribbon = (ribbonSelector, ribbonContentSelector) => {
    const ribbon = document.querySelector(ribbonSelector);
    const content = document.querySelector(ribbonContentSelector);

    //getting card width
    const card = content.firstElementChild;
    const cardWidth = parseInt(getComputedStyle(card).width) + (parseInt(getComputedStyle(card).margin) * 2);

    //Create control buttons
    const buttonLeft = document.createElement('i');
    buttonLeft.classList.add('fa-solid', 'fa-chevron-left', 'button__icon', 'ribbon__button-left');
    ribbon.appendChild(buttonLeft);
    buttonLeft.addEventListener('click', () => {
        content.scrollBy({top: 0, left: -cardWidth, behavior: 'smooth'});
    })

    const buttonRight = document.createElement('i');
    buttonRight.classList.add('fa-solid', 'fa-chevron-right', 'button__icon', 'ribbon__button-right');
    ribbon.appendChild(buttonRight);
    buttonRight.addEventListener('click', () => {
        content.scrollBy({top: 0, left: cardWidth, behavior: 'smooth'});
    })
}

export default ribbon;