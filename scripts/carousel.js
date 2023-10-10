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

    setSlidesPosition(slides);
    
    let currentIndex = 0;
    //initializing first position on carousel

    const leftButton = document.querySelector('.carousel__button--left');
    const rightButton = document.querySelector('.carousel__button--right');
    const indicators = document.querySelectorAll('.carousel__indicator');
    leftButton.style.display = "none";
   
    function scroll(direction) {
        let currentSlide = document.querySelector('.current--slide');
        let targetSlide = currentSlide;
    
        if (direction === "left") {
            currentIndex -= 1;
            targetSlide = currentSlide.previousElementSibling
        }
        if (direction === "right") {
            currentIndex += 1;
            targetSlide = currentSlide.nextElementSibling
        }
        currentSlide.classList.remove('current--slide');
        targetSlide.classList.add('current--slide');
        console.log(targetSlide.style.left);
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
        resetIndicators(indicators, currentIndex);
    }

    leftButton.addEventListener('click', function scrollLeft() {
        scroll("left");
    });
    rightButton.addEventListener('click', function scrollRight() {
        scroll("right");
    })

})