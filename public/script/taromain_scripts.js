// 선택된 타로 점 방식을 저장하는 변수
let tarotSelection = null;

// 선택된 점괘 카드를 저장하는 변수
let selectedCards = [];

// 선택된 카드의 개수를 저장하는 변수
let selectedCardCount = 0;

// 역방향 상태를 저장하는 변수
let reverseMode = false;

// 메이저와 마이너 상태를 저장하는 변수
let majorMinorMode = "both";  // 기본값을 both로 설정

// 페이지 로드 시 초기화 함수
window.onload = function() {
    const userId = localStorage.getItem('userId');  // 로컬 스토리지에서 userId를 가져옴
    if (userId) {  // userId가 존재하면
        document.getElementById('user-id').value = userId;  // hidden input에 userId 설정
    }
    hideReverseButton();  // 역방향 버튼 숨김
    hideMajorMinorButton();  // 메이저와 마이너 버튼 숨김
};


// 카드 선택 버튼 클릭 이벤트 처리
document.getElementById("one-card-button").addEventListener("click", function() {
    selectedCardCount = 1;  // 원 카드 선택 시 1장
    tarotSelection = "원 카드";
    resetCardSelection();  // 카드 선택 초기화
    showDrawCardButton();  // 카드 뽑기 버튼 표시
    showReverseButton();  // 역방향 버튼 보이기
    hideMajorMinorButton();  // 메이저와 마이너 버튼 숨기기
    updateButtonOpacity(this);  // 선택된 버튼의 투명도 조절
    resetOtherButtonOpacity(this);  // 다른 버튼의 투명도 초기화
});

document.getElementById("three-cards-button").addEventListener("click", function() {
    selectedCardCount = 3;  // 쓰리 카드 선택 시 3장
    tarotSelection = "쓰리 카드";
    resetCardSelection();  // 카드 선택 초기화
    showDrawCardButton();  // 카드 뽑기 버튼 표시
    showReverseButton();  // 역방향 버튼 보이기
    hideMajorMinorButton();  // 메이저와 마이너 버튼 숨기기
    updateButtonOpacity(this);  // 선택된 버튼의 투명도 조절
    resetOtherButtonOpacity(this);  // 다른 버튼의 투명도 초기화
});

document.getElementById("four-cards-button").addEventListener("click", function() {
    selectedCardCount = 4;  // 포 카드 선택 시 4장
    tarotSelection = "포 카드";
    resetCardSelection();  // 카드 선택 초기화
    showDrawCardButton();  // 카드 뽑기 버튼 표시
    showReverseButton();  // 역방향 버튼 보이기
    showMajorMinorButton();  // 메이저와 마이너 버튼 보이기
    updateButtonOpacity(this);  // 선택된 버튼의 투명도 조절
    resetOtherButtonOpacity(this);  // 다른 버튼의 투명도 초기화
});

document.getElementById("five-cards-button").addEventListener("click", function() {
    selectedCardCount = 5;  // 파이브 카드 선택 시 5장
    tarotSelection = "파이브 카드";
    resetCardSelection();  // 카드 선택 초기화
    showDrawCardButton();  // 카드 뽑기 버튼 표시
    showReverseButton();  // 역방향 버튼 보이기
    showMajorMinorButton();  // 메이저와 마이너 버튼 보이기
    updateButtonOpacity(this);  // 선택된 버튼의 투명도 조절
    resetOtherButtonOpacity(this);  // 다른 버튼의 투명도 초기화
});

function resetOtherButtonOpacity(selectedButton) {
    const buttons = document.querySelectorAll(".button-group button");
    buttons.forEach(button => {
        if (button !== selectedButton) {
            button.style.opacity = 0.5;  // 선택되지 않은 버튼은 투명도를 초기화
        }
    });
}

function resetCardSelection() {
    selectedCards = [];
    document.getElementById("selected-cards").value = "";
    updateSelectedCardInfo();  // 선택된 카드 정보 업데이트
}

function updateSelectedCardInfo() {
    const selectedCardsField = document.getElementById("selected-cards");
    const selectedCardsJson = JSON.stringify(selectedCards);  // 선택된 카드 배열을 JSON 문자열로 변환
    selectedCardsField.value = selectedCardsJson;  // JSON 문자열을 hidden input에 저장
    console.log("selectedCardsField.value:", selectedCardsField.value);  // 디버깅을 위해 출력
}

document.getElementById("reverse-button").addEventListener("click", function() {
    const button = document.getElementById("reverse-button");
    reverseMode = !reverseMode;  // 역방향 모드 토글
    button.classList.toggle("active");  // 활성/비활성 클래스 토글
    updateReverseButtonOpacity();  // 역방향 버튼의 투명도만 업데이트
});

document.getElementById("major-minor-button").addEventListener("click", function() {
    const button = document.getElementById("major-minor-button");
    majorMinorMode = majorMinorMode === "both" ? "major" : "both";  // 메이저/마이너 모드 토글
    button.classList.toggle("active");  // 활성/비활성 클래스 토글
    updateMajorMinorButtonOpacity();  // 메이저/마이너 버튼의 투명도만 업데이트
});

// 결과 확인 버튼 이벤트 처리
document.getElementById("draw-card-button").addEventListener("click", function(event) {
    event.preventDefault(); // 기본 폼 제출 동작을 막음

    // 선택된 타로 정보를 hidden input에 설정
    drawCards();  // 카드를 뽑음
    document.getElementById("selected-cards").value = JSON.stringify(selectedCards);
    document.getElementById("tarotSelection").value = tarotSelection;
    document.getElementById("reverse").value = reverseMode;  // 수정: selected-card-type -> reverse
    document.getElementById("majorMinor").value = majorMinorMode;

    // 로컬 스토리지에 저장
    localStorage.setItem('tarotSelection', tarotSelection);
    localStorage.setItem('reverseMode', reverseMode);
    localStorage.setItem('majorMinorMode', majorMinorMode);
    localStorage.setItem('selectedCardCount', selectedCardCount);

    // 서버에 데이터 전송
    const formData = new FormData(document.getElementById("tarot-form"));
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log("Sending data to server:", data); // 디버깅을 위해 출력

    // 사용자 타로 정보를 먼저 업데이트
    fetch('/api/users/tarot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.message === "User tarot info updated successfully") {
            // 타로 결과 요청
            return fetch('/api/tarot/reading', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } else {
            throw new Error(result.error);
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.reading) {
            localStorage.setItem('tarotReading', result.reading); // 타로 결과를 로컬 스토리지에 저장
            localStorage.setItem('selectedCards', JSON.stringify(selectedCards)); // 선택된 카드 정보를 로컬 스토리지에 저장
            window.location.href = 'pickcard.html';
        } else {
            alert('타로 정보를 저장하는데 실패했습니다: ' + result.error);
        }
    })
    .catch(error => {
        alert('서버 오류: ' + error);
    });
});

function hideReverseButton() {
    document.getElementById("reverse-button").style.display = "none";  // 역방향 버튼 숨기기
}

function showReverseButton() {
    document.getElementById("reverse-button").style.display = "block";  // 역방향 버튼 보이기
}

function hideMajorMinorButton() {
    document.getElementById("major-minor-button").style.display = "none";  // 메이저와 마이너 버튼 숨기기
}

function showMajorMinorButton() {
    document.getElementById("major-minor-button").style.display = "block";  // 메이저와 마이너 버튼 보이기
}

function updateButtonOpacity(selectedButton) {
    const buttons = document.querySelectorAll(".button-group button");
    buttons.forEach(button => {
        if (button === selectedButton) {
            button.style.opacity = 1;  // 선택된 버튼은 투명하지 않게
        }
    });
}

function updateReverseButtonOpacity() {
    const button = document.getElementById("reverse-button");
    if (reverseMode) {
        button.style.opacity = 1;  // 활성화되었을 때 투명하지 않게
    } else {
        button.style.opacity = 0.5;  // 비활성화되었을 때 투명도를 초기화
    }
}

function updateMajorMinorButtonOpacity() {
    const button = document.getElementById("major-minor-button");
    if (majorMinorMode === "both") {
        button.style.opacity = 1;  // 활성화되었을 때 투명하지 않게
    } else {
        button.style.opacity = 0.5;  // 비활성화되었을 때 투명도를 초기화
    }
}

// 랜덤 카드 선택 함수
function getRandomCard(isMajor) {
    const cardNames = isMajor ?  // 메이저 카드 목록
        ["00_The_Fool", "01_The_Magician", "02_The_High_Priestess", "03_The_Empress", "04_The_Emperor",
        "05_The_Hierophant", "06_The_Lovers", "07_The_Chariot", "08_Strength", "09_The_Hermit",
        "10_Wheel_of_Fortune", "11_Justice", "12_The_Hanged_Man", "13_Death", "14_Temperance",
        "15_The_Devil", "16_The_Tower", "17_The_Star", "18_The_Moon", "19_The_Sun",
        "20_Judgement", "21_The_World"] :
        // 메이저 + 마이너 카드 목록
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

    const randomIndex = Math.floor(Math.random() * cardNames.length);  // 랜덤 인덱스 생성
    return cardNames[randomIndex];  // 랜덤 카드 이름 반환
}

// 카드 뽑기 함수
function drawCards() {
    selectedCards = [];
    for (let i = 0; i < selectedCardCount; i++) {
        const card = getRandomCard(majorMinorMode !== "major");
        const isReversed = Math.random() < 0.5;  // 역방향 여부를 랜덤으로 결정
        selectedCards.push({ name: card, reversed: isReversed });
    }
    console.log("Drawn cards:", selectedCards);  // 디버깅을 위해 출력
    updateSelectedCardInfo();  // 선택된 카드 정보 업데이트
}

function showDrawCardButton() {
    const drawCardButton = document.getElementById("draw-card-button");
    drawCardButton.style.display = "block";  // 카드 뽑기 버튼 표시
}