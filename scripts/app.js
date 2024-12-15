
const button1 = document.querySelector(".button1")
const button2 = document.querySelector(".button2");


button1.addEventListener("click", () => {
    console.log("Вы кликнули!");
    button1.classList.add("pink")
  });
button2.addEventListener("click", () => {
    flashlight.classList.add("none")
  });
  
let mouseX = 0;
let mouseY = 0;
let flashlight = document.getElementById("flashlight");

//Detect touch device
const isTouchDevice = () => {
	try {
		//We try to create TouchEvent (it would fail for desktops and throw error)
		document.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
};
function getMousePosition(e) {
	try {
		//Get position of mouse or touch
		mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
		mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY;

		//Set the Xpos and Ypos variables to current mouse/touch position
		flashlight.style.setProperty("--Xpos", mouseX + "px");
		flashlight.style.setProperty("--Ypos", mouseY + "px");
	} catch (e) {}
}

//Update mouse position on mouse move / touch move
document.addEventListener("mousemove", getMousePosition);
document.addEventListener("touchmove", getMousePosition);
