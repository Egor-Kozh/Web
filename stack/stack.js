class stackElement{
    constructor(num){
        this.num = num;
    }
    printElement(){
        var div = document.createElement("div");
        div.id = `stackEl${this.num}`
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.background = "red";
        div.style.color = "white";
        div.style.margin = "5px"
        div.innerHTML = this.num;
        document.getElementById("stack").appendChild(div);
    }

    removeElement() {
        var elem = document.getElementById(`stackEl${this.num}`);
        elem.parentNode.removeChild(elem);
    }
}

class stack {
    constructor(){
        this.storage = {};
        this.Mark = -1;
    }

    add(){
        this.Mark ++;
        this.storage[this.Mark] = new stackElement(this.Mark);
        this.storage[this.Mark].printElement();
    }

    del(){
        if(this.Mark == -1){
            alert("Стэк пуст!")
        }
        else{
            this.storage[this.Mark].removeElement();
            delete this.storage[this.Mark];
            this.Mark --;
        }
    }


}

const s = new stack;

function addhtml(){
    s.add()
}

function delhtml(){
    s.del()
}


