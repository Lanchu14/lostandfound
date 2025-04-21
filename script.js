const items = [
    { title: "Lost ID Card", description: "Blue college ID near the library", type: "lost", location: "Library", owner: "Ayesha" },
    { title: "Found USB Drive", description: "16GB SanDisk near canteen", type: "found", location: "Canteen", owner: "Rahul" }
  ];
  
  function renderItems(filtered = null) {
    const list = document.getElementById("itemsList");
    list.innerHTML = "";
    const displayItems = filtered || items;
  
    displayItems.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <strong>${item.title} (${item.type.toUpperCase()})</strong>
        <p>${item.description}</p>
        <small>📍 Location: ${item.location}</small><br/>
        ${
          item.type === 'lost'
            ? `<button onclick="showContact('${item.owner}')">Contact Owner</button>`
            : `
              <p style="margin-top: 10px; color: green;">
                <b>✅ This item is with:</b> ${item.owner}
              </p>
              <button onclick="showContact('${item.owner}')">Contact Finder</button>
            `
        }
      `;
      list.appendChild(card);
    });
  }
  
  function addItem(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const type = document.getElementById("type").value;
    const location = document.getElementById("location").value;
    const owner = document.getElementById("owner").value;
  
    items.unshift({ title, description, type, location, owner });
    renderItems();
    document.getElementById("itemForm").reset();
    document.getElementById("searchResults").style.display = "none";
  }
  
  function filterItems() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  
    renderItems(filtered);
  
    const resultBox = document.getElementById("searchResults");
    if (query.trim() === "") {
      resultBox.style.display = "none";
      return;
    }
  
    if (filtered.length === 0) {
      resultBox.innerHTML = `❌ <b>No item</b> matched your search: <i>"${query}"</i>`;
    } else {
      resultBox.innerHTML = `✅ <b>${filtered.length}</b> item(s) matched your search. Scroll below to view them.`;
    }
  
    resultBox.style.display = "block";
  }
  
  function showContact(ownerName) {
    document.getElementById("contactModal").style.display = "flex";
    document.getElementById("contactOwnerName").textContent = "Owner: " + ownerName;
  }
  
  function closeModal() {
    document.getElementById("contactModal").style.display = "none";
  }
  
  // Initial render
  renderItems();
  