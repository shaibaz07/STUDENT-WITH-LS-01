const cl = console.log;

const stdform = document.getElementById('stdform');
const fnameControl = document.getElementById('fname');
const lnameControl = document.getElementById('lname');
const emailControl = document.getElementById('email');
const contactControl = document.getElementById('contact');
const stdContainer = document.getElementById('stdContainer');

const addStdBtn = document.getElementById('addStdBtn');
const UpdateStdBtn = document.getElementById('UpdateStdBtn');



// let stdsArr =[

// {
//     fname: "Haseeb",
//     lname: "Sayyed",
//     email: "hs@gmail.com",
//     contact: 8767403773,
//     stdId: '123'

// },
// {
//     fname: "Anas",
//     lname: "Qureshi",
//     email: "aq@gmail.com",
//     contact: 7057593616,
//     stdId: '124'

// }



// ];


// localStorage.setItem("stdsArr", JSON.stringify(stdsArr))


// let stdsJson = localStorage.getItem("stdsArr") || [];

// let stdsArr = JSON.parse(stdsJson)

let stdsArr = JSON.parse(localStorage.getItem("stdsArr")) || [];
cl(stdsArr)



function onStdAdd(eve) {
    eve.preventDefault();
    // cl('submited!!')
    let STD_OBJ = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: Date.now().toString()
    }
    stdform.reset()
    cl(STD_OBJ);
    stdsArr.push(STD_OBJ);   // API call success

    localStorage.setItem('stdsArr', JSON.stringify(stdsArr))


    // createStdtrs(stdsArr)   // instead of calling templating fun create only one TR and append in it tbody

    let tr = document.createElement('tr');
    tr.id = STD_OBJ.stdId;
    tr.innerHTML = `
                                        
                                        <td>${stdsArr.length}</td>
                                        <td>${STD_OBJ.fname}</td>
                                        <td>${STD_OBJ.lname}</td>
                                        <td>${STD_OBJ.email}</td>
                                        <td>${STD_OBJ.contact}</td>
                                        <td  class="text-center">
                                            <i onclick="onEdit(this)" class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"
                                             data-stdid="${STD_OBJ.stdId}"></i>
                                        </td>
                                        <td class="text-center">
                                            <i onclick="onReove(this)" class="fa-solid fa-trash-can fa-2x text-danger"  role="button"
                                             data-stdid="${STD_OBJ.stdId}"></i>
                                        </td>
    
   
   
                    `
    stdContainer.append(tr);
    Swal.fire({
        title: `The new student ${STD_OBJ.fname} ${STD_OBJ.lname}added successfully !!!`,
        timer: 1500,
        icon: "success"
    });
}

function createStdtrs(arr) {
    let result = '';
    arr.forEach((std, i) => {

        result += `
                                     <tr id="${std.stdId}">
                                        <td>${i + 1}</td>
                                        <td>${std.fname}</td>
                                        <td>${std.lname}</td>
                                        <td>${std.email}</td>
                                        <td>${std.contact}</td>
                                        <td  class="text-center">
                                            <i onclick="onEdit(this)" class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"
                                             data-stdid="${std.stdId}"></i>
                                        </td>
                                        <td class="text-center">
                                            <i onclick="onRemove(this)" class="fa-solid fa-trash-can fa-2x text-danger"  role="button"
                                             data-stdid="${std.stdId}"></i>
                                        </td>
                                    </tr>
    
    
    `
    });
    stdContainer.innerHTML = result;
}

createStdtrs(stdsArr)

function onEdit(ele) {
    // cl(ele)
    let EDIT_ID = ele.dataset.stdid;
    localStorage.setItem('EDIT_ID', EDIT_ID)

    let EDIT_OBJ = stdsArr.find(s => s.stdId === EDIT_ID);
    fnameControl.value = EDIT_OBJ.fname;
    lnameControl.value = EDIT_OBJ.lname;
    emailControl.value = EDIT_OBJ.email;
    contactControl.value = EDIT_OBJ.contact;

    addStdBtn.classList.add('d-none');
    UpdateStdBtn.classList.remove('d-none');

    // UpdateStdBtn.setAttribute('data-editid', EDIT_ID);

}


function onStdupdate() {
    //    let UPDATE_ID = this.dataset.editid;
    let UPDATE_ID = localStorage.getItem('EDIT_ID')
    localStorage.removeItem('EDIT_ID')
    //    cl(UPDATE_ID)

    let UPDATED_OBJ = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: UPDATE_ID

    }

    let getIndex = stdsArr.findIndex(s => s.stdId === UPDATE_ID)
    stdsArr[getIndex] = UPDATED_OBJ;

    localStorage.setItem('stdsArr', JSON.stringify(stdsArr))

    let tr = document.getElementById(UPDATE_ID).children;
    // cl(tr)
    tr[1].innerText = UPDATED_OBJ.fname;
    tr[2].innerText = UPDATED_OBJ.lname;
    tr[3].innerText = UPDATED_OBJ.email;
    tr[4].innerText = UPDATED_OBJ.contact;

   
    UpdateStdBtn.classList.add('d-none');
    addStdBtn.classList.remove('d-none');
     stdform.reset()

    Swal.fire({
        title: `The student with ${UPDATE_ID} is updated successfully !!!`,
        timer: 1500,
        icon: "success"
    });


}

function onRemove(ele) {
    // cl(ele)
    let getConfirm = confirm(`Are you sure, you want remove the Todo Item?`)
    if (getConfirm) {
        let REMOVE_ID = ele.dataset.stdid;
        let getIndex = stdsArr.findIndex(s => s.stdId === REMOVE_ID);
        stdsArr.splice(getIndex, 1);

        localStorage.setItem('stdsArr', JSON.stringify(stdsArr))

        document.getElementById(REMOVE_ID).remove();

        Swal.fire({
            title: `The student id ${REMOVE_ID} is remove successfully !!!`,
            timer: 1500,
            icon: "success"
        });
    }
}


stdform.addEventListener('submit', onStdAdd)
UpdateStdBtn.addEventListener('click', onStdupdate)