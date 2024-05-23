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

    // 폼 제출 시 서버에 사용자 정보를 전송하고 taromain.html로 이동
    document.getElementById("user-form").addEventListener("submit", function(event) {
        event.preventDefault(); // 기본 폼 제출 동작을 막음

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.userId) {
                localStorage.setItem('userId', result.userId);
                window.location.href = 'taromain.html'; // taromain.html로 리디렉션
            } else {
                alert('사용자 정보를 저장하는데 실패했습니다: ' + result.error);
            }
        })
        .catch(error => {
            alert('서버 오류: ' + error);
        });
    });
};