let removeButton = document.getElementById("removebutton");
let removeAllButton = document.getElementById("removeall");
let remDay = document.getElementById("days");
let remTimeSlots = document.getElementById("timeslots");
let remFaculty = document.getElementById("facultymembers");
let remCourses = document.getElementById("courses");
let remRooms = document.getElementById("rooms");
let daysList = [];
let timeSlotsList = [];
let facultyList = [];
let coursesList = [];
let roomsList = [];
let removedDataList = [];
let addedDataList = [];

fetch("data.json")
    .then(time => time.json())
    .then(timetable => {
        let option = document.getElementsByClassName("opt1");
        for (let i = 0; i < timetable.length; i++) {
            daysList.push(timetable[i].day);
            timeSlotsList.push(timetable[i].Time);
            facultyList.push(timetable[i].Name);
            coursesList.push(timetable[i].Course);
            roomsList.push(timetable[i].room);
        }

        function appendChilds(id, arr) {
            for (let i = 0; i < arr.length; i++) {
                let check = false;
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] == arr[j]) {
                        check = true;
                        break;
                    }
                }
                if (check == true) {
                    continue;
                }
                let opt = document.createElement("option");
                opt.textContent = arr[i];
                opt.value = arr[i];
                id.appendChild(opt);
            }
        }

        appendChilds(remDay, daysList);
        appendChilds(remTimeSlots, timeSlotsList);
        appendChilds(remFaculty, facultyList);
        appendChilds(remCourses, coursesList);
        appendChilds(remRooms, roomsList);

        removeButton.addEventListener("click", function () {
            let textContent = [];
            for (let i = 0; i < option.length; i++) {
                let selectedIndex;
                if (option[i].selectedIndex == 0) {
                    continue;
                } else {
                    addedDataList.push(option[i]);
                    selectedIndex = option[i].selectedIndex;
                    textContent.push(option[i].options[selectedIndex].textContent);
                }
            }
            for (let i = 0; i < timetable.length; i++) {
                for (let j = 0; j < textContent.length; j++) {
                    if (timetable[i].day == textContent[j] || timetable[i].Time == textContent[j] || timetable[i].Name == textContent[j] || timetable[i].Course == textContent[j] || timetable[i].room == textContent[j]) {
                        timetable.splice(i, 1);
                        i--;
                        if (!timetable[i]) {
                            break;
                        }
                    }
                }
            }
            fetch("/removedata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(timetable),
            }).then(response => {
                if (response.ok) {
                    console.log("Data removed successfully!");
                } else {
                    console.error("Failed to remove data");
                }
            }).catch(error => {
                console.error("Error while removing data:", error);
            });
            location.reload();
        });

        removeAllButton.addEventListener("click", function () {
            timetable = [];
            fetch("/removedata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(timetable),
            }).then(response => {
                if (response.ok) {
                    console.log("Data removed successfully!");
                } else {
                    console.error("Failed to remove data");
                }
            }).catch(error => {
                console.error("Error while removing data:", error);
            });
            location.reload();
        });
    });