let allIssues = [];
const loadAll = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data;
      displayAll(allIssues);
      updateButtonStyles("all");
    });
};

// filter issue
const filterIssues = (status) => {
  let filteredData = [];

  if (status === "all") {
    filteredData = allIssues;
  } else {
    filteredData = allIssues.filter(
      (issue) => issue.status.toLowerCase() === status.toLowerCase(),
    );
  }

  updateButtonStyles(status);
  displayAll(filteredData);
};

const searchIssues = () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value.trim();

  if (searchText === "") {
    loadAll();
    return;
  }

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;

  console.log("Fetching from URL:", url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success" && data.data) {
        displayAll(data.data);
      } else {
        console.log("No results found");
        displayAll([]);
      }
    })
    .catch((err) => {
      console.error("Search API Error:", err);
      displayAll([]);
    });
};

const updateButtonStyles = (activeStatus) => {
  const buttons = ["all", "open", "closed"];

  buttons.forEach((btnType) => {
    const btn = document.getElementById(`btn-${btnType}`);
    if (btn) {
      if (btnType === activeStatus) {
        btn.style.backgroundColor = "#5D00FF";
        btn.style.color = "white";
        btn.style.borderColor = "#5D00FF";
        btn.blur();
      } else {
        btn.style.backgroundColor = "white";
        btn.style.color = "#64748b";
        btn.style.borderColor = "#f1f5f9";
      }
    }
  });
};

// card display
const displayAll = (Issues) => {
  const cardContainer = document.getElementById("card-item");
  cardContainer.innerHTML = "";

  const counterElement = document.getElementById("total-issue-count");
  if (counterElement) {
    counterElement.innerText = `${Issues.length} Issues`;
  }

  Issues.forEach((issue) => {
    const statusIcon =
      issue.status.toLowerCase() === "open"
        ? `<div class="w-5 h-5 rounded-full border-2 border-dashed border-[#00A36C]"></div>`
        : `<i class="fa-solid fa-circle-check text-purple-600 text-xl"></i>`;

    const topBarColor =
      issue.status.toLowerCase() === "open" ? "bg-[#00A36C]" : "bg-purple-700";

    let priorityBg = "";
    let priorityText = "";
    const priority = issue.priority.toLowerCase();

    if (priority === "high") {
      priorityBg = "bg-red-200";
      priorityText = "text-red-700";
    } else if (priority === "medium") {
      priorityBg = "bg-yellow-200";
      priorityText = "text-yellow-700";
    } else if (priority === "low") {
      priorityBg = "bg-purple-200";
      priorityText = "text-purple-700";
    } else {
      priorityBg = "bg-gray-200";
      priorityText = "text-gray-700";
    }

    const labelsHTML = issue.labels
      .map(
        (label) => `
        <span class="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-200 text-gray-700 border border-yellow-200 text-[10px] font-bold uppercase">
           ${label}
        </span>
      `,
      )
      .join("");

    const allCard = document.createElement("div");
    allCard.className = "w-full";
    allCard.innerHTML = `
      <div onclick="getIssueDetails(${issue.id})" class="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden font-sans    h-full border border-gray-100 flex flex-col">
        <div class="h-1.5 ${topBarColor}"></div>

        <div class="p-5 flex-grow">
          <div class="flex justify-between items-center mb-4">
            <div class="w-8 h-8 rounded-full bg-[#E6F6F0] flex items-center justify-center shrink-0">
              ${statusIcon}
            </div>
            <span class="px-4 py-1 rounded-full ${priorityBg} ${priorityText} text-[10px] font-bold uppercase tracking-wider">
              ${issue.priority}
            </span>
          </div>

          <h2 class="text-[#1A2B3B] text-lg font-bold leading-tight mb-2">${issue.title}</h2>
          <p class="text-slate-500 text-sm mb-6 line-clamp-2">${issue.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">${labelsHTML}</div>
        </div>

        <div class="p-5 pt-0 mt-auto">
            <div class="border-t border-gray-100 pt-4 flex justify-between items-center text-slate-400 text-[12px]">
               <p >#${issue.id} by <b>${issue.author}</b></p>
               <p class="text-[10px] font-bold text-slate-400">${issue.createdAt}</p>
            </div>
            <div class="pt-3 flex justify-between items-center">
                <p class="text-slate-400 text-[12px] font-bold">Assignee: ${issue.assignee || "Not Assigned"}</p>
                <span class="text-[10px] font-bold uppercase ${issue.status === "open" ? "text-[#00A36C]" : "text-purple-700"}">
                </span>
                <p class="text-[10px] font-bold text-slate-400">${issue.updatedAt}</p>
            </div>
        </div>
      </div>
    `;
    cardContainer.append(allCard);
  });
};

loadAll();

const getIssueDetails = (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        showModal(data.data);
      }
    })
    .catch((err) => console.error("Error fetching details:", err));
};

const showModal = (issue) => {
  const modal = document.getElementById("issue-modal");
  const content = document.getElementById("modal-content");

  const statusBg =
    issue.status.toLowerCase() === "open" ? "bg-[#00A36C]" : "bg-purple-700";

  const labelsHTML = issue.labels
    .map((label) => {
      return `
        <span class="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-200 text-gray-700 border border-yellow-200 text-[10px] font-bold uppercase tracking-wider">
             ${label}
        </span>`;
    })
    .join("");

  content.innerHTML = `
        <h1 class="text-2xl font-bold text-[#1A2B3B] mb-2">${issue.title}</h1>
        
        <div class="flex items-center gap-2 mb-6 text-xs">
            <span class="${statusBg} text-white px-3 py-1 rounded-full font-medium">
                ${issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}ed
            </span>
            <span class="text-slate-400">• Opened by ${issue.author} • ${issue.createdAt.split("T")[0]}</span>
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
            ${labelsHTML}
        </div>

        <p class="text-slate-500 leading-relaxed mb-8 text-sm">
            ${issue.description}
        </p>

        <div class="bg-[#F8FAFC] rounded-2xl p-6 flex justify-between items-center mb-8 border border-[#F1F5F9]">
            <div>
                <p class="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Assignee:</p>
                <p class="font-bold text-[#1A2B3B] text-lg">${issue.assignee || "Not Assigned"}</p>
            </div>
            <div class="text-right">
                <p class="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">Priority:</p>
                <span class="bg-[#EF4444] text-white px-6 py-1.5 rounded-lg font-bold text-[10px] uppercase shadow-sm">
                    ${issue.priority}
                </span>
            </div>
        </div>

        <div class="flex justify-end">
            <button onclick="closeModal()" type="button" class="bg-[#5D00FF] text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-opacity-90 transition-all cursor-pointer shadow-lg shadow-indigo-100">
                Close
            </button>
        </div>
    `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

const closeModal = () => {
  const modal = document.getElementById("issue-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
};
