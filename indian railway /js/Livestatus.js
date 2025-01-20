let datePicker = document.getElementById('datePicker');

let today = new Date();
let yesterday = new Date(Date.now() - 864e5);
let before_yest = new Date(Date.now() - 1728e5);


function dateFormatter(day) {
	let dd = String(day.getDate()).padStart(2, '0');
	let mm = String(day.getMonth() + 1).padStart(2, '0'); 
	let yyyy = day.getFullYear();

	return dd + '-' + mm + '-' + yyyy;
}

function dateUnFormatter(day) {
	let dd = String(day.getDate()).padStart(2, '0');
	let mm = String(day.getMonth() + 1).padStart(2, '0'); 
	let yyyy = day.getFullYear();

	return yyyy + mm + dd;
}


datePicker.options[0].text = dateFormatter(today);
datePicker.options[1].text = dateFormatter(yesterday);
datePicker.options[2].text = dateFormatter(before_yest);

let form = document.getElementById('form');

		form.addEventListener('submit', function response(e){
			e.preventDefault();
			let train_no = document.getElementById('train_no').value ;
			let date = datePicker.options[datePicker.selectedIndex].text;
			let day = date.slice(0,2);
			let month = date.slice(3,5);
			let year = date.slice(6);
			let newDate = year + month + day;
			let loading = document.getElementById('loading');
			const url = `https://indianrailapi.com/api/v2/livetrainstatus/apikey/b7405bbb65a5f7d6acae218b1fbdbc65/trainnumber/${train_no}/date/${newDate}/`;

			loading.style.display = 'block' ;
			fetch(url)
			.then((res) => res.json())
			.then(function(data)
			{
				console.log(data);
				loading.style.display = 'none' ;
				if(data.ResponseCode !== "200"){
					alert('Please re-check your details');
				}
				else{

				document.getElementById('response').innerHTML = `<h5>Current Station</h5>
																<table class="table border">
																  <thead class="bg-primary text-white">
																    <tr>
																      <th scope="col">S.No</th>
																      <th scope="col">Station Name[code]</th>
																      <th scope="col">Schedule Arrival</th>
																      <th scope="col">Actual Arrival</th>
																      <th scope="col">Delay</th>
																      <th scope="col">Schedule Departure</th>
																      <th scope="col">Actual Departure</th>
																      <th scope="col">Delay</th>
																    </tr>
																  </thead>
																  <tbody>
																    <tr>
																      <th scope="row">1</th>
																      <td>${data.CurrentStation.StationName}[ ${data.CurrentStation.StationCode} ]</td>
																      <td>${data.CurrentStation.ScheduleArrival}</td>
																      <td>${data.CurrentStation.ActualArrival}</td>
																      <td>${data.CurrentStation.DelayInArrival}</td>
																      <td>${data.CurrentStation.ScheduleDeparture}</td>
																      <td>${data.CurrentStation.ActualDeparture}</td>
																      <td>${data.CurrentStation.DelayInDeparture}</td>
																    </tr>																  
																   </tbody>
																</table>
																
																<h5>Train Route</h5>
																<table class="table border">
																  <thead class="bg-primary text-white">
																    <tr>
																      <th scope="col">Station Name[code]</th>
																      <th scope="col">Schedule Arrival</th>
																      <th scope="col">Actual Arrival</th>
																      <th scope="col">Delay</th>
																      <th scope="col">Schedule Departure</th>
																      <th scope="col">Actual Departure</th>
																      <th scope="col">Delay</th>
																    </tr>
																  </thead>
																  <tbody>
																	${data.TrainRoute.map(function(route){
																		return `
																		<tr>
																		<th>${route.StationName} [ ${route.StationCode} ]</th>
																		<th>${route.ScheduleArrival}</th>
																		<th>${route.ActualArrival}</th>
																		<th>${route.DelayInArrival}</th>
																		<th>${route.ScheduleDeparture}</th>
																		<th>${route.ActualDeparture}</th>
																		<th>${route.DelayInDeparture}</th>
												
																		</tr>

																		`
																	}).join("")

																	}
																  </tbody>
																 

																</table>
																`
					}
			 });
		})
