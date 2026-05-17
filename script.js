document.addEventListener('DOMContentLoaded', () => {
    // 0. Splash Screen Logic
    const splash = document.getElementById('splash');
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
        }, 500); // Wait for transition
    }, 3000); // 3 seconds splash

    // 1. Smooth Scroll for Sticky Nav
    const navLinks = document.querySelectorAll('.sticky-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navHeight = document.querySelector('.sticky-nav').offsetHeight;
            
            window.scrollTo({
                top: targetElement.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    });

    // 2. Question Improver Logic
    const improveBtn = document.getElementById('improve-btn');
    const badQuestionInput = document.getElementById('bad-question');
    const improvedResult = document.getElementById('improved-result');
    const improvedText = document.getElementById('improved-text');

    improveBtn.addEventListener('click', () => {
        const question = badQuestionInput.value.trim();
        if (!question) {
            alert('분석할 종목명을 입력해 주세요!');
            return;
        }

        const template = `너는 숙련된 주식 애널리스트이자 1인 투자 하우스의 핵심 분석가다.
내가 제시하는 "${question}"에 대해 다음의 'WRAP' 프레임워크와 '황금지표'를 기준으로 심층 분석 보고서를 작성해줘.

1. Widen (지평 확대): 해당 기업이 속한 산업의 밸류체인을 분석하고, 전방 산업의 수혜 여부와 주요 경쟁사 대비 해자를 분석해줘.
2. Review (시나리오 검증): 최근 3년 재무제표를 바탕으로 매출성장률, 영업이익률, ROE 변화를 표로 정리하고, 향후 1년의 성장을 정당화할 수 있는 데이터 근거를 제시해줘.
3. Avoid (결정 미루기): 이 종목을 지금 매수하면 안 되는 이유 5가지를 강력하게 제시하고, 내가 놓치고 있을 리스크(거시경제, 규제, 경쟁 심화 등)를 공격적으로 지적해줘.
4. Prepare (대비): 적정 주가 범위를 추정하고, 현재가 대비 안전마진이 몇 %인지 계산해줘. 실패 시나리오 발생 시 손절 및 비중 조절 원칙도 제안해줘.

마지막에는 매수 전 필수 체크리스트 10항목을 작성해줘.`;

        improvedText.innerText = template;
        improvedResult.classList.remove('hidden');
        
        // Auto scroll to result
        improvedResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // 3. Checklist Logic
    const checkboxes = document.querySelectorAll('.check-item');
    const diagBox = document.getElementById('checklist-result');

    const updateDiagnosis = () => {
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalCount = checkboxes.length;

        diagBox.classList.remove('diag-low', 'diag-mid', 'diag-high');

        if (checkedCount === 0) {
            diagBox.innerText = '체크를 시작하여 투자 준비도를 진단하세요.';
            diagBox.style.backgroundColor = '#eee';
            diagBox.style.color = '#333';
        } else if (checkedCount <= 3) {
            diagBox.innerText = `위험 등급 (${checkedCount}/${totalCount}): 분석이 매우 부족합니다. 충동 매수일 확률이 높습니다!`;
            diagBox.classList.add('diag-low');
        } else if (checkedCount <= 7) {
            diagBox.innerText = `보통 등급 (${checkedCount}/${totalCount}): 기본적인 정보는 파악했으나, 반대 논리와 안전마진 검토가 더 필요합니다.`;
            diagBox.classList.add('diag-mid');
        } else {
            diagBox.innerText = `준비 완료 (${checkedCount}/${totalCount}): 훌륭합니다! 1인 투자 하우스의 원칙에 따라 체계적으로 준비되었습니다.`;
            diagBox.classList.add('diag-high');
        }
    };

    checkboxes.forEach(cb => cb.addEventListener('change', updateDiagnosis));

    // 4. Copy to Clipboard Logic
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            
            // For hidden span texts or visible P tags
            const textToCopy = targetEl.innerText || targetEl.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.innerText;
                btn.innerText = '복사 완료!';
                btn.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                alert('복사 중 오류가 발생했습니다.');
            });
        });
    });
});
