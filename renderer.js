const container = document.getElementById('backImg')

window.electronAPI.setBackground((event, value) => {

    console.log('setBg')

    container.setAttribute('src', value)
    console.log(container)

})