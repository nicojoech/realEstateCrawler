document.addEventListener("DOMContentLoaded", function () {
  // Create the div with the specified classes
  const col1 = document.createElement("div");
  col1.className = "md:col-span-1 md:flex md:justify-end";

  // Create the nav element with the specified structure
  const nav = document.createElement("nav");
  nav.className = "text-right";

  const navContent = `
  <div class="flex justify-between items-center">
    <h1 class="font-bold uppercase p-4 border-b border-gray-100">
      <a href="/" class="hover:text-gray-700">Real Estate Crawler</a>
    </h1>
    <div class="px-4 cursor-pointer md:hidden" id="burger">
      <svg class="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </div>
  </div>
  <ul class="text-sm mt-6 hidden md:block" id="menu">
    <li class="py-1">
      <a href="index.html" class="px-4 flex justify-end border-r-4 ${currentPage === "index" ? "border-primary" : "border-white"} hover:border-primary t-ease">
        <span>Search</span>
        <svg class="w-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </a>
    </li>
    <li class="py-1">
      <a href="settings.html" class="px-4 flex justify-end border-r-4 ${currentPage === "settings" ? "border-primary" : "border-white"} hover:border-primary t-ease">
        <span>Settings</span>
        <svg class="w-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
          />
        </svg>
      </a>
    </li>
    <li class="py-1">
      <a href="imprint.html" class="px-4 flex justify-end border-r-4 ${currentPage === "imprint" ? "border-primary" : "border-white"} hover:border-primary t-ease">
        <span>About Us</span>
        <svg class="w-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      </a>
    </li>
  </ul>
`;

  // Set the innerHTML of the nav element
  nav.innerHTML = navContent;

  // Append the nav element to the col1 div
  col1.appendChild(nav);

  // Get div with the id "page"
  const pageDiv = document.getElementById("page");

  // Insert the col1 inside the "page" div as the first child
  pageDiv.insertBefore(col1, pageDiv.firstChild);
});
