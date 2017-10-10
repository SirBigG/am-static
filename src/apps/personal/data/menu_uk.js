var menu = (user_id) =>{
     return [
     {
       link: `/user/${ user_id }/`,
       title: 'Мої статті',
       icon: 'fa fa-home fa-lg'
     },
     {
       link: `/user/${user_id}/update/`,
       title: 'Змінити дані',
       icon: 'fa fa-pencil fa-lg'
     },
     {
       link: `/user/${user_id}/post/create/`,
       title: 'Додати статтю',
       icon: 'fa fa-newspaper-o fa-lg'
     }]
}



export default menu;