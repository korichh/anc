(function() {
    const mobileMenu = document.querySelector('.mobile-menu')
    const popup = document.querySelector('.popup')
    const headerForm = document.querySelector('.header-form')
    const headerMiddle = document.querySelector('.header__middle')

    if (mobileMenu) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-mobile]')) {
                e.preventDefault()
                mobileMenu.classList.add('_active')
            }
        })

        mobileMenu.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('_active') && (e.target.closest('.close') || !e.target.closest('.mobile-menu__inner'))) {
                e.preventDefault()
                mobileMenu.classList.remove('_active')
                mobileMenu.querySelectorAll('.sub-menu').forEach(el => el.classList.remove('_active'))
            }

            if (e.target.closest('.menu-item') && e.target.closest('.menu-item').querySelector('.sub-menu') && !e.target.closest('.sub-menu__top')) {
                e.preventDefault()
                e.target.closest('.menu-item').querySelector('.sub-menu').classList.add('_active')
            } else if (e.target.closest('.back')) {
                e.preventDefault()
                e.target.closest('.sub-menu').classList.remove('_active')
            }
        })
    }

    if (popup) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-popup]')) {
                e.preventDefault()
                dataPopup = e.target.closest('[data-popup]').getAttribute('data-popup')
                const [selector, title] = dataPopup.split('|')
                popup.classList.add('_active')
                popup.querySelector('.title').innerHTML = escapeHtml(title) || ''
                popup.querySelector(`.${escapeHtml(selector)}`).classList.add('_active')
            }
        })

        popup.addEventListener('click', (e) => {
            if (popup.classList.contains('_active') && (e.target.closest('.close') || !e.target.closest('.popup__inner'))) {
                popup.classList.remove('_active')
                popup.querySelectorAll('.popup__content').forEach(el => el.classList.remove('_active'))
            }
        })
    }

    if (headerForm) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.header-form__search')) {
                headerForm.classList.add('_active')
                document.querySelector('.blur').classList.add('_active')
            } else if (headerForm.classList.contains('_active') && !e.target.closest('.header-form')) {
                headerMiddle.classList.remove('_active')
                headerForm.classList.remove('_active')
                document.querySelector('.blur').classList.remove('_active')
            }
        })

        let searchTimeout
        headerForm.addEventListener('submit', (e) => e.preventDefault())

        headerForm.addEventListener('input', (e) => {
            if (e.target.closest('.header-form__search input')) {
                if (searchTimeout) clearTimeout(searchTimeout)

                searchTimeout = setTimeout(async () => {
                    const s = headerForm.s.value
                    const raw = await fetch(`../search.json?s=${escapeHtml(s)}`)
                    const data = await raw.json()
                    const itemsHTML = getItemsHTML(data)
                    headerForm.querySelector('.search-list').innerHTML = itemsHTML
                }, 600)
            }
        })

        function getItemsHTML(data) {
            return Object.values(data).reduce((acc, item) => {
                return acc += `
                <li class="search-list__item">
                    <a href="#" class="search-list__item-inner">
                        <div class="search-list__image"><img src="${item.img}" alt="${item.name}"></div>
                        <div data-title="Name:" class="search-list__name">${item.name}</div>
                        <div data-title="Price:" class="search-list__price">${item.price}</div>
                        <div class="search-list__button"><span>Buy</span></div>
                    </a>
                </li>`
            }, '')
        }
    }

    if (headerMiddle) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-search]')) {
                headerMiddle.classList.add('_active')
                headerMiddle.querySelector('.header-form__search input').focus()
                headerForm.classList.add('_active')
                document.querySelector('.blur').classList.add('_active')
            }
        })
    }

    function escapeHtml(html) {
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
})()