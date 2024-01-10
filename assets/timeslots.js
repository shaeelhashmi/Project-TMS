
let time1 = document.getElementById("time1");
//getting the id of the timeslots dropdown
let days=document.getElementById("day1");
//getting the id of the days dropdown
days.addEventListener("change",function(){
   //create a function to compare the days and timeslots dropdown
   time1.innerHTML="";
   //clearing the select option so it doesnt append the timeslot of previously selected days with this 
   let t = [];
   //locally declaring this so that it gets destroyed once the function is completed
fetch("timeslots.json")
.then(response => response.json())
.then(timing => 
{
    for(let i = 0; i < timing.length; i++)
    {
       let t1 = timing[i];
       t.push(t1.name);
    }
 
fetch("data.json")//fetching this file to compare with the already available timeslots
.then(data=>data.json())
.then(timetable=>{
   if(timetable.length==0 || JSON.stringify(timetable) === '[]')
   {
      for(let i= 0 ; i < t.length; i++)
      {
         let option = document.createElement("option");
         option.text=t[i];
         option.value=t[i];
         time1.appendChild(option);
      }
      return false;
   }
let selectedday=days.options[days.selectedIndex].text;//getting the selected option
for(let j=0;j<timetable.length;j++)
{
if(selectedday==timetable[j].day)//comparing it with the data in the timetable file
{
for(let i=0;i<t.length;i++)
{
   if(t[i]==timetable[j].Time)
   {
      t.splice(i, 1);//removing the timeslot that is already used
      i--;
   }
 }

}
}
for(let i= 0 ; i < t.length; i++)
{
   let option = document.createElement("option");
   option.text=t[i];
   option.value=t[i];
   time1.appendChild(option);
}
if(time1.options.length==0)
{
   alert("All timeslots have been filled for this particular day");//For the case if all timeslots have been filled
   location.reload();
   return false;
}

})
.catch((error)=>{//error handling if in case the data.json file is empty
   if (error instanceof SyntaxError && error.message === 'Unexpected end of JSON input')
   {  
   for(let i= 0 ; i < t.length; i++)
    {
       let option = document.createElement("option");
       option.text=t[i];
       option.value=t[i];
       time1.appendChild(option);
    }
   }
   else
   {
      console.log("Error:", error);
   }
})
}) })
