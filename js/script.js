import router from "./router.js";
const $ = document;
let contentElem = $.querySelector('#content');

// spa handller
$.addEventListener('click', (event)=>{
    
    if(!event.target.className.includes('navbar-menu-item')){
        return false;
    } 
    
    event.preventDefault();
    let fintdRoute = event.target.href.split("/")
    let getRoute = "/"+fintdRoute[fintdRoute.length -1];
    // urlRoutes(event);
    locationHandler(getRoute)
});

// function urlRoutes(event){
//     window.history.pushState({},"", event.target.href)
// }

async function locationHandler(location){
    // const location = window.location.pathname;
    
    const route = router[location] || router[404];

    const htmlContent = await fetch(route.template).then(res  => res.text())

    contentElem.innerHTML = htmlContent;
    document.title = route.title;
}
window.onpopstate = locationHandler;

// theme color handler
let themeToggleBtn = $.getElementById('themeToggle');
let themeToggleLightIcon = document.getElementById('lightIcon');
let themeToggleDarkIcon = document.getElementById('darkIcon');
let themeColor;
// Change the icons inside the button based on previous settings
if (localStorage.getItem('cv-them-color') === 'dark' || (!('cv-them-color' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}
themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('cv-them-color')) {
        if (localStorage.getItem('cv-them-color') === 'light') {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            localStorage.setItem('cv-them-color', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('cv-them-color', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('cv-them-color', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('cv-them-color', 'dark');
        }
    }
    
});
function getThemeColor(){
    return localStorage.getItem('cv-them-color')
}
function setThemeColor(){
    themeColor = getThemeColor();
    if(themeColor){
        if(themeColor === 'dark' ){
            document.documentElement.className = 'dark';
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
        }else{
            document.documentElement.className = 'light';
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        }
    }
    return
}

window.addEventListener('load', setThemeColor)


// Type It
document.addEventListener("DOMContentLoaded", function () {
    new TypeIt("#typeItElem", {
        loop: true,
        speed: 150,
    }).go();
});

  // handle active menu
let listMenuElems = $.querySelectorAll('.menu');

listMenuElems.forEach(menu => {
    menu.addEventListener("click", ()=>{
        listMenuElems.forEach(item =>{
            if (item.classList.contains('active-item')){
                item.classList.remove('active-item')
            }
        })
        menu.classList.add('active-item');
    });
});
