// Check If There's Local Storge Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {

    document.documentElement.style.setProperty('--main-color', mainColors);

    // Remove Active Class From All Colors list Item
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove('active');

    });

}

// Random Background Option
let backgroundOption = true;
// Variable To Control The Interval 
let backgroundInterval;
// Check If There's Local Storge Random Background Items 
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storge Is Not Empty
if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;

    } else {

        backgroundOption = false;

    }

    // Remove Active Class From All Spans 
    document.querySelectorAll('.random-backgrounds span').forEach(element => {

        element.classList.remove("active");

        if (backgroundLocalItem === 'true') {

            document.querySelector(".random-backgrounds .yes").classList.add("active");

        } else {

            document.querySelector(".random-backgrounds .no").classList.add("active");

        }
    })
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings i").onclick = function () {

    // Toggle Class fa-spin For Rotation On Self 
    this.classList.toggle('fa-spin');

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");

}

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items 
colorLi.forEach(li => {

    // Click On Every List Items 
    li.addEventListener("click", (e) => {

        // Set Color on Root 
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Set Color On local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);

    });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans 

randomBackEl.forEach(span => {

    // Click On Every Span
    span.addEventListener("click", (e) => {
        
        handleActive(e);
        
        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);

        } else {

            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);

        }
    });
});

// Select Landing Page Element 
let landingPage = document.querySelector(".landing-page");
// Get Array Of Imgs 
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];


// Function To Randomize Imgs 
function randomizeImgs() {

    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {

            // Get Random Number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            // Change Background Image Url
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';

        }, 5000);

    }
}

randomizeImgs();

window.onload = function () {

    let randomNumber = Math.floor(Math.random() * imgsArray.length);

    // Change Background Image Url
    landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';

}

// Select Skills Selector 
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills Offset Top 
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height 
    let windowHeight = this.innerHeight;

    // Window Scrolltop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skills .skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
            // console.log(skill.style.width = skill.dataset.progress)

        })
    
    }
};
// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img"); 

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // Create Overlay Element 
        let overlay = document.createElement("div");

        // Add Class to To Overlay 
        overlay.className = 'popup-overlay';

        // Append Overlay To The Body 
        document.body.appendChild(overlay)

        // Create The popup 
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box 
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            // Create Heading 
            let imgHeading = document.createElement("h3");

            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            // Append The Text To Heading
            imgHeading.appendChild(imgText);

            // Append The heading To The Popup box 
            popupBox.appendChild(imgHeading);
        }

        // Create The Image 
        let popupImage = document.createElement("img");
        
        // set Image Src 
        popupImage.src = img.src;

        // Add Image To Popup box 
        popupBox.appendChild(popupImage);

        // Append The Popup Box To body 
        document.body.appendChild(popupBox)

        // Create The Close span 
        let closeButton = document.createElement("span");

        // Create close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append Text To Close Button 
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button
        closeButton.className = 'close-button';
        
        // Add Close button To The Popup box 
        popupBox.appendChild(closeButton);
    })
});

// Close Popup 
document.addEventListener("click", function (e) {

    if (e.target.className == 'close-button') {
        
        // Remove The Current popup 
        e.target.parentNode.remove();

        // Remove Overlay 
        document.querySelector(".popup-overlay").remove();
    }
});

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(elements) {
    
    elements.forEach(ele => {
        
        ele.addEventListener('click', (e) => {
            
            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                
                behavior: "smooth"
                
            });
        });
    });
}
scrollToSomeWhere(allLinks);
scrollToSomeWhere(allBullets);

// Handle Active State
function handleActive(ev) {

    // Remove Active Class From All Children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        
        element.classList.remove('active');

    });

    // Add Acive Class On Self
    ev.target.classList.add('active');
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    });

    if (bulletLocalItem === 'block') {
        
        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add('active');

    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add('active');
    }
}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {
        
        if (span.dataset.display === 'show') {
            
            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", "block");

        } else {
            
            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", "none");
        }
        handleActive(e);

    });
    
})

// Reset Button 
document.querySelector(".reset-options").onclick = function () {

    // localStorage.clear();
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    // Reload Window
    window.location.reload();
};

// toggle menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    // Stop Propagation
    e.stopPropagation();

    // toggle class "menu-active" on button
    this.classList.toggle("menu-active");

    // toggle class "open" on links
    tLinks.classList.toggle('open');

};
// Click anywhere Outside menu and toggle button 
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // check if menu is open 
        if (tLinks.classList.contains("open")) {
            
            // toggle class "menu-active" on button
            toggleBtn.classList.toggle("menu-active");

            // toggle class "open" on links
            tLinks.classList.toggle('open');
        }

    }
});

// stopPropagation on menu 
tLinks.onclick = function (e) {
    
    e.stopPropagation();
}