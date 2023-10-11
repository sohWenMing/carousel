document.addEventListener("DOMContentLoaded", () => {
    console.log("Dom stuff has been loaded");
    const track = document.querySelector('.carousel__track');
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    function hideButton(inputButton) {
        const button = inputButton;
        button.style.display = "none";
    }

    function showButton(inputButton) {
        const button = inputButton;
        button.style.display = "inline-block";
    }

    function setButtons(currentIndex) {
        if (currentIndex === 0) {
            hideButton(leftButton);
        }
        if (currentIndex !== indicators.length - 1) {
            showButton(rightButton);
        }
        if(currentIndex !== 0) {
            showButton(leftButton);
        }
        if(currentIndex === indicators.length - 1) {
            hideButton(rightButton);
        }
    }

    function resetIndicators(indicators, index) {
        indicators.forEach((indicator) => {
            if (indicator.classList.contains("active")) {
                indicator.classList.remove("active");
            };
            indicators[index].classList.add("active");
        });
    }
    
    function setSlidesPosition(slideArray) {
        for(let i = 0; i < slideArray.length; i++) {
            slideArray[i].style.left = `${i * slideWidth}px`
        }
    }

    function moveTrack(targetSlide) {
        const pxToMove = targetSlide.style.left;
        track.style.transform = `translateX(-${pxToMove})`;
    }

    function setCurrentSlideClass(currentSlide, targetSlide) {
        currentSlide.classList.remove('current--slide');
        targetSlide.classList.add('current--slide');
    }

    setSlidesPosition(slides);
    
    let currentIndex = 0;
    //initializing first position on carousel

    const leftButton = document.querySelector('.carousel__button--left');
    const rightButton = document.querySelector('.carousel__button--right');
    const indicators = document.querySelectorAll('.carousel__indicator');
    const indicatorsArray = Array.from(indicators)
    
    leftButton.style.display = "none";
   
    function scroll(direction) {
        let currentSlide = document.querySelector('.current--slide');
        let targetSlide = currentSlide;
    
        if (direction === "left") {
            currentIndex -= 1;
            targetSlide = currentSlide.previousElementSibling;
        }
        if (direction === "right") {
            currentIndex += 1;
            targetSlide = currentSlide.nextElementSibling;
        }
        moveTrack(targetSlide);
        setButtons(currentIndex);
        setCurrentSlideClass(currentSlide, targetSlide);
        resetIndicators(indicators, currentIndex);
    }

    leftButton.addEventListener('click', function scrollLeft() {
        scroll("left");
    });
    rightButton.addEventListener('click', function scrollRight() {
        scroll("right");
    })

    indicators.forEach((indicator) => {
        indicator.addEventListener('click', function clickIndicator() {
            // console.log(`indicator number ${indicatorsArray.indexOf(indicator)}`);
            let currentSlide = document.querySelector('.current--slide');
            let targetSlide = slides[indicatorsArray.indexOf(indicator)];
            currentIndex = indicatorsArray.indexOf(indicator);
            moveTrack(targetSlide);
            setCurrentSlideClass(currentSlide, targetSlide);
            setButtons(currentIndex);
            resetIndicators(indicators, currentIndex);
        })
    });

})