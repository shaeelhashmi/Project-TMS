let addingfaculty=document.getElementById("facbtn");
let popup=document.getElementById("popup")
let submitbtn=document.getElementById("facultysubmit");
let text=document.getElementById("facultyinput");
let exitbtn=document.getElementById("facultyexit");
let addingcourse=document.getElementById("courseadd");
let coursesubbtn=document.getElementById("coursesubmit");
let coursetext=document.getElementById("courseinput");
let exitbtn2=document.getElementById("courseexit2");
let savecourse=document.getElementById("courseexit");
let checkloop=0;
let removebtn=document.getElementById("remfac");
let removedata=document.getElementById("facultyremove");
let dropdown=document.getElementById("removefaculty");
let removefacultybtn=document.getElementById("removedata");
let newexitbtn=document.getElementById("remfacexitbtn");
let facdata={
  name:"",
  Courses:[]
};
newexitbtn.addEventListener("click",function(){
  removedata.classList.add("nodisplay");
  endcover();
})
function coverscreen()
{
  let cover=document.getElementById("coveringdiv");
  cover.classList.remove("nodisplay1");
}
function endcover()
{
  let cover=document.getElementById("coveringdiv");
  cover.classList.add("nodisplay1");
}
function clearinputs()
{
  let clearinputs=document.querySelectorAll(".inputele")
  for(let i=0;i<clearinputs.length;i++)
  {
    clearinputs[i].value=""
  }
}
exitbtn.addEventListener("click",function(){
  endcover();
  popup.classList.add("nodisplay");
  facdata={
    name:"",
    Courses:[]
  };
 clearinputs();
})
function checkemptystring(a)
{
    if(a=="")
    {
        return true;
    }
    else
    {
        return false;
    }
}
function formatData(a) 
{
 let sortedstring=""
 sortedstring+=a[0].toUpperCase();
  for(let i=1;i<a.length;i++)
 {
  if(a[i-1]==' ')
  {
    sortedstring+=a[i].toUpperCase();
  }
  else 
  {
    if(a[i]==a[i].toUpperCase())
    {
      sortedstring+=a[i].toLowerCase();
    }
    else
    {
      sortedstring+=a[i];
    }
    
  }
}
return sortedstring;
}

function compare(object, compareddata, property) {
    for (let i = 0; i < object.length; i++) 
    {
      let objProperty = object[i][property].toUpperCase();
      let comparedProperty = compareddata[property].toUpperCase();
      if (objProperty === comparedProperty) {
        alert("Name already stored");
        return false;
      }
    }
    return true;
  }

addingfaculty.addEventListener("click",function(){
  coverscreen();
popup.classList.remove("nodisplay");
removedata.classList.add("nodisplay");
})
fetch("faculty.json")
.then(faculty=>faculty.json())
.then(facstored=>{
    
    submitbtn.addEventListener("click",function(){
   a=checkemptystring(text.value);
   if(a)
   {
    alert("Do not pass empty data");
    return false;
   }

   facdata.name=text.value;
   let b=compare(facstored,facdata,"name");
   if(!b)
   {
    return false
   }
    addingcourse.classList.remove("nodisplay");
    popup.classList.add("nodisplay");
   
    
})
coursesubbtn.addEventListener("click",function(){
      
    
    a=checkemptystring(coursetext.value);
    if(a)
    {
     alert("Do not pass empty data");
     return false;
    }
    
    for(let i=0;i<facstored.length;i++)
    {
        for(let j=0;j<facstored[i].Courses.length;j++)
        {
            let comparevalue=facstored[i].Courses[j].toUpperCase();
            let comparetext=coursetext.value.toUpperCase();
            if(comparevalue==comparetext)
            {
                alert("Course already stored");
                return false;
            }
        }
    }
    if(checkloop>0)
    {
       let size=facstored.length;
        facstored[size-1].Courses.push(coursetext.value);
        console.log(facstored);
    }
    else
    {
        facdata.Courses.push(coursetext.value);
        facstored.push(facdata);
        checkloop++;
    }
    coursetext.value="";
   
   
})
exitbtn2.addEventListener("click",function(){
  endcover();
    addingcourse.classList.add("nodisplay");
    facdata={
      name:"",
      Courses:[]
    };
    clearinputs();
});

savecourse.addEventListener("click",function(){
    if(facdata.Courses.length==0)
    {
        alert("Do not pass empty data");
        return false;
    }
    for(let i=0;i<facstored.length;i++)
{
  facstored[i].name=formatData(facstored[i].name);
  
  for(let j=0;j<facstored[i].Courses.length;j++)
  {
    facstored[i].Courses[j]=formatData(facstored[i].Courses[j])
 }
}
    fetch("/adddata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facstored),
      })
      .then((response) => response.text())
          .then((result) => {
            console.log(result);
            location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
          
})
removebtn.addEventListener("click",function(){
  coverscreen();
    removedata.classList.remove("nodisplay");
    popup.classList.add("nodisplay");
    addingcourse.classList.add("nodisplay");
    for(let i=0;i<facstored.length;i++)
    {
      let option = document.createElement("option");
      option.text = facstored[i].name;
      option.value=facstored[i].name;
      dropdown.appendChild(option);
    }
})
removefacultybtn.addEventListener("click",function(){
   if(dropdown.selectedIndex==0)
   {
    alert("Select a faculty member");
    return false;
   }
   for(let i=0;i<facstored.length;i++)
   {
    let data=dropdown.options[dropdown.selectedIndex].textContent;
    if(facstored[i].name==data)
    {
        facstored.splice(i,1);
        i--;
    }
   }
   fetch("/adddata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(facstored),
  })
  .then((response) => response.text())
      .then((result) => {
        console.log(result);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
})
})
