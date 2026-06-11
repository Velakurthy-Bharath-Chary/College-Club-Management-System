fetch("http://localhost:5000/api/events")
.then(res => res.json())
.then(events => {

    console.log(events);

});