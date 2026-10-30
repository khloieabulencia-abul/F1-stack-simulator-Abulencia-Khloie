
class Queue {
    constructor() {
        this.items = [];
        this.count = 0;
        this.nextId = 0;
    }

    // Add element to the rear of the queue
    enqueue(element) {
        const queueItem = {
            id: this.nextId++,
            value: element
        };

        this.items.push(queueItem);
        this.count++;

        console.log(`${element} added to queue`);
        return queueItem;
    }

    // Remove element from the front of the queue
    dequeue() {
        if (this.count === 0) return undefined;

        const deleteItem = this.items.shift();
        this.count--;

        console.log(`${deleteItem.value} removed from queue`);
        return deleteItem;
    }

    // Check the front element
    peek() {
        if (this.count === 0) return undefined;

        console.log(`Front element is ${this.items[0].value}`);
        return this.items[0];
    }

    // Check if queue is empty
    isEmpty() {
        return this.count === 0;
    }

    // Check queue size
    size() {
        return this.count;
    }

    // Print queue elements
    print() {
        return this.items.map(item => item.value).join(" ");
    }

    // Clear queue
    clear() {
        this.items = [];
        this.count = 0;

        console.log("Queue cleared.");
    }
}

const queue = new Queue();

$(document).ready(function () {

    // Display queue elements
    function displayQueue() {
        $("#queue").empty();

        queue.items.forEach(function (item, index) {
            let label = "";

            if (index === 0) {
                label = '<div class="small fw-bold text-success">FRONT</div>';
            } else if (index === queue.count - 1) {
                label = '<div class="small fw-bold text-warning">REAR</div>';
            }

            $("#queue").append(`
                <div id="q${item.id}" class="queue-item bg-primary text-white border border-light text-center p-3 rounded">
                    ${label}
                    <div class="fs-5">${$("<div>").text(item.value).html()}</div>
                </div>
            `);
        });
    }

    // Enqueue
    $("#btn_enqueue").on("click", function () {
        let data = $("#queue_data").val().trim();

        if (data === "") {
            alert("Please enter a value.");
            return;
        }

        queue.enqueue(data);
        displayQueue();

        $("#queue_data").val("");
    });

    // Dequeue
    $("#btn_dequeue").on("click", function () {
        let deleteData = queue.dequeue();

        if (deleteData === undefined) {
            alert("Queue is empty. Nothing to remove.");
            return;
        }

        $("#dequeued").prepend(`
            <div class="row pop text-bg-danger border border-light text-center p-2">
                ${$("<div>").text(deleteData.value).html()}
            </div>
        `);

        displayQueue();
    });

    // Peek
    $("#btn_peek").on("click", function () {
        let frontData = queue.peek();

        if (frontData === undefined) {
            alert("Queue is empty. Nothing to peek.");
            return;
        }

        let frontElement = $(`#q${frontData.id}`);

        frontElement.removeClass("bg-primary").addClass("peek");

        setTimeout(function () {
            frontElement.removeClass("peek").addClass("bg-primary");
        }, 500);
    });

    // Clear
    $("#btn_clear").on("click", function () {
        queue.clear();

        $("#queue, #dequeued").empty();

        alert("Queue cleared.");
    });

});