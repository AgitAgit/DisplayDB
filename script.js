const para1 = document.getElementById("para1");
let people = [];

class person {
    constructor(name, weight, height, age) {
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.age = age;
    }
}

function addPeople() {
    people.push(new person("dude", "3000", "6'6", "3"));
    people.push(new person("annnie", "can't tell", "160", "don't ask"));
    people.push(new person("magimix 2000ator", "Heavy"));
}

function printPeople() {
    if (people.length > 0) {
        for (const { name, weight, height, age } of people) {
            const para = document.createElement('p');
            para.textContent += `name:${name} weight:${weight} height:${height} age:${age}`;
            para1.appendChild(para);
        }
    }
}

addPeople();
printPeople();