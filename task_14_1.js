const xml = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xml, "text/xml");
const studentsDOM = xmlDOM.querySelectorAll("student");

const parserStudent = (student) => {
  result = {};
  result.name = student.querySelector("first").textContent + " " +
    student.querySelector("second").textContent;
  result.age = student.querySelector("age").textContent;
  result.prof = student.querySelector("prof").textContent;
  
  result.lang = student.querySelector("name").getAttribute("lang");
  return result  
}

const jsObj = {}
const students = []
for (const item of studentsDOM){
  students.push(parserStudent(item))
}

jsObj.list = students;
console.log(jsObj)