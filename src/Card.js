const Card = card => {
    return `
    <li>
        <img src = '${card.avatar_url}' style = 'height: 200px'/>
        <a href = '${card.html_url}'>
            <h3>${card.name}</h3>
        </a>
        <p>Public Repos: <strong>${card.public_repos}</strong></p>
        <p>Bio: ${card.bio ? `Bio ${card.bio}` : '' } </p>
        <p>Website: <span> <a href = '${card.blog}'>${card.blog}</a></span></p>
        <p>Has been a member of github since <u>${new Date(card.created_at).toLocaleString('en-us', { month: 'long' })} ${new Date(card.created_at).getDate()}, ${new Date(card.created_at).getFullYear()}</u></p>
    </li>
   `
}

// Can also write above code by 'DESTRUCTURING' the code
/* 
const Card = ({ avatar_url, html_url, name, public_repos, bio, blog, created_at }) => {
    return `
    <li>
        <img src = '${avatar_url}' style = 'height: 200px'/>
        <a href = '${html_url}'>
            <h3>${name}</h3>
        </a>
        <p>Public Repos: <strong>${public_repos}</strong></p>
        <p>Bio: ${bio ? `Bio ${bio}` : '' } </p>
        <p>Website: <span> <a href = '${blog}'>${blog}</a></span></p>
        <p>Has been a member of github since <u>${new Date(created_at).toLocaleString('en-us', { month: 'long' })} ${new Date(created_at).getDate()}, ${new Date(created_at).getFullYear()}</u></p>
    </li>
   `
}
*/

export default Card;