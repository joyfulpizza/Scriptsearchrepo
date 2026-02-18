async function search(){
  const query = document.getElementById("searchBox").value;
  const res = await fetch(`/api/search?q=${query}`);
  const data = await res.json();

  const container = document.getElementById("results");
  container.innerHTML = "";

  if(!data.success){
    container.innerHTML = "Search failed";
    return;
  }

  data.results.forEach(source=>{
    source.data.forEach(script=>{
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <h3>${script.title || "No title"}</h3>
        <p>Source: ${source.source}</p>
        <pre>${script.script || ""}</pre>
      `;

      container.appendChild(div);
    });
  });
}
