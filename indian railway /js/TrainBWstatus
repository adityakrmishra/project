let form = document.getElementById('form');

		form.addEventListener('submit', function response(e){
			e.preventDefault();
			let From = document.getElementById('from').value;
			let To = document.getElementById('to').value;
			let loading = document.getElementById('loading');
			const url = `https://indianrailapi.com/api/v2/TrainBetweenStation/apikey/b7405bbb65a5f7d6acae218b1fbdbc65/From/${From}/To/${To}`;
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

				document.getElementById('response').innerHTML = `<h5>Total Trains : ${data.TotalTrains}</h5>
																
																<table class="table border">
																  <thead class="bg-primary text-white">
																    <tr>
																      <th scope="col">Train No.</th>
																      <th scope="col">Train Name</th>
																      <th scope="col">Source</th>
																      <th scope="col">Departure Time</th>
																      <th scope="col">Destination</th>
																      <th scope="col">Arrival Time</th>
																      <th scope="col">Train Type</th>
																    </tr>
																  </thead>
																  <tbody>
																	${data.Trains.map(function(train){
																		return `
																		<tr>
																		<th>${train.TrainNo}</th>
																		<th>${train.TrainName}</th>
																		<th>${train.Source}</th>
																		<th>${train.DepartureTime}</th>
																		<th>${train.Destination}</th>
																		<th>${train.ArrivalTime}</th>
																		<th>${train.TrainType}</th>
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
