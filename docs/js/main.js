(function() {
    const mobileMenu = document.querySelector('.mobile-menu')
    const headerMiddle = document.querySelector('.header__middle')
    const mobileMenuLocation = document.querySelector('.mobile-menu-location')

    if (mobileMenu) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.header__burger')) {
                mobileMenu.classList.add('_active')
                document.body.classList.add('_lock')
            } else if (e.target.closest('.mobile-menu .close') || e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu__inner')) {
                mobileMenu.classList.remove('_active')
                document.body.classList.remove('_active')

                const subMenus = mobileMenu.querySelectorAll('.sub-menu')
                subMenus.forEach(el => el.classList.remove('_active'))
            }

            if (e.target.closest('.menu-item') && !e.target.closest('.top') && e.target.closest('.menu-item').querySelector('.sub-menu')) {
                e.preventDefault()
                const subMenu = e.target.closest('.menu-item').querySelector('.sub-menu')
                subMenu.classList.add('_active')
            } else if (e.target.closest('.mobile-menu .back')) {
                const subMenu = e.target.closest('.sub-menu')
                subMenu.classList.remove('_active')
            }
        })
    }

    if (headerMiddle) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.header__search')) {
                headerMiddle.classList.toggle('_active')
            }
        })
    }
})()