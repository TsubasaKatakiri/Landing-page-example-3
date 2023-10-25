const heroSlider = (sliderSelector, contentSelector, slidesSelector) => {
    const slider = document.querySelector(sliderSelector);
    const content = document.querySelector(contentSelector);
    const slides = document.querySelectorAll(slidesSelector);
    const slidesNumber = slides.length;

    //slider interface initialization
    function interfaceInit(){
        if(window.innerWidth > 768){
            //init control arrows
            let controlArrowLeft = document.createElement('i');
            controlArrowLeft.classList.add('fa-solid', 'fa-chevron-left', 'slider__control-left');
            slider.appendChild(controlArrowLeft);
            controlArrowLeft.addEventListener('click', moveBackward);

            let controlArrowRight = document.createElement('i');
            controlArrowRight.classList.add('fa-solid', 'fa-chevron-right', 'slider__control-right');
            slider.appendChild(controlArrowRight);
            controlArrowRight.addEventListener('click', moveForward);
        }

        //init marker container
        let markerContainer = document.createElement('div');
        markerContainer.classList.add('slider__marker');
        slider.appendChild(markerContainer);

        //init markers
        for(let i = 0; i < slidesNumber; i++){
            let marker = document.createElement('div');
            marker.classList.add('marker');
            if(i === 0) marker.classList.add('active');
            markerContainer.appendChild(marker);
        }
    }

    if(slidesNumber > 1) interfaceInit();

    const markers = document.querySelectorAll('.marker');

    let slideInterval = null;
    let activeSlide = 0;

    //swipe control
    let touchstartX = 0;
    let touchendX = 0;
    const swipeThreshold = window.innerWidth > 1024 ? window.innerWidth / 8 : window.innerWidth / 4;

    content.addEventListener('touchstart', (e) => {
        touchstartX = e.changedTouches[0].screenX;
    }, false);
    content.addEventListener('mousedown', (e) => {
        touchstartX = e.screenX;
    }, false);

    content.addEventListener('touchend', (e) => {
        touchendX = e.changedTouches[0].screenX;
        swipeDetection();
    }, false);
    content.addEventListener('mouseup', (e) => {
        touchendX = e.screenX;
        swipeDetection();
    }, false);

    function swipeDetection(){
        if(touchendX > touchstartX && touchendX - touchstartX > swipeThreshold){
            moveBackward();
        }
        if(touchendX < touchstartX && touchstartX - touchendX > swipeThreshold){
            moveForward();
        }
    }

    function setSlide(index){
        clearInterval(slideInterval);
        activeSlide = index;

        markers.forEach(marker => {
            marker.classList.remove('active');
        })
        slides.forEach(marker => {
            marker.classList.remove('active');
        })
        markers[index].classList.add('active');
        slides[index].classList.add('active');

        slideInterval = setInterval(() => {
            moveForward();
        }, 10000);
    }

    function moveForward(){
        if(activeSlide < slidesNumber - 1){
            activeSlide++;
        } else {
            activeSlide = 0;
        }
        setSlide(activeSlide);
    }
    
    function moveBackward(){
        if(activeSlide === 0){
            activeSlide = slidesNumber - 1;
        } else {
            activeSlide--;
        }
        setSlide(activeSlide);
    }

    if(markers.length > 0){
        for(let i = 0; i < markers.length; i++){
            markers[i].addEventListener('click', () => setSlide(i));
        }

        slideInterval = setInterval(() => {
            moveForward();
        }, 10000);
    }
}

export default heroSlider;