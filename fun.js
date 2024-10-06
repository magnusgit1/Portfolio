
document.addEventListener('DOMContentLoaded', initSmoothScrolling);

function initSmoothScrolling() {
    const menuLinks = document.querySelectorAll('.topmenu');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event){
            event.preventDefault(); //forhindre forflytning etter default
            
            // hent riktig seksjon fra href
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement){
                console.log('Scrolling to: ${targetId}');
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else{
                console.warn('Element with id ${targetId} not found.');
            }

            // rull ned til seksjonen med smooth scrolling
            
        });
    });
}

// funksjon til hjem-knapp
function scrollToTop(){
    window.scrollTo({
        top:0,
        behavior:'smooth'
    });
}

// Meldingsfunksjon

document.getElementById("comms").addEventListener('submit', function(event){
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers:{
            'Accept': 'application/json'
        }
    }).then(response => {
        if(response.ok) {
            form.reset();
        
            document.getElementById('thank-you-message').style.display = 'block';
        } else{
            response.json().then(data => {
                if (data.errors){
                    alert(data.errors.map(error => error.message).join(", "));
                }
            });
        }
    }).catch(error =>{
        alert('An error occured when trying to send the message.');
    });
});

// prosjekt-objekt smooth transitioning mellom elementene
function toggleDetails(project){
    const details = project.querySelector('.project-details');
    details.classList.toggle('show');
    const detailItems = details.querySelectorAll('.detail-item');
    detailItems.forEach((item, index) => {
        if(details.classList.contains('show')){
            setTimeout(() => {
                item.classList.add('show');
            }, index*200);
        } else{
            item.classList.remove('show');
        }
    });
}
