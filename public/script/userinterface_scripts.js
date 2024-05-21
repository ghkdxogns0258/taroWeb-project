window.onload = function() {
    // MBTI를 선택하기 전에는 "MBTI를 선택하세요" 옵션을 숨깁니다.
    document.getElementById("mbti").addEventListener("change", function() {
        var option = this.querySelector("option[value='']");
        if (option) {
            option.style.display = "none";
        }
    });

    // 타로 점괘를 선택하기 전에는 "타로 점괘를 선택하세요" 옵션을 숨깁니다.
    document.getElementById("fortune").addEventListener("change", function() {
        var option = this.querySelector("option[value='']");
        if (option) {
            option.style.display = "none";
        }
    });

    // 폼 제출 시 taromain.html로 이동
    document.getElementById("user-form").addEventListener("submit", function(event) {
        event.preventDefault(); // 기본 폼 제출 동작을 막음
        // 폼 데이터 유효성 검사 및 서버 전송 (필요시 추가)
        window.location.href = 'taromain.html'; // taromain.html로 리디렉션
    });
};