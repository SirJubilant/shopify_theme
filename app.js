const bell = document.querySelector(".bell");
const storeMenu = document.querySelector(".nav-text");
const storeList = document.querySelector(".store-dropdown");
const alertMenu = document.querySelector(".alert-dropdown");
const close = document.querySelector(".close");
const trial = document.querySelector(".trial-section");
const mainContainer = document.querySelector(".setup-content");
const setupGuide = document.querySelectorAll(".setup-guide");
const subSection = mainContainer.querySelectorAll(".sub-section");
const range = document.querySelector(".range");
const totalSteps = range.querySelector(".total-steps");
const rangeBackground = range.querySelector(".range-background");

let rangeFill = range.querySelector(".range-fill");
let numVar = 0;
let completedSteps = document.querySelector(".completed-steps");
let activeSection;
let nextSection;
let activeItem;

const chevDown = document.querySelector(".open");
const chevUp = document.querySelector(".close-up");



// Event handlers for toggling the Viewing of the dropdown menus

bell.addEventListener("click", ()=> {  

      const isExpanded = bell.getAttribute("aria-expanded") === "true";
      bell.setAttribute("aria-expanded", isExpanded ? "false" : "true");

      hideView(storeList);
      toggleView(alertMenu);       
});

storeMenu.addEventListener("click", () => {
    const isExpanded = storeMenu.getAttribute("aria-expanded") === 'true';
    storeMenu.setAttribute("aria-expanded", isExpanded ? "false" : "true");

        hideView(alertMenu);
        toggleView(storeList);
});


close.addEventListener("click", ()=> hideView(trial));

// tracking completed tasks

totalSteps.innerText = subSection.length;


//collasping and expanding the main content section using the chevron icons.

chevDown.addEventListener("click", () => {
    
    showView(mainContainer);
    hideView(chevDown);
    showView(chevUp);
});

chevUp.addEventListener("click", () => {
   
    hideView(mainContainer);
    hideView(chevUp);
    showView(chevDown);
});


//navigating the setup guide section

setupGuide.forEach((section, index) => {
    
    const stepHeader = section.querySelector(".setup-header");
    const stepContent = section.querySelector(".item-text");
    const firstElem = setupGuide[0].querySelector('.item-text');
    const firstHeader = setupGuide[0].querySelector('.setup-header');

    const checkbox = section.querySelector("#checkbox");
    checkbox.addEventListener("change", ()=> {
        if (checkbox.checked){

            hideView(stepContent);
            section.classList.remove('section-focus');
            section.querySelector('.setup-header').style.fontWeight = '';

            const nextIndex = index + 1;

            if(nextIndex < setupGuide.length){
                const nextItemSection = setupGuide[nextIndex];
                const nextItemHeader = setupGuide[nextIndex].querySelector('.setup-header');
                const nextItemContent = setupGuide[nextIndex].querySelector('.item-text');

                showView(nextItemContent);
                nextItemHeader.style.fontWeight = '700';
                nextItemSection.classList.add('section-focus');             
            }
      
            numVar++;
            rangeFill.style.width = numVar * 12 + 'px';   
              
        }
        else {
            numVar--;
            rangeFill.style.width = numVar * 12 + 'px';  
        }
        completedSteps.innerText = numVar; 
    });
   
    // adds and removes focus state styles for each active section
    stepHeader.addEventListener("click", ()=> {

        if (activeSection) {
            activeSection.classList.remove('section-focus');
            activeSection.querySelector('.setup-header').style.fontWeight = '';
}      

        if (activeItem) {
            hideView(activeItem);
        }

        if (stepContent !== firstElem) {
            hideView(firstElem);
            firstHeader.style.fontWeight = '';
            setupGuide[0].classList.remove('section-focus');
        }

       
        toggleView(stepContent);    
        
        activeItem = stepContent;
        
        stepHeader.style.fontWeight = '700';
        section.classList.add('section-focus');
        activeSection = section;  
    });
 
    showView(firstElem);
    firstHeader.style.fontWeight = '700';
    setupGuide[0].classList.add('section-focus');
   
});

// function declarations

function toggleView(elem)
{
    // toggle View
     elem.classList.toggle("hide");

} 

function showView(elem)
{
    // remove View
    elem.classList.remove("hide");
    
} 

function hideView(elem)
{
    // show View
    elem.classList.add("hide");
}