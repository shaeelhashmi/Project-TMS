let btn = document.getElementById("display")
let filter=document.getElementById("filteroption");
let filterbtn=document.getElementById("filterbtn");
let filterpopup=document.getElementById("filterfaculty");
let removefilterbtn=document.getElementById("remfilterbtn");
btn.addEventListener("click",function()
{
   filterpopup.classList.remove("nodisplay");
    let mon=[];
    let tue=[];
    let Wed=[];
    let Thur=[];
    let Fri=[];
    let times = [];
    
    let table = document.getElementById('table')
         let row =[];
         for(let i = 1; i < table.rows.length; i++)
         {
            row.push(table.rows[i]);
         }
       
         let m=[];
         let tu = [];
         let w = [];
         let th = [];
         let f = [];
         //pushing rows into cells
         for(let i = 0; i <  row[0].cells.length; i++)
         {
           m.push(row[0].cells[i]);
           tu.push(row[1].cells[i]);
           w.push(row[2].cells[i]);
           th.push(row[3].cells[i]);
           f.push(row[4].cells[i]);
         }

    fetch("timeslots.json")
    .then(time=>time.json())
    .then(timeslot=>
    {
        for (let i = 0; i < timeslot.length; i++)
        {
            times.push(timeslot[i]);
        }
        function sortarray(day1, day2)
        {
        for(let i=0;i<timeslot.length;i++)
          {
           for(let j=0;j<day2.length;j++)
            {
                if(timeslot[i].name==day2[j].Time)
                {
                    day1[i + 1].textContent = `${day2[j].room}-${day2[j].Name}-${day2[j].Course}`;
                }
            }
        }
    }
    function filtertable(day1, day2,facultymem)
    {
        for(let i=0;i<timeslot.length;i++)
        {
            day1[i + 1].textContent=""
        }  
    for(let i=0;i<timeslot.length;i++)
      {
       for(let j=0;j<day2.length;j++)
        {
            if(timeslot[i].name==day2[j].Time)
            {
               if(facultymem==day2[j].Name)
                {
                    day1[i + 1].textContent = `${day2[j].room}-${day2[j].Name}-${day2[j].Course}`;
                }
            }
        }
    }
    }
    fetch("data.json")
    .then(time=>time.json())
    .then(timetable=>{
        let facultymem=[]
        for(let i=0;i<timetable.length;i++)
        {
       facultymem.push(timetable[i].Name);
        }
        
     
        for(let i=0;i<timetable.length;i++)
        {
            if(timetable[i].day=="Monday")
            {
                mon.push(timetable[i]);
            }
            else if(timetable[i].day=="Tuesday")
            {
                tue.push(timetable[i]);
            }
            else if(timetable[i].day=="Wednesday")
            {
                Wed.push(timetable[i]);
            }
            else if(timetable[i].day=="Thursday")
            {
                Thur.push(timetable[i]);
            }
            else
            {
                Fri.push(timetable[i]);
            }
        }
        for(let i=0;i<facultymem.length;i++)
        {
            let check=true
            let a=document.createElement("option");
            for(let j=i+1;j<facultymem.length;j++)
            {
                if(facultymem[i]==facultymem[j])
                {
                    check=false;
                    break;
                }
            }
            if(check==false)
            {
                continue;
            }
            a.text=facultymem[i];
            a.value=facultymem[i];
            filter.appendChild(a)
        }
         sortarray(m,mon);
        sortarray(tu, tue);
        sortarray(w, Wed)
        sortarray(th, Thur);
        sortarray(f, Fri);
        //functions for filtering the timetable
        removefilterbtn.addEventListener("click",function()
        {
            sortarray(m,mon);
            sortarray(tu, tue);
            sortarray(w, Wed);
            sortarray(th, Thur);
            sortarray(f, Fri);
        });
        filterbtn.addEventListener("click",function()
        {
          ``
            let value=filter.selectedIndex;
            if(value==0)
            {
                return;
            }
          let comparevalue=filter[value].textContent;
            filtertable(m,mon,comparevalue)
            filtertable(tu,tue,comparevalue)
            filtertable(w,Wed,comparevalue)
            filtertable(th,Thur,comparevalue)
            filtertable(f,Fri,comparevalue)
        })
      
        
    })
    .catch((error) => {
        console.log("Error:"+error);
    })
    }
    )});
