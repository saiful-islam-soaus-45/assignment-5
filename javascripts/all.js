const loadAll = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) =>displayAll(data.data));
    
};
const displayAll = (Alls) => {
  const cardContainer = document.getElementById("card-item");
  cardContainer.innerHTML = "";
  Alls.forEach((All) => {
    const allCard = document.createElement("div");
    allCard.innerHTML = `
    

    
        
        <div class="max-w-sm bg-white rounded-xl shadow-md  overflow-hidden font-sans w-[300px] h-[100%] mx-auto ">
            <div class="h-1.5 bg-[#00A36C]"></div>

            <div class="p-5">
                <div class="flex justify-between items-center mb-4">
                    <div class="w-8 h-8 rounded-full bg-[#E6F6F0] flex items-center justify-center">
                        <div class="w-5 h-5 rounded-full border-2 border-dashed border-[#00A36C]"></div>
                    </div>
                    <span
                        class="px-4 py-1 rounded-full bg-[#FFF0F0] text-[#FF4D4D] text-xs font-bold uppercase tracking-wider">
                        ${All.priority}
                    </span>
                </div>

                <h2 class="text-[#1A2B3B] text-xl font-bold leading-tight mb-2">
                      ${All.title}
                </h2>

                <p class="text-slate-500 text-sm mb-6 line-clamp-2">
                     ${All.description}
                </p>

                <div class="flex gap-2 mb-6">
                    <span
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F0] text-[#FF4D4D] border border-[#FFDADA] text-xs font-bold uppercase">
                        <span class="text-sm"><i class="fa-solid fa-bug"></i></span> BUG
                    </span>
                    <!-- <p class="text-sm"><i class="fa-solid fa-bug"></i> BUG</p> -->
                    <span
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF9E6] text-[#D97706] border border-[#FDE68A] text-xs font-bold uppercase">
                        <span class="text-sm"><i class="fa-solid fa-gear"></i></span> HELP WANTED
                    </span>
                </div>

                <div class="border-t border-gray-100 pt-4 mt-2">
                    <p class="text-slate-500 text-sm font-medium">#1 by john_doe</p>
                    <p class="text-slate-400 text-sm mt-1">1/15/2024</p>
                </div>
            </div>
        </div>
        
    
     
        `;
    cardContainer.append(allCard);
  });
};
loadAll();
