document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("fortuneModal");
    var fortuneText = document.getElementById("fortune-text");
    var copyButton = document.getElementById("copy-button");

    // 점괘 보기 버튼 클릭 시 모달 창 열기
    document.getElementById("show-fortune-button").addEventListener("click", function() {
        var tarotReading = localStorage.getItem('tarotReading');
        if (tarotReading) {
            fortuneText.innerText = tarotReading;
            modal.style.display = "block";  // 모달 창 열기
        } else {
            alert('타로 결과가 없습니다. 다시 시도해 주세요.');
        }
    });

    // 모달 창의 닫기 버튼 클릭 시 모달 창 닫기
    document.getElementsByClassName("close")[0].addEventListener("click", function() {
        modal.style.display = "none";  // 모달 창 닫기
    });

    // 모달 창 바깥 부분 클릭 시 모달 창 닫기
    window.addEventListener("click", function(event) {
        if (event.target == modal) {  // 클릭한 요소가 모달인 경우
            modal.style.display = "none";  // 모달 창 닫기
        }
    });

    // 복사하기 버튼 클릭 시 텍스트 복사
    copyButton.addEventListener("click", function() {
        copyToClipboard(fortuneText.innerText);  // 텍스트 복사
        copyButton.textContent = "복사 완료";  // 버튼 텍스트 변경
        setTimeout(function() {
            copyButton.textContent = "복사하기";  // 1초 후에 버튼 텍스트 복원
        }, 1000);
    });

    // 클립보드에 텍스트 복사 함수
    function copyToClipboard(text) {
        var tempInput = document.createElement("input");  // 임시 입력 요소 생성
        tempInput.style = "position: absolute; left: -1000px; top: -1000px";  // 화면에서 숨김
        tempInput.value = text;  // 입력 요소에 텍스트 설정
        document.body.appendChild(tempInput);  // 입력 요소를 문서에 추가
        tempInput.select();  // 입력 요소 선택
        document.execCommand("copy");  // 클립보드에 복사
        document.body.removeChild(tempInput);  // 입력 요소 제거
    }
});

// "다시하기" 버튼
document.getElementById("restart-button").addEventListener("click", function() {
    window.location.href = "start.html";  // 시작 페이지로 이동
});

// "저장" 버튼
document.getElementById("save-button").addEventListener("click", function() {
    saveImage();  // 이미지 저장 함수 호출
});

// 이미지 저장 함수
function saveImage() {
    const container = document.querySelector(".container");  // 컨테이너 요소 가져오기
    html2canvas(container).then(canvas => {  // 컨테이너 요소를 캔버스로 변환
        const image = canvas.toDataURL("image/png");  // 이미지 URL 생성
        const link = document.createElement("a");  // 링크 요소 생성
        link.href = image;  // 링크 요소에 이미지 URL 설정
        link.download = "taro_result.png";  // 다운로드 파일 이름 설정
        link.click();  // 링크 클릭으로 이미지 다운로드
    });
}

// 이미지 표시 함수
function showImage(numOfImages) {
    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = "";  // 기존 이미지 삭제

    for (let i = 0; i < numOfImages; i++) {
        const image = document.createElement("img");
        image.src = "your_image_url.jpg";  // 이미지 경로 지정
        image.alt = "Your Image";
        image.classList.add("image");
        imageContainer.appendChild(image);
    }
}

// 카드를 보여주는 함수
function showCards(numOfCards, isMajor) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";  // 기존 카드 삭제

    const cardPath = isMajor ? "Major_card22/" : "Minor_card56/";
    const cardList = [];  // 중복 카드 방지를 위한 배열

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
    showCards(1, !document.getElementById("major-minor-checkbox").checked);
});

document.getElementById("three-cards-button").addEventListener("click", function() {
    showCards(3, !document.getElementById("major-minor-checkbox").checked);
});

document.getElementById("four-cards-button").addEventListener("click", function() {
    showCards(4, !document.getElementById("major-minor-checkbox").checked);
});

document.getElementById("five-cards-button").addEventListener("click", function() {
    showCards(5, !document.getElementById("major-minor-checkbox").checked);
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
            button.disabled = false;
        });
        majorMinorCheckbox.nextElementSibling.textContent = "";
    }
});
