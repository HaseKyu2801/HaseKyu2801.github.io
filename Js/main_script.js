const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

      toggle.addEventListener("click", () =>{

        sidebar.classList.toggle("close");
      });

      modeSwitch.addEventListener("click", () =>{
        body.classList.toggle("dark");
        if(body.classList.contains("dark")){
            modeText.innerText = "Light Mode"
        }
        else{
            modeText.innerText = "Dark Mode"
        }

      });

// Lựa Chọn Content

const menuLinks = document.querySelectorAll('.nav-link');
const homeSections = document.querySelectorAll('.home');

menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        
        const clickedId = link.id.replace('link-', ''); // Lấy id từ thẻ menu
        homeSections.forEach(section => {
            section.classList.remove('active'); // Loại bỏ class 'active' từ tất cả các phần nội dung
            section.classList.toggle('active', section.id === `home-${clickedId}`); // Thêm hoặc xóa lớp 'active'
        });
    });
});

// Chuc nang search

const searchBox = document.getElementById('searchBox');

    searchBox.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Ngăn chặn hành động mặc định của Enter trong trường input
            showPopup();
        }
    });

    function showPopup() {
        alert('Chức năng này chưa hoàn thiện');
        // Hoặc thực hiện bất kỳ hành động nào bạn muốn khi ấn Enter
    }

// 
      
