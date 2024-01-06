// For smooth scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// For the circle which follows the cursor
function circleFollow(){
    window.addEventListener('mousemove',function(details){
        document.querySelector("#miniCircle").style.transform=`translate(${details.clientX-5}px,${details.clientY-10}px)`;
    });
}
circleFollow();

// Animations for the first page 
let tl=gsap.timeline();
tl.from('#nav_bar a,#nav_bar h3',{
    y:-200,
    duration:1,
    opacity:0,
    stagger:0.2
});

tl.from('#heading h1,#heading h3',{
    y:200,
    duration:1,
    opacity:0,
    stagger:0.2
})

tl.from('#sub_headings h3',{
    y:200,
    duration:0.7,
    opacity:0,
})


// For the images in project
document.querySelectorAll(".project").forEach(function(project){
    let rotate=0;
    let diffRot=0;
    project.addEventListener('mousemove',function(details){
        let diff=details.clientY-project.getBoundingClientRect().top;
        diffRot=details.clientX-rotate;
        rotate=details.clientX
        gsap.to(project.querySelector('img'),{
            opacity:1,
            top:diff,
            left:details.clientX,
            // Clamp sets the min and max values
            rotate:gsap.utils.clamp(-20,20,diffRot*0.5),
            ease:Power3,
        })
        gsap.to(project.querySelector('h1'),{
            opacity:0.3,
            x:80,
            ease:Power3
        })
        gsap.to(project.querySelector('h4'),{
            opacity:0.3,
            ease:Power3
        })
    })
});

// To make the image disappear when cursor leaves
document.querySelectorAll(".project").forEach(function(project){
    project.addEventListener('mouseleave',function(details){
        gsap.to(project.querySelector('img'),{
            opacity:0
        })
        gsap.to(project.querySelector('h1'),{
            opacity:0.7,
            x:0
        })
        gsap.to(project.querySelector('h4'),{
            opacity:1
        })
    })
});

// Clock/time
function startTime(){
    const today=new Date();

    let h=today.getHours();
    let m=today.getMinutes();
    let s=today.getSeconds();

    let temp=h+":"+m+":"+s;
    temp=convertTo12HourFormat(temp);

    document.getElementById("time").innerHTML=temp;
    setTimeout(startTime,1000);
} 
startTime();

// Function to convert native JS time of 24 hour cycle to 12 hour cycle
function convertTo12HourFormat(time24) {
    // Parse the input time string
    const [hours, minutes, seconds] = time24.split(':').map(Number);
  
    // Check if the input is a valid 24-hour time
    if (
      isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
      hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59
    ) {
      return 'Invalid time format';
    }
  
    // Convert to 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 to 12
  
    // Format the result
    const time12 = `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
  
    return time12;
}