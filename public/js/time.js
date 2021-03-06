var trace = function(str){ console.log(str); };

var timeData;
var enterFrame;
var loop = false;
var light;
var first = false;

var fader;

function time_init(event)
{
	trace(this);

	fader = document.querySelector("#display .fader");

	timeData = {};

	timeData.face = {};
	timeData.face.main = document.querySelector("#display .time p");
	timeData.face.h = document.querySelector("#display .th");
	timeData.face.m = document.querySelector("#display .tm");
	timeData.face.s = document.querySelector("#display .ts");

	timeData.data = new Date(Date.now());

	timeData.read = {};
	timeData.read.h = timeData.data.getHours();
	timeData.read.m = timeData.data.getMinutes();
	timeData.read.s = timeData.data.getSeconds();

	timeData.current = {};
	timeData.current.h = timeData.read.h;
	timeData.current.m = timeData.read.m;
	timeData.current.s = timeData.read.s;

	timeData.face.h.innerHTML = timeDisplay_create("H");
	timeData.face.m.innerHTML = timeDisplay_create("M");
	timeData.face.s.innerHTML = timeDisplay_create("S");

	light = {};
	light.source = document.querySelector("#display .bg");
	light.settings = ['light-early-morning', 'light-morning', 'light-day', 'light-afternoon', 'light-evening', 'light-night'];
	light.select = 0;
	light.current = 0;
	light.dayType = "";
	light.dayTypeCurrent = "";

	light.icon = {};
	light.icon.sun 					= document.querySelector("#display .char-sun");
	light.icon.moon 				= document.querySelector("#display .char-moon");
	light.icon.sun.sprite 	= document.querySelector("#display .char-sun .sprite");
	light.icon.moon.sprite 	= document.querySelector("#display .char-moon .sprite");

	first = true;

	timeDisplay_light();

	enterFrame_init(true);

	time_show();

	trace(timeData.data);
}

function time_show()
{
	fader.addEventListener("transitionend", time_show_event, false);
	fader.classList.add("timeChange");
}

function time_show_event(event)
{
	fader.removeEventListener("transitionend", time_show_event, false);
	// fader.parentNode.removeChild(fader);
	fader.remove();
}

function enterFrame_init(run)
{
	if(run)
	{
		loop = true;
		enterFrame = window.requestAnimationFrame(enterFrame_loop);
	}

	else
	{
		loop = false;
		window.cancelAnimationFrame(enterFrame);
	}
}

function enterFrame_loop()
{
	timeData.data = new Date(Date.now());

	timeData.read.h = timeData.data.getHours();
	timeData.read.m = timeData.data.getMinutes();
	timeData.read.s = timeData.data.getSeconds();

	// SECOND UPDATE
	if(timeData.read.s != timeData.current.s)
	{
		timeDisplay_update();
	}

	// REFRESH
	if(loop)
	{
		enterFrame = window.requestAnimationFrame(enterFrame_loop);
	}
}

function timeDisplay_update()
{
	if(timeData.read.h != timeData.current.h)
	{
		timeData.face.h.addEventListener("transitionend", timeDisplay_event, false);
		timeData.face.h.classList.add('timeChange');
	}

	if(timeData.read.m != timeData.current.m)
	{
		timeData.face.m.addEventListener("transitionend", timeDisplay_event, false);
		timeData.face.m.classList.add('timeChange');
	}

	if(timeData.read.s != timeData.current.s)
	{
		timeData.face.s.addEventListener("transitionend", timeDisplay_event, false);
		timeData.face.s.classList.add('timeChange');
	}
}

function timeDisplay_create(u)
{
	var dd_h = "";
	var dd_m = "";
	var dd_s = "";
	var timeString = "";

	switch(u)
	{
		case "H":
		{
			if(timeData.read.h < 10)
			{
				dd_h = "0";
			}

			timeString = dd_h + timeData.read.h;

			break;
		}

		case "M":
		{
			if(timeData.read.m < 10)
			{
				dd_m = "0";
			}

			timeString = dd_m + timeData.read.m;

			break;
		}

		case "S":
		{
			if(timeData.read.s < 10)
			{
				dd_s = "0";
			}

			timeString = dd_s + timeData.read.s;

			break;
		}
	}

	return timeString;
}

function timeDisplay_event(event)
{
	var unit = event.target.classList[0];

	if(unit === "th")
	{
		timeData.face.h.removeEventListener("transitionend", timeDisplay_event, false);

		timeData.face.h.innerHTML = timeDisplay_create("H");
		timeData.current.h = timeData.read.h;

		timeData.face.h.classList.remove('timeChange');

		timeDisplay_light();
	}

	if(unit === "tm")
	{
		timeData.face.m.removeEventListener("transitionend", timeDisplay_event, false);

		timeData.face.m.innerHTML = timeDisplay_create("M");
		timeData.current.m = timeData.read.m;

		timeData.face.m.classList.remove('timeChange');

		timeDisplay_minute();
	}


	if(unit === "ts")
	{
		timeData.face.s.removeEventListener("transitionend", timeDisplay_event, false);

		timeData.face.s.innerHTML = timeDisplay_create("S");
		timeData.current.s = timeData.read.s;

		timeData.face.s.classList.remove('timeChange');
	}
}

function timeDisplay_minute()
{
	timeData.face.main.addEventListener("animationend", timeDisplay_minute_event, false);
	timeData.face.main.classList.add("time-loop");
}

function timeDisplay_minute_event(event)
{
	timeData.face.main.removeEventListener("animationend", timeDisplay_minute_event, false);
	timeData.face.main.classList.remove("time-loop");
}

function timeDisplay_light()
{
	var newLight = false;

	trace("ENTER === " + timeData.current.h);

	// NIGHT
	if(timeData.current.h >= 0 && timeData.current.h < 5)
	{
		if(light.current != 5)
		{
			light.select = 5;
			newLight = true;
		}
	}

	// EARLY MORNING
	else if(timeData.current.h >= 5 && timeData.current.h < 9)
	{
		if(light.current != 0)
		{
			light.select = 0;
			newLight = true;
		}
	}

	// MORNING
	else if(timeData.current.h >= 9 && timeData.current.h < 12)
	{
		if(light.current != 1)
		{
			light.select = 1;
			newLight = true;
		}
	}

	// DAY
	else if(timeData.current.h >= 12 && timeData.current.h < 15)
	{
		if(light.current != 2)
		{
			light.select = 2;
			newLight = true;
		}
	}

	// AFTERNOON
	else if(timeData.current.h >= 15 && timeData.current.h < 19)
	{
		if(light.current != 3)
		{
			light.select = 3;
			newLight = true;
		}
	}

	// EVENING
	else if(timeData.current.h >= 19 && timeData.current.h < 22)
	{
		if(light.current != 4)
		{
			light.select = 4;
			newLight = true;
		}
	}

	// NIGHT
	else if(timeData.current.h >= 22 && timeData.current.h < 24)
	{
		if(light.current != 5)
		{
			light.select = 5;
			newLight = true;
		}
	}

	if(newLight)
	{
		timeDisplay_lightApply();
	}
}

function timeDisplay_lightApply()
{
	light.source.classList.remove(light.settings[light.current]);
	light.source.classList.add(light.settings[light.select]);
	light.current = light.select;

	if(first)
	{
		first = false;
		light.source.classList.add("tween");
	}

	timeDisplay_dayTypeSort();
}

function timeDisplay_dayTypeSort()
{
	// 0 - 7 MOON
	if(timeData.current.h >= 0 && timeData.current.h < 7)
	{
		light.dayType = "NIGHT";
	}

	//7 - 20 SUN
	else if(timeData.current.h >= 7 && timeData.current.h < 20)
	{
		light.dayType = "DAY";
	}

	// 20 - 23 MOON
	else if(timeData.current.h >= 20 && timeData.current.h < 23)
	{
		light.dayType = "NIGHT";
	}

	// APPLY THE CHANGE
	if(light.dayType !== light.dayTypeCurrent)
	{
		timeDisplay_dayTypeApply();
	}
}

function timeDisplay_dayTypeApply()
{
	var target1;
	var target2;

	if(light.dayType === "DAY")
	{
		target1 = light.icon.moon;
		target2 = light.icon.sun;
	}

	else if(light.dayType === "NIGHT")
	{
		target1 = light.icon.sun;
		target2 = light.icon.moon;
	}

	if(target1 && target2)
	{
		target1.classList.add("char-hide");
		target1.addEventListener("transitionend", timeDisplay_dayTypeApplyEvent, false);

		target2.sprite.classList.add("tween");
		target2.classList.remove("char-hide");

		light.dayTypeCurrent = light.dayType;
	}
}

function timeDisplay_dayTypeApplyEvent(event)
{
	var target;

	if(light.dayType === "DAY")
	{
		target = light.icon.moon;
	}

	else if(light.dayType === "NIGHT")
	{
		target = light.icon.sun;
	}

	if(target)
	{
		target.removeEventListener("transitionend", timeDisplay_dayTypeApplyEvent, false);
		target.icon.classList.remove("tween");
	}
}


