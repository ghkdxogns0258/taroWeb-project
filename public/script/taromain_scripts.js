// 선택된 점괘 카드를 저장하는 변수
let selectedCard = null;

// 선택된 카드의 개수를 저장하는 변수
let selectedCardCount = 0;

// 역방향 상태를 저장하는 변수
let reverseMode = false;

// 메이저와 마이너 상태를 저장하는 변수
let majorMinorMode = "both";  // 기본값을 both로 설정

// 페이지 로드 시 초기화 함수
window.onload = function() {
    const userId = localStorage.getItem('userId');
    if (userId) {
        document.getElementById('user-id').value = userId;
    }
    hideReverseButton();
    hideMajorMinorButton();
};

// 버튼 클릭 이벤트 처리
document.getElementById("one-card-button").addEventListener("click", function() {
    selectedCardCount = 1; // 원 카드 선택 시 1장
    selectedCard = "one-card";
    updateSelectedCardInfo();
    showDrawCardButton();
    showReverseButton(); // 역방향 버튼 보이기
    hideMajorMinorButton(); // 메이저와 마이너 버튼 숨기기
    updateButtonOpacity(this); // 선택된 버튼의 투명도 조절
    resetOtherButtonOpacity(this); // 다른 버튼의 투명도 초기화
});

document.getElementById("three-cards-button").addEventListener("click", function() {
    selectedCardCount = 3; // 쓰리 카드 선택 시 3장
    selectedCard = "three-cards";
    updateSelectedCardInfo();
    showDrawCardButton();
    showReverseButton(); // 역방향 버튼 보이기
    hideMajorMinorButton(); // 메이저와 마이너 버튼 숨기기
    updateButtonOpacity(this); // 선택된 버튼의 투명도 조절
    resetOtherButtonOpacity(this); // 다른 버튼의 투명도 초기화
});

document.getElementById("four-cards-button").addEventListener("click", function() {
    selectedCardCount = 4; // 포 카드 선택 시 4장
    selectedCard = "four-cards";
    updateSelectedCardInfo();
    showDrawCardButton();
    showReverseButton(); // 역방향 버튼 보이기
    showMajorMinorButton(); // 메이저와 마이너 버튼 보이기
    updateButtonOpacity(this); // 선택된 버튼의 투명도 조절
    resetOtherButtonOpacity(this); // 다른 버튼의 투명도 초기화
});

document.getElementById("five-cards-button").addEventListener("click", function() {
    selectedCardCount = 5; // 파이브 카드 선택 시 5장
    selectedCard = "five-cards";
    updateSelectedCardInfo();
    showDrawCardButton();
    showReverseButton(); // 역방향 버튼 보이기
    showMajorMinorButton(); // 메이저와 마이너 버튼 보이기
    updateButtonOpacity(this); // 선택된 버튼의 투명도 조절
    resetOtherButtonOpacity(this); // 다른 버튼의 투명도 초기화
});

document.getElementById("reverse-button").addEventListener("click", function() {
    const button = document.getElementById("reverse-button");
    reverseMode = !reverseMode;
    button.classList.toggle("active"); // 활성/비활성 클래스 토글
    updateSelectedCardInfo();
    updateReverseButtonOpacity(); // 역방향 버튼의 투명도만 업데이트
});

document.getElementById("major-minor-button").addEventListener("click", function() {
    const button = document.getElementById("major-minor-button");
    majorMinorMode = majorMinorMode === "both" ? "major" : "both";
    button.classList.toggle("active"); // 활성/비활성 클래스 토글
    updateSelectedCardInfo();
    updateMajorMinorButtonOpacity(); // 메이저/마이너 버튼의 투명도만 업데이트
});

document.getElementById("draw-card-button").addEventListener("click", function() {
    // 선택된 타로 정보를 hidden input에 설정
    document.getElementById("selected-card").value = selectedCard;
    document.getElementById("selected-card-type").value = reverseMode;
    document.getElementById("major-minor").value = majorMinorMode;
    document.getElementById("tarot-form").submit(); // 폼 제출
});

// 역방향 버튼을 숨기는 함수
function hideReverseButton() {
    document.getElementById("reverse-button").style.display = "none";
}

// 역방향 버튼을 보이는 함수
function showReverseButton() {
    document.getElementById("reverse-button").style.display = "block";
}

// 메이저와 마이너 버튼을 숨기는 함수
function hideMajorMinorButton() {
    document.getElementById("major-minor-button").style.display = "none";
}

// 메이저와 마이너 버튼을 보이는 함수
function showMajorMinorButton() {
    document.getElementById("major-minor-button").style.display = "block";
}

// 선택된 카드 정보 업데이트 함수
function updateSelectedCardInfo() {
    const selectedCardInfoElement = document.getElementById("selected-card-info");
    const majorMinorButton = document.getElementById("major-minor-button");

    if (selectedCard) {
        selectedCardInfoElement.textContent = `선택된 카드: ${selectedCard}, 역방향 상태: ${reverseMode ? '활성화' : '비활성화'}, 메이저/마이너 사용: ${majorMinorButton.classList.contains('active') ? '활성화' : '비활성화'}`;
    } else {
        selectedCardInfoElement.textContent = "카드를 선택하세요.";
    }
}

// 카드 뽑기 버튼 표시 함수
function showDrawCardButton() {
    const drawCardButton = document.getElementById("draw-card-button");
    drawCardButton.style.display = "block";
}

// 버튼의 투명도 업데이트 함수
function updateButtonOpacity(selectedButton) {
    const buttons = document.querySelectorAll(".button-group button");
    buttons.forEach(button => {
        if (button === selectedButton) {
            button.style.opacity = 1; // 선택된 버튼은 투명하지 않게
        }
    });
}

// 다른 버튼의 투명도 초기화 함수
function resetOtherButtonOpacity(selectedButton) {
    const buttons = document.querySelectorAll(".button-group button");
    buttons.forEach(button => {
        if (button !== selectedButton) {
            button.style.opacity = 0.5; // 선택되지 않은 버튼은 투명도를 초기화
        }
    });
}

// 역방향 버튼의 투명도 업데이트 함수
function updateReverseButtonOpacity() {
    const button = document.getElementById("reverse-button");
    if (reverseMode) {
        button.style.opacity = 1; // 활성화되었을 때 투명하지 않게
    } else {
        button.style.opacity = 0.5; // 비활성화되었을 때 투명도를 초기화
    }
}

// 메이저/마이너 버튼의 투명도 업데이트 함수
function updateMajorMinorButtonOpacity() {
    const button = document.getElementById("major-minor-button");
    if (majorMinorMode === "both") {
        button.style.opacity = 1; // 활성화되었을 때 투명하지 않게
    } else {
        button.style.opacity = 0.5; // 비활성화되었을 때 투명도를 초기화
    }
}