let form = document.getElementById('form');

		form.addEventListener('submit', function response(e){
			e.preventDefault();
			let train_no = document.getElementById('train_no').value ;
			let From = document.getElementById('from').value;
			let To = document.getElementById('to').value;
			let opt = document.getElementById('quota');
			let Quota = opt.options[opt.selectedIndex].text;
			let loading = document.getElementById('loading');
			//api url
			const url = `https://indianrailapi.com/api/v2/TrainFare/apikey/b7405bbb65a5f7d6acae218b1fbdbc65/TrainNumber/${train_no}/From/${From}/To/${To}/Quota/${Quota}`;

			loading.style.display = 'block' ;
			
			//Fetching API data
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

				document.getElementById('response').innerHTML = `<table class="table border">
																  <thead class="bg-primary text-white">
																    <tr>
																      <th scope="col">S.No</th>
																      <th scope="col">Train Name</th>
																      <th scope="col">Source</th>
																      <th scope="col">Destination</th>
																      <th scope="col">Distance</th>
																      <th scope="col">Train Type</th>
																    </tr>
																  </thead>
																  <tbody>
																    <tr>
																      <th scope="row">1</th>
																      <td>${data.TrainName}</td>
																      <td>${data.From}</td>
																      <td>${data.To}</td>
																      <td>${data.Distance}</td>
																      <td>${data.TrainType}</td>
																    </tr>																  
																   </tbody>
																</table>

																<table class="table border">
																  <thead class="bg-primary text-white">
																    <tr>
																      <th scope="col">S.No</th>
																      <th scope="col">Name</th>
																      <th scope="col">Code</th>
																      <th scope="col">Fare</th>
																    </tr>
																  </thead>
																  <tbody>
																	${data.Fares.map(function(fare){
																		return `
																		<tr>
																		<th scope="row">1</th>
																		<th>${fare.Name}</th>
																		<th>${fare.Code}</th>
																		<th>${fare.Fare}</th>
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
