let time=[]
let addbtn=document.getElementById("add");
let obj1=
{
day:"",
Time:"",
room:"",
Name:"",
Course:""
}
let index=Object.keys(obj1);
addbtn.addEventListener("click",function(){
let check=document.querySelectorAll(".option");
for(let i=0;i<check.length;i++)
{
    if(check[i].selectedIndex==0)
    {
       alert("Select all options");
       location.reload();
       return false
    }
}
let a=document.querySelectorAll(".opt1");//store classes of all option elements
for(let i=0;i<a.length;i++)
{
    let selectedIndex = a[i].selectedIndex;//the new index which the user selects
    let index1 = a[i].options[selectedIndex];//the options which are stored at the selected index
    let selectedOptionText = index1.textContent;//Text content of the options
    obj1[index[i]]=selectedOptionText;
}
//saving data to file
fetch("data.json")//reading file so already written data isnt overwritted
.then(response=>response.json())
.then(timetable=>{
        time=timetable;
        time.push(obj1);
        fetch("/saveData", {//fetching endpoint in app.js file
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(time),
        })
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
          location.reload();
    })
    .catch((error) => {
      if (error instanceof SyntaxError && error.message === 'Unexpected end of JSON input')
      {
        time.push(obj1);
        fetch("/saveData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(time),
        })
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
          location.reload();
        }
        else
        {
          console.log("Error: "+error);
        }
    });   
});    
    