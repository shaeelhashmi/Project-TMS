let choose = document.getElementById("day1");


createoptions("days.json",choose,"name");
function createoptions(filename,id,dataname)
{
let data = [];
let d1;
fetch(filename)
.then(response => response.json())
.then(filedata => 
{
    for(let i = 0; i < filedata.length; i++)
    {
      d1 = filedata[i];
       data.push(d1[dataname]);//the square bracket is used to access the objects property if it is entered as a string
    }
    for(let i= 0 ; i < data.length; i++)
    {
      let option = document.createElement("option");
       option.text=data[i];
       option.value=data[i];
       id.appendChild(option);
    }
}) 
}