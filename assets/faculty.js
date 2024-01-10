//creating empty arrays to store data of json files
let names=[];
let coursename=[];
//fetching json data
fetch("faculty.json")
//As fetch is an asynchronous function so then is written and then it is read into the variables
  .then(response => response.json())
  //the response text is used to read json file and then converts it into js format
  //then it is stored in the data variable
  .then(data => {
   
    data.forEach(faculty => {
      //the code is written inside the then so that the information is accessed only if the data has been fetched
      names.push(faculty.name);
      coursename.push(faculty.Courses);
  
      
    });
    let opt=document.getElementById("faculty1");
    let opt1=document.getElementById("course1");

    //creating a loop to add options to the select element
   for(let i=0;i<names.length;i++)
    {
      let option = document.createElement("option");
      option.text = names[i];
      option.value=names[i];
       opt.appendChild(option);
    }
    //adding a listener so that every time an option is selected it just shows the subjects 
    opt.addEventListener("change",function() {
      opt1.innerHTML=''
      let a=opt.selectedIndex;
      let s=coursename[a-1];
      for(let i=0;i<s.length;i++)
      {
        let option1 = document.createElement("option");
      option1.text = s[i];
      option1.value=s[i];
      opt1.appendChild(option1);
      }
    });
    //adding options to select element
  
  });

  
  