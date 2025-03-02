import { Query } from "./getIcon"
// data.icons[3].raster_sizes[6].formats[0].preview_url

// input fields
const shortcutNav = document.getElementById('shortcutsNav')
const openInput = document.getElementById('addShortcutBttn')
const shortcutsCont = document.getElementById('shortcuts')

const inputTitle = document.createElement('input')
inputTitle.type = 'text'
inputTitle.placeholder = 'Title'

const inputUrl = document.createElement('input')
inputUrl.type = 'text'
inputUrl.placeholder = 'Url'


const addShortcutBttn = document.createElement('button')
addShortcutBttn.className = 'addShortcut'
addShortcutBttn.textContent = '+'


openInput.addEventListener('click', () => {
    shortcutNav.removeChild(openInput)
    shortcutNav.prepend(inputTitle, inputUrl, addShortcutBttn)
})

const existingShortcuts = JSON.parse(localStorage.getItem('shortcuts'))

if (!existingShortcuts) {
    localStorage.setItem('shortcuts', '[]')
    existingShortcuts = []
}

addShortcutBttn.addEventListener('click', () => {
    getIcon(inputTitle.value)
    shortcutNav.textContent = ''
    shortcutNav.prepend(openInput)

})

function getIcon(title) {
    Query(title)
        .then(data => {
            const key = data.icons[0].icon_id
            const icon = data.icons[0].raster_sizes[6].formats[0].preview_url
            console.log(key, icon)
            dataHandle(title, icon, inputUrl.value, key)
        })
}

function dataHandle(title, icon, url, key) {
    console.log(url)
    if (!url.startsWith('http')) {
        url = 'https://' + url
    }
    console.log(url)
    const shortcutInfo = {
        key: key,
        title: title,
        iconUrl: icon,
        url: url,
    }

    existingShortcuts.push(shortcutInfo)
    localStorage.setItem('shortcuts', JSON.stringify(existingShortcuts))
    
    generateNewShortcuts(shortcutInfo)
    
    const deleteBttn = Array.from(document.querySelectorAll('#deleteBttn'))
    deleteBttn.forEach(bttn => {
        bttn.addEventListener('click', bttn => {deleteShortcut(bttn)})
    })
}



function generateNewShortcuts(info) {
    shortcutsCont.innerHTML += ` <div class="shortcut" data-key=${info.key}>
            <img src=${info.iconUrl} alt="">
            <div class="title">
                <a href=${info.url}>${info.title}</a>
                <button data-key=${info.key} class="deleteBttn" id="deleteBttn">X</button>
            </div>
        </div>
        `
}

function generateShortcuts() {
    const existingShortcuts = JSON.parse(localStorage.getItem('shortcuts'))
    existingShortcuts.forEach(shortcut => {
        shortcutsCont.innerHTML += ` 
        <div class="shortcut" data-key=${shortcut.key}>
            <img src=${shortcut.iconUrl} alt="">
            <div class="title">
                <a href=${shortcut.url}>${shortcut.title}</a>
                <button data-key=${shortcut.key} class="deleteBttn" id="deleteBttn">X</button>
            </div>
        </div>
        `
    })
    const deleteBttn = Array.from(document.querySelectorAll('#deleteBttn'))
    deleteBttn.forEach(bttn => {
        bttn.addEventListener('click', bttn => {deleteShortcut(bttn)})
    })
}

function deleteShortcut(current) {
    const parentElement = current.target.parentElement.parentElement
    const key = parentElement.dataset.key
    let i = 0
    existingShortcuts.forEach(shortcut => {
        if (key == shortcut.key) {
            if (i === 0) {
                existingShortcuts.shift()
            } else {
                existingShortcuts.splice(i, i)
            }
        }
        i++
    })
    localStorage.setItem('shortcuts', JSON.stringify(existingShortcuts))
    
    let j = 0
    Array.from(shortcutsCont.children).forEach(shortcut => {
        if (key == shortcut.dataset.key) {
            shortcutsCont.removeChild(shortcut)
        }
        j++
    })
}


generateShortcuts()