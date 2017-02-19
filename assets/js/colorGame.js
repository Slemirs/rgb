// nest all neccessary element in variable
var h1 = document.querySelector("h1");
var square = document.querySelectorAll(".square"); 
var colorDisplay = document.getElementById("colorDisplay"); //display color which we must find
var reload = document.querySelector("#reload"); //button for update all colors
var statusDisplay = document.querySelector("#statusDisplay"); // span for displat status of our choose (wrong/correct)
// buttons for difficulty
var easyBtn = document.querySelector("#easyBtn"); 
var hardBtn = document.querySelector("#hardBtn");
// for color
var backColor = "steelblue";
// variables for logic
var colors;
var pickedColor;
var numSquares = 6;

// functions
	// change color if correct
function changeColor(colors){
	for( var i = 0; i < square.length; i++ ){
		square[i].style.background = colors;
	}
};
	// random rgb value from array
function pickColor(arr) {
	var random = Math.floor(Math.random() * colors.length);
	return arr[random]
}
	// push generated color into array 
function generateRandomColors(num){
	// setup array
	var arr = [];
	// generate random num colors for array
	for( var i = 0; i < num; i++){
		arr.push(generateRgbColors());
	}
	// result
	return arr
}
	// generate rgb
function generateRgbColors(){
	// generate Red
	var r = Math.floor(Math.random() * 256);
	// generate Green
	var g = Math.floor(Math.random() * 256);
	// generate Blue
	var b = Math.floor(Math.random() * 256);
	// result
	var result = "rgb(" + r + ", " + g + ", " + b + ")";
	return result
}
	// reset button
function resetGame(){
	// reload colors for squares
	colors = generateRandomColors(numSquares);
	// pick new random color
	pickedColor = pickColor(colors);
	// change value of picked color
	colorDisplay.textContent = pickedColor;
	// change status of choose
	statusDisplay.textContent = "";
	// change text rest btn
	reload.textContent = "New color"
	// change colors for square
	for( var i = 0; i < square.length; i++ ){
		// add initial colors for squares
		square[i].style.background = colors[i];
	}
	// reset background for h1
	h1.style.background = backColor;
}

// logic
// variables for logic
colors = generateRandomColors(numSquares);
pickedColor = pickColor(colors); 
colorDisplay.textContent = pickedColor;
reload.addEventListener("click", resetGame);

easyBtn.addEventListener("click", function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	statusDisplay.textContent = "";
	reload.textContent = "New color"
	numSquares = 3;
	h1.style.background = backColor;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor(colors); 
	colorDisplay.textContent = pickedColor;
	for( var i = 0; i < square.length; i++ ){
		if(colors[i]){
			square[i].style.background = colors[i];
		}else{
			square[i].style.display = "none";
		}
		
	}
});

hardBtn.addEventListener("click", function(){
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	statusDisplay.textContent = "";
	reload.textContent = "New color"
	numSquares = 6;
	h1.style.background = backColor;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor(colors); 
	colorDisplay.textContent = pickedColor;
	for( var i = 0; i < square.length; i++ ){
		square[i].style.background = colors[i];
		square[i].style.display = "block";
	}
});

for( var i = 0; i < square.length; i++ ){
	// add initial colors for squares
	square[i].style.background = colors[i];

	square[i].addEventListener("click", function(){
		var clickedColor = this.style.background;

		if (clickedColor === pickedColor){
			statusDisplay.textContent = "Correct!";
			statusDisplay.style.color = "green";
			reload.textContent = "Play Again?";
			changeColor(pickedColor);
			h1.style.background = pickedColor;
		}
		else{
			this.style.background = "#232323";
			statusDisplay.textContent = "Oops, Try Again!";
			statusDisplay.style.color = "red";
		}
	});
	
}