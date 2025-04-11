

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Function to get a cookie
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Function to replace the entire page with the quit message
function showQuitMessage() {
    document.body.innerHTML = `
  <h3 style="font-size: 40pt; text-align:center; margin-top:20%;">You Quit, Now Leave</h3>
  <p style="text-align:center;">(or come back in a week)</p>
`;

}
// Check on page load if user has already quit
window.addEventListener("DOMContentLoaded", () => {
    if (getCookie("userQuit") === "true") {
        showQuitMessage();
    }
});
;
// Handle quit button click
const quit = document.getElementById("quit");
if (quit) {
    quit.addEventListener("click", () => {
        setCookie("userQuit", "true", 7); // Save for 7 days
        showQuitMessage();
    });
}

const body1 = document.getElementById("body1");
if (body1) {
    body1.addEventListener("click", () => {
        if (document.getElementById("blueBox")) {
            document.getElementById("blueBox").remove();
            document.getElementById("newBlueBoxContainer").style.animation = "appearNewBlueBox 2s ease-in-out 0s forwards";
        } else if (document.getElementById("greenBox")) {
            document.getElementById("greenBox").remove();
            document.getElementById("newGreenBoxContainer").style.animation = "appearNewBlueBox 2s ease-in-out 0s forwards";
        } else if (document.getElementById("yellowBox")) {
            document.getElementById("yellowBox").remove();
            document.getElementById("newYellowBoxContainer").style.animation = "appearNewBlueBox 2s ease-in-out 0s forwards";
        } else if (document.getElementById("purpleBox")) {
            document.getElementById("purpleBox").remove();
            document.getElementById("newPurpleBoxContainer").style.animation = "appearNewBlueBox 2s ease-in-out 0s forwards";
        }
    });
}

let isRainbowUnlocked = false

const startOver = document.getElementById("startOver");
if (startOver) {
    startOver.addEventListener("click", function () {
        // Get all cookies and split them
        const cookies = document.cookie.split(";");

        // Loop through each cookie and expire it
        cookies.forEach(cookie => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        });
    });
}

function getColorCounts() {
    // Define the order of colors
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'white', 'gold'];

    // Retrieve the inventory from the cookie
    let inventory = getCookie('inventory');
    inventory = inventory ? JSON.parse(inventory) : {};

    // Create an array to hold the counts for each color
    const colorCounts = [];

    // Loop through each color and get its count from the inventory (default to 0 if not found)
    colors.forEach(color => {
        const count = inventory[color] || 0;
        colorCounts.push({ color, count });
    });

    // Return the array of color counts
    return colorCounts;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
if (window.location.pathname.endsWith("Box.html")) {
    if (getCookie("areTheyCheating") == "false") {
        alert("Go back to the store to buy boxes.");
        window.location.href = "boxes.html";
    } else {
       setCookie("areTheyCheating", "false", 2);
    }
  }


document.addEventListener('DOMContentLoaded', function () {
    const newBlueBox = document.getElementById('newBlueBox');
    const newGreenBox = document.getElementById('newGreenBox');
    const newYellowBox = document.getElementById('newYellowBox');
    const newPurpleBox = document.getElementById('newPurpleBox');
    let useableBox;
    if (newBlueBox != null) {
        useableBox = newBlueBox;
    }
    else if (newGreenBox != null) {
        useableBox = newGreenBox;
    }
    else if (newYellowBox != null) {
        useableBox = newYellowBox;
    }
    else if (newPurpleBox != null) {
        useableBox = newPurpleBox;
    }
    if (useableBox) {
        let colorChances;
        if (useableBox == newBlueBox) {
            colorChances = {
                red: 25,
                orange: 17,
                yellow: 14,
                green: 13,
                blue: 10,
                purple: 8,
                pink: 7,
                white: 5.9,
                gold: 0.1
            };
        } else if (useableBox == newGreenBox) {
            colorChances = {
                red: 0,
                orange: 0,
                yellow: 11,
                green: 10,
                blue: 15,
                purple: 20,
                pink: 25,
                white: 18.5,
                gold: 0.5
            };
        } else if (useableBox == newYellowBox) {
            colorChances = {
                red: 0.2,
                orange: 0,
                yellow: 0,
                green: 0,
                blue: 10,
                purple: 33.95,
                pink: 30,
                white: 25,
                gold: 2
            };
        } else if (useableBox == newPurpleBox) {
            colorChances = {
                red: 1,
                orange: 0,
                yellow: 0,
                green: 0,
                blue: 0,
                purple: 0,
                pink: 35,
                white: 59.8,
                gold: 5
            };
        }
        const weightedColors = [];
        for (const color in colorChances) {
            const weight = colorChances[color];
            for (let i = 0; i < weight * 10; i++) {
                weightedColors.push(color);
            }
        }

        const randomIndex = Math.floor(Math.random() * weightedColors.length);
        const selectedColor = weightedColors[randomIndex];

        // Set background color for the box

        if (selectedColor === "gold") {
            useableBox.style.boxShadow = "0 0 20px 10px rgba(247, 255, 138, 0.8)";
            useableBox.style.borderRadius = "10px";
            useableBox.style.backgroundColor = selectedColor;

        } else if (selectedColor == "red" && useableBox == newYellowBox) {
            useableBox.style.boxShadow = "0 0 40px 10px rgba(255, 255, 255, 0.8)";
            useableBox.style.borderRadius = "11px";
            useableBox.style.backgroundImage = "url('images/rainbow-animated.gif')";
            useableBox.style.filter = "saturate(2)"
            document.getElementById("belowText").innerText = "Choose Your Fate";
            document.getElementById("toolTip").innerText = "";
            isRainbowUnlocked = true;
        }
        else if (selectedColor == "red" && useableBox == newPurpleBox) {
            useableBox.style.boxShadow = "0 0 40px 10px rgba(255, 255, 255, 0.8)";
            useableBox.style.borderRadius = "11px";
            useableBox.style.backgroundImage = "url('images/rainbow-animated.gif')";
            useableBox.style.filter = "saturate(2)"
            document.getElementById("belowText").innerText = "Choose Your Fate";
            isRainbowUnlocked = true;
        }
        else {
            useableBox.style.boxShadow = "none";
            useableBox.style.borderRadius = "0";
            useableBox.style.backgroundColor = selectedColor;
        }


        // Update the inventory in the cookie (but not the list yet)
        let inventory = getCookie('inventory');
        inventory = inventory ? JSON.parse(inventory) : {};

        // Increment the color count in the inventory
        if (!inventory[selectedColor]) {
            inventory[selectedColor] = 0;
        }
        inventory[selectedColor]++;

        // Save the updated inventory back to the cookie
        setCookie('inventory', JSON.stringify(inventory), 3650); // Store for 1 year

        // Helper functions for cookies
        function setCookie(name, value, days) {
            const d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/"; // "/" makes cookie accessible across pages
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const colorIdMap = {
        red: 'numOfReds',
        orange: 'numOfOranges',
        yellow: 'numOfYellows',
        green: 'numOfGreens',
        blue: 'numOfBlues',
        purple: 'numOfPurples',
        pink: 'numOfPinks',
        white: 'numOfWhites',
        gold: 'numOfGolds'
    };

    // Retrieve the inventory data from the cookie
    let inventory = getCookie('inventory');
    inventory = inventory ? JSON.parse(inventory) : {};

    // Update the counters on the page based on the cookie data
    for (const color in colorIdMap) {
        const counterElement = document.getElementById(colorIdMap[color]);
        if (counterElement && inventory[color] !== undefined) {
            counterElement.textContent = inventory[color];
        }
    }

    // Helper functions for cookies
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Ensure the DOM is fully loaded before accessing the elements
    const circle = document.getElementById('circle');
    const counter = document.getElementById('counter');
    let count = getCookie('count') ? parseInt(getCookie('count')) : 0;

    // Set counter text to the count value when the page is loaded
    if (counter) {
        counter.textContent = count; // Update the counter text with the saved count
    }

    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    const box3 = document.getElementById('box3');
    const box4 = document.getElementById('box4');
    const credits = document.getElementById('credits');
    const belowText = document.getElementById('belowText');

    // Ensure box1 exists before adding the event listener
    if (box1) {
        box1.addEventListener('click', function () {
            // Subtract 10 from the count
            if (count >= 50) {
                count = Math.max(0, count - 50); // Prevent negative count
                setCookie('count', count, 3650);
                setCookie("areTheyCheating", "true", 2)
                // Update counter and credits text
                if (counter) {
                    counter.textContent = count;
                }
                if (credits) {
                    credits.textContent = "Credits: " + count;
                }

                // Redirect to the blueBox page
                window.location.href = 'blueBox.html';
            }
            else {
                showCreditPopup();
            }
        });
    }
    if (box2) {
        box2.addEventListener('click', function () {
            // Subtract 10 from the count
            if (count >= 1000) {
                count = Math.max(0, count - 1000); // Prevent negative count
                setCookie('count', count, 3650);
                setCookie("areTheyCheating", "true", 2)
                // Update counter and credits text
                if (counter) {
                    counter.textContent = count;
                }
                if (credits) {
                    credits.textContent = "Credits: " + count;
                }

                // Redirect to the blueBox page
                window.location.href = 'greenBox.html';
            }
            else {
                showCreditPopup();
            }
        });
    }
    if (box3) {
        box3.addEventListener('click', function () {
            // Subtract 10 from the count
            if (count >= 50000) {
                count = Math.max(0, count - 50000); // Prevent negative count
                setCookie('count', count, 3650);
                setCookie("areTheyCheating", "true", 2)
                // Update counter and credits text
                if (counter) {
                    counter.textContent = count;
                }
                if (credits) {
                    credits.textContent = "Credits: " + count;
                }

                // Redirect to the blueBox page
                window.location.href = 'yellowBox.html';
            }
            else {
                showCreditPopup();
            }
        });
    }
    if (box4) {
        box4.addEventListener('click', function () {
            // Subtract 10 from the count
            if (count >= 1000000000) {
                count = Math.max(0, count - 1000000000); // Prevent negative count
                setCookie('count', count, 3650);
                setCookie("areTheyCheating", "true", 2)
                // Update counter and credits text
                if (counter) {
                    counter.textContent = count;
                }
                if (credits) {
                    credits.textContent = "Credits: " + count;
                }

                // Redirect to the blueBox page
                window.location.href = 'purpleBox.html';
            }
            else {
                showCreditPopup();
            }
        });
    }


    // Ensure belowText exists before adding the event listener
    if (belowText) {
        belowText.addEventListener('click', function () {
            console.log(isRainbowUnlocked);
            if (isRainbowUnlocked == false) {
                belowText.href = "boxes.html";
            } else {
                belowText.href = "TheEnd.html";
            }

        });
    }
    // Set credits text on page load
    if (credits) {
        credits.textContent = "Credits: " + count;
    }

    // Handle the circle click event to increase count
    if (circle) {
        circle.addEventListener('click', function (e) {

            const rawColorCounts = getColorCounts();
            let colorCounts = [];

            rawColorCounts.forEach(item => {
                colorCounts.push(item.count);
            });
            let bonusMulti = 1;
            bonusMulti = bonusMulti + colorCounts[0] * 0.1
            bonusMulti = bonusMulti + colorCounts[1] * 0.2
            bonusMulti = bonusMulti + colorCounts[2] * 0.4
            bonusMulti = bonusMulti + colorCounts[3] * 0.6
            bonusMulti = bonusMulti + colorCounts[4] * 0.8
            bonusMulti = bonusMulti + colorCounts[5] * 1
            bonusMulti = bonusMulti + colorCounts[6] * 2
            bonusMulti = bonusMulti + colorCounts[7] * 3
            bonusMulti = bonusMulti * (2 * (colorCounts[8] + 1));
            count = count + bonusMulti;
            count = Math.round(count * 10) / 10;
            if (counter) {
                counter.textContent = count; // Update counter text when clicked
            }
            setCookie('count', count, 3650); // Set cookie to expire in 10 years

            // Update credits text when count changes
            if (credits) {
                credits.textContent = "Credits: " + count;
            }

            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';

            // Position ripple at click coordinates
            const rect = circle.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            // Add ripple to circle
            circle.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Cookie-related functions
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // More elements you may want to access
    const greenBox = document.getElementById('box2');
    const yellowBox = document.getElementById('box3');
    const purpleBox = document.getElementById('box4');
});
function showCreditPopup() {
    // Prevent duplicate popups
    if (document.getElementById('creditPopup')) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'creditPopup';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; // semi-transparent
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999'; // very high to appear on top
    overlay.style.fontFamily = 'Arial, Helvetica, sans-serif';

    // Create popup box
    const popupBox = document.createElement('div');
    popupBox.style.backgroundColor = '#222'; // dark background
    popupBox.style.color = 'white';
    popupBox.style.padding = '20px 30px';
    popupBox.style.borderRadius = '12px';
    popupBox.style.textAlign = 'center';
    popupBox.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
    popupBox.style.maxWidth = '90%';
    popupBox.style.zIndex = '10000'; // even higher
    popupBox.style.pointerEvents = 'auto'; // enable click inside box

    // Message
    const message = document.createElement('p');
    message.textContent = "You don't have enough credits";
    message.style.marginBottom = '15px';
    message.style.fontSize = '16px';
    popupBox.appendChild(message);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.padding = '8px 16px';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '6px';
    closeBtn.style.backgroundColor = 'aqua';
    closeBtn.style.color = 'black';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '14px';
    closeBtn.addEventListener('click', function () {
        document.body.removeChild(overlay);
    });

    popupBox.appendChild(closeBtn);
    overlay.appendChild(popupBox);
    document.body.appendChild(overlay);
}
