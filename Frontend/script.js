

//GET ALL STUDENTS
 async function getStudents() {
    try{
        const response=await fetch("/getStudents");
        const data=await response.json();
        displayStudents(data.students);

    } catch(error){
        console.log(error);
        alert("Unable to connect server");
    }
 }
 
 //display students
 function displayStudents(students){
const table=document.getElementById("studentTable");
table.innerHTML="";
students.forEach(student => {
    const row=document.createElement("tr");
    row.innerHTML=`
    <td>${student.id}<td>
     <td>${student.name}<td>
      <td>${student.age}<td>
       <td>${student.course}<td>
       <td>
      <button class="edit-btn"
      onClick="editStudent(
      ${student.id},
      ${student.name},
      ${student.age},
      ${student.course}
      )">
      Edit
      </button>
      <button
      class="delete-btn"
      onclick="deleteStudent(${student.id}">
      Delete
      </button>
      </td>
      `;
table.appendChild(row);
});
 }