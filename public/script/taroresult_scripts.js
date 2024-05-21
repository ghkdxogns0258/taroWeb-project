// 모달 관련 요소
var modal = document.getElementById("fortuneModal");
var fortuneText = document.getElementById("fortune-text");
var copyButton = document.getElementById("copy-button");

// 점괘 보기 버튼 클릭 시 모달 창 열기
document.getElementById("show-fortune-button").addEventListener("click", function() {
    modal.style.display = "block";
});

// 모달 창의 닫기 버튼 클릭 시 모달 창 닫기
document.getElementsByClassName("close")[0].addEventListener("click", function() {
    modal.style.display = "none";
});

// 모달 창 바깥 부분 클릭 시 모달 창 닫기
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// 복사하기 버튼 클릭 시 텍스트 복사
copyButton.addEventListener("click", function() {
    copyToClipboard(fortuneText.innerText);
    copyButton.textContent = "복사 완료";
    setTimeout(function() {
        copyButton.textContent = "복사하기";
    }, 1000);
});

// 클립보드에 텍스트 복사 함수
function copyToClipboard(text) {
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}
// "다시하기" 버튼
document.getElementById("restart-button").addEventListener("click", function() {
    window.location.href = "start.html";
});

// "저장" 버튼
document.getElementById("save-button").addEventListener("click", function() {
    saveImage();
});

// 이미지 저장 함수
function saveImage() {
    const container = document.querySelector(".container");
    html2canvas(container).then(canvas => {
        // 이미지 URL 생성
        const image = canvas.toDataURL("image/png");
        // 이미지를 다운로드
        const link = document.createElement("a");
        link.href = image;
        link.download = "taro_result.png";
        link.click();
    });
}

// 점괘 보기 버튼
document.getElementById("show-fortune-button").addEventListener("click", function() {
    const fortuneInfo = document.getElementById("fortune-info");
    const fortuneText = document.getElementById("fortune-text"); // 수정된 부분
    fortuneInfo.classList.toggle("hidden"); // 숨김/표시 토글
    if (!fortuneInfo.classList.contains("hidden")) {
        // 점괘 내용을 보여줄 때만 작업
        // 여기에 점괘 내용을 표시하는 코드를 추가
        fortuneText.innerText = "여기에 점괘 내용을 표시합니다."; // 수정된 부분
    }
});


// 복사하기 버튼 클릭 이벤트 처리
document.getElementById("copy-button").addEventListener("click", function() {
    const copyButton = document.getElementById("copy-button");
    const fortuneText = document.getElementById("fortune-text").innerText;
    navigator.clipboard.writeText(fortuneText).then(function() {
        console.log("복사되었습니다: " + fortuneText);
        copyButton.innerText = "완료";
        // 1초 후에 버튼 텍스트를 다시 "복사하기"로 변경
        setTimeout(function() {
            copyButton.innerText = "복사하기";
        }, 1000);
    }, function(err) {
        console.error("복사 실패: ", err);
        copyButton.innerText = "실패";
        // 1초 후에 버튼 텍스트를 다시 "복사하기"로 변경
        setTimeout(function() {
            copyButton.innerText = "복사하기";
        }, 1000);
    });
});

// 클립보드에 텍스트 복사 함수
function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

// 이미지 표시 함수
function showImage(numOfImages) {
    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = ""; // 기존 이미지 삭제

    for (let i = 0; i < numOfImages; i++) {
        const image = document.createElement("img");
        image.src = "your_image_url.jpg"; // 이미지 경로 지정
        image.alt = "Your Image";
        image.classList.add("image");
        imageContainer.appendChild(image);
    }
}

// 카드를 보여주는 함수
function showCards(numOfCards, isMajor) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; // 기존 카드 삭제

    const cardPath = isMajor ? "Major_card22/" : "Minor_card56/";
    const cardList = []; // 중복 카드 방지를 위한 배열

    while (cardList.length < numOfCards) {
        const randomCard = getRandomCard(isMajor);
        if (!cardList.includes(randomCard)) {
            cardList.push(randomCard);
            const card = document.createElement("img");
            card.src = cardPath + randomCard + ".jpg";
            card.alt = "타로 카드";
            card.classList.add("card");
            // 역방향 체크 여부에 따라 랜덤하게 뒤집기
            if (document.getElementById("reverse-checkbox").checked && Math.random() < 0.3) {
                card.classList.add("reversed");
            }
            cardContainer.appendChild(card);
        }
    }
}

// 버튼 클릭 이벤트 리스너
document.getElementById("one-card-button").addEventListener("click", function() {
    showCards(1, !document.getElementById("major-minor-checkbox").checked); // 수정된 부분
});

document.getElementById("three-cards-button").addEventListener("click", function() {
    showCards(3, !document.getElementById("major-minor-checkbox").checked); // 수정된 부분
});

document.getElementById("four-cards-button").addEventListener("click", function() {
    showCards(4, !document.getElementById("major-minor-checkbox").checked); // 수정된 부분
});

document.getElementById("five-cards-button").addEventListener("click", function() {
    showCards(5, !document.getElementById("major-minor-checkbox").checked); // 수정된 부분
});

// 역방향 체크박스 상태에 따라 이미지 회전
document.getElementById("reverse-checkbox").addEventListener("change", function() {
    const reverseCheckbox = document.getElementById("reverse-checkbox");
    const cards = document.querySelectorAll(".card");

    // 역방향 체크박스가 체크되었는지 확인
    if (reverseCheckbox.checked) {
        // 역방향일 경우 각 카드 이미지를 뒤집기
        cards.forEach(card => {
            if (Math.random() < 0.3) {
                card.classList.add("reversed");
            }
        });
    } else {
        // 역방향이 아닐 경우 각 카드 이미지를 다시 되돌리기
        cards.forEach(card => {
            card.classList.remove("reversed");
        });
    }
});

// 메이저/마이너 체크박스
const majorMinorCheckbox = document.getElementById("major-minor-checkbox");
const majorMinorButtons = document.querySelectorAll(".button-group button:not(#restart-button):not(#save-button):not(#show-fortune-button)");

majorMinorCheckbox.addEventListener("change", function() {
    if (majorMinorCheckbox.checked) {
        majorMinorButtons.forEach(button => {
            button.disabled = false;
        });
        majorMinorCheckbox.nextElementSibling.textContent = "활성화됨";
    } else {
        majorMinorButtons.forEach(button => {
            button.disabled = false; // 버튼을 비활성화하는 대신 활성화 상태를 유지
        });
        majorMinorCheckbox.nextElementSibling.textContent = "";
    }
});

// 랜덤 카드 선택 함수
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