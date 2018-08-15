function makeActive(element) {
    let siblings = element.parentElement.children;
    // console.log(siblings);

    for (let i in siblings) {
        try {
            siblings[i].classList.remove('btn-secondary', 'active');
        } catch (e) {}
    }
    element.classList.add('btn-secondary', 'active');
    localStorage.setItem('mostRecentActiveCharacter', element.id);
    // ip.charData.id
    // localStorage.removeItem('mostRecentAccessToken');
}