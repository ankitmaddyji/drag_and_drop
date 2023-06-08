document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll(".container");
    const resetButton = document.getElementById("resetButton");
  
    let draggedItem = null;
  
    // Add event listeners to draggable items
    items.forEach(function(item) {
      item.addEventListener("dragstart", function(e) {
        draggedItem = item;
        item.classList.add("dragging");
        e.dataTransfer.setData("text/plain", ""); // Required for Firefox compatibility
      });
  
      item.addEventListener("dragend", function() {
        draggedItem = null;
        item.classList.remove("dragging");
      });
    });
  
    // Add event listeners to containers
    containers.forEach(function(container) {
      container.addEventListener("dragover", function(e) {
        e.preventDefault();
      });
  
      container.addEventListener("dragenter", function(e) {
        e.preventDefault();
        this.classList.add("highlight");
      });
  
      container.addEventListener("dragleave", function() {
        this.classList.remove("highlight");
      });
  
      container.addEventListener("drop", function() {
        this.classList.remove("highlight");
        this.appendChild(draggedItem);
        showMessage("Item dropped successfully!", "success");
      });
    });
  
    // Add event listener to reset button
    resetButton.addEventListener("click", function() {
      containers[0].innerHTML = "";
      containers[1].innerHTML = "";
      items.forEach(function(item) {
        containers[0].appendChild(item);
      });
      hideMessage();
    });
  
    // Helper functions
    function showMessage(message, className) {
      const messageContainer = document.createElement("div");
      messageContainer.className = className;
      messageContainer.textContent = message;
      document.body.appendChild(messageContainer);
      setTimeout(function() {
        hideMessage();
      }, 3000);
    }
  
    function hideMessage() {
      const message = document.querySelector(".success");
      if (message) {
        message.remove();
      }
    }
  });
  