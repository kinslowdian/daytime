var trace = function(str){ console.log(str); };

var timeData;
var enterFrame;
var loop = false;
var light;

function time_init(event)
{
	trace(this);

	timeData = {};

	timeData.face = {};
	timeData.face.h = document.querySelector("#display .th");
	timeData.face.m = document.querySelector("#display .tm");
	timeData.face.s = document.querySelector("#display .ts");

	timeData.data = new Date(Date.now());

	timeData.read = {};
	timeData.read.h = 0;
	timeData.read.m = 0;
	timeData.read.s = 0;

	timeData.current = {};
	timeData.current.h = timeData.read.h;
	timeData.current.m = timeData.read.m;
	timeData.current.s = timeData.read.s;

	light = {};
	light.source = document.querySelector("#display .bg");
	light.settings = ['light-early-morning', 'light-morning', 'light-day', 'light-afternoon', 'light-evening', 'light-night'];
	light.select = 0;
	light.current = 0;

	enterFrame_init(true);

	trace(timeData.data);
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

function timeDisplay_event(event)
{
	var unit = event.target.classList[0];
	var dd_h = "";
	var dd_m = "";
	var dd_s = "";

	if(unit === "th")
	{
		timeData.face.h.removeEventListener("transitionend", timeDisplay_event, false);

		if(timeData.read.h < 10)
		{
			dd_h = "0";
		}

		timeData.face.h.innerHTML = dd_h + timeData.read.h;
		timeData.current.h = timeData.read.h;

		timeData.face.h.classList.remove('timeChange');

		timeDisplay_light();
	}

	if(unit === "tm")
	{
		timeData.face.m.removeEventListener("transitionend", timeDisplay_event, false);

		if(timeData.read.m < 10)
		{
			dd_m = "0";
		}

		timeData.face.m.innerHTML = dd_m + timeData.read.m;
		timeData.current.m = timeData.read.m;

		timeData.face.m.classList.remove('timeChange');
	}


	if(unit === "ts")
	{
		timeData.face.s.removeEventListener("transitionend", timeDisplay_event, false);

		if(timeData.read.s < 10)
		{
			dd_s = "0";
		}

		timeData.face.s.innerHTML = dd_s + timeData.read.s;
		timeData.current.s = timeData.read.s;

		timeData.face.s.classList.remove('timeChange');
	}
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
}
