const animations = () => {
    const animatedEleemnts = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver((entries => {
        entries.forEach((entry) => {
            if(entry.isIntersecting && !entry.target.classList.contains('animate_active')){
                entry.target.classList.add('animate_active');
            }
        })
    }))

    animatedEleemnts.forEach((element) => observer.observe(element));
}

export default animations;