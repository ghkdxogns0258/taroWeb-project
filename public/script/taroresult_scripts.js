const s3BucketUrl = "https://tarowebproject.s3.amazonaws.com/";

const cardImagePaths = {
    // 메이저 카드 경로
    "00_The_Fool": s3BucketUrl + "메이저/0번 바보.jpg",
    "01_The_Magician": s3BucketUrl + "메이저/1번 마법사.jpg",
    "02_The_High_Priestess": s3BucketUrl + "메이저/2번 여사제.jpg",
    "03_The_Empress": s3BucketUrl + "메이저/3번 여황제.jpg",
    "04_The_Emperor": s3BucketUrl + "메이저/4번 황제.jpg",
    "05_The_Hierophant": s3BucketUrl + "메이저/5번 교황.jpg",
    "06_The_Lovers": s3BucketUrl + "메이저/6번 연인.jpg",
    "07_The_Chariot": s3BucketUrl + "메이저/7번 전차.jpg",
    "08_Strength": s3BucketUrl + "메이저/8번 힘.jpg",
    "09_The_Hermit": s3BucketUrl + "메이저/9번 은둔자.jpg",
    "10_Wheel_of_Fortune": s3BucketUrl + "메이저/10번 운명의 수레바퀴.jpg",
    "11_Justice": s3BucketUrl + "메이저/11번 정의.jpg",
    "12_The_Hanged_Man": s3BucketUrl + "메이저/12번 거꾸로 매달린 자.jpg",
    "13_Death": s3BucketUrl + "메이저/13번 죽음.jpg",
    "14_Temperance": s3BucketUrl + "메이저/14번 절제.jpg",
    "15_The_Devil": s3BucketUrl + "메이저/15번 악마.jpg",
    "16_The_Tower": s3BucketUrl + "메이저/16번 탑.jpg",
    "17_The_Star": s3BucketUrl + "메이저/17번 별.jpg",
    "18_The_Moon": s3BucketUrl + "메이저/18번 달.jpg",
    "19_The_Sun": s3BucketUrl + "메이저/19번 태양.jpg",
    "20_Judgement": s3BucketUrl + "메이저/20번 심판.jpg",
    "21_The_World": s3BucketUrl + "메이저/21번 세계.jpg",
    
    // 마이너 카드 경로 - 소드
    "Ace_of_Swords": s3BucketUrl + "마이너(소드,펜타클)/3. 마이너 SWORDS(1번~10번)/소드 1 에이스.jpg",
    "Two_of_Swords": s3BucketUrl + "마이너(소드,펜타클)/3. 마이너 SWORDS(1번~10번)/소드 2.jpg",
    "Three_of_Swords": s3BucketUrl + "마이너(소드,펜타클)/3. 마이너 SWORDS(1번~10번)/소드 3.jpg",
    "Four_of_Swords": s3BucketUrl + "마이너(소드,펜타클)/3. 마이너 SWORDS(1번~10번)/소드 4.jpg",
    "Five_of_Swords": s3BucketUrl + "마이너(소드,펜타클)/3. 마이너 SWORDS(1번~10번)/소드 5.jpg",
    "Six_of_Swords": s3BucketUrl + "마이너(소드,펜타클)/3. 마이너 SWORDS(1번~10번)/소드 6.jpg",
    "Seven_of_Swords": s3BucketUrl + "마이너(소드,펜타클)/3. 마이너 SWORDS(1번~10번)/소드 7.jpg",
    "Eight_of_Swords": s3BucketUrl + "마이너(소드,펜타클)/3. 마이너 SWORDS(1번~10번)/소드 8.jpg",
    "Nine_of_Swords": s3BucketUrl + "마이너(소드,펜타클)/3. 마이너 SWORDS(1번~10번)/소드 9.jpg",
    "Ten_of_Swords": s3BucketUrl + "마이너(소드,펜타클)/3. 마이너 SWORDS(1번~10번)/소드 10.jpg",
    
    // 마이너 카드 경로 - 펜타클
    "Ace_of_Pentacles": s3BucketUrl + "마이너(소드,펜타클)/4. 마이너 PENTACLES(1~10번)/펜타클 1 에이스.jpg",
    "Two_of_Pentacles": s3BucketUrl + "마이너(소드,펜타클)/4. 마이너 PENTACLES(1~10번)/펜타클 2.jpg",
    "Three_of_Pentacles": s3BucketUrl + "마이너(소드,펜타클)/4. 마이너 PENTACLES(1~10번)/펜타클 3.jpg",
    "Four_of_Pentacles": s3BucketUrl + "마이너(소드,펜타클)/4. 마이너 PENTACLES(1~10번)/펜타클 4.jpg",
    "Five_of_Pentacles": s3BucketUrl + "마이너(소드,펜타클)/4. 마이너 PENTACLES(1~10번)/펜타클 5.jpg",
    "Six_of_Pentacles": s3BucketUrl + "마이너(소드,펜타클)/4. 마이너 PENTACLES(1~10번)/펜타클 6.jpg",
    "Seven_of_Pentacles": s3BucketUrl + "마이너(소드,펜타클)/4. 마이너 PENTACLES(1~10번)/펜타클 7.jpg",
    "Eight_of_Pentacles": s3BucketUrl + "마이너(소드,펜타클)/4. 마이너 PENTACLES(1~10번)/펜타클 8.jpg",
    "Nine_of_Pentacles": s3BucketUrl + "마이너(소드,펜타클)/4. 마이너 PENTACLES(1~10번)/펜타클 9.jpg",
    "Ten_of_Pentacles": s3BucketUrl + "마이너(소드,펜타클)/4. 마이너 PENTACLES(1~10번)/펜타클 10.jpg",
    
    // 마이너 카드 경로 - 완드
    "Ace_of_Wands": s3BucketUrl + "마이너(완드,컵)/1. 마이너 WANDS(1~10번)/완드 1 에이스.jpg",
    "Two_of_Wands": s3BucketUrl + "마이너(완드,컵)/1. 마이너 WANDS(1~10번)/완드 2.jpg",
    "Three_of_Wands": s3BucketUrl + "마이너(완드,컵)/1. 마이너 WANDS(1~10번)/완드 3.jpg",
    "Four_of_Wands": s3BucketUrl + "마이너(완드,컵)/1. 마이너 WANDS(1~10번)/완드 4.jpg",
    "Five_of_Wands": s3BucketUrl + "마이너(완드,컵)/1. 마이너 WANDS(1~10번)/완드 5.jpg",
    "Six_of_Wands": s3BucketUrl + "마이너(완드,컵)/1. 마이너 WANDS(1~10번)/완드 6.jpg",
    "Seven_of_Wands": s3BucketUrl + "마이너(완드,컵)/1. 마이너 WANDS(1~10번)/완드 7.jpg",
    "Eight_of_Wands": s3BucketUrl + "마이너(완드,컵)/1. 마이너 WANDS(1~10번)/완드 8.jpg",
    "Nine_of_Wands": s3BucketUrl + "마이너(완드,컵)/1. 마이너 WANDS(1~10번)/완드 9.jpg",
    "Ten_of_Wands": s3BucketUrl + "마이너(완드,컵)/1. 마이너 WANDS(1~10번)/완드 10.jpg",
    
    // 마이너 카드 경로 - 컵
    "Ace_of_Cups": s3BucketUrl + "마이너(완드,컵)/2. 마이너 CUPS(1번~10번)/컵 1 에이스.jpg",
    "Two_of_Cups": s3BucketUrl + "마이너(완드,컵)/2. 마이너 CUPS(1번~10번)/컵 2.jpg",
    "Three_of_Cups": s3BucketUrl + "마이너(완드,컵)/2. 마이너 CUPS(1번~10번)/컵 3.jpg",
    "Four_of_Cups": s3BucketUrl + "마이너(완드,컵)/2. 마이너 CUPS(1번~10번)/컵 4.jpg",
    "Five_of_Cups": s3BucketUrl + "마이너(완드,컵)/2. 마이너 CUPS(1번~10번)/컵 5.jpg",
    "Six_of_Cups": s3BucketUrl + "마이너(완드,컵)/2. 마이너 CUPS(1번~10번)/컵 6.jpg",
    "Seven_of_Cups": s3BucketUrl + "마이너(완드,컵)/2. 마이너 CUPS(1번~10번)/컵 7.jpg",
    "Eight_of_Cups": s3BucketUrl + "마이너(완드,컵)/2. 마이너 CUPS(1번~10번)/컵 8.jpg",
    "Nine_of_Cups": s3BucketUrl + "마이너(완드,컵)/2. 마이너 CUPS(1번~10번)/컵 9.jpg",
    "Ten_of_Cups": s3BucketUrl + "마이너(완드,컵)/2. 마이너 CUPS(1번~10번)/컵 10.jpg",
    
     // 궁정 카드 경로 - 완드
     "Page_of_Wands": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/1.%20WANDS%28시종%2C기사%2C퀸%2C킹%29/1.%20완드%20시종.jpg",
     "Knight_of_Wands": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/1.%20WANDS%28시종%2C기사%2C퀸%2C킹%29/2.%20완드%20기사.jpg",
     "Queen_of_Wands": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/1.%20WANDS%28시종%2C기사%2C퀸%2C킹%29/3.%20완드%20퀸.jpg",
     "King_of_Wands": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/1.%20WANDS%28시종%2C기사%2C퀸%2C킹%29/4.%20완드%20킹.jpg",
     
     // 궁정 카드 경로 - 컵
     "Page_of_Cups": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/2.%20CUPS%28시종%2C기사%2C퀸%2C킹%29/1.%20컵%20시종.jpg",
     "Knight_of_Cups": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/2.%20CUPS%28시종%2C기사%2C퀸%2C킹%29/2.%20컵%20기사.jpg",
     "Queen_of_Cups": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/2.%20CUPS%28시종%2C기사%2C퀸%2C킹%29/3.%20컵%20퀸.jpg",
     "King_of_Cups": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/2.%20CUPS%28시종%2C기사%2C퀸%2C킹%29/4.%20컵%20킹.jpg",
     
     // 궁정 카드 경로 - 소드
     "Page_of_Swords": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/3.%20SWORDS%28시종%2C기사%2C퀸%2C킹%29/1.%20소드%20시종.jpg",
     "Knight_of_Swords": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/3.%20SWORDS%28시종%2C기사%2C퀸%2C킹%29/2.%20소드%20기사.jpg",
     "Queen_of_Swords": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/3.%20SWORDS%28시종%2C기사%2C퀸%2C킹%29/3.%20소드%20퀸.jpg",
     "King_of_Swords": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/3.%20SWORDS%28시종%2C기사%2C퀸%2C킹%29/4.%20소드%20킹.jpg",
     
     // 궁정 카드 경로 - 펜타클
     "Page_of_Pentacles": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/4.%20PENTACLES%28시종%2C기사%2C퀸%2C킹%29/1.%20펜타클%20시종.jpg",
     "Knight_of_Pentacles": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/4.%20PENTACLES%28시종%2C기사%2C퀸%2C킹%29/2.%20펜타클%20기사.jpg",
     "Queen_of_Pentacles": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/4.%20PENTACLES%28시종%2C기사%2C퀸%2C킹%29/3.%20펜타클%20퀸.jpg",
     "King_of_Pentacles": s3BucketUrl + "궁정%2C코트카드%28완드%2C컵%2C소드%2C펜타클%29/4.%20PENTACLES%28시종%2C기사%2C퀸%2C킹%29/4.%20펜타클%20킹.jpg"
};


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

    // 페이지 로드 시 선택된 카드를 표시
    var selectedCards = JSON.parse(localStorage.getItem('selectedCards'));
    if (selectedCards && selectedCards.length > 0) {
        showCards(selectedCards);
    } else {
        alert('선택된 타로 카드가 없습니다. 다시 시도해 주세요.');
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

// 카드 이미지를 보여주는 함수
function showCards(cards) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";  // 기존 카드 삭제

    cards.forEach(card => {
        const cardElement = document.createElement("img");
        cardElement.src = cardImagePaths[card.name];
        cardElement.alt = "타로 카드";
        cardElement.classList.add("card");
        if (card.reversed) {
            cardElement.classList.add("reversed");  // 역방향 클래스 추가
        }
        cardContainer.appendChild(cardElement);
    });
}

// 역방향 카드를 회전시키는 CSS 클래스 추가
const style = document.createElement('style');
style.innerHTML = `
    .card.reversed {
        transform: rotate(180deg);
    }
`;
document.head.appendChild(style);