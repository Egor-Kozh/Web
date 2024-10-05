class BuildTree {
    constructor(treeNode){
        this.treeNode = treeNode;
        this.employee_list = [];
    }

    buildNode(treeNode = this.treeNode, i = 0, name = "ul0"){
        var ul = document.createElement("ul");
        ul.id = `ul${treeNode.id}`;
        var li = document.createElement("li");
        li.id = `name${i}`
        li.innerHTML = treeNode.name;
        document.getElementById(`${name}`).appendChild(ul);
        document.getElementById(`ul${treeNode.id}`).appendChild(li);
        li.onclick = () => {
            if(!document.getElementById(`${treeNode.name}`))
            {
                var ul = document.createElement("ul");
                ul.id = `${treeNode.name}`;
                document.getElementById(`ul${treeNode.id}`).appendChild(ul);
                for(let j = 0; j < treeNode.employee.length; j++){
                    var li = document.createElement("li");
                    li.id = `emp${treeNode.id+j}`
                    li.innerHTML = treeNode.employee[j]
                    document.getElementById(`${treeNode.name}`).appendChild(li);
                }
                if(treeNode.childNode){
                    i++;
                    for(let j = 0; j < treeNode.childNode.length; j++){
                        console.log("f")
                        this.buildNode(treeNode.childNode[j], i, treeNode.name)
                    }
                }
            }
            else{
                var elem = document.getElementById(`${treeNode.name}`);
                elem.parentNode.removeChild(elem);
            }
        }
    }

    listEmployee(treeNode = this.treeNode, list = []){
        for(let i = 0; i < treeNode.childNode.length; i++){
            list = this.listEmployee(treeNode.childNode[i], list)
        }

        return list.concat(treeNode.employee) 
    }

    searchEmployee(data_input){
        let filter_emp = [];
        let list_emp = this.listEmployee()
        for(let i = 0; i < list_emp.length; i++){
            if(list_emp[i].toLowerCase().includes(data_input.toLowerCase()) && data_input != ''){
                filter_emp.push(list_emp[i])
            }
        }
        
        for(let i = 0; i < filter_emp.length; i++){
            var li = document.createElement(`li`);
            li.id = `li_emp${i}`
            li.innerHTML = filter_emp[i];
            li.onclick = () => {
                var inp = document.getElementById("i_search");
                inp.value = filter_emp[i];
                var elem = document.getElementById(`u_search_list`);
                elem.parentNode.removeChild(elem);
                let properties = this.searchTreeEmployee(this.treeNode, filter_emp[i])
                console.log(properties)
                properties.way.push(0)
                this.buildTree(filter_emp[i], properties.way)
            };
            document.getElementById(`u_search_list`).appendChild(li);
        }
    }

    searchTreeEmployee(treeNode, value_search, properties = {flag: false, way: []}){
        for(let i = 0; i < treeNode.childNode.length; i++){
            if(properties.flag){
                properties.way.unshift(treeNode.id)
                properties.flag = true;
                return properties;
            }
            else{
                properties = this.searchTreeEmployee(treeNode.childNode[i], value_search, properties)
            }
        }

        if(properties.flag){
            properties.way.unshift(treeNode.id)
            properties.flag = true;
            return properties;
        }
        else{
            for(let i = 0; i < treeNode.employee.length; i++){
                if(treeNode.employee[i] == value_search){
                    properties.way.unshift(treeNode.id)
                    properties.flag = true;
                    return properties;
                }   
            }
            return properties;
        }
    }

    buildTree(value_search, way, treeNode = this.treeNode, i = 0){
        var ul = document.createElement("ul");
        ul.id = `ul${i+1}`;
        var li = document.createElement("li");
        li.innerHTML = treeNode.name;
        document.getElementById(`ul${i}`).appendChild(ul);
        document.getElementById(`ul${i+1}`).appendChild(li);
        for(let j = 0; j < treeNode.childNode.length; j++){
            if(treeNode.childNode[j].id == way[i+1]){
                i++;
                this.buildTree(value_search, way, treeNode.childNode[j], i)
                break;
            }
        }

        for(let j = 0; j < treeNode.employee.length; j++){
            if(treeNode.employee[j] == value_search){
                var li_employee = document.createElement("li");
                li_employee.innerHTML = value_search;
                li_employee.style.color = "yellow"
                document.getElementById(`ul${i+1}`).appendChild(li_employee);
                break;
            }
        }
    }
}

let tree1 = {
    id:1,
    name: "Отдел 1",
    employee: ["Главнов"],
    childNode: [
        {
            id:2,
            name: "Отдел 2",
            employee: ["Вараноб", "Козлов"],
            childNode:[
                {
                    id:5,
                    name: "Отдел 5",
                    employee: ["Волков", "Романов", "Чаплышкин"],
                    childNode: []
                }
            ]
        },
        {
            id:3,
            name: "Отдел 3",
            employee: ["Лось", "Сахненко"],
            childNode: []
        },
        {
            id:4,
            name: "Отдел 4",
            employee: ["Бурунов"],
            childNode: []
        }
    ]
}

let tr = new BuildTree(tree1);
tr.buildNode();

function searchbuildtree(){
    if(document.getElementById(`ul1`)){
        var elem = document.getElementById(`ul1`);
        elem.parentNode.removeChild(elem);
    }
    
    if(document.getElementById(`u_search_list`)){
        var elem = document.getElementById(`u_search_list`);
        elem.parentNode.removeChild(elem);
        var ul = document.createElement(`ul`);
        ul.id = "u_search_list";
        document.getElementById(`search_list`).appendChild(ul);
    }
    else{
        var ul = document.createElement(`ul`);
        ul.id = "u_search_list";
        document.getElementById(`search_list`).appendChild(ul);
    }

    let data_input = document.getElementById('i_search').value;
    tr.searchEmployee(data_input);
}