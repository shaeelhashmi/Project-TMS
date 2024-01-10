let options=document.getElementById("room1");
let course=document.getElementById("course1");
let faculty=document.getElementById("faculty1");
fetch("rooms.json")
.then(rooms=>rooms.json())
.then(roomdata=>{
    function checkclass(check)
        { 
            let checklab=[];
            check=check.toUpperCase();    
        if(check==="LAB")
        {
         for(let i=0;i<roomdata.length;i++)
         {
             if(roomdata[i].lab==true)
             {
                 checklab.push(roomdata[i].Name);
             }
         }
        }
        else
         {
         for(let i=0;i<roomdata.length;i++)
         {
             if(roomdata[i].lab==false)
             {
                 checklab.push(roomdata[i].Name);
             }
         }}
         return checklab;
       }
faculty.addEventListener("change",function(){
    options.innerHTML='';
    let text=course[0].textContent;
    let length=text.length;
    let check='';
   
    for(let j=length-3;j<length;j++)
        {
            check+=text[j];
        }
        
       let classes=checkclass(check)
        for(let i=0;i<classes.length;i++)
        {
            let option=document.createElement("option")
            option.text=classes[i];
            option.value=classes[i];
            options.appendChild(option);
        }
    
})
course.addEventListener("change",function(){
    options.innerHTML='';
    let index=course.selectedIndex;
    let text=course[index].textContent;
    let length=text.length;
    let checkvariable=''
    for(let j=length-3;j<length;j++)
    {
        checkvariable+=text[j];
    }
    let rooms=checkclass(checkvariable)
    for(let i=0;i<rooms.length;i++)
    {
        let option=document.createElement("option")
        option.text=rooms[i];
        option.value=rooms[i];
        options.appendChild(option);
    }
})
})

