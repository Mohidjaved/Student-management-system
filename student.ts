import inquirer from "inquirer";

let studentSystem: { name: string; age: number; id: number }[] = [];

while (true) {
  let options = await inquirer.prompt([
    {
      type: "list",
      name: "selection",
      message: "What would you like to do?",
      choices: ["Add_Student", "Remove_Student", "View_Students", "See_Details", "Exit"]
    }
  ]);

  if (options.selection === "Add_Student") {
    let newStudentName = await inquirer.prompt({
      type: "input",
      name: "name",
      message: "Enter the student's name: "
    });
    
    let newStudentAge = await inquirer.prompt({
      type: "number",
      name: "age",
      message: "Enter the student's age: "
    });
    
    let newStudentId = await inquirer.prompt({
      type: "number",
      name: "id",
      message: "Enter the student's ID: "
    });

    // Check for duplicate ID
    let duplicateId = studentSystem.find(student => student.id === newStudentId.id);
    if (duplicateId) {
      console.log("This ID is already in use. Please enter a unique ID.");
    } else {
      let student = {
        name: newStudentName.name,
        age: newStudentAge.age,
        id: newStudentId.id
      };

      studentSystem.push(student);
    }
  } else if (options.selection === "View_Students") {
    if (studentSystem.length === 0) {
      console.log("The list is empty");
    } else {
      let studentList = studentSystem.map(student => student.name).join("\n");
      console.log(studentList);
    }
  } else if (options.selection === "Remove_Student") {
    let removeOption = await inquirer.prompt([
      {
        type: "list",
        name: "removelist",
        message: "How do you want to remove the student?",
        choices: ["Find from list", "Search by ID"]
      }
    ]);

    if (removeOption.removelist === "Find from list") {
      let studentList = studentSystem.map(student => student.name);

      let removeStudentByList = await inquirer.prompt([
        {
          type: "list",
          name: "removeByList",
          message: "Which student do you want to remove?",
          choices: studentList
        }
      ]);

      const index = studentSystem.findIndex(student => student.name === removeStudentByList.removeByList);
      if (index !== -1) {
        console.log(`${studentSystem[index].name} has been removed from the list`);
        studentSystem.splice(index, 1);
      }
    }

    if (removeOption.removelist === "Search by ID") {
      let removeStudentByID = await inquirer.prompt([
        {
          type: "input",
          name: "removeByID",
          message: "Enter the student's ID: "
        }
      ]);

      const index = studentSystem.findIndex(student => student.id === Number(removeStudentByID.removeByID));
      if (index !== -1) {
        console.log(`Student with ID ${studentSystem[index].id} has been removed from the list`);
        studentSystem.splice(index, 1);
      }
    }
  } else if (options.selection === "See_Details") {
    if (studentSystem.length === 0) {
      console.log("The list is empty");
    } else {
      console.log(
        studentSystem
          .map(student => `Name: ${student.name}, Age: ${student.age}, Student ID: ${student.id}`)
          .join("\n")
      );
    }
  }

  if (options.selection === "Exit") {
    break;
  }
}
