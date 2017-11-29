var menu = (user_id) =>{
     return [
     {
       link: `/profile/`,
       title: 'Мої статті',
       icon: 'home'
     },
     {
       link: `/profile/update/`,
       title: 'Змінити дані',
       icon: 'edit'
     },
     {
       link: `/profile/create/post/`,
       title: 'Додати статтю',
       icon: 'newspaper'
     },
     {
       link: `/profile/create/event/`,
       title: 'Додати подію',
       icon: 'pencil'
     }]
}



export default menu;