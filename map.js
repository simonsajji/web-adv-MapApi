const form=document.getElementById("form");

// const dur=document.getElementById("duration");
// const optns=document.getElementById("optns");

const submit=document.getElementById("submit");
const list_ctn=document.getElementById("list_ctn");

let disp_title;
let disp_time;
let log_data;
var popup;
var marker;
var current_location;



// submit.addEventListener("click",formHandler);

navigator.geolocation.getCurrentPosition(onSuccess,onError);


const populateList =(log_dat)=>{

    list_ctn.innerHTML="";

    // console.log(log_dat);
    log_dat.forEach((item)=>{
        let li=document.createElement('div');
        li.classList.add("list");
        let title_txt=document.createElement('div');
        let time_txt=document.createElement('div');
        title_txt.classList.add("title_txt");
        time_txt.classList.add("time_txt");

        title_txt.textContent=item.title;
        time_txt.textContent=item.time;

        li.appendChild(title_txt);
        li.appendChild(time_txt);

        list_ctn.appendChild(li);


        
        


    })

}






// This is a success function
function onSuccess(event){  

    // We need to take our location coords and paste in setView 
    mycoords=[event.coords.latitude,event.coords.longitude];

    var map = L.map('map').setView(mycoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker=L.marker(mycoords).addTo(map)
        .bindPopup("popup")
        .openPopup();

    
    

    // Creation of popup

    popup=L.popup()
    .setLatLng(mycoords)
    .setContent(`${mycoords[0]} ${mycoords[1]}`)

    .openOn(map);

    // Creation of marker

   

    
    function createMarker(pop){
         L.marker(current_location).addTo(map)
		.bindPopup(pop).openPopup();

    } 

    map.on('click',function(mapEvent){
        form.classList.remove("hidden");
        // dur.value="";
        log_data=[];  
    

     
        current_location=[mapEvent.latlng.lat,mapEvent.latlng.lng];
        

        if(localStorage.getItem('data')){  //If there is data present in the local storage then we have to insert it into the Array so even   if we refresh the page it wont erase the previous data.

            log_data=JSON.parse(localStorage.getItem('data'));
        }
         
     

      

        



    });


    submit.addEventListener("click",function formHandler(ev){
            
        ev.preventDefault();
                    
        const dur=document.getElementById("duration");
        const optns=document.getElementById("optns");
     
        console.log("clicked submit");
        const title=optns.value;
        const time=dur.value;
        const data={
            title:title,
            time:time
        }
    
        form.classList.add("hidden");
        console.log(log_data);
    
        log_data.push(data);
        
        populateList(log_data);
        // console.log(log_data);
    
        localStorage.setItem('data',JSON.stringify(log_data));
    
        disp_title=title;
        disp_time=time;
        console.log(disp_title,disp_time);
    
    
        popup.setLatLng(current_location)
            .setContent(`${disp_title} ${disp_time}`)
        
            .openOn(map);



        createMarker(popup);
    
    
    
    
          
    });

}


// This is a failure fucntion

function onError(){
    alert("Cannot get your location!")
}
