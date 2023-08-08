function setMainView(view){
    return{
        footer: 'partials/footer', // consuming after the partials are imported
        header: 'partials/header',
        main: `partials/main/${view}`// go down file tree 
    }
}

module.exports = {setMainView}; // export it in order to bring it to scoop and call

function setNavs(currentHref, navs, isAuthenticated){
 const _navs = navs.map(nav => {
    nav.className ='';
    if (nav.href === currentHref) {
        nav.className = 'active';
    }
    return nav;
 }).filter(nav => {
    if (!isAuthenticated) {
        // show public nav items
        return !nav.isPrivate // return the ones where nav is not private
    } else {
        //show public and private, except for login
        return nav.isPrivate || nav.isPrivate === undefined; // return nav is private or nav is undefined (it's not a string it is an actual value), undefined means javascript looks and if its not there it is an undefined value
    }
 });
 return {navs: _navs};
}

module.exports = {setMainView, setNavs}; // export it in order to bring it to scoop and call