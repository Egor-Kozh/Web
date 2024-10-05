class queueElement{
    constructor(num){
        this.num = num;
    }
    printElement(){
        var div = document.createElement("div");
        div.id = `queueEl${this.num}`
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.background = "red";
        div.style.color = "white";
        div.style.margin = "5px"
        div.innerHTML = this.num;
        document.getElementById("queue").appendChild(div);
    }

    removeElement() {
        var elem = document.getElementById(`queueEl${this.num}`);
        elem.parentNode.removeChild(elem);
    }
}

class queue {
    constructor(){
        this.size = 0;
        this.storage = {};
        this.frontMark = 0;
        this.backMark = 0;
    }

    add(){
        if(!this.size){
            this.frontMark = 0;
            this.backMark = 0;
        }
        this.storage[this.backMark] = new queueElement(this.backMark);
        this.storage[this.backMark].printElement();
        this.backMark ++;
        this.size ++;
    }

    del(){
        if(this.frontMark == this.backMark){
            alert("Очередь пуста!")
        }
        else{
            this.storage[this.frontMark].removeElement()
            delete this.storage[this.frontMark]
            this.frontMark++
            this.size --;
        }
    }


}

const q = new queue;

function addhtml(){
    q.add()
}

function delhtml(){
    q.del()
}


