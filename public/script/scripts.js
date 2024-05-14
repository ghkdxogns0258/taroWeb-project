// scripts.js

// scripts.js 파일

// 시작 화면 클릭 이벤트
document.addEventListener('DOMContentLoaded', function () {
    
    const startPage = document.querySelector('body[data-page="start"]');
   
    if (startPage) {
       
        startPage.addEventListener('click', function () {
            
            window.location.href = 'userinterface.html';
        });
    } 
});

// 사용자 정보 입력 폼
document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.querySelector('form[action="/api/users"]');
    if (userForm) {
        userForm.addEventListener('submit', function (event) {
            // 추가적인 폼 검증 로직을 여기에 추가할 수 있습니다.
        });
    }
});

// 타로 점 선택 페이지
document.addEventListener('DOMContentLoaded', function () {
    const taroMainPage = document.querySelector('body[data-page="taro-main"]');
    if (taroMainPage) {
        let selectedCard = null;
        let selectedCardCount = 0;
        let reverseMode = false;

        // 버튼 클릭 이벤트 처리
        document.getElementById("one-card-button").addEventListener("click", function () {
            selectedCardCount = 1;
            selectedCard = "원카드";
            updateSelectedCardInfo();
            showDrawCardButton();
            showReverseButton();
            hideMajorMinorButton();
        });

        document.getElementById("three-cards-button").addEventListener("click", function () {
            selectedCardCount = 3;
            selectedCard = "쓰리카드";
            updateSelectedCardInfo();
            showDrawCardButton();
            showReverseButton();
            hideMajorMinorButton();
        });

        document.getElementById("four-cards-button").addEventListener("click", function () {
            selectedCardCount = 4;
            selectedCard = "포카드";
            updateSelectedCardInfo();
            showDrawCardButton();
            showReverseButton();
            showMajorMinorButton();
        });

        document.getElementById("five-cards-button").addEventListener("click", function () {
            selectedCardCount = 5;
            selectedCard = "파이브카드";
            updateSelectedCardInfo();
            showDrawCardButton();
            showReverseButton();
            showMajorMinorButton();
        });

        document.getElementById("reverse-button").addEventListener("click", function () {
            reverseMode = !reverseMode;
            updateSelectedCardInfo();
        });

        document.getElementById("major-minor-button").addEventListener("click", function () {
            if (selectedCard.includes("메이저와 마이너 모두 사용")) {
                selectedCard = selectedCard.replace(", 메이저와 마이너 모두 사용", "");
            } else {
                selectedCard += ", 메이저와 마이너 모두 사용";
            }
            updateSelectedCardInfo();
        });

        document.getElementById("draw-card-button").addEventListener("click", function () {
            document.getElementById("selected-card").value = selectedCard;
            document.getElementById("selected-card-type").value = selectedCard;
        });

        function hideReverseButton() {
            document.getElementById("reverse-button").style.display = "none";
        }

        function showReverseButton() {
            document.getElementById("reverse-button").style.display = "block";
        }

        function hideMajorMinorButton() {
            document.getElementById("major-minor-button").style.display = "none";
        }

        function showMajorMinorButton() {
            document.getElementById("major-minor-button").style.display = "block";
        }

        function updateSelectedCardInfo() {
            const selectedCardInfoElement = document.getElementById("selected-card-info");
            if (selectedCard) {
                selectedCardInfoElement.textContent = `선택된 카드: ${selectedCard}, 역방향 상태: ${reverseMode ? '활성화' : '비활성화'}`;
            } else {
                selectedCardInfoElement.textContent = "카드를 선택하세요.";
            }
        }

        function showDrawCardButton() {
            const drawCardButton = document.getElementById("draw-card-button");
            drawCardButton.style.display = "block";
        }
    }
});

// 카드 뽑기 페이지
document.addEventListener('DOMContentLoaded', function () {
    const pickCardPage = document.querySelector('body[data-page="pick-card"]');
    if (pickCardPage) {
        document.getElementById("draw-card-button").addEventListener("click", function () {
            const selectedDivs = document.querySelectorAll(".card .selected");

            selectedDivs.forEach(div => div.classList.add("card-animation"));

            const selectedCardNames = Array.from(selectedDivs).map((div, index) => "카드" + (index + 1));
            const selectedCardString = selectedCardNames.join(", ");

            document.getElementById("selected-cards").value = selectedCardString;
            document.getElementById("card-form").submit();
        });

        const cardBox = document.getElementById("card-box");

        cardBox.addEventListener("click", function (event) {
            const target = event.target;
            if (target.tagName === "DIV") {
                target.classList.toggle("selected");
            }
        });

        document.getElementById("major-button").addEventListener("click", function () {
            cardBox.innerHTML = "";
            for (let i = 0; i < 22; i++) {
                const div = document.createElement("div");
                cardBox.appendChild(div);
                setTimeout(() => {
                    div.style.opacity = 1;
                    div.style.transform = "translateY(0)";
                }, i * 50);
            }
        });

        document.getElementById("major-minor-button").addEventListener("click", function () {
            cardBox.innerHTML = "";
            for (let i = 0; i < 78; i++) {
                const div = document.createElement("div");
                cardBox.appendChild(div);
                setTimeout(() => {
                    div.style.opacity = 1;
                    div.style.transform = "translateY(0)";
                }, i * 20);
            }
        });

        document.getElementById("one-card-button").addEventListener("click", function () {
            selectCards(1);
        });

        document.getElementById("three-cards-button").addEventListener("click", function () {
            selectCards(3);
        });

        document.getElementById("four-cards-button").addEventListener("click", function () {
            selectCards(4);
        });

        document.getElementById("five-cards-button").addEventListener("click", function () {
            selectCards(5);
        });

        function selectCards(numOfCards) {
            const selectedDivs = document.querySelectorAll(".card .selected");
            selectedDivs.forEach(div => div.classList.remove("selected"));

            const divs = document.querySelectorAll(".card div");
            const selectedIndices = [];
            while (selectedIndices.length < numOfCards) {
                const index = Math.floor(Math.random() * divs.length);
                if (!selectedIndices.includes(index)) {
                    selectedIndices.push(index);
                }
            }

            selectedIndices.forEach(index => {
                divs[index].classList.add("selected");
            });
        }
    }
});

// 타로 점 결과 페이지
document.addEventListener('DOMContentLoaded', function () {
    const taroResultPage = document.querySelector('body[data-page="taro-result"]');
    if (taroResultPage) {
        document.getElementById("restart-button").addEventListener("click", function () {
            window.location.href = "start.html";
        });

        document.getElementById("save-button").addEventListener("click", function () {
            saveImage();
        });

        function saveImage() {
            const container = document.querySelector(".container");
            html2canvas(container).then(canvas => {
                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = "taro_result.png";
                link.click();
            });
        }

        document.getElementById("show-fortune-button").addEventListener("click", function () {
            const fortuneInfo = document.getElementById("fortune-info");
            fortuneInfo.classList.toggle("hidden");
            if (!fortuneInfo.classList.contains("hidden")) {
                fortuneInfo.innerHTML = "<p>여기에 점괘 내용을 표시합니다.</p>";
            }
        });

        function showImage(numOfImages) {
            const imageContainer = document.getElementById("image-container");
            imageContainer.innerHTML = "";

            for (let i = 0; i < numOfImages; i++) {
                const image = document.createElement("img");
                image.src = "your_image_url.jpg";
                image.alt = "Your Image";
                image.classList.add("image");
                imageContainer.appendChild(image);
            }
        }

        function showCards(numOfCards, isMajor) {
            const cardContainer = document.getElementById("card-container");
            cardContainer.innerHTML = "";

            const cardPath = isMajor ? "Major_card22/" : "Minor_card56/";
            const cardList = [];

            while (cardList.length < numOfCards) {
                const randomCard = getRandomCard(isMajor);
                if (!cardList.includes(randomCard)) {
                    cardList.push(randomCard);
                    const card = document.createElement("img");
                    card.src = cardPath + randomCard + ".jpg";
                    card.alt = "타로 카드";
                    card.classList.add("card");
                    if (document.getElementById("reverse-checkbox").checked && Math.random() < 0.3) {
                        card.classList.add("reversed");
                    }
                    cardContainer.appendChild(card);
                }
            }
        }

        document.getElementById("one-card-button").addEventListener("click", function () {
            showCards(1, !document.getElementById("major-minor-checkbox").checked);
        });

        document.getElementById("three-cards-button").addEventListener("click", function () {
            showCards(3, !document.getElementById("major-minor-checkbox").checked);
        });

        document.getElementById("four-cards-button").addEventListener("click", function () {
            showCards(4, !document.getElementById("major-minor-checkbox").checked);
        });

        document.getElementById("five-cards-button").addEventListener("click", function () {
            showCards(5, !document.getElementById("major-minor-checkbox").checked);
        });

        document.getElementById("reverse-checkbox").addEventListener("change", function () {
            const reverseCheckbox = document.getElementById("reverse-checkbox");
            const cards = document.querySelectorAll(".card");

            if (reverseCheckbox.checked) {
                cards.forEach(card => {
                    if (Math.random() < 0.3) {
                        card.classList.add("reversed");
                    }
                });
            } else {
                cards.forEach(card => {
                    card.classList.remove("reversed");
                });
            }
        });

        const majorMinorCheckbox = document.getElementById("major-minor-checkbox");
        const majorMinorButtons = document.querySelectorAll(".button-group button:not(#restart-button):not(#save-button):not(#show-fortune-button)");

        majorMinorCheckbox.addEventListener("change", function () {
            if (majorMinorCheckbox.checked) {
                majorMinorButtons.forEach(button => {
                    button.disabled = false;
                });
                majorMinorCheckbox.nextElementSibling.textContent = "활성화됨";
            } else {
                majorMinorButtons.forEach(button => {
                    button.disabled = false;
                });
                majorMinorCheckbox.nextElementSibling.textContent = "";
            }
        });

        function getRandomCard(isMajor) {
            const cardNames = isMajor ?
                ["00_The_Fool", "01_The_Magician", "02_The_High_Priestess", "03_The_Empress", "04_The_Emperor",
                "05_The_Hierophant", "06_The_Lovers", "07_The_Chariot", "08_Strength", "09_The_Hermit",
                "10_Wheel_of_Fortune", "11_Justice", "12_The_Hanged_Man", "13_Death", "14_Temperance",
                "15_The_Devil", "16_The_Tower", "17_The_Star", "18_The_Moon", "19_The_Sun",
                "20_Judgement", "21_The_World"] :
                ["00_The_Fool", "01_The_Magician", "02_The_High_Priestess", "03_The_Empress", "04_The_Emperor",
                "05_The_Hierophant", "06_The_Lovers", "07_The_Chariot", "08_Strength", "09_The_Hermit",
                "10_Wheel_of_Fortune", "11_Justice", "12_The_Hanged_Man", "13_Death", "14_Temperance",
                "15_The_Devil", "16_The_Tower", "17_The_Star", "18_The_Moon", "19_The_Sun",
                "20_Judgement", "21_The_World", "Ace_of_Cups", "Two_of_Cups", "Three_of_Cups", "Four_of_Cups", "Five_of_Cups", "Six_of_Cups",
                "Seven_of_Cups", "Eight_of_Cups", "Nine_of_Cups", "Ten_of_Cups", "Page_of_Cups", "Knight_of_Cups",
                "Queen_of_Cups", "King_of_Cups", "Ace_of_Pentacles", "Two_of_Pentacles", "Three_of_Pentacles",
                "Four_of_Pentacles", "Five_of_Pentacles", "Six_of_Pentacles", "Seven_of_Pentacles", "Eight_of_Pentacles",
                "Nine_of_Pentacles", "Ten_of_Pentacles", "Page_of_Pentacles", "Knight_of_Pentacles", "Queen_of_Pentacles",
                "King_of_Pentacles", "Ace_of_Swords", "Two_of_Swords", "Three_of_Swords", "Four_of_Swords", "Five_of_Swords",
                "Six_of_Swords", "Seven_of_Swords", "Eight_of_Swords", "Nine_of_Swords", "Ten_of_Swords", "Page_of_Swords",
                "Knight_of_Swords", "Queen_of_Swords", "King_of_Swords", "Ace_of_Wands", "Two_of_Wands", "Three_of_Wands",
                "Four_of_Wands", "Five_of_Wands", "Six_of_Wands", "Seven_of_Wands", "Eight_of_Wands", "Nine_of_Wands",
                "Ten_of_Wands", "Page_of_Wands", "Knight_of_Wands", "Queen_of_Wands", "King_of_Wands"];

            const randomIndex = Math.floor(Math.random() * cardNames.length);
            return cardNames[randomIndex];
        }
    }
});
