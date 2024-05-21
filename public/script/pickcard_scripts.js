let selectedCards = 0; // 선택된 카드 개수 초기화
let availableCards = 0; // 선택 가능한 카드 개수 초기화

window.onload = function() {
    // 선택 가능한 카드의 개수가 0이 아닐 때만 결과 확인 버튼 표시
    if (availableCards !== 0) {
        document.querySelector(".submit").classList.add("show");
    }
};

// 결과 확인 버튼 이벤트 처리
document.getElementById("draw-card-button").addEventListener("click", function() {
    const selectedDivs = document.querySelectorAll(".card .selected");
    
    // 선택된 카드에 애니메이션 클래스 추가
    selectedDivs.forEach(div => div.classList.add("card-animation"));

    const selectedCardNames = Array.from(selectedDivs).map((div, index) => "카드" + (index + 1));
    const selectedCardString = selectedCardNames.join(", ");

    // 선택된 카드들을 hidden input에 설정
    document.getElementById("selected-cards").value = selectedCardString;

    // 결과 확인 페이지로 이동
    document.getElementById("card-form").submit();
});

// 카드 레이블 생성 및 추가
const cardBox = document.getElementById("card-box");

// 카드 클릭 이벤트 처리
cardBox.addEventListener("click", function(event) {
    const target = event.target;
    if (target.tagName === "DIV" && availableCards > 0 && selectedCards < availableCards) {
        target.classList.toggle("selected");
        updateSelectedCards();
        if (selectedCards === availableCards) {
            // 선택 가능한 카드의 개수가 0이 되면 카드 클릭 이벤트를 제거
            cardBox.removeEventListener("click", cardClickHandler);
        }
    }
});

// 파이브 버튼 이벤트 처리
document.getElementById("five-cards-button").addEventListener("click", function() {
    availableCards = 5;
    updateSelectedCards();
    disableOtherButtons("five-cards-button");
    updateNumberImage(); // 숫자 이미지 업데이트 함수 호출
});

// 포 버튼 이벤트 처리
document.getElementById("four-cards-button").addEventListener("click", function() {
    availableCards = 4;
    updateSelectedCards();
    disableOtherButtons("four-cards-button");
    updateNumberImage(); // 숫자 이미지 업데이트 함수 호출
});

// 쓰리 버튼 이벤트 처리
document.getElementById("three-cards-button").addEventListener("click", function() {
    availableCards = 3;
    updateSelectedCards();
    disableOtherButtons("three-cards-button");
    updateNumberImage(); // 숫자 이미지 업데이트 함수 호출
});

// 원 버튼 이벤트 처리
document.getElementById("one-card-button").addEventListener("click", function() {
    availableCards = 1;
    updateSelectedCards();
    disableOtherButtons("one-card-button");
    updateNumberImage(); // 숫자 이미지 업데이트 함수 호출
});

// 자동 선택 버튼 이벤트 처리
document.getElementById("auto-select-button").addEventListener("click", function() {
    let autoSelectCount = 0;
    switch (availableCards) {
        case 1:
            autoSelectCount = 1;
            break;
        case 3:
            autoSelectCount = 3;
            break;
        case 4:
            autoSelectCount = 4;
            break;
        case 5:
            autoSelectCount = 5;
            break;
        default:
            autoSelectCount = 0;
    }

    const cardDivs = document.querySelectorAll(".card div");
    const selectedIndices = getRandomIndices(cardDivs.length, autoSelectCount);
    cardDivs.forEach((div, index) => {
        if (selectedIndices.includes(index)) {
            div.classList.add("selected");
        } else {
            div.classList.remove("selected");
        }
    });
    updateSelectedCards();
});

// 랜덤한 인덱스 생성 함수
function getRandomIndices(max, count) {
    const indices = [];
    while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
    }
    return indices;
}

// 다른 버튼 비활성화 함수
function disableOtherButtons(clickedButtonId) {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
        const buttonId = button.getAttribute("id");
        if (buttonId === clickedButtonId) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });
}

// 메이저만 사용 버튼 이벤트 처리
document.getElementById("major-button").addEventListener("click", function() {
    cardBox.innerHTML = ""; // 기존 카드 삭제
    
    // 카드 생성 및 애니메이션 적용
    for (let i = 0; i < 22; i++) {
        const div = document.createElement("div");
        cardBox.appendChild(div);
        setTimeout(() => {
            div.style.opacity = 1;
            div.style.transform = "translateY(0)";
        }, i * 50); // 각 카드가 0.05초 간격으로 나타남
    }
});

// 메이저와 마이너 모두 사용 버튼 이벤트 처리
document.getElementById("major-minor-button").addEventListener("click", function() {
    cardBox.innerHTML = ""; // 기존 카드 삭제
    
    // 카드 생성 및 애니메이션 적용
    for (let i = 0; i < 78; i++) {
        const div = document.createElement("div");
        cardBox.appendChild(div);
        setTimeout(() => {
            div.style.opacity = 1;
            div.style.transform = "translateY(0)";
        }, i * 20); // 각 카드가 0.02초 간격으로 나타남
    }
});

// 선택된 카드 개수 업데이트 함수
function updateSelectedCards() {
    selectedCards = document.querySelectorAll(".card .selected").length;

    // 선택 가능한 카드 개수 표시
    const selectedCountText = document.getElementById("selected-count");
    selectedCountText.textContent = `선택할 수 있는 카드의 개수: ${availableCards - selectedCards}`;

    // 결과 확인 버튼 표시 여부 업데이트
    updateSubmitButton();

    // 선택할 수 있는 카드의 개수가 0일 때 숫자 이미지 및 컨테이너 표시 여부 업데이트
    const countContainer = document.querySelector(".count-container");
    const countImage = document.getElementById("count-image");
    if (availableCards === 0) {
        countContainer.style.display = "none";
    } else {
        countContainer.style.display = "flex";
        switch (availableCards - selectedCards) {
            case 5:
                countImage.src = "images/five.png";
                break;
            case 4:
                countImage.src = "images/four.png";
                break;
            case 3:
                countImage.src = "images/three.png";
                break;
            case 2:
                countImage.src = "images/two.png";
                break;
            case 1:
                countImage.src = "images/one.png";
                break;
            default:
                countImage.src = "images/zero.png";
        }
    }
}

// 결과 확인 버튼 업데이트 함수
function updateSubmitButton() {
    const drawCardButton = document.getElementById("draw-card-button");
    drawCardButton.style.display = selectedCards === availableCards && availableCards !== 0 ? "block" : "none";
}
