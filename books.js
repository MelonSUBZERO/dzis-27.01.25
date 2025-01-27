async function getData() {
    const url = await fetch(`http://localhost:3001/books`)
    const data = await url.json()
    return data
}
 
getData().then(data => {
    const table = document.querySelector('#table')
 
    const row = table.insertRow(0)
    const th1 = row.insertCell(0)
    const th2 = row.insertCell(1)
    const th3 = row.insertCell(2)
 
    th1.textContent = 'ID'
    th2.textContent = 'Tytuł'
    th3.textContent = 'Autor'
 
    data.forEach(book => {
        const row = table.insertRow()
        const cell1 = row.insertCell(0)
        const cell2 = row.insertCell(1)
        const cell3 = row.insertCell(2)
        cell1.textContent = book.id
        cell2.textContent = book.title
        cell3.textContent = book.author
    })
})
document.querySelector('#sub').addEventListener('click', async () => {
    const title = document.querySelector('#tytul').value
    const author = document.querySelector('#autor').value
 
    if (title && author) {
        const req = await fetch(`http://localhost:3001/add-book/${title}/${author}`)
        location.reload()
    } else {
        alert('Wypłenij wszystkie pola')
    }
})