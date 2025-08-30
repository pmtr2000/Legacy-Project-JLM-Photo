//Created by Pranas.NET 
var nextPage;
var playSpeed = 6;
var constFastestPlaySpeed = 2;
var constSlowestPlaySpeed = 6;
var constSpeedStep = -2;

//Called onPageLoad. Will set vars nextPage and playSpeed
function onImagePageLoad(varNextPage){
	nextPage= varNextPage;
	playSpeed=getQueryVariable("play");
	if (playSpeedIsValidNumber()) play();
}

//Schedules the execution of goNextIfNeeded()
function scheduleGoNext(){
	if(playSpeedIsValidNumber())
		setTimeout('goNextIfNeeded()', playSpeed * 1000);
}

//If all vars are set, will go to the next page
function goNextIfNeeded(){
	if(nextPage!=null && playSpeedIsValidNumber())
		window.location.href = nextPage + '?play='+playSpeed;
}

//Event hander for button Play. Increases speed and calls play()
function playClick(){
	if (playSpeedIsValidNumber()){
		playSpeed = playSpeed*1 + constSpeedStep;	//*1 to keep it numeric
		if (playSpeed < constFastestPlaySpeed) playSpeed=constSlowestPlaySpeed;
	} else
		playSpeed = constSlowestPlaySpeed + constSpeedStep;	//Start from medium speed
	play();
}
//Event hander for button Pause. Sets the playSpeed to 0 and resets images
function pauseClick(){
	playSpeed = 0;
	setButtonImages('btnPlay', 'btnPauseDisabled');
}

//Based on current playSpeed shows the correct buttons and schedules to go next
function play(){
	setButtonImages('btnPlay'+playSpeed, 'btnPause');
	scheduleGoNext();
}

//Sets images for buttons imgPlay and imgPause
function setButtonImages(imgPlayName, imgPauseName){
	//Change image on the play button
	var img;
	img = document.getElementById('imgPlay')
	if (img != null) img.src='../include/'+imgPlayName+'.gif';
	//Enable payse button
	img = document.getElementById('imgPause')
	if (img != null) img.src='../include/'+imgPauseName+'.gif'
}


//verifies that playSpeed variable is a valid number
function playSpeedIsValidNumber(){
	return playSpeed!=null && '123456789'.indexOf(playSpeed) > -1
}

function getQueryVariable(variable){
var query = window.location.search.substring(1);
var vars = query.split("&");
for (var i=0;i<vars.length;i++) {
var pair = vars[i].split("=");
if (pair[0] == variable) return pair[1];
}	return null; }
