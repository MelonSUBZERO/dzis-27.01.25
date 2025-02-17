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
        const cell4 = row.insertCell(3)
        cell1.textContent = book.id
        cell2.textContent = book.title
        cell3.textContent = book.author
 
        const editButton = document.createElement('button')
        editButton.textContent = 'Edytuj'
        editButton.setAttribute('id', 'editBookButton')
        cell4.appendChild(editButton)
        editButton.addEventListener('click', async () => {
            const newTitle = prompt('Podaj nowy tytuł', book.title)
            const newAuthor = prompt('Podaj nowego autora', book.author)
            if (newTitle && newAuthor) {
                const req = await fetch(`http://localhost:3001/edit-book/${book.id}/${newTitle}/${newAuthor}`)
                location.reload()
            } else {
                alert('Wypełnij wszystkie pola')
            }
            cell2.textContent = newTitle
            cell3.textContent = newAuthor
        })})
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
document.querySelector('#usun').addEventListener('click', async () =>{
    const id = document.querySelector('#id').value
    if (id) {
        const req = await fetch(`http://localhost:3001/delete-book/${id}`)
        location.reload()
    } else {
        alert('Wpisz ID ksiązki do usunięcia')
    }
})  
