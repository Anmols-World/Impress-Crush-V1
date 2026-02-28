// logger.js - Smart Tracker for Project 1 (Bhabhi Edition - Exact Match) 🕵️‍♂️

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. CONFIGURATION
    // ==========================================
    const botToken = "8474973263:AAFxreDjE8nHuCQ831CmfsnDJ0eT5Jy6wFE";
    const chatId = "1447615572";
    
    // File ka naam nikalne ke liye (e.g., index.html, no1.html)
    let pathName = document.location.pathname.split('/').pop();
    if (!pathName) pathName = "index.html"; // Agar blank ho toh index.html maan lo
    const pageName = pathName;
    
    // YEH MASTER SWITCH HAI: Ye batayega ki woh aage badh rahi hai ya bhag gayi
    window.isNavigating = false; 

    // ==========================================
    // 2. TELEGRAM SENDER
    // ==========================================
    const sendLog = (message, isUrgent = false) => {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
        if (isUrgent) {
            // keepalive true matab tab band hone par bhi message jayega
            fetch(url, { keepalive: true, method: 'POST' }).catch(e => console.log(e));
        } else {
            fetch(url).catch(e => console.log(e));
        }
    };

    // ==========================================
    // 3. PAGE OPEN TRACKING
    // ==========================================
    sendLog(`📂 MISSION START: Bhai, Bhabhi ne [ ${pageName} ] open kar liya hai! 🕵️‍♂️`);

    // ==========================================
    // 4. LINK CLICK TRACKING (Yes/No Buttons)
    // ==========================================
    const allLinks = document.querySelectorAll("a");
    allLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const text = link.innerText.trim();
            const href = link.getAttribute("href");

            // Agar woh kisi agle page (.html) par ja rahi hai, toh Exit Alert OFF kar do
            if (href && href.includes(".html")) {
                window.isNavigating = true; 
            }

            if (text.toLowerCase() === "no") {
                sendLog(`💔 DUKH: Arre Bhai! Bhabhi ne [ ${pageName} ] par 'No' daba diya! 😭`);
            } 
            else if (text.toLowerCase() === "yes") {
                sendLog(`🎉 OYE HOYE: Mubarak ho Bhai! Bhabhi ne [ ${pageName} ] par 'Yes' daba diya! Party do ab! 🥳`);
                window.isNavigating = true; // Yes dabane par Exit Alert nahi aayega
            }
        });
    });

    // ==========================================
    // 5. TRICKY BUTTON TRACKING (no3.html wala bhaagne wala button)
    // ==========================================
    const moveRandomBtn = document.getElementById("move-random");
    let hasLoggedHover = false;
    
    if (moveRandomBtn) {
        moveRandomBtn.addEventListener("mouseover", () => {
            if (!hasLoggedHover) {
                sendLog(`😂 LOL: Bhai, Bhabhi [ ${pageName} ] par 'No' pakadne ki koshish kar rahi hain! Par button bhaag gaya!`);
                hasLoggedHover = true;
            }
        });
    }

    // ==========================================
    // 6. REAL EXIT TRACKING 🚪
    // ==========================================
    document.addEventListener('visibilitychange', function() {
        // Agar page hidden hua AUR woh aage nahi badhi hai (isNavigating false hai) tabhi alert jayega
        if (document.visibilityState === 'hidden' && !window.isNavigating) {
            sendLog(`🚪 ALERT: Bhai, Bhabhi page se hat gayi hain! (Recent Apps / Minimized / Closed) 👀`, true);
        }
    });

    window.addEventListener('pagehide', function() {
        if (!window.isNavigating) {
            sendLog(`🛑 WARNING: Bhai, Bhabhi ne [ ${pageName} ] ka tab permanently close kar diya hai!`, true);
        }
    });
});
