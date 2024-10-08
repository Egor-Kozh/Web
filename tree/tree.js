class BuildTree {
    constructor(treeNode){
        this.treeNode = treeNode;
        this.emp_id = "";
    }

    buildNode(i = 0, name = "ul0", treeNode = this.treeNode){
        var ul = document.createElement("ul");
        ul.id = `ul${treeNode.id}`;
        var li = document.createElement("li");
        li.id = `name${treeNode.id}`
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
                    li.id = `emp${treeNode.id + `${j}`}`
                    li.innerHTML = treeNode.employee[j]
                    li.style.color = "white"
                    document.getElementById(`${treeNode.name}`).appendChild(li);
                }
                if(treeNode.childNode){
                    i++;
                    for(let j = 0; j < treeNode.childNode.length; j++){
                        this.buildNode(i, treeNode.name, treeNode.childNode[j])
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
                if(this.emp_id){
                    var li = document.getElementById(this.emp_id)
                    li.style.color = "white"
                }
                var inp = document.getElementById("i_search");
                inp.value = filter_emp[i];
                var elem = document.getElementById(`u_search_list`);
                elem.parentNode.removeChild(elem);
                let properties = this.searchTreeEmployee(this.treeNode, filter_emp[i])
                console.log(properties)
                this.buildTree(filter_emp[i], properties)
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

    buildTree(value_search, properties, i = 0, treeNode = this.treeNode){
        if(document.getElementById(`${treeNode.name}`)){
            i++
            if(i == properties.way.length){
                for(let j = 0; j < treeNode.employee.length; j++){
                    if(treeNode.employee[j] == value_search){
                        var v_s = document.getElementById(`emp${treeNode.id + `${j}`}`)
                        v_s.style.color = "yellow";
                        this.emp_id = `emp${treeNode.id + `${j}`}`
                    }
                }
            }
            for(let j = 0; j < treeNode.childNode.length; j++){
                if(properties.way[i] == treeNode.childNode[j].id){
                    this.buildTree(value_search, properties, i, treeNode.childNode[j] )
                }
            }
        }
        else{
            document.getElementById(`name${treeNode.id}`).click()
            i++;
            if(i == properties.way.length){
                console.log("finish")
                for(let j = 0; j < treeNode.employee.length; j++){
                    if(treeNode.employee[j] == value_search){
                        var v_s = document.getElementById(`emp${treeNode.id + `${j}`}`)
                        v_s.style.color = "yellow";
                        this.emp_id = `emp${treeNode.id + `${j}`}`
                    }
                }
            }
            for(let j = 0; j < treeNode.childNode.length; j++){
                if(properties.way[i] == treeNode.childNode[j].id){
                    this.buildTree(value_search, properties, i, treeNode.childNode[j] )
                }
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
    if(document.getElementById("u_search_list")){
        var ul = document.getElementById(`u_search_list`);
        ul.parentNode.removeChild(ul);
    }
    if(!document.getElementById("u_search_list")){
        var ul = document.createElement(`ul`);
        ul.id = "u_search_list";
        document.getElementById(`search_list`).appendChild(ul);
    }

    let data_input = document.getElementById('i_search').value;
    tr.searchEmployee(data_input);
}