const http=require('http');
const fs=require('fs');
const path=require('path');
let students=[
    {
        id:1,
        name:"Anjali",
        age:24,
         course:"MERN"
    },
     {
        id:2,
        name:"Anu",
        age:20,
         course:"python"
    },
];
const server=http.createServer((req,res)=>{
    //serve frontend files
    //index.html
    if(req.url==='/' && req.method==='GET'){
        fs.readFile(
            path.join(__dirname, "../Frontend/index.html"),
            (err,data)=>{
                if(err){
                    res.statusCode=500;
                    res.end("Error reading index.html");
                    return;
                }
                res.setHeader("Content-Type","text/html");
                res.end(data);
            }
        );
        return;
    }
    //css file
    if(req.url==="/style.css" && req.method==="GET"){
        fs.readFile(
            path.join(__dirname, "../Frontend/style.css"),
             (err,data)=>{
                if(err){
                    res.statusCode=500;
                    res.end("Error reading index.html");
                    return;
                }
                res.setHeader("Content-Type","text/html");
                res.end(data);
            }
        );
        return;
        
    }
    //js file
     if(req.url==="/script.js" && req.method==="GET"){
        fs.readFile(
            path.join(__dirname, "../Frontend/script.js"),
             (err,data)=>{
                if(err){
                    res.statusCode=500;
                    res.end("Error reading index.html");
                    return;
                }
                res.setHeader("Content-Type","text/html");
                res.end(data);
            }
        );
        return; 
    }
    res.setHeader("Content-Type","application/json");
    //get-get all students
    if(req.url==='/getStudents' && req.method==="GET"){
        res.statusCode=200; //HTTP status code 200 means the request was successful.
        res.end(JSON.stringify({
            message:"Students data fetched successfully",
            students:students
        }))
    }
    //get students by id
    else if(req.url.startsWith('/getStudents')&& req.method==="GET"){
        //console.log(req.url.split('/'));
        const id=parseInt(req.url.split('/')[2]);
        console.log(id);
        const student=students.find((student)=>student.id===id);
        if(!student){
            res.statusCode=404;
            res.end(JSON.stringify({
                message:"student not found"
            }));
            return;
        }
        res.statusCode=200;
        res.end(JSON.stringify({
            message:"Student found",
            student:student
        }));
        }
//post=add student
else if(req.url==='/addStudent' && req.method==="POST"){
    let body="";
    req.on("data",(chunk)=>{
        body+=chunk.toString();
    });
    req.on("end",()=>{
        const newStudent=JSON.parse(body);
        const student={
            id:students.length+1,
            name:newStudent.name,
            age:newStudent.age,
            course:newStudent.course
        };
        student.push(student);
        res.statusCode=201;
        res.end(JSON.stringify({
            message:"student added Successfully",
            student:student
        }))
    });
}


//update student
else if(req.url.startsWith('/updateStudent') && req.method==="PUT"){
    const id=parseInt(req.url.split('/')[2]);
    let body="";
    req.on("data",(chunk)=>{
        body+=chunk.toString();
    });
    req.on("end",()=>{
        const updatedData=JSON.parse(body);
        const studentIndex=students.findIndex((student)=>student.id===id);
        if(studentIndex===-1){
            res.statusCode=404;
            res.end(JSON.stringify({
                message:"student not found"
            }));
            return;
        }
        students[studentIndex].name=updatedData.name;
        students[studentIndex].age=updatedData.age;
        students[studentIndex].course=updatedData.course;
        res.statusCode=200;
        res.end(JSON.stringify({
            message:"Student update successfully",
            student:students[studentIndex]
        }))
    })
}
//delete a student=DELETE
else if(req.url.startsWith('/deleteStudent/')&& req.method==="DELETE"){
       const id=parseInt(req.url.split('/')[2]);
               const studentIndex=students.findIndex((student)=>student.id===id);
               if(studentIndex===-1){
                res.statusCode=404;
                res.end(JSON.stringify({
                    message:"Student not found"
                }));
                return;
               }
               const deleteStudent=students.splice(studentIndex,1);
               res.statusCode=200;
               res.end(JSON.stringify({
                message:"Student data deleted successfully",
                student:deleteStudent[0],
               }))
}
//invalid route
else{
    res.statusCode=404;
    res.end(JSON.stringify({
        message:"Route not found"
    }));
}
});
server.listen(3000,()=>{
    console.log("server running at http://localhost:3000");
    
})