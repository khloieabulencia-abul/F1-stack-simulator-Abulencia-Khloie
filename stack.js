
class Stack {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    // Add element to top of stack
    push(element) {
        this.items[this.count] = element;
        let push_res = `${element}`;
        this.count += 1;
        let count = this.count - 1;

        console.log(push_res);
        return [push_res, count];
    }

    // Return and remove top element in stack
    // Return undefined if stack is empty
    pop() {
        if (this.count == 0) return undefined;

        let deleteItem = this.items[this.count - 1];
        this.items.pop();
        this.count -= 1;

        console.log(`${deleteItem} removed`);
        return deleteItem;
    }

    // Check top element in stack
    peek() {
        if (this.count == 0) return undefined;

        console.log(`Top element is ${this.items[this.count - 1]}`);
        return this.items[this.count - 1];
    }

    // Check if stack is empty
    isEmpty() {
        console.log(this.count == 0 ? 'Stack is empty' : 'Stack is NOT empty');
        return this.count == 0;
    }

    // Check size of stack
    size() {
        console.log(`${this.count} elements in stack`);
        return this.count;
    }

    // Print elements in stack
    print() {
        let str = '';

        for (let i = 0; i < this.count; i++) {
            str += this.items[i] + ' ';
        }

        return str;
    }

    // Clear stack
    clear() {
        this.items = [];
        this.count = 0;

        console.log('Stack cleared..');
        return this.items;
    }
}

const stack = new Stack();

$(document).ready(function () {

    // Initial stack values
    [100, 200, 300, 400].forEach(function (value) {
        let push_data = stack.push(value);

        $("#stack").prepend(
            `<div id="st${push_data[1]}" class="row bg-primary push border border-light text-center p-2">${push_data[0]}</div>`
        );
    });

    // Push
    $("#btn_push").on("click", function () {
        let data = $("#st_data").val().trim();

        if (data === "") {
            alert("Please enter a value.");
            return;
        }

        let push_data = stack.push(data);

        $("#stack").prepend(
            `<div id="st${push_data[1]}" class="row bg-primary push border border-light text-center p-2">${push_data[0]}</div>`
        );

        $("#st_data").val("");
    });

    // Pop
    $("#btn_pop").on("click", function () {
        let pop_data = stack.pop();

        if (pop_data === undefined) {
            alert("Stack is empty. Nothing to remove.");
            return;
        }

        $("#popped").prepend(
            `<div class="row pop text-bg-danger border border-light text-center p-2">${pop_data}</div>`
        );

        $(`#st${stack.count}`).remove();
    });

    // Peek
    $("#btn_peek").on("click", function () {
        let peek_data = stack.peek();

        if (peek_data === undefined) {
            alert("Stack is empty. Nothing to peek.");
            return;
        }

        let topElement = $(`#st${stack.count - 1}`);

        topElement.removeClass("bg-primary").addClass("peek");

        setTimeout(function () {
            topElement.removeClass("peek").addClass("bg-primary");
        }, 500);
    });

    // Clear
    $("#btn_clear").on("click", function () {
        stack.clear();
        $("#stack, #popped").empty();
        alert("Stack cleared.");
    });

});