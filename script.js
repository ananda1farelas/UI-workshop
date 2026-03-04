// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.1)';
        navbar.style.padding = '10px 50px';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        navbar.style.padding = '15px 50px';
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Login Modal
const modal = document.getElementById("loginModal");
const openBtn = document.getElementById("openLogin");
const closeBtn = document.querySelector(".close-btn");

openBtn.addEventListener("click", function(e){
    e.preventDefault();
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", function(){
    modal.style.display = "none";
});

window.addEventListener("click", function(e){
    if(e.target === modal){
        modal.style.display = "none";
    }
});

document.getElementById("formLogin").addEventListener("submit", function(event){
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const hasilLogin = document.getElementById("hasilLogin");

    if(username === "admin" && password === "12345"){
        hasilLogin.innerHTML = "<p style='color:green;'>Login Berhasil ✅</p>";
    } else {
        hasilLogin.innerHTML = "<p style='color:red;'>Username atau Password salah ❌</p>";
    }
    this.reset();
});

// KONSULTASI FORM HANDLING
let nomorUrut = 1;
const dataKonsultasi = [];

document.getElementById("formKonsultasi").addEventListener("submit", function(event){
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const keluhan = document.getElementById("keluhan").value;
    const waktu = new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    const data = {
        no: nomorUrut++,
        nama: nama,
        email: email,
        keluhan: keluhan,
        waktu: waktu
    };
    dataKonsultasi.push(data);

    updateTable();

    document.getElementById("successMessage").classList.add("show");
    document.getElementById("tableContainer").classList.add("show");

    this.reset();

    document.getElementById("tableContainer").scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
});

function updateTable() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    dataKonsultasi.forEach((data, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.no}</td>
            <td>${escapeHtml(data.nama)}</td>
            <td>${escapeHtml(data.email)}</td>
            <td>${escapeHtml(data.keluhan)}</td>
            <td>${data.waktu}</td>
        `;
        
        if (index === dataKonsultasi.length - 1) {
            row.style.animation = "fadeIn 0.5s ease";
            row.style.backgroundColor = "var(--light)";
            setTimeout(() => {
                row.style.backgroundColor = "";
            }, 2000);
        }
        
        tbody.appendChild(row);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}