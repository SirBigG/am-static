var menu = (user_id) =>{
     return [
     {
       link: `/user/${ user_id }/`,
       title: 'Мої статті',
       icon: 'home'
     },
     {
       link: `/user/${user_id}/update/`,
       title: 'Змінити дані',
       icon: 'pencil'
     },
     {
       link: `/user/${user_id}/post/create/`,
       title: 'Додати статтю',
       icon: 'newspaper'
     }]
}



export default menu;