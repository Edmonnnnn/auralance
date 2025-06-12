console.log('main.js loaded!');


document.addEventListener('DOMContentLoaded', function() {
    const moreBtns = document.querySelectorAll('.auralance-more-filters-btn');
    moreBtns.forEach(function(moreBtn, idx) {
        moreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            let parentBlock = moreBtn.closest('.auralance-filters-block') || document;
            const advanced = parentBlock.querySelector('.auralance-filters-advanced');
            if (!advanced) return;
            if (!advanced.classList.contains('active')) {
                advanced.classList.add('active');
                moreBtn.textContent = "Hide filters";
            } else {
                advanced.classList.remove('active');
                moreBtn.textContent = "More filters";
            }
        });
    });
});
